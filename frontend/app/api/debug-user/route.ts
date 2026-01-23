import { NextResponse } from "next/server";
import { getOrCreateUserId } from "@/lib/user";

export async function GET() {
  const userId = await getOrCreateUserId();
  return NextResponse.json({ userId });
}
