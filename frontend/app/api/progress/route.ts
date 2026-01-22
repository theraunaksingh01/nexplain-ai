import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { conceptId, status } = await req.json();

  if (!conceptId || !status) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  await query(
    `
    INSERT INTO user_progress (concept_id, status)
    VALUES ($1, $2)
    ON CONFLICT (concept_id)
    DO UPDATE SET
      status = EXCLUDED.status,
      last_read_at = now()
    `,
    [conceptId, status]
  );

  return NextResponse.json({ success: true });
}
