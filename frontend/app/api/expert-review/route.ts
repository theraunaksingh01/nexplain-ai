import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { recalculateConfidence } from "@/lib/confidence";

export async function POST(req: Request) {
  try {
    const {
      subject,
      topic,
      subtopic,
      expert_name,
      decision,
      comment,
      confidence_delta,
    } = await req.json();

    if (!expert_name || !decision) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1️⃣ Find concept
    const concept = await query(
      `
      SELECT id FROM concepts
      WHERE subject = $1 AND topic = $2 AND subtopic = $3
      `,
      [subject, topic, subtopic]
    );

    if (!concept.length) {
      return NextResponse.json(
        { error: "Concept not found" },
        { status: 404 }
      );
    }

    const conceptId = concept[0].id;

    // 2️⃣ Insert expert review
    await query(
      `
      INSERT INTO expert_reviews
        (concept_id, expert_name, decision, comment, confidence_delta)
      VALUES ($1, $2, $3, $4, $5)
      `,
      [
        conceptId,
        expert_name,
        decision,
        comment ?? null,
        confidence_delta ?? 0,
      ]
    );

    // 3️⃣ Recalculate confidence
    const newConfidence = await recalculateConfidence(conceptId);

    return NextResponse.json({
      success: true,
      new_confidence: newConfidence,
    });
  } catch (error) {
    console.error("Expert review error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
