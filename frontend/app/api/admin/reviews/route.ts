import { NextResponse } from "next/server";
import { query } from "@/lib/db";

const STALE_DAYS = 90;

export async function GET() {
  const rows = await query(
    `
    SELECT
      c.id,
      c.subject,
      c.topic,
      c.subtopic,
      c.current_version,
      c.confidence,
      c.last_verified,
      COUNT(er.id) AS expert_reviews_count
    FROM concepts c
    LEFT JOIN expert_reviews er
      ON er.concept_id = c.id
    GROUP BY c.id
    `
  );

  const now = Date.now();

  const needsReview = rows.filter((c: any) => {
    const confidenceLow = Number(c.confidence ?? 0) < 0.6;

    const stale =
      c.last_verified &&
      now - new Date(c.last_verified).getTime() >
        STALE_DAYS * 24 * 60 * 60 * 1000;

    const neverReviewed = Number(c.expert_reviews_count) === 0;

    return confidenceLow || stale || neverReviewed;
  });

  return NextResponse.json({
    count: needsReview.length,
    concepts: needsReview.map((c: any) => ({
      id: c.id,
      subject: c.subject,
      topic: c.topic,
      subtopic: c.subtopic,
      version: c.current_version ?? 1,
      confidence: Number(c.confidence ?? 0),
      last_verified: c.last_verified,
      reason: [
        Number(c.confidence ?? 0) < 0.6 && "low confidence",
        Number(c.expert_reviews_count) === 0 && "never reviewed",
        c.last_verified &&
          now - new Date(c.last_verified).getTime() >
            STALE_DAYS * 24 * 60 * 60 * 1000 &&
          "stale",
      ].filter(Boolean),
    })),
  });
}
