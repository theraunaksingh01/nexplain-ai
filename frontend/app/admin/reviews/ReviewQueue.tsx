import Link from "next/link";

async function getPendingConcepts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/concepts/pending`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function ReviewQueue() {
  const concepts = await getPendingConcepts();

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      
      <div className="border-b px-6 py-4">
        <h2 className="text-sm font-semibold text-gray-700">
          Review Queue
        </h2>
      </div>

      {concepts.length === 0 ? (
        <p className="px-6 py-6 text-sm text-gray-500">
          🎉 All concepts are verified
        </p>
      ) : (
        <ul className="divide-y">
          {concepts.map((c: any, idx: number) => (
            <li
              key={`${c.id}-${idx}`}
              className="flex items-center justify-between px-6 py-4"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {c.subject} / {c.topic} /{" "}
                  <span className="text-indigo-600">
                    {c.subtopic}
                  </span>
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Confidence: {(c.confidence * 100).toFixed(0)}%
                </p>
              </div>

              <Link
                href={`/admin/reviews/${c.id}`}
                className="rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-indigo-700"
              >
                Review →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
