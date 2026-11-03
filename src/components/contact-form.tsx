"use client";

import { useState } from "react";
import { contactSchema, type ContactFormValues } from "@/lib/validation";
import type { Locale } from "@/lib/content";

export function ContactForm({
  locale = "es",
  email,
}: {
  locale?: Locale;
  email: string;
}) {
  const isEnglish = locale === "en";
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setMessage("");
    setError(false);
    const formData = new FormData(formElement);
    const values = Object.fromEntries(formData.entries());
    const validated = contactSchema.safeParse(values);

    if (!validated.success) {
      setError(true);
      setMessage(
        isEnglish
          ? "Please review the required fields and enter a valid email."
          : "Revisa los campos obligatorios e ingresa un correo válido.",
      );
      return;
    }

    setSending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": locale,
        },
        body: JSON.stringify(validated.data satisfies ContactFormValues),
      });
      const result = (await response.json()) as { message?: string };
      setError(!response.ok);
      setMessage(
        result.message ??
          (isEnglish
            ? "The message could not be sent. Please try another contact option."
            : "No se pudo enviar el mensaje. Prueba otra forma de contacto."),
      );
      if (response.ok) formElement.reset();
    } catch {
      setError(true);
      setMessage(
        isEnglish
          ? "Network error. No message was sent; please try another contact option."
          : "Error de conexión. No se envió el mensaje; intenta otra forma de contacto.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="detail-panel" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="contact-name">{isEnglish ? "Name *" : "Nombre *"}</label>
          <input autoComplete="name" id="contact-name" maxLength={100} minLength={2} name="name" required />
        </div>
        <div className="field">
          <label htmlFor="contact-email">{isEnglish ? "Email *" : "Correo electrónico *"}</label>
          <input autoComplete="email" id="contact-email" maxLength={254} name="email" required type="email" />
        </div>
        <div className="field">
          <label htmlFor="contact-country">{isEnglish ? "Country *" : "País *"}</label>
          <input autoComplete="country-name" id="contact-country" maxLength={80} name="country" required />
        </div>
        <div className="field">
          <label htmlFor="contact-business">{isEnglish ? "Business name" : "Nombre del negocio"}</label>
          <input id="contact-business" maxLength={120} name="business" />
        </div>
        <div className="field">
          <label htmlFor="contact-project">{isEnglish ? "Project type *" : "Tipo de proyecto *"}</label>
          <select id="contact-project" name="projectType" required defaultValue="">
            <option disabled value="">{isEnglish ? "Choose an option" : "Selecciona una opción"}</option>
            {(isEnglish
              ? ["Website", "E-commerce", "Custom development", "Digital growth", "Maintenance", "Other"]
              : ["Sitio web", "E-commerce", "Desarrollo a medida", "Crecimiento digital", "Mantenimiento", "Otro"]
            ).map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="contact-budget">{isEnglish ? "Estimated budget (optional)" : "Presupuesto estimado (opcional)"}</label>
          <input
            id="contact-budget"
            maxLength={80}
            name="budget"
            placeholder={isEnglish ? "Optional range, if known" : "Rango opcional, si lo tienes"}
          />
        </div>
        <div className="field field-full">
          <label htmlFor="contact-message">{isEnglish ? "Tell us about your project *" : "Cuéntanos sobre tu proyecto *"}</label>
          <textarea id="contact-message" maxLength={4000} minLength={20} name="message" required />
        </div>
        <div aria-hidden="true" className="honeypot">
          <label htmlFor="contact-website">Leave this field empty</label>
          <input autoComplete="off" id="contact-website" name="website" tabIndex={-1} />
        </div>
      </div>
      <button className="button" disabled={sending} style={{ marginTop: 18 }} type="submit">
        {sending ? (isEnglish ? "Sending…" : "Enviando…") : (isEnglish ? "Send project details" : "Enviar detalles del proyecto")}
      </button>
      {message ? <p aria-live="polite" className={`form-message${error ? " form-error" : ""}`}>{message}</p> : null}
      <p className="form-help">
        {isEnglish
          ? "Your message is sent only when the email provider is configured and confirms acceptance."
          : "El mensaje solo se envía cuando el proveedor de correo está configurado y confirma su recepción."}
        {email ? <> {isEnglish ? "Or email us at" : "También puedes escribir a"} <a className="text-mint" href={`mailto:${email}`}>{email}</a>.</> : null}
      </p>
    </form>
  );
}
