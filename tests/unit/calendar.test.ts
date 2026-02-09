import { describe, it, expect } from "vitest";
import { generateICS } from "../../src/lib/calendar";

describe("generateICS", () => {
  it("returns a valid ICS string", () => {
    const ics = generateICS();
    expect(ics).toContain("BEGIN:VCALENDAR");
    expect(ics).toContain("END:VCALENDAR");
    expect(ics).toContain("BEGIN:VEVENT");
    expect(ics).toContain("END:VEVENT");
  });

  it("contains correct event start date", () => {
    const ics = generateICS();
    expect(ics).toContain("DTSTART:20260425T203000");
  });

  it("contains correct event end date", () => {
    const ics = generateICS();
    expect(ics).toContain("DTEND:20260426T040000");
  });

  it("contains correct event summary", () => {
    const ics = generateICS();
    expect(ics).toContain("SUMMARY:Casamiento Martín & Mariana");
  });

  it("contains correct location", () => {
    const ics = generateICS();
    expect(ics).toContain("LOCATION:Bodega Spinoglio");
  });

  it("contains VERSION:2.0", () => {
    const ics = generateICS();
    expect(ics).toContain("VERSION:2.0");
  });

  it("uses CRLF line endings", () => {
    const ics = generateICS();
    expect(ics).toContain("\r\n");
  });
});
