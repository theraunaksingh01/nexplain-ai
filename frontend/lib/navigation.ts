import { query } from "@/lib/db";

export async function getPrevNextConcept(
  subject: string,
  topic: string,
  subtopic: string
) {
  const rows = await query(
    `
    SELECT id, subtopic, order_index
    FROM concepts
    WHERE subject = $1 AND topic = $2
    ORDER BY order_index ASC
    `,
    [subject, topic]
  );

  const index = rows.findIndex(
    (r) => r.subtopic === subtopic
  );

  return {
    prev: index > 0 ? rows[index - 1] : null,
    next: index < rows.length - 1 ? rows[index + 1] : null,
  };
}
