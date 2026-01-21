"use client";

import { useParams } from "next/navigation";
import AISummary from "@/components/notes/AISummary";

export default function NotesRightPanel() {
  const params = useParams();

  const subject = params.subject as string;
  const topic = params.topic as string;
  const subtopic = params.subtopic as string;

  return (
    <div className="space-y-6">
      {/* PROGRESS CARD */}
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <p className="text-sm font-medium text-gray-700">
          Your Progress
        </p>

        <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
          <div className="h-2 w-1/4 rounded-full bg-indigo-600" />
        </div>

        <p className="mt-1 text-xs text-gray-500">
          25% completed
        </p>
      </div>

      {/* AI SUMMARY CARD */}
      <AISummary
        subject={subject}
        topic={topic}
        subtopic={subtopic}
      />

      {/* MOTIVATION / GUIDANCE */}
      <div className="rounded-xl bg-indigo-50 p-4 text-sm">
        <p className="font-medium text-indigo-700">
          Learning tip
        </p>
        <p className="mt-1 text-indigo-600">
          If this feels unclear, try the AI summary or
          re-read the intuition section.
        </p>
      </div>

      {/* COMPLETION CTA */}
      <button className="w-full rounded-full bg-indigo-600 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
        Mark as Completed
      </button>
    </div>
  );
}
