import { query } from "@/lib/db";

export type ConceptProgress = {
  subtopic: string;
  status: "in_progress" | "completed";
};

export async function getTopicProgress(
  subject: string,
  topic: string
): Promise<ConceptProgress[]> {
  const rows = await query(
  `
  SELECT c.subtopic, up.status
  FROM concepts c
  LEFT JOIN user_progress up
    ON c.id = up.concept_id
  WHERE c.subject = $1 AND c.topic = $2
  ORDER BY c.order_index ASC
  `,
  [subject, topic]
);


  return rows;
}

export async function markCompleted(conceptId: string) {
  await query(
    `
    INSERT INTO user_progress (concept_id, status)
    VALUES ($1, 'completed')
    ON CONFLICT (concept_id)
    DO UPDATE SET
      status = 'completed',
      last_read_at = now()
    `,
    [conceptId]
  );
}