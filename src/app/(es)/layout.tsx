import type { Metadata } from "next";
import { SiteLayout } from "@/components/site-layout";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "NOVARY — Digital Studio", template: "%s | NOVARY" },
  description:
    "Diseñamos y desarrollamos experiencias digitales para empresas que quieren destacar, conectar y crecer.",
  applicationName: "NOVARY Digital Studio",
  verification: {
    google: "6rKvZd9XkAaPkztZ6N0iOC01UrQqhHMashCouQ5sdpk",
  },
  openGraph: {
    type: "website",
    siteName: "NOVARY Digital Studio",
    title: "NOVARY — Design. Develop. Grow.",
    description: "Diseño y desarrollo web para marcas listas para dar su siguiente paso.",
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVARY — Digital Studio",
    description: "Diseño y desarrollo web para marcas listas para dar su siguiente paso.",
  },
  alternates: {
    canonical: "/",
    languages: { "es-PE": "/", "en-US": "/en" },
  },
};

export default function SpanishLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteLayout locale="es">{children}</SiteLayout>;
}
