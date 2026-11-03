import Link from "next/link";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/section-heading";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { projects, services, type Locale } from "@/lib/content";

function localizedPath(locale: Locale, path: string) {
  return locale === "en" ? `/en${path === "/" ? "" : path}` : path;
}

export function HomePage({ locale = "es" }: { locale?: Locale }) {
  const isEnglish = locale === "en";
  const process = isEnglish
    ? [
        ["01", "Discovery & strategy", "We align on goals, audience and scope."],
        ["02", "UI/UX design", "We shape a clear, memorable experience."],
        ["03", "Development", "We build responsive, maintainable solutions."],
        ["04", "Testing & refinement", "We check quality across real devices."],
        ["05", "Launch & support", "We prepare a confident handoff."],
      ]
    : [
        ["01", "Estrategia", "Alineamos objetivos, audiencia y alcance."],
        ["02", "Diseño UI/UX", "Damos forma a una experiencia clara y memorable."],
        ["03", "Desarrollo", "Construimos soluciones responsive y mantenibles."],
        ["04", "Pruebas y mejora", "Revisamos calidad en distintos dispositivos."],
        ["05", "Lanzamiento", "Preparamos una entrega clara y ordenada."],
      ];

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{isEnglish ? "Digital studio · Peru & beyond" : "Estudio digital · Perú y el mundo"}</p>
            <h1 className="hero-title">
              {isEnglish ? (
                <>Your business deserves a <span className="text-mint">remarkable</span> digital experience.</>
              ) : (
                <>Tu negocio merece una experiencia digital <span className="text-mint">extraordinaria.</span></>
              )}
            </h1>
            <p className="hero-description">
              {isEnglish
                ? "We design and develop modern websites and digital solutions that help businesses stand out, connect with customers and grow online."
                : "Diseñamos y desarrollamos sitios web y soluciones digitales que ayudan a las empresas a destacar, conectar con sus clientes y crecer online."}
            </p>
            <div className="button-row">
              <Link className="button" href={localizedPath(locale, "/contact")}>
                {isEnglish ? "Start your project" : "Inicia tu proyecto"} <Icon name="arrow" />
              </Link>
              <Link className="button button-secondary" href={localizedPath(locale, "/work")}>
                {isEnglish ? "Explore our work" : "Explora los proyectos"}
              </Link>
            </div>
            <div className="hero-note">
              <span aria-hidden="true" className="status-dot" />
              {isEnglish ? "Strategy-first · Made for real businesses" : "Estrategia primero · Hecho para negocios reales"}
            </div>
          </div>
          <div aria-label={isEnglish ? "Website interface concept" : "Concepto de interfaz web"} className="hero-art" role="img">
            <div className="hero-orbit" />
            <div className="mockup-window">
              <div aria-hidden="true" className="mockup-toolbar"><span /><span /><span /></div>
              <div className="mockup-canvas">
                <div className="mockup-copy">
                  <small>MAREA · EXPERIENCIA DIGITAL</small>
                  <strong>Una marca.<br />Un universo.</strong>
                  <p>Experiencias diseñadas para conectar y crecer.</p>
                </div>
                <div aria-hidden="true" className="mockup-shape" />
              </div>
              <div className="mockup-footer"><span>Diseño con intención</span><span>↗</span></div>
            </div>
            <div className="floating-card floating-card-top"><strong>Diseño</strong><small>Con propósito</small></div>
            <div className="floating-card floating-card-bottom"><strong>Digital</strong><small>Hecho para crecer</small></div>
          </div>
        </div>
      </section>

      <section className="container section-tight" aria-label={isEnglish ? "Our principles" : "Nuestros principios"}>
        <div className="stat-grid">
          {(isEnglish
            ? [["01", "Business-minded design"], ["02", "Responsive by default"], ["03", "Clear collaboration"], ["04", "Built to evolve"]]
            : [["01", "Diseño para el negocio"], ["02", "Responsive desde el inicio"], ["03", "Comunicación clara"], ["04", "Listo para evolucionar"]]
          ).map(([number, text]) => (
            <div className="stat-item" key={number}><strong>{number}</strong><span>{text}</span></div>
          ))}
        </div>
      </section>

      <section className="container section" id="services">
        <SectionHeading
          eyebrow={isEnglish ? "What we do" : "Lo que hacemos"}
          title={isEnglish ? "Digital foundations for your next chapter." : "Bases digitales para tu siguiente etapa."}
          copy={isEnglish ? "From a focused landing page to custom digital products, we match the solution to the problem." : "Desde una landing page hasta un producto digital a medida, elegimos la solución según el reto."}
          locale={locale}
        />
        <div className="card-grid">
          {services.map((service) => (
            <article className="service-card" key={service.slug}>
              <span className="icon-box"><Icon name={service.icon} /></span>
              <h3>{service.title[locale]}</h3>
              <p>{service.short[locale]}</p>
              <Link className="arrow-link" href={localizedPath(locale, `/services/${service.slug}`)}>
                {isEnglish ? "Explore service" : "Conoce el servicio"} <Icon name="arrow" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="split-layout">
          <div>
            <SectionHeading
              eyebrow={isEnglish ? "Selected concepts" : "Proyectos conceptuales"}
              title={isEnglish ? "A portfolio of possibilities." : "Un portafolio de posibilidades."}
              copy={isEnglish ? "These four concept projects show how strategy, identity and interaction can work together. They are demonstrations, not client work." : "Estos cuatro proyectos conceptuales muestran cómo se combinan estrategia, identidad e interacción. Son demos, no trabajos de clientes."}
              locale={locale}
            />
            <Link className="arrow-link" href={localizedPath(locale, "/work")} style={{ marginTop: 24 }}>
              {isEnglish ? "View all demos" : "Ver todas las demos"} <Icon name="arrow" />
            </Link>
          </div>
          <div className="portfolio-grid">
            {projects.map((project) => (
              <Link
                className="project-card"
                href={localizedPath(locale, `/work/${project.slug}`)}
                key={project.slug}
                style={{ "--project-dark": project.dark, "--project-accent": project.accent, "--project-glow": project.glow } as React.CSSProperties}
              >
                <div className="project-art">
                  <span className="concept-badge">{isEnglish ? "CONCEPT PROJECT — DEMO" : "PROYECTO CONCEPTUAL — DEMO"}</span>
                  <div className="project-frame">
                    <div className="project-frame-top" />
                    <div className="project-frame-body">{project.name}</div>
                  </div>
                </div>
                <div className="project-info">
                  <h3>{project.name}</h3>
                  <p>{project.type[locale]} · {project.description[locale]}</p>
                  <ul className="tag-list">{project.technologies.slice(0, 2).map((tag) => <li key={tag}>{tag}</li>)}</ul>
                  <span className="arrow-link">{isEnglish ? "View demo" : "Ver demo"} <Icon name="arrow" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="split-layout">
          <div>
            <SectionHeading
              eyebrow={isEnglish ? "The NOVARY approach" : "El enfoque NOVARY"}
              title={isEnglish ? "Good work starts with good questions." : "El buen trabajo empieza con buenas preguntas."}
              copy={isEnglish ? "We focus on the decisions that make digital products useful: clear goals, thoughtful design, reliable engineering and open communication." : "Nos enfocamos en las decisiones que hacen útil un producto digital: objetivos claros, diseño pensado, ingeniería confiable y comunicación abierta."}
              locale={locale}
            />
          </div>
          <ul className="feature-list">
            {(isEnglish
              ? ["Business-oriented design", "Custom development, not one-size-fits-all", "Responsive, accessible experiences", "Scalable architecture", "Performance considered from the start", "Transparent scope and communication"]
              : ["Diseño orientado al negocio", "Desarrollo personalizado", "Experiencias responsive y accesibles", "Arquitectura escalable", "Rendimiento considerado desde el inicio", "Alcance y comunicación transparentes"]
            ).map((item) => <li key={item}><span aria-hidden="true" className="check-mark">✓</span>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="container section">
        <SectionHeading
          eyebrow={isEnglish ? "How we work" : "Cómo trabajamos"}
          title={isEnglish ? "A thoughtful process. Clear next steps." : "Un proceso pensado. Próximos pasos claros."}
          locale={locale}
        />
        <div className="process-grid">
          {process.map(([number, title, description]) => (
            <article className="process-step" key={number}>
              <span className="process-number">{number}</span><h3>{title}</h3><p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="cta-panel">
          <p className="eyebrow">{isEnglish ? "Your next step" : "Tu siguiente paso"}</p>
          <h2 className="section-heading">{isEnglish ? "Let's build something meaningful." : "Construyamos algo que importe."}</h2>
          <p>{isEnglish ? "Tell us what you are working on. We will help you find the right digital solution." : "Cuéntanos en qué estás trabajando. Te ayudamos a encontrar la solución digital adecuada."}</p>
          <WhatsAppLink
            locale={locale}
            message={isEnglish ? "Hello, I would like to discuss a digital project." : "Hola, quisiera conversar sobre un proyecto digital."}
          >
            {isEnglish ? "Start a conversation" : "Conversemos"}
          </WhatsAppLink>
        </div>
      </section>
    </>
  );
}
