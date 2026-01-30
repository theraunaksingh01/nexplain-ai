// lib/user.ts
import { cookies } from "next/headers";
import { randomUUID } from "crypto";

const COOKIE_NAME = "anon_user_id";

export async function getOrCreateAnonUserId(): Promise<string> {
  const cookieStore = await cookies();

  let anonId = cookieStore.get(COOKIE_NAME)?.value;

  if (!anonId) {
    anonId = randomUUID();
    cookieStore.set(COOKIE_NAME, anonId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }

  return anonId;
}
