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
  title: {
    default: "LYMIT Solutions | Transformación Digital & IA",
    template: "%s | LYMIT Solutions",
  },
  description:
    "Agencia de desarrollo de software y automatización con IA. Elevamos la productividad de tu negocio con soluciones digitales a medida.",

  keywords: [
    "Desarrollo Web",
    "IA",
    "Automatización",
    "Next.js",
    "Santa Fe",
    "Software",
    "E-commerce",
  ],

  authors: [{ name: "LYMIT Solutions" }],
  creator: "LYMIT Solutions",

  // Iconos (Favicon)
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // Open Graph (Redes Sociales)
  openGraph: {
    title: "LYMIT Solutions | Transformación Digital",
    description:
      "Soluciones de IA y Software a medida para escalar tu negocio.",
    url: "https://lymitsolutions.com",
    siteName: "LYMIT Solutions",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LYMIT Solutions Preview",
      },
    ],
    locale: "es_AR",
    type: "website",
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
        {/* 2. ReactLenis envolviendo la app (Mantenemos tu estructura) */}
        <ReactLenis root>{children}</ReactLenis>
      </body>
    </html>
  );
}
