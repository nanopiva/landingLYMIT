"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import LYMITLogo from "@/public/LYMITBlack.svg";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > 50) setScrolled(true);
    else setScrolled(false);

    if (latest > previous && latest > 150) setHidden(true);
    else setHidden(false);
  });

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
        {/* LOGO WRAPPER */}
        <Link href="/" className="nav_logo_wrapper">
          <img src={LYMITLogo.src} alt="LYMIT" className="nav_logo_img" />
        </Link>

        {/* ENLACES */}
        <div className="nav_links">
          <Link href="#servicios" className="nav_link">
            Servicios
          </Link>
          <Link href="#trabajos" className="nav_link">
            Trabajos
          </Link>
          <Link href="#contacto" className="nav_link">
            Contacto
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
