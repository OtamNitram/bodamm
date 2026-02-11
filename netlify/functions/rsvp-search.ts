import type { Context } from "@netlify/functions";
import { normalizeForSearch } from "../../src/lib/rsvp-search";

const DEADLINE = new Date("2026-03-25T23:59:59-03:00");

export default async (req: Request, _context: Context) => {
  if (req.method !== "GET") {
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
          "El plazo para confirmar asistencia ha vencido (25 de marzo de 2026).",
      }),
      { status: 410, headers: { "Content-Type": "application/json" } },
    );
  }

  const url = new URL(req.url);
  const firstName = url.searchParams.get("firstName");
  const lastName = url.searchParams.get("lastName");

  if (!firstName || !lastName) {
    return new Response(
      JSON.stringify({ error: "firstName and lastName are required" }),
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
          "Error al buscar invitado. Por favor intentá de nuevo o contactanos por WhatsApp.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const params = new URLSearchParams({
      action: "search",
      firstName: normalizeForSearch(firstName),
      lastName: normalizeForSearch(lastName),
      secret: rsvpSecret,
    });

    const targetUrl = `${appsScriptUrl}?${params.toString()}`;
    console.log(
      "[rsvp-search] Calling Apps Script:",
      targetUrl.replace(rsvpSecret, "***"),
    );

    const response = await fetch(targetUrl, {
      method: "GET",
      redirect: "follow",
    });

    console.log("[rsvp-search] Apps Script response status:", response.status);
    console.log(
      "[rsvp-search] Apps Script response content-type:",
      response.headers.get("content-type"),
    );

    const text = await response.text();
    console.log(
      "[rsvp-search] Apps Script response body (first 500 chars):",
      text.substring(0, 500),
    );

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error(
        "[rsvp-search] Failed to parse JSON from Apps Script. Raw response:",
        text.substring(0, 1000),
      );
      return new Response(
        JSON.stringify({
          error: "internal_error",
          message:
            "Respuesta inválida del servidor. Verificá que el Apps Script esté correctamente deployado.",
        }),
        { status: 502, headers: { "Content-Type": "application/json" } },
      );
    }

    if (data.error) {
      console.error(
        "[rsvp-search] Apps Script returned error:",
        JSON.stringify(data),
      );
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
    console.error("[rsvp-search] Error calling Apps Script:", error);
    return new Response(
      JSON.stringify({
        error: "internal_error",
        message:
          "Error al buscar invitado. Por favor intentá de nuevo o contactanos por WhatsApp.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
