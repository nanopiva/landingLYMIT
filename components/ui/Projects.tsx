"use client";
import { useRef } from "react";
import { useScroll } from "framer-motion";
import ProjectCard from "./ProjectCard";
import "@/styles/sections/projects.css";

const projects = [
  {
    title: "Cell Store",
    description:
      "Desarrollo integral de e-commerce para tienda de tecnología. Integración de pagos, gestión de stock en tiempo real y panel de administración.",
    gallery: [
      "/project1-1.jpeg",
      "/project1-2.png",
      "/project1-3.png",
      "/project1-4.png",
    ],
    link: "https://koble.com.ar",
    // CAMBIO: Opacidad subida a 0.97 (Casi sólido para no ver lo de atrás)
    color: "rgba(240, 240, 242, 0.97)",
    category: "E-commerce Tech",
    tags: ["Wordpress", "Stripe", "Dashboard"],
  },
  {
    title: "Luna Mendoza",
    description:
      "Sitio web profesional para psicopedagoga. Diseño minimalista enfocado en generar confianza y facilitar el contacto con pacientes.",
    gallery: [
      "/project2-1.png",
      "/project2-2.png",
      "/project2-3.png",
      "/project2-4.png",
    ],
    link: "https://koble.com.ar",
    // CAMBIO: 0.97
    color: "rgba(235, 235, 238, 0.97)",
    category: "Sitio Profesional",
    tags: ["UX/UI", "Minimalismo", "Turnos"],
  },
  {
    title: "Koble Consultoría",
    description:
      "Identidad digital completa y sitio corporativo. Estrategia de marca y desarrollo web para posicionamiento en el sector.",
    gallery: [
      "/project3-1.png",
      "/project3-2.png",
      "/project3-3.png",
      "/project3-4.png",
    ],
    link: "https://koble.com.ar",
    // CAMBIO: 0.97
    color: "rgba(230, 230, 235, 0.97)",
    category: "Identidad Digital",
    tags: ["Branding", "Corporativo", "Estrategia"],
  },
  {
    title: "Cyc Soluciones",
    description:
      "Plataforma corporativa para gestión de servicios legales. Diseño sobrio y funcional adaptado a las necesidades del estudio.",
    gallery: [
      "/project4-1.png",
      "/project4-2.png",
      "/project4-3.png",
      "/project4-4.png",
    ],
    link: "https://cycsolucioneslegales.com.ar",
    // CAMBIO: 0.97
    color: "rgba(225, 228, 230, 0.97)",
    category: "Sitio Corporativo",
    tags: ["Diseño Profesional", "Página multi-rutas", "SEO"],
  },
];

export default function Projects() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={container} className="projects_main">
      {projects.map((project, i) => {
        const targetScale = 1 - (projects.length - i) * 0.05;
        return (
          <ProjectCard
            key={`p_${i}`}
            i={i}
            {...project}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </section>
  );
}
