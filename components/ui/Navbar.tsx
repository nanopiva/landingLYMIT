"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import LYMITLogo from "@/public/LYMITBlack.svg";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const lenis = useLenis();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > 50) setScrolled(true);
    else setScrolled(false);

    if (latest > previous && latest > 150) setHidden(true);
    else setHidden(false);
  });

  // Aceptamos string (ID) o number (pixel exacto)
  const handleScrollLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string | number,
  ) => {
    if (pathname === "/") {
      e.preventDefault();
      // Si el target es 0, forzamos "top: 0", si no, vamos al ID con un pequeño offset si es necesario
      lenis?.scrollTo(target, { offset: typeof target === "string" ? -50 : 0 });
    }
  };

  return (
    <motion.header
      className="navbar_fixed_wrapper"
      variants={{
        visible: { y: 0 },
        hidden: { y: "-120%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <nav className={`navbar_pill ${scrolled ? "scrolled" : ""}`}>
        {/* LOGO: Ahora manda al pixel 0 (Tope absoluto) */}
        <Link
          href="/#hero"
          className="nav_logo_wrapper"
          onClick={(e) => handleScrollLink(e, 0)}
        >
          <img src={LYMITLogo.src} alt="LYMIT" className="nav_logo_img" />
        </Link>

        <div className="nav_links">
          <Link
            href="/#servicios"
            className="nav_link"
            onClick={(e) => handleScrollLink(e, "#servicios")}
          >
            Servicios
          </Link>
          <Link
            href="/#trabajos"
            className="nav_link"
            onClick={(e) => handleScrollLink(e, "#trabajos")}
          >
            Trabajos
          </Link>
          <Link
            href="/#contacto"
            className="nav_link"
            onClick={(e) => handleScrollLink(e, "#contacto")}
          >
            Contacto
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
