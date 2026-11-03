import type { Metadata } from "next";
import { SiteLayout } from "@/components/site-layout";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "NOVARY — Digital Studio", template: "%s | NOVARY" },
  description:
    "We design and build digital experiences that help businesses stand out, connect with customers and grow online.",
  applicationName: "NOVARY Digital Studio",
  openGraph: {
    type: "website",
    siteName: "NOVARY Digital Studio",
    title: "NOVARY — Design. Develop. Grow.",
    description: "Web design and development for businesses ready for their next step.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVARY — Digital Studio",
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
