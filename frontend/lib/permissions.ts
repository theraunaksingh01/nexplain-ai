import type { UserRole } from "@/lib/types";

export function requireAdmin(role: UserRole) {
  if (role !== "admin") {
    throw new Error("Admin access required");
  }
}

export function requireExpert(role: UserRole) {
  if (role !== "expert" && role !== "admin") {
    throw new Error("Expert access required");
  }
}