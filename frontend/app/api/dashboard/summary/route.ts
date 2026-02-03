import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getAnonUserId } from "@/lib/user";

export async function GET() {
  const anonUserId = await getAnonUserId();

  if (!anonUserId) {
    return NextResponse.json({
      lastProgress: null,
      topics: [],
    });
  }
  console.log("DASHBOARD anon:", anonUserId);

  /**
   * 1️⃣ Get topic-level progress (even if fully completed)
   */
  const topics = await query(
    `
    SELECT
      c.subject,
      c.topic,
      COUNT(c.id)                                   AS total,
      COUNT(p.id) FILTER (WHERE p.status = 'completed') AS completed,
      MAX(p.last_read_at)                           AS last_read_at
    FROM concepts c
    LEFT JOIN user_progress p
      ON p.concept_id = c.id
     AND p.anon_user_id = $1
    GROUP BY c.subject, c.topic
    HAVING COUNT(p.id) > 0
    ORDER BY last_read_at DESC
    `,
    [anonUserId]
  );

  if (!topics.length) {
    return NextResponse.json({
      lastProgress: null,
      topics: [],
    });
  }
console.log("DASHBOARD topics rows:", topics);
  /**
   * 2️⃣ Compute progress %
   */
  const formattedTopics = topics.map((t) => ({
    subject: t.subject,
    topic: t.topic,
    progress: Math.round(
      (Number(t.completed) / Number(t.total)) * 100
    ),
  }));

  /**
   * 3️⃣ Last read subtopic (resume)
   */
  const last = await query(
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

  return NextResponse.json({
    lastProgress: last[0] ?? null,
    topics: formattedTopics,
  });
}