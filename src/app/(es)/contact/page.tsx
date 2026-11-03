import type { Metadata } from "next";
import { ContactPage } from "@/components/contact-page";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Cuéntanos sobre tu negocio y el reto digital que quieres resolver.",
  alternates: { canonical: "/contact", languages: { "es-PE": "/contact", "en-US": "/en/contact" } },
};

export default function Page() {
  return <ContactPage email={siteConfig.contactEmail} />;
}
