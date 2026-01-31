import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getCurrentUserRole } from "@/lib/auth";
import { requireAdmin } from "@/lib/permissions";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const conceptId = searchParams.get("conceptId");
  const role = await getCurrentUserRole();

  if (role !== "admin") {
    return new Response("Forbidden", { status: 403 });
  }

  if (!conceptId) {
    return NextResponse.json({ events: [] });
  }

  const events = await query(
    `
    SELECT event_type, actor_role, details, created_at
    FROM audit_events
    WHERE concept_id = $1
    ORDER BY created_at DESC
    `,
    [conceptId]
  );

  return NextResponse.json({ events });
}