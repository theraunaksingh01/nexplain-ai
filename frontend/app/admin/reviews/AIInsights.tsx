"use client";

import { useEffect, useState } from "react";

type AIAnalysis = {
  summary: string;
};

export default function AIInsights({
  concept,
}: {
  concept: {
    id: string;
    subject: string;
    topic: string;
    subtopic: string;
  };
}) {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadLatest() {
    const res = await fetch(
      `/api/ai/latest?conceptId=${concept.id}`
    );

    if (!res.ok) {
      setAnalysis(null);
      return;
    }

    const data = await res.json();
    setAnalysis(data.analysis ?? null);
  }

  async function runAI() {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/ai/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conceptId: concept.id,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(
        data.error ||
          "AI analysis could not be run for this topic."
      );
      setLoading(false);
      return;
    }

    await loadLatest();
    setLoading(false);
  }

  useEffect(() => {
    loadLatest();
  }, [concept.id]);

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          AI Content Analysis
        </h2>

        <button
          onClick={runAI}
          disabled={loading}
          className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50 disabled:opacity-50"
        >
          {loading ? "Analyzing…" : "Run AI Analysis"}
        </button>
      </div>

      {error && (
        <p className="mb-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {!analysis ? (
        <p className="text-sm text-gray-500">
          No AI analysis available yet.
        </p>
      ) : (
        <div className="space-y-2 text-sm text-gray-700">
          <strong>Summary</strong>
          <p>{analysis.summary}</p>
        </div>
      )}
    </div>
  );
}