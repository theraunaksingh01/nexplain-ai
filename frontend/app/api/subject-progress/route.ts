import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getOrCreateUserId } from "@/lib/user";

export async function GET() {
  const userId = await getOrCreateUserId();

  const rows = await query(
    `
    SELECT
      c.subject,
      COUNT(*) AS total,
      COUNT(p.concept_id) FILTER (WHERE p.status = 'completed') AS completed
    FROM concepts c
    LEFT JOIN user_progress p
      ON p.concept_id = c.id
      AND p.user_id = $1
    GROUP BY c.subject
    ORDER BY c.subject
    `,
    [userId]
  );

  return NextResponse.json({ subjects: rows });
}
