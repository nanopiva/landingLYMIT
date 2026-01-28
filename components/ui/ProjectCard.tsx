"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";

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
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
      >
        <div className="card_body">
          {/* TEXTO */}
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

          {/* GALERÍA */}
          <div className="card_image_column">
            <AccordionGallery items={gallery} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// --- COMPONENTE ACORDEÓN ---
function AccordionGallery({ items }: { items: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="accordion_container">
      {items.map((src, index) => {
        const isActive = activeIndex === index;

        return (
          <motion.div
            key={index}
            className={`accordion_item ${isActive ? "active" : ""}`}
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            initial={false}
            animate={{
              flexGrow: isActive ? 5 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
            }}
          >
            {/* IMAGEN SIMPLE (Cover + Center) */}
            <Image
              src={src}
              fill
              alt="Project view"
              className="accordion_img"
              sizes="(max-width: 1200px) 100vw, 50vw"
              priority={index === 0}
            />

            {/* OVERLAY */}
            <motion.div
              className="accordion_overlay_simple"
              animate={{ opacity: isActive ? 0 : 0.4 }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
