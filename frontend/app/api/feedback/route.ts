import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: Request) {
  const { subject, topic, subtopic, feedback } = await req.json();

  if (!subject || !topic || !subtopic || !feedback) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  // 1. Get concept ID
  const concept = (await query(
  `
  SELECT id FROM concepts
  WHERE subject = $1 AND topic = $2 AND subtopic = $3
  `,
  [subject, topic, subtopic]
)) as { id: string }[];


  if (!concept.length) {
    return NextResponse.json({ error: "Concept not found" }, { status: 404 });
  }

  const conceptId = concept[0].id;

  // 2. Store feedback
  await query(
  `
  INSERT INTO user_feedback (concept_id, clarity_score)
  VALUES ($1, $2)
  `,
  [
    conceptId,
    feedback === "clear" ? 1 : -1
  ]
);

  return NextResponse.json({ success: true });
}
