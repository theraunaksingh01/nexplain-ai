// lib/progress.ts
import { query } from "@/lib/db";
import { getAnonUserId} from "@/lib/user";

export type ConceptProgress = {
  subtopic: string;
  status: "in_progress" | "completed" | null;
};

export type SubtopicUIState = {
  subtopic: string;
  state: "completed" | "current" | "locked";
};

export function deriveSubtopicStates(
  concepts: ConceptProgress[]
): SubtopicUIState[] {
  let foundCurrent = false;

  return concepts.map((c) => {
    if (c.status === "completed") {
      return { subtopic: c.subtopic, state: "completed" };
    }

    if (!foundCurrent) {
      foundCurrent = true;
      return { subtopic: c.subtopic, state: "current" };
    }

    return { subtopic: c.subtopic, state: "locked" };
  });
}

export async function getTopicProgress(
  subject: string,
  topic: string
): Promise<ConceptProgress[]> {
  const anonUserId = await getAnonUserId();
  if (!anonUserId) return [];

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
  console.log("READ anon id:", anonUserId);

  return rows;
}

export async function markCompleted(conceptId: string) {
  const anonUserId = await getAnonUserId();
  if (!anonUserId) return [];

  console.log("WRITE anon id:", anonUserId);

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
