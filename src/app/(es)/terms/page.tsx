import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Términos de uso del sitio web de FANAMI.",
  alternates: { canonical: "/terms", languages: { "es-PE": "/terms", "en-US": "/en/terms" } },
};

export default function Page() {
  return (
    <>
      <header className="page-hero"><div className="container"><p className="eyebrow">Legal · borrador</p><h1 className="page-title">Términos y condiciones</h1><p className="page-description">Documento inicial sujeto a revisión legal antes de su uso comercial.</p></div></header>
      <section className="container section"><article className="detail-panel">
        <h2>Uso del sitio</h2>
        <p>El contenido de FANAMI describe servicios digitales de forma general. El alcance, precio, cronograma, entregables, licencias y soporte de cualquier proyecto se establecerán en una propuesta y acuerdo separados.</p>
        <h2>Proyectos de demostración</h2>
        <p>MAREA, ATELIER, AUREN y VERTEX son conceptos creados para mostrar interacciones y capacidades. No representan negocios, clientes, reservas, compras ni resultados reales. Los productos y precios de AUREN son ilustrativos.</p>
        <h2>Disponibilidad</h2>
        <p>Las integraciones, pasarelas de pago, alojamiento y servicios externos dependen del proveedor, país y alcance confirmado. Ninguna posición en buscadores ni resultado comercial está garantizado.</p>
        <p className="form-help">Plantilla orientativa, no asesoría legal. Revisa y adapta estos términos para el negocio y la jurisdicción aplicable.</p>
      </article></section>
    </>
  );
}
