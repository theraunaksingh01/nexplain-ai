// lib/dashboard.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { query } from "@/lib/db";
import { getTopicProgress } from "@/lib/progress";

type TopicKey = {
  subject: string;
  topic: string;
};

export async function getDashboardSummary() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      lastProgress: null,
      topics: [],
    };
  }

  const topicRows: TopicKey[] = await query(
    `
    SELECT DISTINCT c.subject, c.topic
    FROM user_progress up
    JOIN concepts c ON c.id = up.concept_id
    WHERE up.anon_user_id = $1
    `,
    [session.user.id]
  );

  const topics = [];
  let lastProgress = null;

  for (const { subject, topic } of topicRows) {
    const concepts = await getTopicProgress(subject, topic);

    const total = concepts.length;
    const completed = concepts.filter(
      (c) => c.status === "completed"
    ).length;

    const progress =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    const next =
      concepts.find((c) => c.status !== "completed") ??
      concepts[concepts.length - 1];

    topics.push({
      subject,
      topic,
      progress,
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