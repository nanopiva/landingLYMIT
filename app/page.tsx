"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Navbar from "@/components/ui/Navbar";
import initPlanet3D from "@/components/3D/planet";
import Servicios from "@/components/ui/Servicios";
import ProjectSeparator from "@/components/ui/ProjectSeparator";
import Projects from "@/components/ui/Projects";
import Contact from "@/components/ui/Contact";
import Footer from "@/components/ui/Footer";
import "@/styles/pages/home.css";
import "@/styles/pages/landing.css";
import "@/styles/sections/separators.css";

// Registramos los plugins de GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
  // --- EFECTO HERO -> SERVICIOS ---
  useEffect(() => {
    let isScrolling = false;

    // Definimos el contexto de GSAP para limpieza automática
    const ctx = gsap.context(() => {
      // ScrollTrigger mejorado para detectar cualquier scroll en el hero
      ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "bottom top",

        // Detectar cuando el usuario hace cualquier scroll hacia abajo
        onUpdate: (self) => {
          // Si el usuario scrolleó más del 3% del hero hacia abajo y no está ya scrolleando
          if (self.progress > 0.03 && self.direction === 1 && !isScrolling) {
            isScrolling = true;

            // Animar suavemente hacia el separador de servicios
            gsap.to(window, {
              duration: 1,
              scrollTo: { y: "#servicios", offsetY: 0 },
              ease: "power2.inOut",
              onComplete: () => {
                // Resetear flag después de un tiempo
                setTimeout(() => {
                  isScrolling = false;
                }, 500);
              },
            });
          }
        },
      });
    });

    return () => ctx.revert(); // Limpieza al desmontar
  }, []);

  // --- PLANETA 3D (Tu código original) ---
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
      {/* IMPORTANTE: Quitamos el scrollMarginTop exagerado para que el SNAP de GSAP calce perfecto */}
      <section id="servicios" className="separator_section">
        <div className="separator_content">
          <h2>Servicios</h2>
          <p>
            Desde experiencias web hasta automatizaciones con IA: herramientas
            reales para problemas actuales.
          </p>
        </div>
      </section>

      <Servicios />

      {/* SEPARADOR PROYECTOS */}
      <ProjectSeparator id="trabajos" />

      <Projects />

      {/* SEPARADOR CONTACTO */}
      <section id="contacto" className="separator_section">
        <div className="separator_content">
          <h2>Contacto</h2>
          <p>
            Estamos para escucharte. Contanos qué necesita tu negocio hoy y
            busquemos juntos la mejor forma de resolverlo.
          </p>
        </div>
      </section>

      <Contact />
      <Footer />
    </div>
  );
}
