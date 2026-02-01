// app/api/resume/route.ts
import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getAnonUserId } from "@/lib/user";

export async function GET() {
  const anonUserId = getAnonUserId(); // ✅ NOT async

  if (!anonUserId) {
    return NextResponse.json(
      { error: "Anon user not initialized" },
      { status: 401 }
    );
  }

  const rows = await query(
    `
    SELECT
      c.subject,
      c.topic,
      c.subtopic
    FROM user_progress p
    JOIN concepts c ON c.id = p.concept_id
    WHERE p.anon_user_id = $1
    ORDER BY p.last_read_at DESC
    LIMIT 1
    `,
    [anonUserId]
  );

  if (!rows.length) {
    return NextResponse.json({ last: null });
  }

  return NextResponse.json({ last: rows[0] });
}