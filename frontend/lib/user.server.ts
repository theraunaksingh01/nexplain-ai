// lib/user.server.ts
import { cookies } from "next/headers";

const COOKIE_NAME = "anon_user_id";

export async function getAnonUserId() {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value ?? null;
}