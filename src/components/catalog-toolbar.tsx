"use client";

import Link from "next/link";
import type { Locale } from "@/lib/content";

export function CatalogToolbar({
  locale,
  pdfAvailable,
}: {
  locale: Locale;
  pdfAvailable: boolean;
}) {
  const isEnglish = locale === "en";
  const pdfPath = `/catalog/fanami-catalog-${locale}.pdf`;
  return (
    <div className="catalog-toolbar">
      <p className="form-help">
        {isEnglish
          ? "10-page, A4-ready concept catalog. Use print-to-PDF if the generated file is not available yet."
          : "Catálogo conceptual de 10 páginas, preparado para A4. Usa imprimir a PDF si el archivo aún no está generado."}
      </p>
      <div className="button-row">
        <button className="button button-secondary" onClick={() => window.print()} type="button">
          {isEnglish ? "Print / save as PDF" : "Imprimir / guardar como PDF"}
        </button>
        {pdfAvailable ? (
          <a className="button" download href={pdfPath}>
            {isEnglish ? "Download PDF" : "Descargar PDF"}
          </a>
        ) : null}
        <Link className="button button-secondary" href={isEnglish ? "/catalog" : "/en/catalog"}>
          {isEnglish ? "Ver en español" : "View in English"}
        </Link>
      </div>
    </div>
  );
}
