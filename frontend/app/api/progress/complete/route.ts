import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { subject, topic, subtopic } = await req.json();

  const [concept] = await query(
    `
    SELECT id FROM concepts
    WHERE subject = $1 AND topic = $2 AND subtopic = $3
    `,
    [subject, topic, subtopic]
  );

  if (!concept) {
    return NextResponse.json({ ok: false });
  }

  await query(
    `
    INSERT INTO user_progress (concept_id, status)
    VALUES ($1, 'completed')
    ON CONFLICT (concept_id)
    DO UPDATE SET
      status = 'completed',
      last_read_at = now()
    `,
    [concept.id]
  );

  return NextResponse.json({ ok: true });
}
