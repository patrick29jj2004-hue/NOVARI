import { contactSchema } from "@/lib/validation";

type RateWindow = { count: number; resetAt: number };
const requests = new Map<string, RateWindow>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 3;
const MAX_TRACKED_CLIENTS = 1000;
const MAX_BODY_BYTES = 32_000;

async function readBodyWithinLimit(request: Request): Promise<Uint8Array | null> {
  const reader = request.body?.getReader();
  if (!reader) return new Uint8Array();

  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    totalBytes += value.byteLength;
    if (totalBytes > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return body;
}

function rateLimitResponse(retryAfter: number, english: boolean) {
  return Response.json(
    {
      message: english
        ? "Too many attempts. Please wait a few minutes before trying again."
        : "Demasiados intentos. Espera unos minutos antes de volver a enviar.",
    },
    { status: 429, headers: { "Retry-After": String(retryAfter) } },
  );
}

export async function POST(request: Request) {
  const english = request.headers.get("accept-language")?.toLowerCase().startsWith("en") ?? false;
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return Response.json(
      { message: english ? "The message exceeds the allowed size." : "El mensaje supera el tamaño permitido." },
      { status: 413 },
    );
  }

  const bodyBytes = await readBodyWithinLimit(request);
  if (!bodyBytes) {
    return Response.json(
      { message: english ? "The message exceeds the allowed size." : "El mensaje supera el tamaño permitido." },
      { status: 413 },
    );
  }

  let body: unknown;
  try {
    body = JSON.parse(new TextDecoder().decode(bodyBytes));
  } catch (error) {
    if (error instanceof SyntaxError) {
      return Response.json(
        { message: english ? "The request format is invalid." : "El formato de la solicitud no es válido." },
        { status: 400 },
      );
    }
    throw error;
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      {
        message: english
          ? "Please review the details; some fields are invalid or incomplete."
          : "Revisa los datos: algunos campos son inválidos o están incompletos.",
      },
      { status: 400 },
    );
  }
  if (parsed.data.website) {
    return Response.json(
      { message: english ? "The request could not be processed." : "No se pudo procesar la solicitud." },
      { status: 400 },
    );
  }

  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const clientKey = request.headers.get("x-real-ip") || forwardedFor || "unknown";
  const now = Date.now();
  const current = requests.get(clientKey);
  if (current && current.resetAt > now && current.count >= MAX_REQUESTS) {
    return rateLimitResponse(Math.ceil((current.resetAt - now) / 1000), english);
  }

  for (const [key, window] of requests) {
    if (window.resetAt <= now) requests.delete(key);
  }
  if (!current || current.resetAt <= now) {
    if (requests.size >= MAX_TRACKED_CLIENTS) {
      const oldest = requests.keys().next().value;
      if (oldest) requests.delete(oldest);
    }
    requests.set(clientKey, { count: 1, resetAt: now + WINDOW_MS });
  } else {
    requests.set(clientKey, { count: current.count + 1, resetAt: current.resetAt });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_EMAIL;
  const sender = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !recipient || !sender) {
    return Response.json(
      {
        message: english
          ? "Email delivery is not configured. Use the email or WhatsApp contact option on this page."
          : "El envío no está configurado. Usa el correo o WhatsApp indicado en esta página.",
      },
      { status: 503 },
    );
  }

  const { name, email, country, business, projectType, budget, message } = parsed.data;
  const text = [
    `Nombre: ${name}`,
    `Correo: ${email}`,
    `País: ${country}`,
    `Negocio: ${business || "No indicado"}`,
    `Proyecto: ${projectType}`,
    `Presupuesto: ${budget || "No indicado"}`,
    "",
    message,
  ].join("\n");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: sender,
      to: [recipient],
      reply_to: email,
      subject: "Nueva consulta desde el sitio FANAMI",
      text,
    }),
  });

  if (!response.ok) {
    console.error("FANAMI contact provider rejected a message", { status: response.status });
    return Response.json(
      {
        message: english
          ? "The provider did not accept the message. Delivery was not confirmed; try again later."
          : "El proveedor no aceptó el mensaje. No se confirmó el envío; inténtalo más tarde.",
      },
      { status: 502 },
    );
  }

  return Response.json({
    message: english
      ? "Message sent. Thanks for telling us about your project."
      : "Mensaje enviado. Gracias por contarnos sobre tu proyecto.",
  });
}
