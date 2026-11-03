import type { Locale } from "@/lib/content";

export function SectionHeading({
  eyebrow,
  title,
  copy,
  locale = "es",
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  locale?: Locale;
}) {
  return (
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-heading">{title}</h2>
      {copy ? <p className="section-copy">{copy}</p> : null}
      <span className="sr-only">{locale === "en" ? "Section" : "Sección"}</span>
    </div>
  );
}
