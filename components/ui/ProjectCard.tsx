"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import "@/styles/sections/projects.css";

interface CardProps {
  i: number;
  title: string;
  description: string;
  gallery: string[];
  link: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  category: string;
  tags: string[];
}

export default function ProjectCard({
  i,
  title,
  description,
  gallery,
  link,
  color,
  progress,
  range,
  targetScale,
  category,
  tags,
}: CardProps) {
  const container = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // 1. Detectamos mobile para desactivar la animación de la tarjeta completa
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="card_sticky_wrapper">
      <motion.div
        className="card"
        style={{
          backgroundColor: color,
          // 2. LÓGICA CONDICIONAL:
          // Si es mobile: Escala 1 (normal) y Top 0 (sin desplazamiento)
          // Si es desktop: Usa la animación de Framer Motion
          scale: isMobile ? 1 : scale,
          top: isMobile ? 0 : `calc(-5vh + ${i * 25}px)`,
        }}
      >
        <div className="card_body">
          <div className="card_text_column">
            <div className="card_header_text">
              <span className="card_category_label">{category}</span>
              <h2 className="card_title_desktop">{title}</h2>
            </div>

            <p className="card_description">{description}</p>

            <div className="card_tags_container">
              {tags.map((tag, idx) => (
                <span key={idx} className="card_tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="card_image_column">
            {/* Pasamos isMobile como prop para no recalcularlo dentro */}
            <AccordionGallery items={gallery} isMobile={isMobile} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// --- GALERÍA (Ahora recibe isMobile como prop) ---
function AccordionGallery({
  items,
  isMobile,
}: {
  items: string[];
  isMobile: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="accordion_container">
      {items.map((src, index) => {
        const isActive = activeIndex === index;

        return (
          <motion.div
            key={index}
            className={`accordion_item ${isActive ? "active" : ""}`}
            onMouseEnter={() => !isMobile && setActiveIndex(index)}
            onClick={() => !isMobile && setActiveIndex(index)}
            animate={{
              flexGrow: isMobile ? 0 : isActive ? 5 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
            }}
          >
            <Image
              src={src}
              fill
              alt="Project view"
              className="accordion_img"
              sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
              priority={index === 0}
              quality={85}
            />
            {!isMobile && (
              <motion.div
                className="accordion_overlay_simple"
                animate={{ opacity: isActive ? 0 : 0.4 }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
