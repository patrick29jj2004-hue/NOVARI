import type { Metadata } from "next";
import { PortfolioPage } from "@/components/portfolio-page";

export const metadata: Metadata = {
  title: "Proyectos conceptuales",
  description: "Explora demos conceptuales e interactivas de restaurantes, beauty, moda y servicios empresariales.",
  alternates: { canonical: "/work", languages: { "es-PE": "/work", "en-US": "/en/work" } },
};

export default function Page() {
  return <PortfolioPage />;
}
