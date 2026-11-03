"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/content";

type FooterProps = {
  year: number;
  contactEmail: string;
  whatsappNumber: string;
  social: { instagram: string; tiktok: string; linkedin: string };
};

function contactHref(number: string, email: string, locale: Locale) {
  const cleaned = number.replace(/[^\d]/g, "");
  if (cleaned) {
    const text = locale === "es"
      ? "Hola, quiero iniciar un proyecto digital."
      : "Hello, I would like to start a digital project.";
    return `https://wa.me/${cleaned}?text=${encodeURIComponent(text)}`;
  }
  if (email) return `mailto:${email}`;
  return locale === "es" ? "/contact" : "/en/contact";
}

export function SiteFooter({ year, contactEmail, whatsappNumber, social }: FooterProps) {
  const pathname = usePathname();
  const locale: Locale = pathname === "/en" || pathname.startsWith("/en/")
    ? "en"
    : "es";
  const english = locale === "en";
  const prefix = english ? "/en" : "";
  const socials = [
    ["Instagram", social.instagram],
    ["TikTok", social.tiktok],
    ["LinkedIn", social.linkedin],
  ] as const;
  const contactUrl = contactHref(whatsappNumber, contactEmail, locale);
  const externalContact = Boolean(whatsappNumber);

  return (
    <>
      <footer className="site-footer">
        <div className="container footer-main">
          <div className="footer-about">
            <Link aria-label="NOVARY, inicio" className="brand" href={prefix || "/"}>
              <span aria-hidden="true" className="brand-mark">N</span>
              <span>NOVARY<small>DIGITAL STUDIO</small></span>
            </Link>
            <p>
              {english
                ? "We design and build digital experiences that help businesses stand out, connect with customers and grow online."
                : "Diseñamos y desarrollamos experiencias digitales que ayudan a las empresas a destacar, conectar y crecer online."}
            </p>
            <p className="text-mint">DESIGN. DEVELOP. GROW.</p>
          </div>
          <div className="footer-column">
            <h3>{english ? "Explore" : "Explora"}</h3>
            <Link href={`${prefix}/services`}>{english ? "Services" : "Servicios"}</Link>
            <Link href={`${prefix}/work`}>{english ? "Our work" : "Proyectos"}</Link>
            <Link href={`${prefix}/pricing`}>{english ? "Pricing" : "Planes"}</Link>
            <Link href={`${prefix}/about`}>{english ? "About" : "Nosotros"}</Link>
            <Link href={`${prefix}/catalog`}>{english ? "Catalog" : "Catálogo"}</Link>
          </div>
          <div className="footer-column">
            <h3>{english ? "Services" : "Servicios"}</h3>
            <Link href={`${prefix}/services/web-design`}>{english ? "Web design" : "Diseño web"}</Link>
            <Link href={`${prefix}/services/ecommerce`}>E-commerce</Link>
            <Link href={`${prefix}/services/custom-development`}>{english ? "Custom development" : "Desarrollo a medida"}</Link>
            <Link href={`${prefix}/services/maintenance`}>{english ? "Maintenance" : "Mantenimiento"}</Link>
          </div>
          <div className="footer-column">
            <h3>{english ? "Contact" : "Contacto"}</h3>
            {contactEmail ? <a href={`mailto:${contactEmail}`}>{contactEmail}</a> : <span>{english ? "Email not configured" : "Email configurable"}</span>}
            <a href={contactUrl} rel={externalContact ? "noopener noreferrer" : undefined} target={externalContact ? "_blank" : undefined}>
              {english ? "WhatsApp / contact" : "WhatsApp / contacto"}
            </a>
            {socials.map(([network, url]) =>
              url ? (
                <a href={url} key={network} rel="noreferrer" target="_blank">{network}</a>
              ) : (
                <span key={network}>{network} — {english ? "URL pending" : "URL pendiente"}</span>
              ),
            )}
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {year} NOVARY Digital Studio.{" "}
            {english ? "All rights reserved." : "Todos los derechos reservados."}
          </span>
          <span>
            <Link href={`${prefix}/privacy`}>{english ? "Privacy" : "Privacidad"}</Link> ·{" "}
            <Link href={`${prefix}/terms`}>{english ? "Terms" : "Términos"}</Link>
          </span>
        </div>
      </footer>
      <a
        aria-label={english ? "Contact NOVARY" : "Contactar a NOVARY"}
        className="floating-contact"
        href={contactUrl}
        rel={externalContact ? "noopener noreferrer" : undefined}
        target={externalContact ? "_blank" : undefined}
      >
        <span aria-hidden="true">↗</span>
      </a>
    </>
  );
}
