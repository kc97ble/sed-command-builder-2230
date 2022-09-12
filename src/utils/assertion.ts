export function assert(condition: any, message?: string): asserts condition {
  if (!condition) {
    throw new Error(message || "assertion failed");
  }
}

export function safelyQuote(text: string) {
  return "'" + text.replace(/\'/g, "'\"'\"'") + "'";
}

export function ensurePositiveInteger(text: string | undefined): number {
  assert(text && /^[0-9]+$/.test(text), "must be integer");
  const number = parseInt(text, 10);
  assert(number > 0, "must be positive");
  return number;
}

export function ensureValidRegex(pattern: string | undefined): string {
  assert(
    pattern &&
      pattern.length > 2 &&
      pattern.startsWith("/") &&
      pattern.endsWith("/"),
    "must start and end with slashes"
  );
  return pattern;
}

export function ensureString(text: string | undefined): string {
  return text || "";
}

export function ensureNonEmptyString(text: string | undefined): string {
  assert(text, "must not be empty string");
  return text;
}
