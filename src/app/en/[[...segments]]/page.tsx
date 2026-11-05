import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutPage } from "@/components/about-page";
import { CatalogPage } from "@/components/catalog-page";
import { ContactPage } from "@/components/contact-page";
import { HomePage } from "@/components/home-page";
import { PortfolioPage } from "@/components/portfolio-page";
import { PricingPage } from "@/components/pricing-page";
import { ProjectDemoPage } from "@/components/project-demos";
import { ServiceDetailPage, ServicesPage } from "@/components/service-pages";
import { projects, services } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export const instant = false;

const pagePaths = [
  [],
  ["services"],
  ...services.map(({ slug }) => ["services", slug]),
  ["work"],
  ...projects.map(({ slug }) => ["work", slug]),
  ["pricing"],
  ["about"],
  ["contact"],
  ["catalog"],
  ["privacy"],
  ["terms"],
];

const pageDescriptions: Record<string, string> = {
  "/en": "We design and build digital experiences that help businesses stand out, connect with customers and grow online.",
  "/en/services": "Explore web design, e-commerce, custom development, digital growth and maintenance services.",
  "/en/work": "Explore interactive concept demos for restaurant, beauty, fashion and corporate websites.",
  "/en/pricing": "Explore digital service packages with project scope and pricing confirmed through a custom quote.",
  "/en/about": "Learn about FANAMI Creative Studio and its approach to digital design and development.",
  "/en/contact": "Contact FANAMI to discuss a website, e-commerce or custom software project.",
  "/en/catalog": "Browse FANAMI's digital services catalog and download the printable PDF.",
  "/en/privacy": "Read the FANAMI Creative Studio privacy policy and how contact form information is handled.",
  "/en/terms": "Review the terms for using the FANAMI Creative Studio website and concept demos.",
};

export function generateStaticParams() {
  return pagePaths.map((segments) => ({ segments }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ segments?: string[] }>;
}): Promise<Metadata> {
  const { segments = [] } = await params;
  const path = `/en${segments.length ? `/${segments.join("/")}` : ""}`;
  const service = segments[0] === "services"
    ? services.find((item) => item.slug === segments[1])
    : undefined;
  const project = segments[0] === "work"
    ? projects.find((item) => item.slug === segments[1])
    : undefined;
  return {
    title: project
      ? `${project.name} — concept demo`
      : service
        ? service.title.en
        : ({
            "/en": "Website design and development for businesses",
            "/en/services": "Digital services",
            "/en/work": "Concept projects",
            "/en/pricing": "Packages and quotes",
            "/en/about": "About FANAMI",
            "/en/contact": "Contact",
            "/en/catalog": "Commercial catalog",
            "/en/privacy": "Privacy policy",
            "/en/terms": "Terms and conditions",
          }[path] ?? "FANAMI Creative Studio"),
    description:
      project?.description.en ??
      service?.short.en ??
      pageDescriptions[path] ??
      "Explore FANAMI Creative Studio's web design, e-commerce and custom development services.",
    alternates: {
      canonical: path,
      languages: {
        "es-PE": path.replace(/^\/en(?=\/|$)/, "") || "/",
        "en-US": path,
      },
    },
    openGraph: { locale: "en_US" },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ segments?: string[] }>;
}) {
  const { segments = [] } = await params;
  const [section, slug] = segments;

  if (!segments.length) return <HomePage locale="en" />;
  if (section === "services" && segments.length === 1) return <ServicesPage locale="en" />;
  if (section === "services" && slug && segments.length === 2) {
    if (!services.some((service) => service.slug === slug)) notFound();
    return <ServiceDetailPage locale="en" slug={slug} />;
  }
  if (section === "work" && segments.length === 1) return <PortfolioPage locale="en" />;
  if (section === "work" && slug && segments.length === 2) {
    if (!projects.some((project) => project.slug === slug)) notFound();
    return <ProjectDemoPage locale="en" slug={slug} />;
  }
  if (segments.length === 1 && section === "pricing") return <PricingPage locale="en" />;
  if (segments.length === 1 && section === "about") return <AboutPage locale="en" />;
  if (segments.length === 1 && section === "contact") return <ContactPage email={siteConfig.contactEmail} locale="en" />;
  if (segments.length === 1 && section === "catalog") {
    const pdfAvailable = existsSync(join(process.cwd(), "public", "catalog", "fanami-catalog-en.pdf"));
    return <CatalogPage locale="en" pdfAvailable={pdfAvailable} />;
  }
  if (segments.length === 1 && section === "privacy") {
    return <LegalPage title="Privacy policy" />;
  }
  if (segments.length === 1 && section === "terms") {
    return <LegalPage title="Terms and conditions" />;
  }
  notFound();
}

function LegalPage({ title }: { title: "Privacy policy" | "Terms and conditions" }) {
  const privacy = title === "Privacy policy";
  return (
    <>
      <header className="page-hero"><div className="container"><p className="eyebrow">Legal · draft</p><h1 className="page-title">{title}</h1><p className="page-description">Initial information for review before the site is used in production.</p></div></header>
      <section className="container section"><article className="detail-panel">
        <h2>{privacy ? "Information received" : "Using this website"}</h2>
        <p>{privacy
          ? "This site does not use analytics or advertising cookies by default. If the contact form is configured, submitted details are sent to the configured email provider to answer the inquiry and are not stored in a site database."
          : "FANAMI service descriptions are general. Scope, pricing, schedule, deliverables, licenses and support for a project are defined in a separate proposal and agreement."}</p>
        <h2>{privacy ? "Third-party services" : "Concept demos"}</h2>
        <p>{privacy
          ? "Email delivery may use Resend or another provider configured by the site operator. Its terms and processing locations should be reviewed before production."
          : "MAREA, ATELIER, AUREN and VERTEX are concept projects only. They are not real businesses, clients, reservations, orders or measured outcomes. AUREN product examples and prices are illustrative."}</p>
        <p className="form-help">Draft template, not legal advice. Review and adapt it for the applicable jurisdiction.</p>
      </article></section>
    </>
  );
}
