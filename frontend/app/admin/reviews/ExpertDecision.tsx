// app/admin/reviews/ExpertDecision.tsx
"use client";

import { useState } from "react";

export default function ExpertDecision({
  concept,
}: {
  concept: any;
}) {
  const [decision, setDecision] = useState("approved");
  const [delta, setDelta] = useState(0.1);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);

    await fetch("/api/expert-review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conceptId: concept.id,
        decision,
        confidence_delta: delta,
        comment,
      }),
    });

    setLoading(false);
    alert("Review submitted");
  }

  return (
    <div className="rounded-xl border bg-white p-5">
      <h3 className="mb-3 font-medium">Expert Decision</h3>

      <div className="grid gap-3 text-sm">
        <select
          value={decision}
          onChange={(e) => setDecision(e.target.value)}
          className="rounded border px-2 py-1"
        >
          <option value="approved">Approve</option>
          <option value="needs_changes">Needs changes</option>
          <option value="rejected">Reject</option>
        </select>

        <input
          type="number"
          step="0.05"
          value={delta}
          onChange={(e) => setDelta(Number(e.target.value))}
          className="rounded border px-2 py-1"
        />

        <textarea
          placeholder="Comment (optional)"
          className="rounded border px-2 py-1"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          onClick={submit}
          disabled={loading}
          className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}
