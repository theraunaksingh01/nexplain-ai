"use client";

import { useState } from "react";
import { useRole } from "@/hooks/useRole";
import { useSession } from "next-auth/react";

export default function ReviewActions({
  conceptId,
  approvedCount,
}: {
  conceptId: string;
  approvedCount: number;
}) {
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");

  const { data: session } = useSession();
  const role = session?.user?.role;

  if (role !== "admin") {
    return (
      <div className="rounded-xl bg-gray-50 p-6 text-sm text-gray-500">
        Final publishing is restricted to administrators.
      </div>
    );
  }

  async function publish() {
    if (approvedCount === 0) {
      alert("No approved AI changes to publish.");
      return;
    }

    if (
      !confirm(
        `Apply ${approvedCount} approved changes?\nThis will update markdown and trust metrics.`
      )
    ) {
      return;
    }

    setLoading(true);

    const res = await fetch("/api/ai/patches/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conceptId,
        comment,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Failed to apply changes.");
      return;
    }

    alert("Approved changes published successfully.");
    location.reload();
  }

  return (
    <div className=" bottom-6 mt-8 rounded-xl bg-white p-6 shadow-lg">
      <h2 className="mb-2 text-lg font-semibold">
        Final Review & Publish
      </h2>

      <p className="mb-4 text-sm text-gray-600">
        {approvedCount === 0
          ? "No approved AI changes yet."
          : `${approvedCount} approved changes ready to be applied.`}
      </p>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Optional audit comment (for history)"
        className="mb-4 w-full rounded border px-3 py-2 text-sm"
        rows={3}
      />

      <button
        onClick={publish}
        disabled={loading || approvedCount === 0}
        className="w-full rounded bg-indigo-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {loading
          ? "Publishing changes…"
          : "Publish Approved Changes"}
      </button>
    </div>
  );
}
