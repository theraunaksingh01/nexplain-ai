export type UserRole = "admin" | "expert" | "reader";

/**
 * TEMP: mirrors server role
 * Later this will come from auth/session
 */
export function getClientRole(): UserRole {
  return "admin"; // change to "expert" or "reader" to test
}