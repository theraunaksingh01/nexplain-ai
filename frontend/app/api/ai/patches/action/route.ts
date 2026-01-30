import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: Request) {
  const { patchId, action } = await req.json();

  if (!patchId || !["approved", "rejected"].includes(action)) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }

  await query(
    `
    UPDATE ai_content_patches
    SET status = $1
    WHERE id = $2
    `,
    [action, patchId]
  );

  return NextResponse.json({ success: true });
}
