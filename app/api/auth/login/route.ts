import { NextResponse } from "next/server";
import {
  getAppBaseUrl,
  getAtrisApiBaseUrl,
  getDefaultAppBaseUrl,
  APP_METADATA,
} from "@/lib/config";
import { resolveRequestOrigin, sanitizeRedirectTarget } from "@/lib/url";

type Provider = "google" | "github" | "apple";

const SUPPORTED_PROVIDERS: Provider[] = ["google", "github", "apple"];

const DEFAULT_DESTINATION = "/dashboard";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    provider?: string;
  } | null;

  const provider = (body?.provider || "").toLowerCase() as Provider;

  if (!SUPPORTED_PROVIDERS.includes(provider)) {
    return NextResponse.json(
      { detail: "Unsupported authentication provider requested." },
      { status: 400 }
    );
  }

  const origin = resolveAppBaseUrl(request);
  const backendBase = getAtrisApiBaseUrl();
  const destination = sanitizeRedirectTarget(DEFAULT_DESTINATION, {
    baseUrl: origin,
    fallbackPath: DEFAULT_DESTINATION,
  });

  const completeCallback = `${origin}/api/auth/callback/complete?destination=${encodeURIComponent(
    destination,
  )}`;
  const backendCallbackUrl = `${backendBase}/auth/callback`;
  const nextUrl = completeCallback;

  const payload = {
    provider,
    redirect_uri: backendCallbackUrl,
    next: nextUrl,
    response_mode: "redirect" as const,
    product: APP_METADATA.name,
  };

  const endpoint = `${getAtrisApiBaseUrl()}/auth/login`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    const detail =
      (json as { detail?: string }).detail ??
      "Atris rejected the authentication request.";
    return NextResponse.json({ detail }, { status: response.status });
  }

  return NextResponse.json(json);
}

function resolveAppBaseUrl(request: Request): string {
  const configured = getAppBaseUrl();
  if (configured) {
    return configured;
  }

  try {
    return resolveRequestOrigin(request);
  } catch (error) {
    console.warn("[auth/login] Failed to resolve app base URL from request", error);
    return getDefaultAppBaseUrl();
  }
}
