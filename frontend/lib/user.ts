import { cookies } from "next/headers";
import { randomUUID } from "crypto";

const COOKIE_NAME = "nexplain_uid";

export async function getOrCreateUserId() {
  const cookieStore = await cookies();

  let userId = cookieStore.get(COOKIE_NAME)?.value;

  if (!userId) {
    userId = randomUUID();

    cookieStore.set(COOKIE_NAME, userId, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
    });
  }

  return userId;
}
