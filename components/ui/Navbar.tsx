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

  const handleScrollLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string | number,
  ) => {
    if (pathname === "/") {
      e.preventDefault();
      // Mantenemos el offset 0 para precisión perfecta
      lenis?.scrollTo(target, { offset: 0 });
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
        {/* LOGO */}
        <Link
          href="/#hero"
          className="nav_logo_wrapper"
          onClick={(e) => handleScrollLink(e, 0)}
        >
          <img src={LYMITLogo.src} alt="LYMIT" className="nav_logo_img" />
        </Link>

        {/* LINKS DE NAVEGACIÓN (Con estructura para animación) */}
        <div className="nav_links">
          <NavLink
            href="/#servicios"
            label="Servicios"
            onClick={(e) => handleScrollLink(e, "#servicios")}
          />
          <NavLink
            href="/#trabajos"
            label="Trabajos"
            onClick={(e) => handleScrollLink(e, "#trabajos")}
          />
          <NavLink
            href="/#contacto"
            label="Contacto"
            onClick={(e) => handleScrollLink(e, "#contacto")}
          />
        </div>
      </nav>
    </motion.header>
  );
}

// Subcomponente para encapsular la animación del link
function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <Link href={href} className="nav_link_item" onClick={onClick}>
      <span className="nav_link_text">{label}</span>
      <span className="nav_link_underline" />
    </Link>
  );
}
