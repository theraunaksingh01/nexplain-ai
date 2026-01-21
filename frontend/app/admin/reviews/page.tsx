import ReviewCard from "./ReviewCard";

async function getPendingConcepts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/concepts/pending`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];
  return res.json();
}

export default async function ReviewsPage() {
  const concepts = await getPendingConcepts();

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-24">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-2xl font-semibold">
          Expert Review Dashboard
        </h1>

        {concepts.length === 0 ? (
          <p className="text-sm text-gray-500">
            🎉 All concepts are verified.
          </p>
        ) : (
          <div className="space-y-4">
            {concepts.map((c: any) => (
              <ReviewCard key={`${c.subject}-${c.subtopic}`} concept={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
