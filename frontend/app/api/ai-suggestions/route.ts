import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const subject = searchParams.get("subject");
  const topic = searchParams.get("topic");
  const subtopic = searchParams.get("subtopic");

  if (!subject || !topic || !subtopic) {
    return NextResponse.json([], { status: 200 });
  }

  const rows = await query(
    `
    SELECT
      id,
      section,
      suggestion_type,
      suggested_text,
      confidence_impact,
      status
    FROM ai_suggestions
    WHERE concept_id = (
      SELECT id FROM concepts
      WHERE subject = $1 AND topic = $2 AND subtopic = $3
    )
    AND status = 'pending'
    ORDER BY created_at DESC
    `,
    [subject, topic, subtopic]
  );

  return NextResponse.json(rows);
}
