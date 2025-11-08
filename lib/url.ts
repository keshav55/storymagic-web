const DEFAULT_ALLOWED_SCHEMES = ["atris://", "storymagic://"];

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

export function resolveRequestOrigin(request: Request): string {
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = request.headers.get("host");

  if (forwardedProto && forwardedHost) {
    return trimTrailingSlash(`${forwardedProto}://${forwardedHost}`);
  }

  if (forwardedHost) {
    const proto = forwardedProto || "https";
    return trimTrailingSlash(`${proto}://${forwardedHost}`);
  }

  if (host) {
    const proto =
      forwardedProto ||
      (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https");
    return trimTrailingSlash(`${proto}://${host}`);
  }

  try {
    const url = new URL(request.url);
    return trimTrailingSlash(`${url.protocol}//${url.host}`);
  } catch {
    return "http://localhost:3000";
  }
}

type SanitizeOptions = {
  baseUrl?: string;
  fallbackPath?: string;
  allowCustomSchemes?: string[];
};

export function sanitizeRedirectTarget(
  target: string | null | undefined,
  options: SanitizeOptions = {},
): string {
  const fallbackPath = options.fallbackPath ?? "/dashboard";
  if (!target) return fallbackPath;

  const trimmed = target.trim();
  if (!trimmed) return fallbackPath;

  const lower = trimmed.toLowerCase();
  const allowedSchemes = (options.allowCustomSchemes ?? DEFAULT_ALLOWED_SCHEMES).map(
    (scheme) => scheme.toLowerCase(),
  );

  if (allowedSchemes.some((scheme) => scheme && lower.startsWith(scheme))) {
    return trimmed;
  }

  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) && !/^https?:\/\//i.test(trimmed)) {
    console.warn("[sanitizeRedirectTarget] Blocked unsupported redirect scheme:", trimmed);
    return fallbackPath;
  }

  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  if (trimmed.startsWith("?") || trimmed.startsWith("#")) {
    return `${fallbackPath}${trimmed}`;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const baseUrl = options.baseUrl ?? "";
      const base = baseUrl ? new URL(baseUrl) : null;
      const targetUrl = new URL(trimmed);

      if (base && targetUrl.host === base.host) {
        const relative = `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`;
        return relative || fallbackPath;
      }
    } catch (error) {
      console.warn("[sanitizeRedirectTarget] Failed to parse redirect URL:", trimmed, error);
      return fallbackPath;
    }
  }

  return `/${trimmed.replace(/^\/+/, "")}`;
}
