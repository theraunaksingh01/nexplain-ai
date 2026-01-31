"use client";

import { useState } from "react";

export type UserRole = "admin" | "expert" | "reader";

/**
 * TEMP role resolver (Phase 11.2)
 * Change value to test UI permissions.
 */
function resolveRole(): UserRole {
  return "reader"; // change to "expert" | "admin"
}

export function useRole(): UserRole {
  const [role] = useState<UserRole>(resolveRole());
  return role;
}
