import type { Context } from "@netlify/functions";

const DEADLINE = new Date("2026-03-25T23:59:59-03:00");

const VALID_ZONES = ["Montevideo", "Costa de Oro", "Otro"] as const;

const WHATSAPP_PATTERN = /^\+?[\d\s-]+$/;

interface TrasladoBody {
  zona: string;
  puntoDePartida: string;
  whatsapp: string;
  nombreCompleto: string;
  honeypot?: string;
}

function validateTrasladoSubmission(body: TrasladoBody): {
  valid: boolean;
  error?: string;
  fields?: string[];
} {
  const missing: string[] = [];

  if (
    !body.zona ||
    !VALID_ZONES.includes(body.zona as (typeof VALID_ZONES)[number])
  ) {
    missing.push("zona");
  }

  if (!body.puntoDePartida || body.puntoDePartida.trim() === "") {
    missing.push("puntoDePartida");
  }

  if (!body.whatsapp || body.whatsapp.trim() === "") {
    missing.push("whatsapp");
  } else if (!WHATSAPP_PATTERN.test(body.whatsapp.trim())) {
    return {
      valid: false,
      error:
        "Formato de WhatsApp inválido. Usá solo números, espacios, guiones y el prefijo + opcional.",
      fields: ["whatsapp"],
    };
  }

  if (!body.nombreCompleto || body.nombreCompleto.trim() === "") {
    missing.push("nombreCompleto");
  }

  if (missing.length > 0) {
    return {
      valid: false,
      error: "Todos los campos son obligatorios.",
      fields: missing,
    };
  }

  return { valid: true };
}

export default async (req: Request, _context: Context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Deadline check
  if (new Date() > DEADLINE) {
    return new Response(
      JSON.stringify({
        error: "deadline_passed",
        message:
          "El plazo para registrar datos de traslado ha vencido (25 de marzo de 2026).",
      }),
      { status: 410, headers: { "Content-Type": "application/json" } },
    );
  }

  let body: TrasladoBody;
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({
        error: "validation_error",
        message: "JSON inválido.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  // Honeypot check — return fake success to fool bots
  if (body.honeypot && body.honeypot.trim() !== "") {
    return new Response(
      JSON.stringify({
        success: true,
        submittedAt: new Date().toISOString(),
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  }

  const validation = validateTrasladoSubmission(body);
  if (!validation.valid) {
    return new Response(
      JSON.stringify({
        error: "validation_error",
        message: validation.error,
        fields: validation.fields,
      }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const appsScriptUrl = process.env.APPS_SCRIPT_URL;
  const rsvpSecret = process.env.RSVP_SECRET;

  if (!appsScriptUrl || !rsvpSecret) {
    console.error("Missing APPS_SCRIPT_URL or RSVP_SECRET env vars");
    return new Response(
      JSON.stringify({
        error: "internal_error",
        message:
          "Error al guardar datos de traslado. Por favor intentá de nuevo o contactanos por WhatsApp.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const payload = JSON.stringify({
      action: "traslado-submit",
      secret: rsvpSecret,
      zona: body.zona,
      puntoDePartida: body.puntoDePartida.trim(),
      whatsapp: body.whatsapp.trim(),
      nombreCompleto: body.nombreCompleto.trim(),
    });

    // Apps Script returns 302 redirect after processing POST.
    // Use redirect: "manual" to stop at the 302 — the function already executed.
    const response = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      redirect: "manual",
    });

    console.log("Apps Script response status:", response.status);

    // 302 = Apps Script processed the request and is redirecting to result
    if (response.status === 302) {
      // Follow the redirect to get the JSON result
      const location = response.headers.get("location");
      if (location) {
        try {
          const resultResponse = await fetch(location);
          const text = await resultResponse.text();
          const data = JSON.parse(text);
          if (data.error) {
            return new Response(JSON.stringify(data), {
              status: 500,
              headers: { "Content-Type": "application/json" },
            });
          }
          return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch {
          // Redirect worked but couldn't parse JSON — data was still saved
          return new Response(
            JSON.stringify({
              success: true,
              submittedAt: new Date().toISOString(),
            }),
            { status: 200, headers: { "Content-Type": "application/json" } },
          );
        }
      }
      // 302 without location — function executed, treat as success
      return new Response(
        JSON.stringify({
          success: true,
          submittedAt: new Date().toISOString(),
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }

    // Non-redirect response — try to parse JSON directly
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error(
        "Non-JSON response from Apps Script:",
        response.status,
        text.slice(0, 200),
      );
      return new Response(
        JSON.stringify({
          error: "internal_error",
          message:
            "Error al guardar datos de traslado. Por favor intentá de nuevo o contactanos por WhatsApp.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    if (data.error) {
      return new Response(JSON.stringify(data), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error calling Apps Script:", error);
    return new Response(
      JSON.stringify({
        error: "internal_error",
        message:
          "Error al guardar datos de traslado. Por favor intentá de nuevo o contactanos por WhatsApp.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
