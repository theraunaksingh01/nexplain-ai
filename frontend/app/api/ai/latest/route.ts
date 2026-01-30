import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const conceptId = searchParams.get("conceptId");

  if (!conceptId) {
    return NextResponse.json(
      { error: "Missing conceptId" },
      { status: 400 }
    );
  }

  const rows = await query(
    `
    SELECT analysis, model, created_at
    FROM ai_analysis_history
    WHERE concept_id = $1
    ORDER BY created_at DESC
    LIMIT 1
    `,
    [conceptId]
  );

  if (!rows.length) {
    return NextResponse.json({ analysis: null });
  }

  return NextResponse.json({
    analysis: rows[0].analysis,
    model: rows[0].model,
    created_at: rows[0].created_at,
  });
}
