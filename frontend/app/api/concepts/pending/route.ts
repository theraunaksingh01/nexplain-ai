import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  const concepts = await query(`
    SELECT
      id,
      subject,
      topic,
      subtopic,
      confidence,
      last_verified
    FROM concepts
    WHERE confidence < 0.8
       OR last_verified IS NULL
    ORDER BY confidence ASC NULLS FIRST
    LIMIT 50
  `);

  return NextResponse.json(concepts);
}
