import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/service-pages";
import { services } from "@/lib/content";

export const instant = false;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  return {
    title: service.title.es,
    description: service.short.es,
    alternates: {
      canonical: `/services/${slug}`,
      languages: { "es-PE": `/services/${slug}`, "en-US": `/en/services/${slug}` },
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!services.some((service) => service.slug === slug)) notFound();
  return <ServiceDetailPage slug={slug} />;
}
