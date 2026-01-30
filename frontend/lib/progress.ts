// lib/progress.ts
import { query } from "@/lib/db";
import { getOrCreateAnonUserId } from "@/lib/user";

export type ConceptProgress = {
  subtopic: string;
  status: "in_progress" | "completed" | null;
};

export async function getTopicProgress(
  subject: string,
  topic: string
): Promise<ConceptProgress[]> {
  const anonUserId = await getOrCreateAnonUserId();

  const rows = await query(
    `
    SELECT
      c.subtopic,
      up.status
    FROM concepts c
    LEFT JOIN user_progress up
      ON c.id = up.concept_id
     AND up.anon_user_id = $3
    WHERE c.subject = $1
      AND c.topic = $2
    ORDER BY c.order_index ASC
    `,
    [subject, topic, anonUserId]
  );

  return rows;
}

export async function markCompleted(conceptId: string) {
  const anonUserId = await getOrCreateAnonUserId();

  await query(
    `
    INSERT INTO user_progress (anon_user_id, concept_id, status)
    VALUES ($1, $2, 'completed')
    ON CONFLICT (anon_user_id, concept_id)
    DO UPDATE SET
      status = 'completed',
      last_read_at = now()
    `,
    [anonUserId, conceptId]
  );
}
