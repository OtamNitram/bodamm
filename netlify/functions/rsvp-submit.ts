import type { Context } from "@netlify/functions";

const DEADLINE = new Date("2026-03-25T23:59:59-03:00");

interface SubmitMember {
  id: string;
  attending: boolean;
  hasDietaryRestriction: boolean;
  dietaryDescription: string | null;
}

interface SubmitBody {
  groupId: string;
  members: SubmitMember[];
}

function validateSubmission(body: SubmitBody): {
  valid: boolean;
  error?: string;
  fields?: string[];
} {
  if (!body.groupId) {
    return {
      valid: false,
      error: "groupId es obligatorio.",
      fields: ["groupId"],
    };
  }

  if (!body.members || body.members.length === 0) {
    return {
      valid: false,
      error: "Se requiere al menos un miembro.",
      fields: ["members"],
    };
  }

  for (const member of body.members) {
    if (!member.id) {
      return {
        valid: false,
        error: "Cada miembro debe tener un ID.",
        fields: ["members"],
      };
    }
    if (
      member.hasDietaryRestriction &&
      (!member.dietaryDescription || member.dietaryDescription.trim() === "")
    ) {
      return {
        valid: false,
        error: `Descripción de restricción alimentaria obligatoria para el miembro ${member.id}.`,
        fields: ["dietaryDescription"],
      };
    }
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
          "El plazo para confirmar asistencia ha vencido (25 de marzo de 2026).",
      }),
      { status: 410, headers: { "Content-Type": "application/json" } },
    );
  }

  let body: SubmitBody;
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

  const validation = validateSubmission(body);
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
          "Error al guardar confirmación. Por favor intentá de nuevo o contactanos por WhatsApp.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const response = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "submit",
        secret: rsvpSecret,
        groupId: body.groupId,
        members: body.members,
      }),
    });

    const data = await response.json();

    if (data.error) {
      const status =
        data.error === "group_not_found"
          ? 404
          : data.error === "unauthorized"
            ? 403
            : 500;
      return new Response(JSON.stringify(data), {
        status,
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
          "Error al guardar confirmación. Por favor intentá de nuevo o contactanos por WhatsApp.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
