import { ContactForm } from "@/components/contact-form";
import { WhatsAppLink } from "@/components/whatsapp-link";
import type { Locale } from "@/lib/content";

export function ContactPage({
  locale = "es",
  email = "",
}: {
  locale?: Locale;
  email?: string;
}) {
  const isEnglish = locale === "en";
  return (
    <>
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">{isEnglish ? "Contact" : "Contacto"}</p>
          <h1 className="page-title">{isEnglish ? "Tell us what you want to make possible." : "Cuéntanos qué quieres hacer posible."}</h1>
          <p className="page-description">{isEnglish ? "Share a little context. We will use it to understand the challenge and suggest a useful next step." : "Comparte un poco de contexto. Nos ayudará a entender el reto y proponer un siguiente paso útil."}</p>
        </div>
      </header>
      <section className="container section">
        <div className="detail-layout">
          <ContactForm email={email} locale={locale} />
          <aside className="detail-panel">
            <p className="eyebrow">{isEnglish ? "Prefer a quick conversation?" : "¿Prefieres conversar?"}</p>
            <h2>{isEnglish ? "Choose the channel that works for you." : "Elige el canal que te resulte más cómodo."}</h2>
            <p>{isEnglish ? "WhatsApp opens only when a number is configured. Otherwise, you can use the contact form or the configured email address." : "WhatsApp se abre solo si se configuró un número. Si no, puedes usar el formulario o el correo configurado."}</p>
            <WhatsAppLink locale={locale} message={isEnglish ? "Hello, I would like to discuss a digital project." : "Hola, quisiera conversar sobre un proyecto digital."}>
              {isEnglish ? "Continue to contact options" : "Ver opciones de contacto"}
            </WhatsAppLink>
            <div className="notice" style={{ marginTop: 20 }}>
              {isEnglish
                ? "No customer details are stored in this site. Email delivery requires the configured provider."
                : "Este sitio no almacena datos de clientes. El envío por correo requiere configurar el proveedor."}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
