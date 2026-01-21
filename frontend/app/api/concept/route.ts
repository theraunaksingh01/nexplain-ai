import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const subject = searchParams.get("subject");
  const topic = searchParams.get("topic");
  const subtopic = searchParams.get("subtopic");

  if (!subject || !topic || !subtopic) {
    return NextResponse.json(
      { error: "Missing parameters" },
      { status: 400 }
    );
  }

  const rows = await query(
    `
    SELECT
      current_version,
      confidence,
      last_verified
    FROM concepts
    WHERE subject = $1 AND topic = $2 AND subtopic = $3
    `,
    [subject, topic, subtopic]
  );

  if (rows.length === 0) {
    return NextResponse.json(
      { error: "Concept not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(rows[0]);
}
