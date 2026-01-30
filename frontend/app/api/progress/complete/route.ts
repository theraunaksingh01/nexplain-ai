import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getOrCreateAnonUserId } from "@/lib/user";

export async function POST(req: Request) {
  const { conceptId } = await req.json();

  if (!conceptId) {
    return NextResponse.json(
      { error: "Missing conceptId" },
      { status: 400 }
    );
  }

  const anonUserId = await getOrCreateAnonUserId();

  await query(
    `
    INSERT INTO user_progress (anon_user_id, concept_id, status)
    VALUES ($1, $2, 'completed')
    ON CONFLICT (anon_user_id, concept_id)
    DO UPDATE SET
      status = 'completed',
      last_read_at = now()
    `,
    [anonUserId, conceptId]
  );

  return NextResponse.json({ success: true });
}
