"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import AnimatedCopy from "./AnimatedCopy";

const projects = [
  {
    title: "Cell Store",
    category: "E-commerce Tech",
    description:
      "Un e-commerce para vender productos Apple. El desafío fue simple: que el sitio se sienta tan premium como los productos, con un modo oscuro elegante y un proceso de compra que no te haga perder tiempo.",
    src: "/project-1.jpeg", // Asegúrate de que coincida con tu archivo en public
    color: "#ffffff",
    tags: ["E-commerce", "Dark UI", "Apple Reseller"],
  },
  {
    title: "Luna Mendoza",
    category: "Sitio Profesional",
    description:
      "Un espacio digital diseñado para generar confianza. Creamos una web que transmite la calidez de su atención profesional, permitiendo a las familias entender su enfoque terapéutico y contactarla de manera simple.",
    src: "/project-2.jpeg", // Asegúrate de que coincida con tu archivo en public
    color: "#ffffff",
    tags: ["Salud", "Identidad Visual", "Diseño Limpio"],
  },
  {
    title: "Koble Consultoría",
    category: "Identidad Digital",
    description:
      "Con Koble el objetivo fue claro: crear una página que transmita seguridad. Diseñamos un sitio profesional y ordenado que refleja la seriedad de su asesoramiento, ayudándoles a conectar mejor con sus clientes desde el primer contacto.",
    src: "/project-4.jpeg",
    color: "#ffffff",
    tags: ["Corporativo", "Branding", "Estrategia"],
  },
  {
    title: "Cyc Soluciones",
    category: "Sitio Corporativo",
    description:
      "El mundo legal suele ser anticuado en la web. Acá rompimos eso. Una página moderna y limpia que genera la confianza necesaria para que un cliente potencial se anime a contactarlos.",
    src: "/project-3.jpeg",
    color: "#ffffff",
    tags: ["Legales", "Confianza", "Renovación"],
  },
];

export default function Projects() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={container} className="projects_main_container">
      {/* Sin título, directo a las cards */}
      <div className="projects_list">
        {projects.map((project, i) => {
          // Ajuste sutil: escalamos menos para que incluso la de atrás se vea grande
          const targetScale = 1 - (projects.length - i) * 0.04;

          return (
            <Card
              key={`p_${i}`}
              i={i}
              {...project}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </div>
  );
}

interface CardProps {
  i: number;
  title: string;
  category: string;
  description: string;
  src: string;
  color: string;
  tags: string[];
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const Card: React.FC<CardProps> = ({
  i,
  title,
  category,
  description,
  src,
  color,
  tags,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="card_sticky_wrapper">
      <motion.div
        className="card_inner_motion"
        style={{
          backgroundColor: color,
          scale,
          // Ajuste vertical para el stacking
          top: `calc(-5vh + ${i * 25}px)`,
        }}
      >
        <div className="card_content_grid">
          <h2 className="card_title_mobile">{title}</h2>

          {/* Texto */}
          <div className="card_text_column">
            <div className="card_header_text">
              <span className="card_category_label">{category}</span>

              <h2 className="card_title_desktop">{title}</h2>
            </div>
            <AnimatedCopy>
              <p className="card_description">{description}</p>
            </AnimatedCopy>

            <div className="card_tags_container">
              {tags.map((tag, index) => (
                <span key={index} className="card_tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Imagen */}
          <div className="card_image_column">
            <motion.div
              className="card_image_inner"
              style={{ scale: imageScale }}
            >
              <Image fill src={src} alt={title} className="card_img" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
