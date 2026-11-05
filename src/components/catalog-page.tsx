import { CatalogToolbar } from "@/components/catalog-toolbar";
import type { Locale } from "@/lib/content";

const catalogPages: Record<Locale, { kicker: string; title: string; copy: string; blocks: [string, string][] }[]> = {
  es: [
    { kicker: "01 · FANAMI CREATIVE STUDIO", title: "Create. Connect. Grow.", copy: "Experiencias digitales para negocios que quieren destacar, conectar y crecer online.", blocks: [["DISEÑO", "Interfaces claras y memorables."], ["DESARROLLO", "Tecnología pensada para el proyecto."]] },
    { kicker: "02 · QUIÉNES SOMOS", title: "Diseño con intención. Tecnología con propósito.", copy: "FANAMI es un estudio digital enfocado en diseño, desarrollo web y soluciones digitales para empresas. Diseñamos marcas y experiencias que comunican con claridad y ayudan a crecer.", blocks: [["ESTRATEGIA", "Entendemos el objetivo antes de elegir la solución."], ["COLABORACIÓN", "Comunicamos alcance, decisiones y siguientes pasos."]] },
    { kicker: "03 · LANDING PAGES", title: "Una primera impresión que abre conversaciones.", copy: "Páginas enfocadas en explicar una propuesta de valor y ayudar a las personas a dar el siguiente paso.", blocks: [["INCLUYE", "Diseño responsive · contenido · formulario o contacto."], ["IDEAL PARA", "Lanzamientos, campañas y servicios específicos."]] },
    { kicker: "04 · WEB BUSINESS", title: "Tu negocio, explicado con claridad.", copy: "Una presencia multipágina para presentar la empresa, sus servicios y los motivos para elegirla.", blocks: [["INCLUYE", "Arquitectura de contenido · catálogo · formularios."], ["PREPARACIÓN", "SEO inicial, analítica y estructura escalable."]] },
    { kicker: "05 · WEB PREMIUM", title: "Una experiencia digital a tu medida.", copy: "Diseño UI/UX personalizado y funcionalidades específicas definidas junto a tu equipo.", blocks: [["INCLUYE", "Experiencia a medida · APIs · analítica."], ["ALCANCE", "Se define según requerimientos e integraciones."]] },
    { kicker: "06 · E-COMMERCE", title: "Un camino claro para vender online.", copy: "Catálogo, carrito y gestión de pedidos en una experiencia adaptada a tu operación.", blocks: [["INCLUYE", "Productos · carrito · flujo de pedidos."], ["PAGOS", "Disponibilidad sujeta al país y al proveedor elegido."]] },
    { kicker: "07 · SERVICIOS COMPLEMENTARIOS", title: "Lo que completa tu presencia digital.", copy: "Servicios opcionales que pueden sumarse según las prioridades y capacidades del negocio.", blocks: [["MARCA Y VISIBILIDAD", "Branding · identidad visual · SEO avanzado."], ["OPERACIÓN", "Hosting · dominio · correo · automatizaciones."]] },
    { kicker: "08 · MANTENIMIENTO", title: "Tu sitio, acompañado en el tiempo.", copy: "Un plan acordado para mantener el sitio actualizado y en buen estado.", blocks: [["PUEDE INCLUIR", "Backups · actualizaciones · monitoreo · soporte."], ["ACUERDO", "Alcance y tiempos de respuesta definidos por contrato."]] },
    { kicker: "09 · PROCESO DE TRABAJO", title: "Un recorrido claro, de la idea al lanzamiento.", copy: "Discovery y estrategia · UI/UX · desarrollo · pruebas y optimización · lanzamiento y soporte.", blocks: [["01 — ENTENDER", "Objetivos, audiencia y prioridades."], ["02 — CONSTRUIR", "Diseño, desarrollo y revisión colaborativa."]] },
    { kicker: "10 · CONVERSEMOS", title: "¿Qué te gustaría hacer posible?", copy: "Cuéntanos sobre tu negocio y el reto que buscas resolver. La cotización se define luego de entender el alcance.", blocks: [["EMAIL", "Configura CONTACT_EMAIL para habilitar recepción."], ["WHATSAPP", "Configura NEXT_PUBLIC_WHATSAPP_NUMBER para habilitar el canal."]] },
  ],
  en: [
    { kicker: "01 · FANAMI CREATIVE STUDIO", title: "Create. Connect. Grow.", copy: "Digital experiences for businesses ready to stand out, connect and grow online.", blocks: [["DESIGN", "Clear, memorable interfaces."], ["DEVELOPMENT", "Technology shaped around the project."]] },
    { kicker: "02 · ABOUT", title: "Intentional design. Purposeful technology.", copy: "FANAMI is a digital studio focused on web design, development and digital solutions for businesses. We build brands and experiences that communicate clearly and help companies grow.", blocks: [["STRATEGY", "We understand the goal before choosing a solution."], ["PARTNERSHIP", "We communicate scope, decisions and next steps."]] },
    { kicker: "03 · LANDING PAGES", title: "A first impression that starts a conversation.", copy: "Focused pages that explain a value proposition and help people take the next step.", blocks: [["INCLUDES", "Responsive design · content · contact or form."], ["GOOD FOR", "Launches, campaigns and focused services."]] },
    { kicker: "04 · WEB BUSINESS", title: "Your business, explained with clarity.", copy: "A multi-page presence to introduce your company, services and reasons to choose you.", blocks: [["INCLUDES", "Content structure · catalog · forms."], ["FOUNDATIONS", "Initial SEO, analytics and scalable structure."]] },
    { kicker: "05 · WEB PREMIUM", title: "A digital experience shaped around you.", copy: "Custom UI/UX and tailored features scoped with your team.", blocks: [["INCLUDES", "Custom experience · APIs · analytics."], ["SCOPE", "Defined by requirements and integrations."]] },
    { kicker: "06 · E-COMMERCE", title: "A clearer path to online sales.", copy: "Catalog, cart and order management in an experience adapted to your operation.", blocks: [["INCLUDES", "Products · cart · order flow."], ["PAYMENTS", "Availability depends on country and selected provider."]] },
    { kicker: "07 · ADD-ON SERVICES", title: "The details that complete your digital presence.", copy: "Optional services can be added based on your business priorities and capabilities.", blocks: [["BRAND & VISIBILITY", "Branding · visual identity · advanced SEO."], ["OPERATIONS", "Hosting · domain · email · automation."]] },
    { kicker: "08 · MAINTENANCE", title: "Your website, supported over time.", copy: "An agreed plan to keep your site updated and in good shape.", blocks: [["MAY INCLUDE", "Backups · updates · monitoring · support."], ["AGREEMENT", "Scope and response times are defined by contract."]] },
    { kicker: "09 · OUR PROCESS", title: "A clear route from idea to launch.", copy: "Discovery and strategy · UI/UX · development · testing and optimization · launch and support.", blocks: [["01 — UNDERSTAND", "Goals, audience and priorities."], ["02 — BUILD", "Design, development and collaborative review."]] },
    { kicker: "10 · LET'S TALK", title: "What would you like to make possible?", copy: "Tell us about your business and the challenge you want to solve. Quotes follow a clear understanding of scope.", blocks: [["EMAIL", "Configure CONTACT_EMAIL to receive submissions."], ["WHATSAPP", "Configure NEXT_PUBLIC_WHATSAPP_NUMBER to enable this channel."]] },
  ],
};

