import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Información sobre el tratamiento de datos en el sitio web de FANAMI.",
  alternates: { canonical: "/privacy", languages: { "es-PE": "/privacy", "en-US": "/en/privacy" } },
};

export default function Page() {
  return (
    <>
      <header className="page-hero"><div className="container"><p className="eyebrow">Legal · borrador</p><h1 className="page-title">Política de privacidad</h1><p className="page-description">Documento informativo inicial. Debe revisarse con asesoría legal antes de operar el sitio en producción.</p></div></header>
      <section className="container section"><article className="detail-panel">
        <h2>Datos recibidos</h2>
        <p>Este sitio no usa analítica ni cookies publicitarias por defecto. Si configuras el formulario de contacto, los datos que la persona envía (nombre, correo, país, negocio, tipo de proyecto, presupuesto opcional y mensaje) se transmiten al proveedor de correo configurado para responder la consulta. No se guardan en una base de datos de este sitio.</p>
        <h2>Retención y solicitudes</h2>
        <p>El tiempo de conservación dependerá de la cuenta del proveedor configurado y de las comunicaciones relacionadas. Para solicitar acceso, corrección o eliminación, debe habilitarse y publicarse un canal de contacto válido antes del lanzamiento.</p>
        <h2>Servicios de terceros</h2>
        <p>El envío puede utilizar Resend u otro proveedor configurado por quien opera el sitio. Sus condiciones y ubicación de procesamiento deben revisarse antes de producción.</p>
        <p className="form-help">Plantilla orientativa, no asesoría legal. Completa y verifica esta política para la jurisdicción aplicable.</p>
      </article></section>
    </>
  );
}
