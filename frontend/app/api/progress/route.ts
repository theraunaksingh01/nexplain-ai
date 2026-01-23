import { query } from "@/lib/db";
import { NextResponse } from "next/server";
import { getOrCreateUserId } from "@/lib/user";

export async function POST(req: Request) {
  const { conceptId, status } = await req.json();

  if (!conceptId || !status) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const userId = getOrCreateUserId();

  await query(
    `
    INSERT INTO user_progress (user_id, concept_id, status)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, concept_id)
    DO UPDATE SET
      status = EXCLUDED.status,
      last_read_at = now()
    `,
    [userId, conceptId, status]
  );

  return NextResponse.json({ success: true });
}
