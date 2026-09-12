/**
 * Basic string sanitization to prevent XSS / malicious injections.
 * Strips HTML angle brackets and trims whitespace.
 */
export function sanitizeString(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[<>]/g, "") // Strip HTML angle brackets
    .trim();
}
