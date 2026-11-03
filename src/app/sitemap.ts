import type { MetadataRoute } from "next";
import { projects, services } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/services",
    "/work",
    "/pricing",
    "/about",
    "/contact",
    "/catalog",
    "/privacy",
    "/terms",
    ...services.map(({ slug }) => `/services/${slug}`),
    ...projects.map(({ slug }) => `/work/${slug}`),
    "/en",
    "/en/services",
    "/en/work",
    "/en/pricing",
    "/en/about",
    "/en/contact",
    "/en/catalog",
    "/en/privacy",
    "/en/terms",
    ...services.map(({ slug }) => `/en/services/${slug}`),
    ...projects.map(({ slug }) => `/en/work/${slug}`),
  ];
  return pages.map((path) => {
    const english = path.startsWith("/en");
    const spanishPath = english ? path.replace(/^\/en(?=\/|$)/, "") || "/" : path || "/";
    const englishPath = english ? path : `/en${path === "" ? "" : path}`;
    return {
      url: new URL(path || "/", siteConfig.url).toString(),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" || path === "/en" ? 1 : 0.7,
      alternates: {
        languages: {
          "es-PE": new URL(spanishPath, siteConfig.url).toString(),
          "en-US": new URL(englishPath, siteConfig.url).toString(),
        },
      },
    };
  });
}
