import { query } from "@/lib/db";

/**
 * Recalculate and persist confidence score for a concept
 */
export async function recalculateConfidence(
  conceptId: string
): Promise<number> {
  // 1️⃣ Average user clarity score (0–1)
  const feedback = await query(
    `
    SELECT AVG(clarity_score)::numeric / 5 AS user_score
    FROM user_feedback
    WHERE concept_id = $1
    `,
    [conceptId]
  );

  const userScore = Number(feedback[0]?.user_score ?? 0);

  // 2️⃣ Expert confidence base (starts at 0.7)
  const expert = await query(
    `
    SELECT COALESCE(SUM(confidence_delta), 0) AS expert_delta
    FROM expert_reviews
    WHERE concept_id = $1
    `,
    [conceptId]
  );

  const expertScore = Math.min(
    1,
    Math.max(0, 0.7 + Number(expert[0]?.expert_delta))
  );

  // 3️⃣ Final weighted confidence
  const finalConfidence =
    userScore * 0.4 + expertScore * 0.6;

  // 4️⃣ Persist back to concepts table
  await query(
    `
    UPDATE concepts
    SET confidence = $1,
        last_verified = now()
    WHERE id = $2
    `,
    [finalConfidence, conceptId]
  );

  return finalConfidence;
}
