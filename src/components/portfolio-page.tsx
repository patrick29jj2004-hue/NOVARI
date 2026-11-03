import Link from "next/link";
import { Icon } from "@/components/icon";
import { projects, type Locale } from "@/lib/content";

export function PortfolioPage({ locale = "es" }: { locale?: Locale }) {
  const isEnglish = locale === "en";
  const base = isEnglish ? "/en/work" : "/work";
  return (
    <>
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">{isEnglish ? "Concept portfolio" : "Portafolio conceptual"}</p>
          <h1 className="page-title">{isEnglish ? "Four ideas. Four distinct digital worlds." : "Cuatro ideas. Cuatro mundos digitales."}</h1>
          <p className="page-description">{isEnglish ? "Explore interactive concept projects created to demonstrate design and development capabilities. These are not client projects." : "Explora proyectos conceptuales e interactivos creados para mostrar capacidades de diseño y desarrollo. No son proyectos de clientes."}</p>
        </div>
      </header>
      <section className="container section">
        <div className="portfolio-grid">
          {projects.map((project) => (
            <Link
              className="project-card"
              href={`${base}/${project.slug}`}
              key={project.slug}
              style={{ "--project-dark": project.dark, "--project-accent": project.accent, "--project-glow": project.glow } as React.CSSProperties}
            >
              <div className="project-art">
                <span className="concept-badge">{isEnglish ? "CONCEPT PROJECT — DEMO" : "PROYECTO CONCEPTUAL — DEMO"}</span>
                <div className="project-frame"><div className="project-frame-top" /><div className="project-frame-body">{project.name}</div></div>
              </div>
              <div className="project-info">
                <h3>{project.name}</h3>
                <p>{project.type[locale]} · {project.description[locale]}</p>
                <ul className="tag-list">{project.technologies.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                <span className="arrow-link">{isEnglish ? "Explore demo" : "Explorar demo"} <Icon name="arrow" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
