import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: Request) {
  const {
    conceptId,
    expertName,
    decision,
    comment,
    confidenceDelta,
  } = await req.json();

  if (!conceptId || !decision) {
    return NextResponse.json(
      { error: "Invalid payload" },
      { status: 400 }
    );
  }

  // 1. Store expert review
  await query(
    `
    INSERT INTO expert_reviews
      (concept_id, expert_name, decision, comment, confidence_delta)
    VALUES ($1, $2, $3, $4, $5)
    `,
    [
      conceptId,
      expertName ?? "Anonymous Expert",
      decision,
      comment ?? null,
      confidenceDelta ?? 0,
    ]
  );

  // 2. Update concept trust
  await query(
    `
    UPDATE concepts
    SET
      expert_verified = $1,
      confidence = GREATEST(0, LEAST(1, confidence + $2)),
      last_verified = now()
    WHERE id = $3
    `,
    [
      decision === "approved",
      confidenceDelta ?? 0,
      conceptId,
    ]
  );

  return NextResponse.json({ success: true });
}
