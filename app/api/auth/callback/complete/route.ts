import { NextRequest, NextResponse } from "next/server";
import { resolveRequestOrigin, sanitizeRedirectTarget } from "@/lib/url";

const ONE_WEEK_SECONDS = 60 * 60 * 24 * 7;

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const token = url.searchParams.get("token");
  const refreshToken = url.searchParams.get("refresh_token");
  const provider = url.searchParams.get("provider") ?? undefined;
  const destinationParam = url.searchParams.get("destination");

  if (!token) {
    const origin = resolveRequestOrigin(request);
    const location = `${origin}/auth/login?error=missing_token`;
    return NextResponse.redirect(location);
  }

  const origin = resolveRequestOrigin(request);
  const destination = sanitizeRedirectTarget(destinationParam, {
    baseUrl: origin,
    fallbackPath: "/dashboard",
  });
  const redirectUrl = destination.startsWith("http")
    ? destination
    : `${origin}${destination}`;

  const response = NextResponse.redirect(redirectUrl);
  const secure = process.env.NODE_ENV === "production";

  response.cookies.set({
    name: "storymagic_token",
    value: token,
    httpOnly: true,
    secure,
    sameSite: "lax",
    maxAge: ONE_WEEK_SECONDS,
    path: "/",
  });

  if (refreshToken) {
    response.cookies.set({
      name: "storymagic_refresh_token",
      value: refreshToken,
      httpOnly: true,
      secure,
      sameSite: "lax",
      maxAge: ONE_WEEK_SECONDS,
      path: "/",
    });
  }

  if (provider) {
    response.cookies.set({
      name: "storymagic_provider",
      value: provider,
      httpOnly: true,
      secure,
      sameSite: "lax",
      maxAge: ONE_WEEK_SECONDS,
      path: "/",
    });
    response.cookies.set({
      name: "refresh_provider",
      value: provider,
      httpOnly: true,
      secure,
      sameSite: "lax",
      maxAge: ONE_WEEK_SECONDS,
      path: "/",
    });
  }

  return response;
}
