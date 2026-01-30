"use client";

import { useEffect, useState } from "react";

type Patch = {
  id: string;
  patch_type: string;
  ai_reason: string;
  edited_markdown: string | null;
  status: "pending" | "approved" | "rejected" | "applied";
};

export default function AIPatchList({
  conceptId,
  onApprovedCountChange,
}: {
  conceptId: string;
  onApprovedCountChange: (count: number) => void;
}) {
  const [patches, setPatches] = useState<Patch[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);

    const res = await fetch(
      `/api/ai/patches?conceptId=${conceptId}`
    );
    const data = await res.json();
    const list: Patch[] = data.patches || [];

    setPatches(list);
    setLoading(false);

    onApprovedCountChange(
      list.filter(p => p.status === "approved").length
    );
  }

  async function saveEdit(patchId: string, value: string) {
    await fetch("/api/ai/patches/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patchId,
        editedMarkdown: value,
      }),
    });
  }

  async function act(
    patch: Patch,
    action: "approved" | "rejected"
  ) {
    if (
      action === "approved" &&
      (!patch.edited_markdown ||
        patch.edited_markdown.trim().length === 0)
    ) {
      alert("Please add content before approving.");
      return;
    }

    await fetch("/api/ai/patches/action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patchId: patch.id, action }),
    });

    load();
  }

  useEffect(() => {
    if (conceptId) load();
  }, [conceptId]);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading AI suggestions…</p>;
  }

  if (!patches.length) {
    return <p className="text-sm text-gray-500">No AI-suggested improvements.</p>;
  }

  return (
    <div className="space-y-6">
      {patches.map((p) => (
        <div
          key={p.id}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          {/* HEADER */}
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-indigo-600">
              {p.patch_type.replace("_", " ")}
            </span>

            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
              {p.status}
            </span>
          </div>

          {/* AI REASON */}
          <div className="mb-4 text-sm text-gray-700">
            <strong>Why AI flagged this:</strong>
            <p className="mt-1">{p.ai_reason}</p>
          </div>

          {/* EDITOR */}
          <textarea
            defaultValue={p.edited_markdown || ""}
            disabled={p.status !== "pending"}
            placeholder="Write the final content to be added…"
            onBlur={(e) => saveEdit(p.id, e.target.value)}
            className={`w-full rounded border px-3 py-2 text-sm ${p.status !== "pending"
                ? "bg-gray-50 cursor-not-allowed"
                : ""
              }`}
            rows={5}
          />

          {/* ACTIONS */}
          {p.status === "pending" && (
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => act(p, "approved")}
                className="rounded bg-green-600 px-3 py-1 text-xs text-white hover:bg-green-700"
              >
                Approve
              </button>

              <button
                onClick={() => act(p, "rejected")}
                className="rounded bg-gray-200 px-3 py-1 text-xs text-gray-700 hover:bg-gray-300"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}