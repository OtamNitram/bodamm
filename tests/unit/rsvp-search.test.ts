import { describe, it, expect } from "vitest";
import { normalizeForSearch, namesMatch } from "../../src/lib/rsvp-search";

describe("normalizeForSearch", () => {
  it("lowercases input", () => {
    expect(normalizeForSearch("MARTÍN")).toBe("martin");
  });

  it("strips accents from Spanish names", () => {
    expect(normalizeForSearch("Martín")).toBe("martin");
    expect(normalizeForSearch("María")).toBe("maria");
    expect(normalizeForSearch("José")).toBe("jose");
    expect(normalizeForSearch("Lucía")).toBe("lucia");
  });

  it("strips diacritics from ñ", () => {
    expect(normalizeForSearch("Muñoz")).toBe("munoz");
    expect(normalizeForSearch("Peña")).toBe("pena");
  });

  it("strips diacritics from ü", () => {
    expect(normalizeForSearch("Agüero")).toBe("aguero");
  });

  it("trims whitespace", () => {
    expect(normalizeForSearch("  Martín  ")).toBe("martin");
  });

  it("handles empty string", () => {
    expect(normalizeForSearch("")).toBe("");
  });

  it("handles strings without diacritics", () => {
    expect(normalizeForSearch("Juan")).toBe("juan");
  });
});

describe("namesMatch", () => {
  it("matches identical names", () => {
    expect(namesMatch("Martín", "Martín")).toBe(true);
  });

  it("matches case-insensitively", () => {
    expect(namesMatch("martín", "MARTÍN")).toBe(true);
  });

  it("matches accent-insensitively", () => {
    expect(namesMatch("Martin", "Martín")).toBe(true);
  });

  it("does not match different names", () => {
    expect(namesMatch("Martín", "Mariana")).toBe(false);
  });

  it("matches with leading/trailing whitespace", () => {
    expect(namesMatch(" Martín ", "Martín")).toBe(true);
  });
});
