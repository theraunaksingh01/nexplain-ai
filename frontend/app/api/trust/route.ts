import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const subject = searchParams.get("subject");
  const topic = searchParams.get("topic");
  const subtopic = searchParams.get("subtopic");

  if (!subject || !topic || !subtopic) {
    return NextResponse.json(
      { error: "Missing params" },
      { status: 400 }
    );
  }

  // 1️⃣ Get base concept data
  const rows = await query(
    `
    SELECT
      id,
      current_version,
      confidence,
      last_verified,
      needs_review
    FROM concepts
    WHERE subject = $1 AND topic = $2 AND subtopic = $3
    `,
    [subject, topic, subtopic]
  );

  if (!rows.length) {
    return NextResponse.json(
      { error: "Concept not found" },
      { status: 404 }
    );
  }

  const concept = rows[0];

  // 2️⃣ Check expert reviews
  const expert = await query(
    `
    SELECT COUNT(*)::int AS count
    FROM expert_reviews
    WHERE concept_id = $1
    `,
    [concept.id]
  );

  // 3️⃣ Derive STATUS
  let status: "needs_review" | "expert_verified" | "community_reviewed";

  if (concept.needs_review) {
    status = "needs_review";
  } else if (expert[0].count > 0) {
    status = "expert_verified";
  } else {
    status = "community_reviewed";
  }

  return NextResponse.json({
    version: concept.current_version ?? 1,
    confidence: Number(concept.confidence ?? 0),
    last_verified: concept.last_verified,
    status,
  });
}
