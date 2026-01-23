import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getOrCreateUserId } from "@/lib/user";

export async function GET() {
  const userId = await getOrCreateUserId();

  const rows = await query(
    `
    SELECT
      c.subject,
      c.topic,
      c.subtopic
    FROM user_progress p
    JOIN concepts c ON c.id = p.concept_id
    WHERE p.user_id = $1
    ORDER BY p.last_read_at DESC
    LIMIT 1
    `,
    [userId]
  );

  if (!rows.length) {
    return NextResponse.json({ last: null });
  }

  return NextResponse.json({ last: rows[0] });
}