export function CatalogPage({
  locale = "es",
  pdfAvailable = false,
}: {
  locale?: Locale;
  pdfAvailable?: boolean;
}) {
  const isEnglish = locale === "en";
  const pages = catalogPages[locale];
  return (
    <section className="catalog">
      <div className="container">
        <div className="catalog-toolbar">
          <div>
            <p className="eyebrow">{isEnglish ? "Commercial catalog" : "Catálogo comercial"}</p>
            <h1 className="page-title">{isEnglish ? "FANAMI in 10 pages." : "FANAMI en 10 páginas."}</h1>
          </div>
        </div>
        <div className="container-inner">
          <CatalogToolbar locale={locale} pdfAvailable={pdfAvailable} />
          <div className="catalog-pages">
            {pages.map((page, index) => (
              <article className={`catalog-sheet${index === 0 ? " catalog-cover" : ""}`} key={page.kicker}>
                <div>
                  <p className="catalog-number">{page.kicker}</p>
                  <h2>{page.title}</h2>
                  <p>{page.copy}</p>
                  <div className="catalog-blocks">
                    {page.blocks.map(([title, copy]) => (
                      <div className="catalog-block" key={title}>
                        <strong>{title}</strong><span>{copy}</span>
                      </div>
                    ))}
                  </div>
                  {index === 0 ? (
                    <div aria-hidden="true" className="catalog-mockups">
                      <div className="catalog-desktop"><span /><div>FANAMI<br /><small>CREATE · CONNECT · GROW</small></div></div>
                      <div className="catalog-phone"><span /><div>F</div></div>
                    </div>
                  ) : null}
                </div>
                <div className="footer-bottom">
                  <span>FANAMI · CREATIVE STUDIO</span>
                  <span>{String(index + 1).padStart(2, "0")} / 10</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
