"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Páginas Web",
    // Cambio: Directo al grano. Velocidad + Diseño + Conversión.
    description:
      "La primera impresión de tu negocio entra por los ojos. Diseñamos sitios web elegantes y fáciles de navegar que reflejan la calidad de tu trabajo y generan la confianza necesaria para que te elijan.",
    tags: ["Landing Pages", "Sitios Corporativos", "3D WebGL", "SEO Técnico"],
    image: "/modern-web.png",
  },
  {
    id: "02",
    title: "E-commerce",
    // Cambio: Enfoque en "que funcione y venda" sin tecnicismos.
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
    // Cambio: Explicación simple de para qué sirve la IA (ahorrar tiempo).
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
    // Cambio: Problema (lo comercial no sirve) -> Solución (lo hacemos nosotros).
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

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const cards = cardsRef.current.filter((el) => el !== null);

    if (!wrapper || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(cards, { zIndex: (i) => i + 1 });
      cards.forEach((card, index) => {
        if (index !== 0) {
          gsap.set(card, { yPercent: 100 });
        }
      });

      // CAMBIO: Redujimos el multiplicador de 100 a 60.
      // Esto hace que tengas que scrollear mucho menos para pasar las cards.
      const scrollDistance = (cards.length - 1) * 60;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          start: "top top",
          // Mantenemos el scrub para fluidez
          end: `+=${scrollDistance}%`,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 10,
        },
        defaults: { ease: "none" }, // Linear para control total
      });

      // ... resto de la lógica de animación igual ...
      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          tl.to(card, { scale: 0.95, opacity: 1 }, `step-${index}`).to(
            cards[index + 1],
            { yPercent: 0 },
            `step-${index}`,
          );
        }
      });
    }, wrapperRef);

    return () => ctx.revert();
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

            <p className="service_description">{service.description}</p>

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
