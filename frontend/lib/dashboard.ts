// lib/dashboard.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { query } from "@/lib/db";
import { getTopicProgress } from "@/lib/progress";
import { getAnonUserId } from "@/lib/user.server";

export async function getDashboardSummary() {
  const session = await getServerSession(authOptions);
  const anonUserId = await getAnonUserId();

  const userId = anonUserId ?? session?.user.id;

  if (!userId) {
    return { lastProgress: null, topics: [] };
  }

  const topicRows = await query(
    `
    SELECT DISTINCT c.subject, c.topic
    FROM user_progress up
    JOIN concepts c ON c.id = up.concept_id
    WHERE up.anon_user_id = $1
    `,
    [userId]
  );

  const topics = [];
  let lastProgress = null;

  for (const { subject, topic } of topicRows) {
    const concepts = await getTopicProgress(subject, topic);

    const total = concepts.length;
    const completed = concepts.filter(c => c.status === "completed").length;

    const next =
      concepts.find(c => c.status !== "completed") ??
      concepts[concepts.length - 1];

    topics.push({
      subject,
      topic,
      progress: Math.round((completed / total) * 100),
      nextSubtopic: next?.subtopic ?? null,
    });

    if (!lastProgress && next) {
      lastProgress = {
        subject,
        topic,
        subtopic: next.subtopic,
      };
    }
  }

  return { lastProgress, topics };
}