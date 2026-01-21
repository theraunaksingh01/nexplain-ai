"use client";

import { useState } from "react";

export default function ReviewCard({ concept }: { concept: any }) {
  const [decision, setDecision] = useState("approved");
  const [delta, setDelta] = useState(0.1);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitReview() {
    setLoading(true);

    await fetch("/api/expert-review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...concept,
        expert_name: "Internal Reviewer",
        decision,
        confidence_delta: delta,
        comment,
      }),
    });

    setLoading(false);
    alert("Review submitted");
  }

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="mb-2">
        <p className="text-sm font-medium">
          {concept.subject} / {concept.topic} /{" "}
          <span className="text-indigo-600">
            {concept.subtopic}
          </span>
        </p>

        <p className="text-xs text-gray-500">
          Confidence: {(concept.confidence * 100).toFixed(0)}%
        </p>
      </div>

      <div className="mt-3 grid gap-2 text-sm">
        <select
          value={decision}
          onChange={(e) => setDecision(e.target.value)}
          className="rounded border px-2 py-1"
        >
          <option value="approved">Approve</option>
          <option value="needs_changes">Needs Changes</option>
          <option value="rejected">Reject</option>
        </select>

        <input
          type="number"
          step="0.05"
          min="-0.5"
          max="0.5"
          value={delta}
          onChange={(e) => setDelta(Number(e.target.value))}
          className="rounded border px-2 py-1"
          placeholder="Confidence delta"
        />

        <textarea
          placeholder="Comment (optional)"
          className="rounded border px-2 py-1"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          onClick={submitReview}
          disabled={loading}
          className="mt-2 rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
}
