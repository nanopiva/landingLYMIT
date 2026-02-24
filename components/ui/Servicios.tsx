"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import dynamic from "next/dynamic"; // 1. Importamos Next Dynamic

// 2. Importamos Lottie dinámicamente para no bloquear el renderizado inicial
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false, // Lottie no necesita renderizarse en el servidor
});

// IMPORTAR TODAS LAS ANIMACIONES
import webAnimation from "@/app/lotties/web.json";
import commerceAnimation from "@/app/lotties/commerce.json";
import automationAnimation from "@/app/lotties/automation.json";
import softwareAnimation from "@/app/lotties/software.json";

gsap.registerPlugin(ScrollTrigger, SplitText);

// ARRAY DE SERVICIOS ACTUALIZADO CON LOTTIES
const services = [
  {
    id: "01",
    title: "Páginas Web",
    description:
      "La primera impresión de tu negocio entra por los ojos. Diseñamos sitios web elegantes y fáciles de navegar que reflejan la calidad de tu trabajo y generan la confianza necesaria para que te elijan.",
    tags: [
      "Landing Pages",
      "Sitios Corporativos",
      "Web Performance",
      "SEO Técnico",
    ],
    animationData: webAnimation,
  },
  {
    id: "02",
    title: "E-commerce",
    description:
      "Creamos una experiencia de compra fluida desde el primer clic hasta el pago final. Implementamos pasarelas seguras y sistemas de gestión que te permiten administrar tus ventas de forma simple, garantizando que el proceso sea profesional tanto para vos como para tu cliente.",
    tags: ["E-commerce", "Wordpress", "Gestión de Stock", "Pagos Integrados"],
    animationData: commerceAnimation,
  },
  {
    id: "03",
    title: "Automatización & IA",
    description:
      "Optimizamos tu día a día eliminando el trabajo administrativo pesado. A través de soluciones inteligentes, logramos que tus procesos sean más rápidos y eficientes, liberando horas de trabajo que hoy se pierden en tareas que pueden hacerse solas.",
    tags: [
      "Agentes IA",
      "n8n Workflows",
      "Chatbots GPT-4",
      "Reducción de Costos",
    ],
    animationData: automationAnimation,
  },
  {
    id: "04",
    title: "Software a Medida",
    description:
      "Cuando las soluciones estándar no se ajustan a tu forma de trabajar, desarrollamos herramientas que sí lo hacen. Creamos software diseñado específicamente para tus procesos internos, asegurando que la tecnología se adapte a tu negocio.",
    tags: [
      "Gestión de Inventarios",
      "Autogestión",
      "Digitalización de Procesos",
      "Web Apps",
    ],
    animationData: softwareAnimation,
  },
];

