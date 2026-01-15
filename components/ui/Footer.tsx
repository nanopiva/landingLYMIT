"use client";

import { Instagram } from "lucide-react";
import LYMITLogo from "@/public/LYMITWhite.svg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer_section">
      <div className="footer_container">
        {/* PARTE SUPERIOR */}
        <div className="footer_top">
          {/* MARCA + LOGO + LEMA (CENTRADOS) */}
          <div className="footer_brand">
            <div className="logo_wrapper">
              <img
                src={LYMITLogo.src}
                alt="LYMIT Logo"
                className="footer_logo_img"
              />
            </div>
            <p className="brand_tagline">Elevando estándares digitales.</p>
          </div>

          {/* NAVEGACIÓN */}
          <div className="footer_nav_wrapper">
            <FooterColumn
              title="Explorar"
              links={[
                { name: "Inicio", href: "#hero" },
                { name: "Servicios", href: "#servicios" },
                { name: "Proyectos", href: "#proyectos" },
                { name: "Contacto", href: "#contacto" },
              ]}
            />

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
                  href="https://instagram.com/lymitsolutions/"
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

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { name: string; href: string }[];
}) {
  return (
    <div className="footer_col">
      <h3 className="col_title">{title}</h3>
      <ul className="link_list">
        {links.map((link) => (
          <li key={link.name}>
            <a href={link.href} className="footer_link_item">
              <span className="link_text">{link.name}</span>
              <span className="link_underline" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
