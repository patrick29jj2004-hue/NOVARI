import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/section-heading";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { services, type Locale } from "@/lib/content";

function pathFor(locale: Locale, path: string) {
  return locale === "en" ? `/en${path}` : path;
}

export function ServicesPage({ locale = "es" }: { locale?: Locale }) {
  const isEnglish = locale === "en";
  const extras = isEnglish
    ? ["Branding & visual identity", "Advanced SEO", "Corporate email setup", "Hosting and domain coordination", "Workflow automation", "Third-party integrations"]
    : ["Branding e identidad visual", "SEO avanzado", "Configuración de correo corporativo", "Coordinación de hosting y dominio", "Automatizaciones", "Integraciones"];

  return (
    <>
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">{isEnglish ? "Services" : "Servicios"}</p>
          <h1 className="page-title">{isEnglish ? "Digital solutions, shaped around your business." : "Soluciones digitales diseñadas para tu negocio."}</h1>
          <p className="page-description">{isEnglish ? "Start with a clear need. We will shape the scope, technology and experience around it." : "Partimos de una necesidad concreta y definimos alcance, tecnología y experiencia en función de ella."}</p>
        </div>
      </header>
      <section className="container section">
        <div className="card-grid">
          {services.map((service) => (
            <article className="service-card" key={service.slug}>
              <span className="icon-box"><Icon name={service.icon} /></span>
              <h3>{service.title[locale]}</h3>
              <p>{service.short[locale]}</p>
              <ul className="feature-list">
                {service.items[locale].slice(0, 3).map((item) => <li key={item}><span aria-hidden="true" className="check-mark">✓</span>{item}</li>)}
              </ul>
              <Link className="arrow-link" href={pathFor(locale, `/services/${service.slug}`)}>
                {isEnglish ? "Discover the service" : "Descubre el servicio"} <Icon name="arrow" />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="container section-tight">
        <div className="detail-panel">
          <p className="eyebrow">{isEnglish ? "Add-ons" : "Servicios complementarios"}</p>
          <h2>{isEnglish ? "The details that complete your digital presence." : "Los detalles que completan tu presencia digital."}</h2>
          <ul className="feature-list">
            {extras.map((item) => <li key={item}><span aria-hidden="true" className="check-mark">+</span>{item}</li>)}
          </ul>
        </div>
      </section>
    </>
  );
}

export function ServiceDetailPage({
  slug,
  locale = "es",
}: {
  slug: string;
  locale?: Locale;
}) {
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const isEnglish = locale === "en";
  return (
    <>
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">{isEnglish ? "Our services" : "Nuestros servicios"}</p>
          <h1 className="page-title">{service.title[locale]}</h1>
          <p className="page-description">{service.description[locale]}</p>
        </div>
      </header>
      <section className="container section">
        <div className="detail-layout">
          <article className="detail-panel">
            <span className="icon-box"><Icon name={service.icon} /></span>
            <h2>{isEnglish ? "What this can include" : "Qué puede incluir"}</h2>
            <p>{service.short[locale]}</p>
            <ul className="feature-list">
              {service.items[locale].map((item) => <li key={item}><span aria-hidden="true" className="check-mark">✓</span>{item}</li>)}
            </ul>
            {slug === "ecommerce" ? (
              <p className="form-help">{isEnglish ? "Payment availability depends on your country, provider and project requirements." : "La disponibilidad de pagos depende del país, proveedor y necesidades del proyecto."}</p>
            ) : null}
            {slug === "digital-growth" ? (
              <p className="form-help">{isEnglish ? "We do not guarantee search rankings or commercial outcomes." : "No garantizamos posiciones en buscadores ni resultados comerciales."}</p>
            ) : null}
            {slug === "maintenance" ? (
              <p className="form-help">{isEnglish ? "Scope and response times are agreed in each contract." : "El alcance y los tiempos de respuesta se acuerdan en cada contrato."}</p>
            ) : null}
          </article>
          <aside className="detail-panel">
            <p className="eyebrow">{isEnglish ? "Let's discuss" : "Conversemos"}</p>
            <h2>{isEnglish ? "A solution that fits the real need." : "Una solución para la necesidad real."}</h2>
            <p>{isEnglish ? "Every project is scoped around its goals, content and integrations. There are no fixed prices until the scope is understood." : "Cada proyecto se define según sus objetivos, contenido e integraciones. Cotizamos cuando entendemos el alcance."}</p>
            <WhatsAppLink
              locale={locale}
              message={`${isEnglish ? "Hello, I am interested in " : "Hola, me interesa el servicio de "}${service.title[locale]}.`}
            >
              {isEnglish ? "Request a quote" : "Solicitar cotización"}
            </WhatsAppLink>
          </aside>
        </div>
        <p style={{ marginTop: 26 }}><Link className="arrow-link" href={pathFor(locale, "/services")}>{isEnglish ? "← All services" : "← Todos los servicios"}</Link></p>
      </section>
    </>
  );
}

export function ServicesCallout({ locale = "es" }: { locale?: Locale }) {
  const isEnglish = locale === "en";
  return (
    <div className="cta-panel">
      <SectionHeading
        eyebrow={isEnglish ? "Have a project in mind?" : "¿Tienes un proyecto en mente?"}
        title={isEnglish ? "Let's find the right scope." : "Definamos el alcance adecuado."}
        locale={locale}
      />
      <p>{isEnglish ? "We will start with the problem, not a package." : "Empezamos por entender el reto, no por venderte un paquete."}</p>
      <WhatsAppLink locale={locale} message={isEnglish ? "I'd like to discuss a project." : "Quisiera conversar sobre un proyecto."}>
        {isEnglish ? "Talk to NOVARY" : "Habla con NOVARY"}
      </WhatsAppLink>
    </div>
  );
}
