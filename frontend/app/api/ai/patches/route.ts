import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const conceptId = searchParams.get("conceptId");

  if (!conceptId) {
    return NextResponse.json(
      { patches: [] },
      { status: 400 }
    );
  }

  const rows = await query(
    `
    SELECT
      id,
      patch_type,
      ai_reason,
      edited_markdown,
      status,
      created_at
    FROM ai_content_patches
    WHERE concept_id = $1
    ORDER BY created_at ASC
    `,
    [conceptId]
  );

  return NextResponse.json({
    patches: rows,
  });
}