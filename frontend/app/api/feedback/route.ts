// app/api/feedback/route.ts
import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { markCompleted } from "@/lib/progress";

export async function POST(req: Request) {
  try {
    const { subject, topic, subtopic, feedback } = await req.json();

    if (!subject || !topic || !subtopic || !feedback) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const concepts = await query(
      `
      SELECT id
      FROM concepts
      WHERE subject = $1 AND topic = $2 AND subtopic = $3
      `,
      [subject, topic, subtopic]
    ) as { id: string }[];

    if (!concepts.length) {
      return NextResponse.json({ error: "Concept not found" }, { status: 404 });
    }

    const conceptId = concepts[0].id;

    // Store feedback (append-only)
    await query(
      `
      INSERT INTO user_feedback (concept_id, clarity_score)
      VALUES ($1, $2)
      `,
      [conceptId, feedback === "clear" ? 1 : -1]
    );

    // ✅ SINGLE completion path
    if (feedback === "clear") {
      await markCompleted(conceptId);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Feedback API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
