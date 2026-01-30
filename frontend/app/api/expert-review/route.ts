import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { recalculateConfidence } from "@/lib/confidence";

export async function POST(req: Request) {
  try {
    const {
      id, // concept id
      expert_name,
      decision,
      comment,
      confidence_delta,
      ai_alignment,
    } = await req.json();

    if (!id || !expert_name || !decision) {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      );
    }

    // 1️⃣ Store expert review
    await query(
      `
      INSERT INTO expert_reviews (
        concept_id,
        expert_name,
        decision,
        comment,
        confidence_delta,
        ai_alignment
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [
        id,
        expert_name,
        decision,
        comment ?? null,
        confidence_delta ?? 0,
        ai_alignment ?? null,
      ]
    );

    // 2️⃣ Update concept review flags
    await query(
      `
      UPDATE concepts
      SET
        needs_review = FALSE,
        last_verified = now()
      WHERE id = $1
      `,
      [id]
    );

    // 3️⃣ Recalculate confidence (AI + human weighted)
    await recalculateConfidence(id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Expert review error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
