import { NextResponse } from "next/server";

const COOKIE_BASE = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
};

export async function POST() {
  const response = NextResponse.json({ status: "terminated" });
  response.cookies.set({
    ...COOKIE_BASE,
    name: "storymagic_token",
    value: "",
    maxAge: 0,
  });
  response.cookies.set({
    ...COOKIE_BASE,
    name: "storymagic_refresh_token",
    value: "",
    maxAge: 0,
  });
  return response;
}
