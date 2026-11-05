import type { Metadata } from "next";
import { SiteLayout } from "@/components/site-layout";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "FANAMI — Creative Studio", template: "%s | FANAMI" },
  description:
    "We design and build digital experiences that help businesses stand out, connect with customers and grow online.",
  applicationName: "FANAMI Creative Studio",
  openGraph: {
    type: "website",
    siteName: "FANAMI Creative Studio",
    title: "FANAMI — Create. Connect. Grow.",
    description: "Web design and development for businesses ready for their next step.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FANAMI — Creative Studio",
    description: "Web design and development for businesses ready for their next step.",
  },
  alternates: {
    canonical: "/en",
    languages: { "es-PE": "/", "en-US": "/en" },
  },
};

export default function EnglishLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteLayout locale="en">{children}</SiteLayout>;
}
