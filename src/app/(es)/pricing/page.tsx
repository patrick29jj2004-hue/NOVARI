import type { Metadata } from "next";
import { PricingPage } from "@/components/pricing-page";

export const metadata: Metadata = {
  title: "Planes y cotizaciones",
  description: "Conoce las opciones de servicios digitales de FANAMI y solicita una cotización por alcance.",
  alternates: { canonical: "/pricing", languages: { "es-PE": "/pricing", "en-US": "/en/pricing" } },
};

export default function Page() {
  return <PricingPage />;
}
