"use client";

import { useState } from "react";

export default function AISummary({
  subject,
  topic,
  subtopic,
}: {
  subject: string;
  topic: string;
  subtopic: string;
}) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string[] | null>(null);

  const generate = async () => {
    setLoading(true);
    setSummary(null);

    const res = await fetch("/api/ai-summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, topic, subtopic }),
    });

    const data = await res.json();
    setSummary(data.summary);
    setLoading(false);
  };

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <h4 className="mb-2 text-sm font-semibold text-gray-900">
        🤖 AI Summary
      </h4>

      {!summary && (
        <button
          onClick={generate}
          className="w-full rounded-lg border border-dashed px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50"
        >
          Generate summary
        </button>
      )}

      {loading && (
        <p className="text-xs text-gray-500">
          Generating summary…
        </p>
      )}

      {summary && (
        <div className="mt-3 space-y-2 text-sm text-gray-700">
          <ul className="list-disc pl-4">
            {summary.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>

          <p className="mt-3 text-xs text-gray-400">
            AI-generated. Always verify with the full explanation.
          </p>
        </div>
      )}
    </div>
  );
}
