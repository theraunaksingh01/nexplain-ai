import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { subject, topic, subtopic, feedback } = await req.json();

    if (!subject || !topic || !subtopic || !feedback) {
      return NextResponse.json(
        { error: "Invalid data" },
        { status: 400 }
      );
    }

    // 1️⃣ Get concept ID
    const concepts = (await query(
      `
      SELECT id
      FROM concepts
      WHERE subject = $1 AND topic = $2 AND subtopic = $3
      `,
      [subject, topic, subtopic]
    )) as { id: string }[];

    if (!concepts.length) {
      return NextResponse.json(
        { error: "Concept not found" },
        { status: 404 }
      );
    }

    const conceptId = concepts[0].id;

    // 2️⃣ Store user feedback
    // clarity_score: +1 = clear, -1 = confusing
    await query(
      `
      INSERT INTO user_feedback (concept_id, clarity_score)
      VALUES ($1, $2)
      `,
      [conceptId, feedback === "clear" ? 1 : -1]
    );

    // 3️⃣ SMART COMPLETION RULE (Phase 6.4)
    // If user explicitly says "clear", mark as completed
    if (feedback === "clear") {
      await query(
        `
        INSERT INTO user_progress (concept_id, status)
        VALUES ($1, 'completed')
        ON CONFLICT (concept_id)
        DO UPDATE SET
          status = 'completed',
          last_read_at = now()
        `,
        [conceptId]
      );
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
