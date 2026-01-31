// lib/auth.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { UserRole } from "@/lib/types";

export async function getCurrentUserRole(): Promise<UserRole> {
  const session = await getServerSession(authOptions);
  return (session?.user?.role as UserRole) ?? "reader";
}