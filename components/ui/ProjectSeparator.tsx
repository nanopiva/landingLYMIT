"use client";
import React, { useRef } from "react";

const items = [
  "/pr1.jpg",
  "/pr2.jpg",
  "/pr3.jpg",
  "/pr4.jpg",
  "/pr5.jpg",
  "/pr6.jpg",
];

// 1. Agregamos la prop 'id' a la interfaz
interface SeparatorProps {
  id?: string;
}

export default function ProjectSeparator({ id }: SeparatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  let globalIndex = 0;
  let lastPosition = { x: 0, y: 0 };

  const activate = (image: HTMLImageElement, x: number, y: number) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const relativeX = x - containerRect.left;
    const relativeY = y - containerRect.top;

    image.style.left = `${relativeX}px`;
    image.style.top = `${relativeY}px`;
    image.style.zIndex = `${(globalIndex % items.length) + 1}`;

    image.dataset.status = "active";

    setTimeout(() => {
      image.dataset.status = "inactive";
    }, 1000);

    lastPosition = { x, y };
  };

  const distanceFromLast = (x: number, y: number) => {
    return Math.hypot(x - lastPosition.x, y - lastPosition.y);
  };

  const handleOnMove = (e: React.MouseEvent | React.TouchEvent) => {
    let clientX, clientY;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    if (distanceFromLast(clientX, clientY) > 100) {
      const lead = imageRefs.current[globalIndex % items.length];
      if (lead) {
        activate(lead, clientX, clientY);
      }
      globalIndex++;
    }
  };

  return (
    <section
      id={id} // <--- 2. Asignamos el ID aquí
      ref={containerRef}
      className="project_separator"
      onMouseMove={handleOnMove}
      onTouchMove={handleOnMove}
    >
      {items.map((url, index) => (
        <img
          key={index}
          ref={(el) => {
            imageRefs.current[index] = el;
          }}
          className="trail_image"
          src={url}
          alt={`Project preview ${index}`}
          data-status="inactive"
        />
      ))}

      <article className="project_separator_content">
        <h2>Nuestros Trabajos</h2>
        <p>
          Una muestra de los desafíos que hemos resuelto, ayudando a negocios y
          profesionales a mejorar su operativa a través de la tecnología. <br />
        </p>
      </article>
    </section>
  );
}
