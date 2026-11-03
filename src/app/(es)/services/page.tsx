import type { Metadata } from "next";
import { ServicesPage } from "@/components/service-pages";

export const metadata: Metadata = {
  title: "Servicios de diseño y desarrollo web",
  description: "Diseño web, e-commerce, desarrollo a medida, crecimiento digital y mantenimiento.",
  alternates: { canonical: "/services", languages: { "es-PE": "/services", "en-US": "/en/services" } },
};

export default function Page() {
  return <ServicesPage />;
}
