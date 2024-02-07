/**
 * Correlation identifiers are minted in the browser and mirrored into a
 * cookie so that the CDN, the BFF and the analytics pipeline all agree on
 * the identifier for a single user journey.
 */
export function readCookie(name: string, source: string = document.cookie): string | null {
  const parts = source.split(';');
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.startsWith(name + '=')) {
      return decodeURIComponent(trimmed.substring(name.length + 1));
    }
  }
  return null;
}

export function writeCookie(name: string, value: string, maxAgeSeconds: number): void {
  document.cookie =
    name + '=' + encodeURIComponent(value) + ';path=/;max-age=' + maxAgeSeconds + ';samesite=lax';
}

export function mintCorrelationId(): string {
  const random = Math.random().toString(36).slice(2, 10);
  return 'c-' + Date.now().toString(36) + '-' + random;
}

export function ensureCorrelationId(cookieName: string): string {
  const existing = readCookie(cookieName);
  if (existing) {
    return existing;
  }
  const minted = mintCorrelationId();
  writeCookie(cookieName, minted, 60 * 60 * 8);
  return minted;
}
