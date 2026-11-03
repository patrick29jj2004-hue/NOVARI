import type { Locale } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export function WhatsAppLink({
  locale = "es",
  message,
  children,
  className = "button",
}: {
  locale?: Locale;
  message: string;
  children: React.ReactNode;
  className?: string;
}) {
  const whatsapp = siteConfig.whatsappNumber.replace(/[^\d]/g, "");
  const href = whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`
    : siteConfig.contactEmail
      ? `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(message)}`
      : locale === "es"
        ? "/contact"
        : "/en/contact";

  return (
    <a
      className={className}
      href={href}
      rel={whatsapp ? "noopener noreferrer" : undefined}
      target={whatsapp ? "_blank" : undefined}
    >
      {children}
    </a>
  );
}
