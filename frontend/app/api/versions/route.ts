import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const conceptId = searchParams.get("conceptId");

  if (!conceptId) {
    return NextResponse.json({ versions: [] });
  }

  const versions = await query(
    `
    SELECT version, markdown_path, created_at, change_summary, created_by
    FROM concept_versions
    WHERE concept_id = $1
    ORDER BY version DESC
    `,
    [conceptId]
  );

  return NextResponse.json({ versions });
}