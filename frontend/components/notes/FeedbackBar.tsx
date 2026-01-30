"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FeedbackBar({
  subject,
  topic,
  subtopic,
}: {
  subject: string;
  topic: string;
  subtopic: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<null | "clear" | "confusing">(null);

  async function sendFeedback(type: "clear" | "confusing") {
    setLoading(type);

    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject,
        topic,
        subtopic,
        feedback: type,
      }),
    });

    setLoading(null);
    router.refresh();
  }

  return (
    <div className="mt-12 rounded-xl border bg-gray-50 px-6 py-4">
      <p className="mb-3 text-sm font-medium text-gray-700">
        Was this explanation helpful?
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => sendFeedback("clear")}
          disabled={loading !== null}
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition
            ${
              loading === "clear"
                ? "bg-green-50 border-green-400 text-green-700"
                : "bg-white hover:bg-green-50"
            }`}
        >
          👍 Clear
        </button>

        <button
          onClick={() => sendFeedback("confusing")}
          disabled={loading !== null}
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition
            ${
              loading === "confusing"
                ? "bg-amber-50 border-amber-400 text-amber-700"
                : "bg-white hover:bg-amber-50"
            }`}
        >
          🤔 Needs improvement
        </button>
      </div>
    </div>
  );
}
