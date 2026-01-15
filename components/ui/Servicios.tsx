"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedCopy from "./AnimatedCopy";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Experiencias Web",
    // Cambio: Directo al grano. Velocidad + Diseño + Conversión.
    description:
      "Hacemos sitios web rápidos y con buen diseño. No es solo estética, es crear una página clara que ayude a que tus visitas se conviertan en clientes.",
    tags: ["Landing Pages", "Sitios Corporativos", "3D WebGL", "SEO Técnico"],
    image: "/modern-web.jpg",
  },
  {
    id: "02",
    title: "Comercio Digital",
    // Cambio: Enfoque en "que funcione y venda" sin tecnicismos.
    description:
      "Te armamos la tienda online completa. Configuramos los pagos, el carrito y nos aseguramos de que todo funcione fluido para que no pierdas ventas por errores técnicos.",
    tags: [
      "E-commerce",
      "Shopify Experts",
      "WooCommerce",
      "Analítica de Ventas",
    ],
    image: "/e-commerce.jpg",
  },
  {
    id: "03",
    title: "Automatización & IA",
    // Cambio: Explicación simple de para qué sirve la IA (ahorrar tiempo).
    description:
      "Ahorrá tiempo usando inteligencia artificial. Configuramos chatbots que responden solos a tus clientes y automatizamos esas tareas repetitivas que hoy haces a mano.",
    tags: [
      "Agentes IA",
      "n8n Workflows",
      "Chatbots GPT-4",
      "Reducción de Costos",
    ],
    image: "/ai-automation.jpg",
  },
  {
    id: "04",
    title: "Software a Medida",
    // Cambio: Problema (lo comercial no sirve) -> Solución (lo hacemos nosotros).
    description:
      "A veces las herramientas del mercado no alcanzan. Creamos el software exacto que tu negocio necesita para organizarse y crecer, hecho 100% a tu medida.",
    tags: [
      "SaaS Development",
      "Web Apps",
      "Cloud Architecture",
      "Bases de Datos",
    ],
    image: "/software-architecture.jpg",
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
      // 1. Configuración inicial
      gsap.set(cards, { zIndex: (i) => i + 1 });
      cards.forEach((card, index) => {
        if (index !== 0) {
          gsap.set(card, { yPercent: 100 });
        }
      });

      // 2. Definimos la duración lógica
      const scrollDistance = (cards.length - 1) * 100;

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

      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          tl.to(
            card,
            {
              scale: 0.95,
              opacity: 1,
            },
            `step-${index}`
          ).to(
            cards[index + 1],
            {
              yPercent: 0,
            },
            `step-${index}`
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

            <AnimatedCopy>
              <p className="service_description">{service.description}</p>
            </AnimatedCopy>

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
