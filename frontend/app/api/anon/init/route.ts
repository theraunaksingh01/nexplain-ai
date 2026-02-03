// app/api/anon/init/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";

const COOKIE_NAME = "anon_user_id";

export async function POST() {
  const cookieStore = await cookies();

  let anonId = cookieStore.get(COOKIE_NAME)?.value;

  if (!anonId) {
    anonId = randomUUID();
    cookieStore.set(COOKIE_NAME, anonId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return NextResponse.json({ anonId });
}