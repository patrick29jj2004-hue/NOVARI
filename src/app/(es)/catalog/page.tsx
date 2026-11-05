import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { CatalogPage } from "@/components/catalog-page";

export const metadata: Metadata = {
  title: "Catálogo comercial",
  description: "Catálogo FANAMI de servicios digitales, preparado para impresión en formato A4.",
  alternates: { canonical: "/catalog", languages: { "es-PE": "/catalog", "en-US": "/en/catalog" } },
};

export default function Page() {
  const pdfAvailable = existsSync(join(process.cwd(), "public", "catalog", "fanami-catalog-es.pdf"));
  return <CatalogPage pdfAvailable={pdfAvailable} />;
}
