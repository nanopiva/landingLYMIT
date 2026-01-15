"use client";
import { useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

interface CardProps {
  i: number;
  title: string;
  description: string;
  src: string;
  url: string; // Coincide con el dato que pasamos
  color: string;
  textColor?: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export const Card: React.FC<CardProps> = ({
  i,
  title,
  description,
  src,
  url,
  color,
  textColor,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);

  // Animación interna de la imagen (Parallax)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]); // Zoom out sutil
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="card_sticky_wrapper">
      <motion.div
        className="card_content"
        style={{
          backgroundColor: color,
          color: textColor || "#000",
          scale,
          // AJUSTE CLAVE: Calculamos el 'top' para que se vea el efecto cascada
          // Aumentamos el gap a 35px para que se note la separación superior
          top: `calc(5vh + ${i * 35}px)`,
        }}
      >
        <div className="card_body">
          <div className="card_text">
            <h2 className="card_title">{title}</h2>
            <p className="card_description">{description}</p>

            <a
              href={url}
              target="_blank"
              className="card_link"
              rel="noopener noreferrer"
            >
              Ver Proyecto
              <svg
                width="18"
                height="12"
                viewBox="0 0 22 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>

          <div className="card_image_container">
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
