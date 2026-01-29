"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const services = [
  {
    id: "01",
    title: "Páginas Web",
    description:
      "La primera impresión de tu negocio entra por los ojos. Diseñamos sitios web elegantes y fáciles de navegar que reflejan la calidad de tu trabajo y generan la confianza necesaria para que te elijan.",
    tags: ["Landing Pages", "Sitios Corporativos", "3D WebGL", "SEO Técnico"],
    image: "/modern-web.png",
  },
  {
    id: "02",
    title: "E-commerce",
    description:
      "Creamos una experiencia de compra fluida desde el primer clic hasta el pago final. Implementamos pasarelas seguras y sistemas de gestión que te permiten administrar tus ventas de forma simple, garantizando que el proceso sea profesional tanto para vos como para tu cliente.",
    tags: [
      "E-commerce",
      "Shopify Experts",
      "WooCommerce",
      "Analítica de Ventas",
    ],
    image: "/e-commerce.png",
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
    image: "/ai-automation.png",
  },
  {
    id: "04",
    title: "Software a Medida",
    description:
      "Cuando las soluciones estándar no se ajustan a tu forma de trabajar, desarrollamos herramientas que sí lo hacen. Creamos software diseñado específicamente para tus procesos internos, asegurando que la tecnología se adapte a tu negocio.",
    tags: [
      "SaaS Development",
      "Web Apps",
      "Cloud Architecture",
      "Bases de Datos",
    ],
    image: "/software-architecture.png",
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
        // Empezamos TODAS en gris (#dddddd)
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
        // Detectamos dirección comparando con el frame anterior
        const isScrollingDown = progress >= state.lastProgress;
        const currentCharIndex = Math.floor(progress * totalChars);

        const colorInitial = "#dddddd";
        const colorAccent = "#5271ff";
        const colorFinal = "#000000";

        allChars.forEach((char: Element, charIndex: number) => {
          // A) Scroll Hacia Arriba (BORRAR/RESET)
          if (!isScrollingDown && charIndex >= currentCharIndex) {
            if (state.timers.has(charIndex)) {
              clearTimeout(state.timers.get(charIndex)!);
              state.timers.delete(charIndex);
            }
            state.completed.delete(charIndex);
            state.animating.delete(charIndex);

            // Matamos animaciones en curso y volvemos a GRIS inmediatamente
            gsap.killTweensOf(char);
            gsap.set(char, { color: colorInitial });
            return;
          }

          // B) Scroll Hacia Abajo (ESCRIBIR)
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
      // En lugar de un tween automático, usamos ScrollTrigger con 'scrub'.
      // Esto conecta la animación directamente a la barra de scroll.
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top 60%", // Empieza a pintarse cuando la sección entra en pantalla
        end: "top top", // Termina de pintarse cuando la sección se ancla
        scrub: 1, // Vital: Si subes, la animación retrocede (borra el texto)
        onUpdate: (self) => {
          animateText(0, self.progress);
        },
      });

      // 5. TIMELINE PRINCIPAL (Cards 2, 3, 4)
      const scrollDistance = (cards.length - 1) * 60; // Distancia original (rápida)

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
                // Ajuste de timing para que empiece a escribir un poco después de aparecer
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

          <div className="service_image_wrapper">
            <img
              src={service.image}
              alt={service.title}
              className="service_image"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
