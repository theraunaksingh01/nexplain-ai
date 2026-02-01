// app/api/dashboard/summary/route.ts
import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getAnonUserId } from "@/lib/user";
import { getTopicProgress } from "@/lib/progress";

export async function GET() {
  const anonUserId = await getAnonUserId();
  if (!anonUserId) {
    return NextResponse.json({ topics: [], lastProgress: null });
  }

  // 1️⃣ All topics user has ever interacted with
  const topicRows = await query(
    `
    SELECT DISTINCT c.subject, c.topic
    FROM user_progress p
    JOIN concepts c ON c.id = p.concept_id
    WHERE p.anon_user_id = $1
    `,
    [anonUserId]
  );

  const topics = [];
  let lastProgress = null;

  for (const { subject, topic } of topicRows) {
    const concepts = await getTopicProgress(subject, topic);

    const total = concepts.length;
    const completed = concepts.filter(
      (c) => c.status === "completed"
    ).length;

    const progress = Math.round((completed / total) * 100);

    const next =
      concepts.find((c) => c.status !== "completed") ??
      concepts[concepts.length - 1];

    topics.push({
      subject,
      topic,
      progress,
      status: progress === 100 ? "completed" : "in_progress",
      lastSubtopic: next.subtopic,
    });

    if (!lastProgress && progress < 100) {
      lastProgress = {
        subject,
        topic,
        subtopic: next.subtopic,
      };
    }
  }

  return NextResponse.json({ topics, lastProgress });
}