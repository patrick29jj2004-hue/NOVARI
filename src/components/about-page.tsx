import { SectionHeading } from "@/components/section-heading";
import { WhatsAppLink } from "@/components/whatsapp-link";
import type { Locale } from "@/lib/content";

export function AboutPage({ locale = "es" }: { locale?: Locale }) {
  const isEnglish = locale === "en";
  const values = isEnglish
    ? [
        ["Clarity", "Useful work begins with shared goals and honest scope."],
        ["Craft", "Each interaction should feel considered, not assembled."],
        ["Partnership", "Open communication keeps decisions and trade-offs visible."],
        ["Growth", "Digital products should be ready to learn and evolve."],
      ]
    : [
        ["Claridad", "El trabajo útil empieza con objetivos compartidos y alcances honestos."],
        ["Cuidado", "Cada interacción debe sentirse pensada, no ensamblada."],
        ["Colaboración", "La comunicación abierta hace visibles las decisiones y sus alternativas."],
        ["Evolución", "Los productos digitales deben estar listos para aprender y crecer."],
      ];

  return (
    <>
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">{isEnglish ? "About NOVARY" : "Sobre NOVARY"}</p>
          <h1 className="page-title">{isEnglish ? "Designing digital experiences with intent." : "Diseñamos experiencias digitales con intención."}</h1>
          <p className="page-description">{isEnglish ? "NOVARY is a digital studio focused on web design, development and digital solutions for businesses ready to grow their online presence." : "NOVARY es un estudio digital enfocado en diseño, desarrollo web y soluciones digitales para empresas que quieren fortalecer su presencia online."}</p>
        </div>
      </header>
      <section className="container section">
        <div className="split-layout">
          <SectionHeading
            eyebrow={isEnglish ? "Our point of view" : "Nuestra perspectiva"}
            title={isEnglish ? "Technology matters when it serves people." : "La tecnología importa cuando ayuda a las personas."}
            copy={isEnglish ? "We bring strategy, design and engineering together to build useful, clear and lasting digital experiences. Our work is shaped around each project's context." : "Unimos estrategia, diseño e ingeniería para construir experiencias digitales útiles, claras y sostenibles. El trabajo se adapta al contexto de cada proyecto."}
            locale={locale}
          />
          <div className="detail-panel">
            <p className="eyebrow">{isEnglish ? "Positioning" : "Posicionamiento"}</p>
            <h2>DESIGN.<br />DEVELOP.<br /><span className="text-mint">GROW.</span></h2>
            <p>{isEnglish ? "A practical, thoughtful approach to the digital work behind a growing business." : "Un enfoque práctico y cuidado para el trabajo digital que acompaña a un negocio en crecimiento."}</p>
          </div>
        </div>
      </section>
      <section className="container section-tight">
        <SectionHeading eyebrow={isEnglish ? "What guides us" : "Lo que nos guía"} title={isEnglish ? "Principles behind the pixels." : "Principios detrás de cada pantalla."} locale={locale} />
        <div className="card-grid">
          {values.map(([title, copy], index) => (
            <article className="content-card" key={title}>
              <span className="package-label">0{index + 1}</span><h3>{title}</h3><p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="container section">
        <div className="cta-panel">
          <p className="eyebrow">{isEnglish ? "Start a conversation" : "Empecemos una conversación"}</p>
          <h2 className="section-heading">{isEnglish ? "What would you like to make possible?" : "¿Qué te gustaría hacer posible?"}</h2>
          <p>{isEnglish ? "Tell us about your business and the challenge you want to solve." : "Cuéntanos sobre tu negocio y el reto que buscas resolver."}</p>
          <WhatsAppLink locale={locale} message={isEnglish ? "Hello, I'd like to discuss a project." : "Hola, quisiera conversar sobre un proyecto."}>
            {isEnglish ? "Get in touch" : "Contáctanos"}
          </WhatsAppLink>
        </div>
      </section>
    </>
  );
}
