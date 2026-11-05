import type { Metadata } from "next";
import { AboutPage } from "@/components/about-page";

export const metadata: Metadata = {
  title: "Sobre FANAMI",
  description: "Conoce el enfoque de FANAMI Creative Studio para diseño y desarrollo de experiencias digitales.",
  alternates: { canonical: "/about", languages: { "es-PE": "/about", "en-US": "/en/about" } },
};

export default function Page() {
  return <AboutPage />;
}
