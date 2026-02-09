/**
 * Normalizes a string for accent/case-insensitive comparison.
 * Strips diacritics (á→a, ñ→n, ü→u) and lowercases.
 */
export function normalizeForSearch(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Checks if two name strings match after normalization.
 */
export function namesMatch(a: string, b: string): boolean {
  return normalizeForSearch(a) === normalizeForSearch(b);
}
