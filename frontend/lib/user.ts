// lib/user.ts
import { cookies } from "next/headers";

const COOKIE_NAME = "anon_user_id";

export async function getAnonUserId(): Promise<string | null> {
  const cookieStore = await cookies(); // ✅ await REQUIRED in your setup
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}