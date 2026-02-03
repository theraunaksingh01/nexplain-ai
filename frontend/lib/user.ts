// lib/user.ts
import { cookies } from "next/headers";

const COOKIE_NAME = "anon_user_id";

/**
 * READ-ONLY helper
 * (NO writing cookies here)
 */
export async function getAnonUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}