export default function Servicios() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const descriptionsRef = useRef<(HTMLParagraphElement | null)[]>([]);

  // Estado para la lógica manual de AnimatedCopy
  const animationStateRef = useRef(
    services.map(() => ({
      timers: new Map<number, ReturnType<typeof setTimeout>>(),
      completed: new Set<number>(),
      animating: new Set<number>(),
      lastProgress: 0,
    })),
  );

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const cards = cardsRef.current.filter(
      (el): el is HTMLDivElement => el !== null,
    );
    const descriptions = descriptionsRef.current.filter(
      (el): el is HTMLParagraphElement => el !== null,
    );

    if (!wrapper || cards.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1025px)", () => {
      // 1. PREPARACIÓN (SplitText)
      const splits: SplitText[] = [];

      descriptions.forEach((desc, i) => {
        const split = new SplitText(desc, { type: "words,chars" });
        splits.push(split);
        gsap.set(split.chars, { color: "#dddddd" });
      });

      // 2. CONFIGURACIÓN INICIAL DE TARJETAS
      gsap.set(cards, {
        zIndex: (i) => i + 1,
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
      });

      cards.forEach((card, index) => {
        if (index !== 0) {
          gsap.set(card, { yPercent: 100 });
        }
      });

      // 3. LÓGICA DE ANIMACIÓN DE TEXTO (Reactiva)
      const animateText = (index: number, progress: number) => {
        const split = splits[index];
        const state = animationStateRef.current[index];
        if (!split || !state) return;

        const allChars = split.chars;
        const totalChars = allChars.length;
        const isScrollingDown = progress >= state.lastProgress;
        const currentCharIndex = Math.floor(progress * totalChars);

        const colorInitial = "#dddddd";
        const colorAccent = "#5271ff";
        const colorFinal = "#000000";

        allChars.forEach((char: Element, charIndex: number) => {
          if (!isScrollingDown && charIndex >= currentCharIndex) {
            if (state.timers.has(charIndex)) {
              clearTimeout(state.timers.get(charIndex)!);
              state.timers.delete(charIndex);
            }
            state.completed.delete(charIndex);
            state.animating.delete(charIndex);

            gsap.killTweensOf(char);
            gsap.set(char, { color: colorInitial });
            return;
          }

          if (charIndex <= currentCharIndex) {
            if (state.completed.has(charIndex)) {
              gsap.set(char, { color: colorFinal });
            } else if (state.animating.has(charIndex)) {
              return;
            } else {
              gsap.set(char, { color: colorAccent });
              if (!state.timers.has(charIndex)) {
                const timer = setTimeout(() => {
                  state.animating.add(charIndex);
                  if (!state.completed.has(charIndex)) {
                    gsap.to(char, {
                      duration: 0.2,
                      ease: "power1.in",
                      color: colorFinal,
                      onComplete: () => {
                        state.animating.delete(charIndex);
                        state.completed.add(charIndex);
                      },
                    });
                  }
                  state.timers.delete(charIndex);
                }, 100);
                state.timers.set(charIndex, timer);
              }
            }
          }
        });
        state.lastProgress = progress;
      };

      // 4. ANIMACIÓN SCROLL-DRIVEN PARA LA PRIMERA TARJETA
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top 60%",
        end: "top top",
        scrub: 1,
        onUpdate: (self) => {
          animateText(0, self.progress);
        },
      });

      // 5. TIMELINE PRINCIPAL (Cards 2, 3, 4)
      const scrollDistance = (cards.length - 1) * 60;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          start: "top top",
          end: `+=${scrollDistance}%`,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });

      // 6. SECUENCIA SINCRONIZADA
      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          const nextCardIndex = index + 1;

          tl.to(card, { scale: 0.95, opacity: 1 }, `step-${index}`).to(
            cards[nextCardIndex],
            {
              yPercent: 0,
              onUpdate: function () {
                const rawProgress = this.progress();
                const startThreshold = 0.35;
                let textProgress = 0;

                if (rawProgress > startThreshold) {
                  textProgress =
                    (rawProgress - startThreshold) / (1 - startThreshold);
                }

                animateText(nextCardIndex, textProgress);
              },
            },
            `step-${index}`,
          );
        }
      });

      return () => {
        splits.forEach((s) => s.revert());
        animationStateRef.current.forEach((state) => {
          state.timers.forEach((t) => clearTimeout(t));
          state.timers.clear();
        });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="services_wrapper" ref={wrapperRef}>
      {services.map((service, i) => (
        <div
          key={service.id}
          className="service_card"
          ref={(el) => {
            cardsRef.current[i] = el;
          }}
        >
          <div className="service_info">
            <span className="service_number">{service.id} — Servicios</span>
            <h3 className="service_title">{service.title}</h3>

            <p
              className="service_description"
              ref={(el) => {
                descriptionsRef.current[i] = el;
              }}
            >
              {service.description}
            </p>

            <div className="service_features">
              {service.tags.map((tag) => (
                <span key={tag} className="feature_tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 3. Renderizado del componente Lottie con SEO Semántico */}
          <div
            className="service_image_wrapper"
            role="img"
            aria-label={`Animación ilustrativa del servicio de ${service.title} de LYMIT Solutions`}
          >
            {service.animationData && (
              <Lottie
                animationData={service.animationData}
                loop={true}
                autoplay={true}
                className="service_image"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
