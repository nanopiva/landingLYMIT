"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/ui/Navbar";
import initPlanet3D from "@/components/3D/planet";
import Servicios from "@/components/ui/Servicios";
import ProjectSeparator from "@/components/ui/ProjectSeparator";
import Projects from "@/components/ui/Projects";
import Contact from "@/components/ui/Contact";
import Footer from "@/components/ui/Footer";
import AnimatedCopy from "@/components/ui/AnimatedCopy"; // Importamos el componente
import "@/styles/pages/home.css";
import "@/styles/pages/landing.css";
import "@/styles/sections/separators.css";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // --- PLANETA 3D ---
  useEffect(() => {
    const { scene, renderer } = initPlanet3D();
    return () => {
      if (renderer) {
        const gl = renderer.getContext();
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        renderer.dispose();
      }
    };
  }, []);

  // --- SOLUCIÓN DEL BUG DE SCROLL (REFRESH) ---
  useEffect(() => {
    // Forzamos un refresco doble para asegurar que el layout esté asentado
    const timer1 = setTimeout(() => ScrollTrigger.refresh(), 100);
    const timer2 = setTimeout(() => ScrollTrigger.refresh(), 500); // Por si cargan imágenes

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="page">
      <Navbar />

      {/* HERO */}
      <section id="hero" className="hero_main">
        <div className="content">
          <h1>Modernizá tu forma de trabajar</h1>
          <p>
            Implementamos soluciones digitales y agentes inteligentes que
            trabajan por vos las 24 horas del día.
          </p>
          <a href="#servicios">
            <button className="cta_btn">Ver más</button>
          </a>
        </div>
        <canvas className="planet-3D" />
      </section>

      {/* SEPARADOR SERVICIOS */}
      <section id="servicios" className="separator_section">
        <div className="separator_content">
          <h2>Servicios</h2>
          {/* CORRECCIÓN DE COLOR: Finaliza en Gris (#a1a1a6) */}
          <AnimatedCopy colorFinal="#a1a1a6">
            <p>
              Desde experiencias web hasta automatizaciones con IA: herramientas
              reales para problemas actuales.
            </p>
          </AnimatedCopy>
        </div>
      </section>

      <Servicios />

      {/* SEPARADOR PROYECTOS (ProjectSeparator ya lo maneja internamente, ver paso 2) */}
      <ProjectSeparator id="trabajos" />

      <Projects />

      {/* SEPARADOR CONTACTO */}
      <section id="contacto" className="separator_section">
        <div className="separator_content">
          <h2>Contacto</h2>
          {/* CORRECCIÓN DE COLOR: Finaliza en Gris (#a1a1a6) */}
          <AnimatedCopy colorFinal="#a1a1a6">
            <p>
              Estamos para escucharte. Contanos qué necesita tu negocio hoy y
              busquemos juntos la mejor forma de resolverlo.
            </p>
          </AnimatedCopy>
        </div>
      </section>

      <Contact />
      <Footer />
    </div>
  );
}
