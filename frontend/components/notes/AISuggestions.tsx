"use client";

import { useEffect, useState } from "react";

type AISuggestion = {
  id: string;
  section: string;
  suggestion_type: string;
  suggested_text: string;
  confidence_impact: number;
};

export default function AISuggestions({
  subject,
  topic,
  subtopic,
}: {
  subject: string;
  topic: string;
  subtopic: string;
}) {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);

  useEffect(() => {
    fetch(
      `/api/ai-suggestions?subject=${subject}&topic=${topic}&subtopic=${subtopic}`
    )
      .then((res) => res.json())
      .then(setSuggestions);
  }, [subject, topic, subtopic]);

  if (suggestions.length === 0) return null;

  return (
    <div className="mt-8 rounded-xl border bg-indigo-50 p-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-sm font-medium text-indigo-700"
      >
        💡 AI Suggestions ({suggestions.length})
        <span>{open ? "−" : "+"}</span>
      </button>

      {open && (
        <ul className="mt-4 space-y-3 text-sm text-gray-700">
          {suggestions.map((s) => (
            <li
              key={s.id}
              className="rounded-lg bg-white p-3 shadow-sm"
            >
              <p className="mb-1 font-medium">
                {s.section} ({s.suggestion_type})
              </p>
              <p className="text-gray-600">
                {s.suggested_text}
              </p>
              <p className="mt-2 text-xs text-gray-400">
                Confidence impact: +{Math.round(s.confidence_impact * 100)}%
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
