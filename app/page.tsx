"use client";
import { useEffect } from "react";
import Navbar from "@/components/ui/Navbar";
import initPlanet3D from "@/components/3D/planet";
import Servicios from "@/components/ui/Servicios";
import ProjectSeparator from "@/components/ui/ProjectSeparator";
import Projects from "@/components/ui/Projects";
import Contact from "@/components/ui/Contact";
import Footer from "@/components/ui/Footer";

export default function Home() {
  useEffect(() => {
    /* ... lógica del planeta ... */
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
        {/* ... contenido hero ... */}
        <div className="content">
          <h1>Bienvenidos a una nueva era</h1>
          <p>Agentes de IA y soluciones digitales...</p>
          <a href="#servicios">
            <button className="cta_btn">Descubrir más</button>
          </a>
        </div>
        <canvas className="planet-3D" />
      </section>

      {/* SEPARADOR SERVICIOS */}
      {/* Agregamos scrollMarginTop también aquí por consistencia */}
      <section
        id="servicios"
        className="separator_section"
        style={{ scrollMarginTop: "100px" }}
      >
        <div className="separator_content">
          <h2>Servicios</h2>
          <p>Descubre solo algunas de las soluciones...</p>
        </div>
      </section>

      <Servicios />

      {/* SEPARADOR PROYECTOS */}
      <ProjectSeparator id="proyectos" />

      <Projects />

      {/* --- AQUÍ ESTÁ LA SOLUCIÓN --- */}
      {/* 1. El ID va en el separador. */}
      {/* 2. scrollMarginTop hace que el navegador frene 120px ANTES */}
      <section
        id="contacto"
        className="separator_section"
        style={{ scrollMarginTop: "120px" }}
      >
        <div className="separator_content">
          <h2>Contacto</h2>
          <p>Estos son nuestros medios de contacto</p>
        </div>
      </section>

      <Contact />
      <Footer />
    </div>
  );
}
