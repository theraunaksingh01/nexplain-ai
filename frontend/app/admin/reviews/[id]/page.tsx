import { notFound } from "next/navigation";
import AIInsights from "../AIInsights";
import ReviewClient from "../ReviewClient";
import { query } from "@/lib/db";

/* -----------------------------
   DATA FETCH
-------------------------------- */
async function getConceptById(id: string) {
  const rows = await query(
    `
    SELECT
      id,
      subject,
      topic,
      subtopic,
      confidence,
      last_verified
    FROM concepts
    WHERE id = $1
    `,
    [id]
  );

  return rows[0] ?? null;
}

/* -----------------------------
   PAGE
-------------------------------- */
export default async function ReviewDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const concept = await getConceptById(id);
  if (!concept) notFound();

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-4xl space-y-8 px-4">
        {/* HEADER */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h1 className="text-xl font-semibold">
            {concept.subject} / {concept.topic} /{" "}
            <span className="text-indigo-600">
              {concept.subtopic}
            </span>
          </h1>

          <div className="mt-2 flex gap-6 text-sm text-gray-600">
            <span>
              Confidence:{" "}
              <strong>
                {(concept.confidence * 100).toFixed(0)}%
              </strong>
            </span>

            <span>
              Last verified:{" "}
              {concept.last_verified
                ? new Date(
                    concept.last_verified
                  ).toLocaleDateString()
                : "Never"}
            </span>
          </div>
        </div>

        {/* STEP 1 — AI ANALYSIS */}
        <section>
          <AIInsights concept={concept} />
        </section>

        {/* STEP 2 — AI SUGGESTED IMPROVEMENTS */}
        <section>
          <ReviewClient conceptId={concept.id} />
        </section>
      </div>
    </div>
  );
}