"use client";

import { Instagram } from "lucide-react";
import Link from "next/link";
import { useLenis } from "lenis/react"; // 1. Importamos Lenis
import { usePathname } from "next/navigation";
import LYMITLogo from "@/public/LYMITWhite.svg";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const lenis = useLenis();
  const pathname = usePathname();

  // 2. Función de manejo de scroll unificado (igual que Navbar)
  const handleScroll = (e: React.MouseEvent, target: string | number) => {
    // Si estamos en la home, usamos scroll suave
    if (pathname === "/") {
      e.preventDefault();
      // Offset 0 para llegar al borde exacto
      lenis?.scrollTo(target, { offset: 0 });
    }
    // Si estamos en otra página (/privacidad), el Link nativo hará la navegación
  };

  return (
    <footer className="footer_section">
      <div className="footer_container">
        {/* PARTE SUPERIOR */}
        <div className="footer_top">
          {/* MARCA + LOGO + LEMA */}
          <div className="footer_brand">
            <Link
              href="/#hero"
              className="logo_wrapper"
              onClick={(e) => handleScroll(e, 0)} // Scroll al tope absoluto (0px)
            >
              <img
                src={LYMITLogo.src}
                alt="LYMIT Logo"
                className="footer_logo_img"
              />
            </Link>
            <p className="brand_tagline">Tecnología que piensa.</p>
          </div>

          {/* NAVEGACIÓN */}
          <div className="footer_nav_wrapper">
            <FooterColumn
              title="Explorar"
              onScroll={handleScroll}
              links={[
                { name: "Inicio", href: "#hero", targetId: 0 }, // Target numérico para Inicio
                {
                  name: "Servicios",
                  href: "#servicios",
                  targetId: "#servicios",
                },
                { name: "Proyectos", href: "#trabajos", targetId: "#trabajos" },
                { name: "Contacto", href: "#contacto", targetId: "#contacto" },
              ]}
            />

            {/* Legal no necesita scroll handler porque son páginas nuevas */}
            <FooterColumn
              title="Legal"
              links={[
                { name: "Privacidad", href: "/privacidad" },
                { name: "Términos", href: "/terminos" },
              ]}
            />

            <div className="footer_col">
              <h3 className="col_title">Seguinos</h3>
              <div className="social_icons">
                <a
                  href="https://instagram.com/lymitsolutions_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social_btn"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* LÍNEA DIVISORIA */}
        <div className="footer_divider" />

        {/* PARTE INFERIOR */}
        <div className="footer_bottom">
          <p className="copyright">&copy; {currentYear} LYMIT Solutions.</p>
          <a
            href="mailto:contact@lymitsolutions.com"
            className="footer_email_link"
          >
            contact@lymitsolutions.com
          </a>
        </div>
      </div>
    </footer>
  );
}

// Subcomponente actualizado para recibir el manejador de scroll
function FooterColumn({
  title,
  links,
  onScroll,
}: {
  title: string;
  links: { name: string; href: string; targetId?: string | number }[];
  onScroll?: (e: React.MouseEvent, target: string | number) => void;
}) {
  return (
    <div className="footer_col">
      <h3 className="col_title">{title}</h3>
      <ul className="link_list">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="footer_link_item"
              onClick={(e) => {
                // Solo interceptamos si hay una función onScroll y un target definido
                if (onScroll && link.targetId !== undefined) {
                  onScroll(e, link.targetId);
                }
              }}
            >
              <span className="link_text">{link.name}</span>
              <span className="link_underline" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
