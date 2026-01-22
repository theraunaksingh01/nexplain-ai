"use client";

import Link from "next/link";

type Props = {
  subject: string;
  topic: string;
  currentSubtopic: string;
  prev?: { subtopic: string } | null;
  next?: { subtopic: string } | null;
};

export default function PrevNextNav({
  subject,
  topic,
  currentSubtopic,
  prev,
  next,
}: Props) {
  async function handleNext() {
    await fetch("/api/progress/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject,
        topic,
        subtopic: currentSubtopic,
      }),
    });
  }

  return (
    <div className="mt-12 flex justify-between border-t pt-6">
      {prev ? (
        <Link
          href={`/notes/${subject}/${topic}/${prev.subtopic}`}
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          ← {prev.subtopic.replace("-", " ")}
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link
          onClick={handleNext}
          href={`/notes/${subject}/${topic}/${next.subtopic}`}
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          {next.subtopic.replace("-", " ")} →
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
