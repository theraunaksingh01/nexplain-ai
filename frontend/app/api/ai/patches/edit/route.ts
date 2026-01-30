import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: Request) {
  const { patchId, editedMarkdown } = await req.json();

  if (!patchId) {
    return NextResponse.json(
      { error: "Missing patchId" },
      { status: 400 }
    );
  }

  await query(
    `
    UPDATE ai_content_patches
    SET edited_markdown = $1
    WHERE id = $2
    `,
    [editedMarkdown || null, patchId]
  );

  return NextResponse.json({ success: true });
}