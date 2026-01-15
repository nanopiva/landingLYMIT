import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function TermsPage() {
  return (
    <div className="legal_page">
      <Navbar />

      <main className="legal_container">
        <h1 className="legal_title">Términos y Condiciones</h1>
        <span className="legal_date">Última actualización: Enero 2026</span>

        <div className="legal_content">
          <p>
            Bienvenido a <strong>LYMIT Solutions</strong>. Al acceder a nuestro
            sitio web y utilizar nuestros servicios, usted acepta cumplir con
            los siguientes términos y condiciones.
          </p>

          <h2>1. Servicios</h2>
          <p>
            LYMIT Solutions provee servicios de desarrollo de software,
            consultoría tecnológica e implementación de agentes de IA. Las
            características específicas, plazos y costos de cada proyecto se
            detallarán en una propuesta comercial o contrato de servicios
            independiente.
          </p>

          <h2>2. Propiedad Intelectual</h2>
          <p>
            Todo el contenido de este sitio web (textos, logotipos, gráficos y
            código) es propiedad de LYMIT Solutions.
          </p>
          <p>
            Respecto a los proyectos desarrollados para clientes: la propiedad
            intelectual del código y los entregables se transferirá al cliente
            una vez completado el pago total de los servicios acordados, salvo
            que se estipule lo contrario por escrito.
          </p>

          <h2>3. Limitación de Responsabilidad</h2>
          <p>
            LYMIT Solutions no será responsable por daños indirectos,
            incidentales o consecuentes que surjan del uso o la imposibilidad de
            uso de nuestros servicios o sitio web. Trabajamos con los más altos
            estándares de calidad, pero no garantizamos que el software esté
            libre de errores en todo momento.
          </p>

          <h2>4. Modificaciones</h2>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier
            momento. Las modificaciones entrarán en vigencia inmediatamente
            después de su publicación en esta página.
          </p>

          <h2>5. Legislación Aplicable</h2>
          <p>
            Estos términos se rigen por las leyes de la República Argentina.
            Cualquier disputa que surja en relación con estos términos estará
            sujeta a la jurisdicción exclusiva de los tribunales ordinarios de
            la ciudad de Santa Fe, Argentina.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
