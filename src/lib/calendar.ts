const EVENT = {
  summary: "Casamiento Martín & Mariana",
  location: "Bodega Spinoglio",
  description: "¡Nos casamos! Te esperamos para celebrar juntos.",
  dtstart: "20260425T203000",
  dtend: "20260426T040000",
} as const;

/**
 * Generates an ICS calendar string for the wedding event.
 */
export function generateICS(): string {
  const now = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//BodaMM//RSVP//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTART:${EVENT.dtstart}`,
    `DTEND:${EVENT.dtend}`,
    `DTSTAMP:${now}`,
    `UID:boda-mm-${Date.now()}@bodamm`,
    `SUMMARY:${EVENT.summary}`,
    `LOCATION:${EVENT.location}`,
    `DESCRIPTION:${EVENT.description}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/**
 * Triggers a browser download of the ICS file.
 */
export function downloadICS(): void {
  const ics = generateICS();
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "casamiento-martin-mariana.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
