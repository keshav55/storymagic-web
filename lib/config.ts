const DEFAULT_ATRIS_API_BASE_URL = "https://api.atris.ai/api";
const DEFAULT_APP_BASE_URL = "http://localhost:3000";

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

export function getAtrisApiBaseUrl(): string {
  const raw = process.env.ATRIS_API_BASE_URL ?? DEFAULT_ATRIS_API_BASE_URL;
  return trimTrailingSlash(raw);
}

export function getAppBaseUrl(): string | undefined {
  const raw =
    process.env.APP_BASE_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.NEXT_PUBLIC_FRONTEND_URL ??
    "";
  const trimmed = raw.trim();
  return trimmed ? trimTrailingSlash(trimmed) : undefined;
}

export function getDefaultAppBaseUrl(): string {
  return DEFAULT_APP_BASE_URL;
}

export function getAtrisAgentId(): string | undefined {
  return process.env.ATRIS_AGENT_ID?.trim() || undefined;
}

export function getAtrisServiceToken(): string | undefined {
  return process.env.ATRIS_SERVICE_TOKEN?.trim() || undefined;
}

export const APP_METADATA = {
  name: "StoryMagic",
  owner: "Atris OS",
};
