"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface AnimatedCopyProps {
  children: React.ReactElement;
  colorInitial?: string;
  colorAccent?: string;
  colorFinal?: string;
  triggerEnd?: string;
}

interface SplitRefObject {
  wordSplit: any;
  charSplit: any;
}

export default function AnimatedCopy({
  children,
  colorInitial = "#dddddd", // OJO: Para fondo blanco, quizás quieras un gris claro por defecto
  colorAccent = "#5271ff",
  colorFinal = "#000000",
  triggerEnd = "bottom 60%", // CAMBIO: "bottom" da más margen que "top"
}: AnimatedCopyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const splitRefs = useRef<SplitRefObject[]>([]);
  const lastScrollProgress = useRef<number>(0);

  const colorTransitionTimers = useRef<
    Map<number, ReturnType<typeof setTimeout>>
  >(new Map());

  const completedChars = useRef<Set<number>>(new Set());
  const animatingChars = useRef<Set<number>>(new Set());

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Limpieza inicial
      splitRefs.current = [];
      lastScrollProgress.current = 0;
      colorTransitionTimers.current.clear();
      completedChars.current.clear();
      animatingChars.current.clear();

      let elements: HTMLElement[] = [];

      if (containerRef.current.hasAttribute("data-copy-wrapper")) {
        elements = Array.from(containerRef.current.children) as HTMLElement[];
      } else {
        elements = [containerRef.current];
      }

      elements.forEach((element) => {
        const wordSplit = SplitText.create(element, {
          type: "words",
          wordsClass: "word",
        });
        const charSplit = SplitText.create(wordSplit.words, {
          type: "chars",
          charsClass: "char",
        });
        splitRefs.current.push({ wordSplit, charSplit });
      });

      const allChars = splitRefs.current.flatMap(
        ({ charSplit }) => charSplit.chars,
      );
      gsap.set(allChars, { color: colorInitial });

      const scheduleFinalTransition = (char: Element, index: number) => {
        if (colorTransitionTimers.current.has(index)) {
          clearTimeout(colorTransitionTimers.current.get(index)!);
        }

        const timer = setTimeout(() => {
          animatingChars.current.add(index);

          if (!completedChars.current.has(index)) {
            gsap.to(char, {
              duration: 0.2,
              ease: "power1.in",
              color: colorFinal,
              onComplete: () => {
                animatingChars.current.delete(index);
                completedChars.current.add(index);
              },
            });
          }
          colorTransitionTimers.current.delete(index);
        }, 100);

        colorTransitionTimers.current.set(index, timer);
      };

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 90%",
        end: triggerEnd, // Usamos la prop dinámica
        scrub: 1,
        refreshPriority: -1,
        onUpdate: (self) => {
          const progress = self.progress;
          const totalChars = allChars.length;
          const isScrolingDown = progress >= lastScrollProgress.current;
          const currentCharIndex = Math.floor(progress * totalChars);

          allChars.forEach((char: Element, index: number) => {
            // Lógica Scroll Hacia Arriba (Reset)
            if (!isScrolingDown && index >= currentCharIndex) {
              if (colorTransitionTimers.current.has(index)) {
                clearTimeout(colorTransitionTimers.current.get(index)!);
                colorTransitionTimers.current.delete(index);
              }
              completedChars.current.delete(index);
              animatingChars.current.delete(index);

              gsap.killTweensOf(char);
              gsap.set(char, { color: colorInitial });
              return;
            }

            // Lógica Scroll Hacia Abajo
            if (index <= currentCharIndex) {
              if (completedChars.current.has(index)) {
                gsap.set(char, { color: colorFinal });
              } else if (animatingChars.current.has(index)) {
                return;
              } else {
                gsap.set(char, { color: colorAccent });
                if (!colorTransitionTimers.current.has(index)) {
                  scheduleFinalTransition(char, index);
                }
              }
            } else {
              gsap.set(char, { color: colorInitial });
            }
          });
          lastScrollProgress.current = progress;
        },
      });

      return () => {
        colorTransitionTimers.current.forEach((timer) => clearTimeout(timer));
        colorTransitionTimers.current.clear();
        completedChars.current.clear();
        animatingChars.current.clear();

        splitRefs.current.forEach(({ wordSplit, charSplit }) => {
          if (charSplit) charSplit.revert();
          if (wordSplit) wordSplit.revert();
        });
      };
    },
    {
      scope: containerRef,
      dependencies: [colorInitial, colorAccent, colorFinal, triggerEnd],
    },
  );

  if (React.Children.count(children) === 1) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ref: containerRef,
    });
  }

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
}
