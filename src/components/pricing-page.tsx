import { WhatsAppLink } from "@/components/whatsapp-link";
import { packages, type Locale } from "@/lib/content";

export function PricingPage({ locale = "es" }: { locale?: Locale }) {
  const isEnglish = locale === "en";
  return (
    <>
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">{isEnglish ? "Packages" : "Planes"}</p>
          <h1 className="page-title">{isEnglish ? "A clear starting point. A scope built for you." : "Un punto de partida claro. Un alcance hecho para ti."}</h1>
          <p className="page-description">{isEnglish ? "Every business starts somewhere different. Request a quote based on your goals, content and integrations." : "Cada negocio parte de un lugar distinto. Solicita una cotización basada en tus objetivos, contenido e integraciones."}</p>
        </div>
      </header>
      <section className="container section">
        <div className="card-grid">
          {packages.map((item) => (
            <article className="content-card package-card" key={item.name}>
              <span className="package-label">{item.name}</span>
              <h3>{item.title[locale]}</h3>
              <p>{item.description[locale]}</p>
              <p className="price-note">{isEnglish ? "Request a quote" : "Solicitar cotización"}<small>{isEnglish ? "Final scope and pricing depend on requirements." : "El precio final depende del alcance acordado."}</small></p>
              <ul className="feature-list">
                {item.features[locale].map((feature) => <li key={feature}><span aria-hidden="true" className="check-mark">✓</span>{feature}</li>)}
              </ul>
              <WhatsAppLink locale={locale} message={`${isEnglish ? "Hello, I'd like a quote for " : "Hola, quisiera cotizar el paquete "}${item.name}.`}>
                {isEnglish ? "Request a quote" : "Consultar por WhatsApp"}
              </WhatsAppLink>
            </article>
          ))}
        </div>
      </section>
      <section className="container section-tight">
        <div className="detail-panel">
          <h2>{isEnglish ? "A note on scope" : "Sobre el alcance"}</h2>
          <p>{isEnglish ? "Hosting, domains, paid software, payment-provider fees, content production and ongoing support may require separate quotes. Availability and terms are confirmed during discovery." : "Hosting, dominios, software de pago, comisiones de pasarelas, producción de contenido y soporte continuo pueden requerir cotización adicional. La disponibilidad y condiciones se confirman durante el levantamiento."}</p>
        </div>
      </section>
    </>
  );
}
