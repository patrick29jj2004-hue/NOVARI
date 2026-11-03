import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDemoPage } from "@/components/project-demos";
import { projects } from "@/lib/content";

export const instant = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — demo conceptual`,
    description: project.description.es,
    alternates: {
      canonical: `/work/${slug}`,
      languages: { "es-PE": `/work/${slug}`, "en-US": `/en/work/${slug}` },
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!projects.some((project) => project.slug === slug)) notFound();
  return <ProjectDemoPage slug={slug} />;
}
