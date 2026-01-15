import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function PrivacyPage() {
  return (
    <div className="legal_page">
      <Navbar />

      <main className="legal_container">
        <h1 className="legal_title">Política de Privacidad</h1>
        <span className="legal_date">Última actualización: Enero 2026</span>

        <div className="legal_content">
          <p>
            En <strong>LYMIT Solutions</strong>, respetamos su privacidad y
            estamos comprometidos a proteger la información personal que pueda
            compartir con nosotros. Esta política describe cómo manejamos sus
            datos.
          </p>

          <h2>1. Información que recolectamos</h2>
          <p>
            Solo recolectamos la información necesaria para comunicarnos con
            usted y prestar nuestros servicios. Esto incluye principalmente:
          </p>
          <ul>
            <li>
              Información de contacto (nombre, email, número de teléfono) que
              usted nos proporciona voluntariamente a través de nuestros
              formularios o chat.
            </li>
            <li>
              Datos técnicos básicos de navegación para mejorar el rendimiento
              de nuestro sitio web.
            </li>
          </ul>

          <h2>2. Uso de la información</h2>
          <p>Utilizamos su información exclusivamente para:</p>
          <ul>
            <li>Responder a sus consultas y solicitudes de presupuesto.</li>
            <li>
              Proveer los servicios de desarrollo y consultoría contratados.
            </li>
            <li>Mejorar la experiencia de usuario en nuestro sitio web.</li>
          </ul>
          <p>
            No vendemos, alquilamos ni compartimos su información personal con
            terceros con fines comerciales.
          </p>

          <h2>3. Cookies</h2>
          <p>
            Este sitio puede utilizar cookies esenciales para garantizar su
            correcto funcionamiento. Usted puede configurar su navegador para
            rechazar estas cookies, aunque esto podría afectar la visualización
            de ciertos elementos.
          </p>

          <h2>4. Contacto</h2>
          <p>
            Si tiene dudas sobre nuestra política de privacidad, puede
            contactarnos en:{" "}
            <a
              href="mailto:contact@lymitsolutions.com"
              style={{ textDecoration: "underline" }}
            >
              contact@lymitsolutions.com
            </a>
            .
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
