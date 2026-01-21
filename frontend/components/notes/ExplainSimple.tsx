"use client";

import { useState } from "react";

export default function ExplainSimple({ text }: { text: string }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const explain = async () => {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/clarify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setResult(data.explanation);
    setLoading(false);
  };

  return (
    <div className="mt-4 rounded-lg border bg-gray-50 p-3">
      <button
        onClick={explain}
        className="text-sm text-indigo-600 hover:underline"
      >
        Explain simply
      </button>

      {loading && (
        <p className="mt-2 text-xs text-gray-500">Thinking…</p>
      )}

      {result && (
        <p className="mt-2 text-sm text-gray-700">{result}</p>
      )}
    </div>
  );
}
