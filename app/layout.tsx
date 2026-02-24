import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/main.css";
// 1. Importar ReactLenis (Mantenemos tu configuración de scroll suave)
import { ReactLenis } from "lenis/react";

// --- CONFIGURACIÓN DE FUENTES (Mantenemos tus fuentes locales) ---
const inter = localFont({
  src: [
    {
      path: "../public/fonts/Inter/InterVariable.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../public/fonts/Inter/InterVariable-Italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--inter",
  display: "swap",
});

const appleGaramond = localFont({
  src: [
    {
      path: "../public/fonts/AppleGaramond/AppleGaramond.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/AppleGaramond/AppleGaramond-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/AppleGaramond/AppleGaramond-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/AppleGaramond/AppleGaramond-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--apple-garamond",
});

// --- METADATOS (SEO + Identidad) ---
export const metadata: Metadata = {
  metadataBase: new URL("https://lymitsolutions.com"), // Reemplazá por tu dominio real
  title: {
    default: "LYMIT Solutions | Desarrollo de Software y Automatización con IA",
    template: "%s | LYMIT Solutions",
  },
  description:
    "Agencia de desarrollo de software a medida y automatización con IA en Santa Fe, Argentina. Elevamos la productividad de tu negocio con agentes inteligentes y soluciones web.",
  keywords: [
    "Desarrollo de software a medida",
    "Automatización de procesos con IA",
    "Agencia de desarrollo web Santa Fe",
    "Agentes inteligentes para negocios",
    "Desarrollo Next.js Argentina",
    "Transformación digital para pymes",
  ],
  authors: [{ name: "LYMIT Solutions" }],
  creator: "LYMIT Solutions",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "LYMIT Solutions | Transformación Digital con IA",
    description:
      "Soluciones de IA y Software a medida para escalar tu negocio de forma inteligente.",
    url: "https://lymitsolutions.com",
    siteName: "LYMIT Solutions",
    images: [
      {
        url: "/og-image.jpg.png", // Asegurate de que esta imagen exista en /public
        width: 1200,
        height: 630,
        alt: "LYMIT Solutions - Agencia de Software e IA",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LYMIT Solutions | Transformación Digital & IA",
    description:
      "Implementamos agentes inteligentes y desarrollo web a medida para tu empresa.",
    images: ["/og-image.jpg.png"],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Cambié lang a "es" ya que el contenido es español
    <html lang="es">
      <body className={`${inter.variable} ${appleGaramond.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "LYMIT Solutions",
              description:
                "Agencia de desarrollo de software y automatización con IA.",
              url: "https://lymitsolutions.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Santa Fe",
                addressCountry: "AR",
              },

              sameAs: [
                // Links a tu LinkedIn, Instagram, etc.
              ],
            }),
          }}
        />
        {/* 2. ReactLenis envolviendo la app (Mantenemos tu estructura) */}
        <ReactLenis root>{children}</ReactLenis>
      </body>
    </html>
  );
}
