import { Inter, Space_Grotesk } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Locale } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export function SiteLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const english = locale === "en";
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FANAMI Creative Studio",
    url: siteConfig.url,
    description: english
      ? "Digital studio focused on web design and development."
      : "Estudio digital especializado en diseño y desarrollo web.",
  }).replace(/</g, "\\u003c");

  return (
    <html
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      data-scroll-behavior="smooth"
      lang={locale}
    >
      <body>
        <a className="skip-link" href="#main-content">
          {english ? "Skip to content" : "Saltar al contenido"}
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter
          contactEmail={siteConfig.contactEmail}
          social={siteConfig.social}
          whatsappNumber={siteConfig.whatsappNumber}
          year={Number(process.env.NEXT_PUBLIC_COPYRIGHT_YEAR)}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schema }}
        />
      </body>
    </html>
  );
}
