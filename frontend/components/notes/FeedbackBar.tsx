"use client";

export default function FeedbackBar({
  subject,
  topic,
  subtopic,
}: {
  subject: string;
  topic: string;
  subtopic: string;
}) {
  const sendFeedback = async (feedback: "clear" | "confusing") => {
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject,
        topic,
        subtopic,
        feedback,
      }),
    });
  };

  return (
    <div className="mt-10 flex items-center justify-center gap-4 border-t pt-6 text-sm text-gray-600">
      <span>Was this explanation clear?</span>

      <button
        onClick={() => sendFeedback("clear")}
        className="rounded-full bg-green-50 px-4 py-1 text-green-700 hover:bg-green-100"
      >
        👍 Yes
      </button>

      <button
        onClick={() => sendFeedback("confusing")}
        className="rounded-full bg-red-50 px-4 py-1 text-red-700 hover:bg-red-100"
      >
        👎 Confusing
      </button>
    </div>
  );
}
