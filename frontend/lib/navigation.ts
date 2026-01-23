import { query } from "@/lib/db";

type ConceptRow = {
  id: string;
  subtopic: string;
};

export async function getPrevNextConcept(
  subject: string,
  topic: string,
  subtopic: string
) {
  const rows = (await query(
    `
    SELECT id, subtopic
    FROM concepts
    WHERE subject = $1 AND topic = $2
    ORDER BY order_index ASC
    `,
    [subject, topic]
  )) as ConceptRow[];

  const index = rows.findIndex(
    (r) => r.subtopic === subtopic
  );

  if (index === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: index > 0 ? rows[index - 1] : null,
    next: index < rows.length - 1 ? rows[index + 1] : null,
  };
}
