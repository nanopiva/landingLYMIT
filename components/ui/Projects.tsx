"use client";
import { useRef } from "react";
import { useScroll } from "framer-motion";
import ProjectCard from "./ProjectCard";
import "@/styles/sections/projects.css";

const projects = [
  {
    title: "Koble Consultoría",
    description:
      "Identidad digital completa y sitio corporativo. Estrategia de marca y desarrollo web enfocado en el posicionamiento dentro de su sector.",
    gallery: [
      "/project3-1.png",
      "/project3-2.png",
      "/project3-3.png",
      "/project3-4.png",
    ],
    link: "https://koble.com.ar",
    // Color 1: El más claro
    color: "rgba(240, 240, 242, 0.97)",
    category: "Identidad Digital",
    tags: ["Branding", "Corporativo", "Estrategia"],
  },
  {
    title: "Cyc Soluciones",
    description:
      "Plataforma corporativa para la gestión de servicios legales. Diseño sobrio y estructurado, adaptado específicamente a las necesidades del estudio.",
    gallery: [
      "/project4-1.png",
      "/project4-2.png",
      "/project4-3.png",
      "/project4-4.png",
    ],
    link: "https://cycsolucioneslegales.com.ar",
    // Color 2: Un tono sutilmente más oscuro
    color: "rgba(235, 235, 238, 0.97)",
    category: "Sitio Corporativo",
    tags: ["Diseño Profesional", "Multi-rutas", "SEO"],
  },
  {
    title: "Luna Mendoza",
    description:
      "Sitio web profesional para psicopedagoga. Diseño minimalista y accesible, enfocado en generar confianza y facilitar la reserva de turnos para pacientes.",
    gallery: [
      "/project2-1.png",
      "/project2-2.png",
      "/project2-3.png",
      "/project2-4.png",
    ],
    link: "https://koble.com.ar", // Cambiar por el link de la maqueta si la suben a Vercel
    // Color 3: Profundizando la sombra
    color: "rgba(230, 230, 235, 0.97)",
    category: "Sitio Profesional",
    tags: ["UX/UI", "Minimalismo", "Gestión"],
  },
  {
    title: "Lumen Store",
    description:
      "Comercio electrónico autogestionable. Demo técnica de una tienda equipada con un panel de control propio, permitiendo al dueño cargar y administrar productos fácilmente.",
    gallery: [
      "/project1-1.png",
      "/project1-2.png",
      "/project1-3.png",
      "/project1-4.png",
    ],
    link: "https://lumen-phi-nine.vercel.app", // Cambiar por el enlace real a tu Vercel
    // Color 4: El más oscuro para asentar el fondo
    color: "rgba(225, 228, 230, 0.97)",
    category: "Concepto E-commerce",
    tags: ["Catálogo", "Panel de Control", "Rendimiento"],
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
