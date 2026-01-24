import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { applyConfidenceDecay } from "@/lib/confidenceDecay";

export async function GET() {
  const rows = await query(`
    SELECT
      id,
      subject,
      topic,
      subtopic,
      confidence,
      last_verified
    FROM concepts
  `);

  const flagged = rows
    .map((c) => {
      const decay = applyConfidenceDecay(
        c.confidence,
        new Date(c.last_verified)
      );

      return {
        ...c,
        confidence: decay.confidence,
        needs_review: decay.needsReview,
      };
    })
    .filter((c) => c.needs_review);

  return NextResponse.json({ items: flagged });
}
