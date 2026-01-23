"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type LastRead = {
  subject: string;
  topic: string;
  subtopic: string;
};

export default function ResumeLearning() {
  const [last, setLast] = useState<LastRead | null>(null);

  useEffect(() => {
    fetch("/api/resume")
      .then((res) => res.json())
      .then((data) => setLast(data.last));
  }, []);

  if (!last) return null;

  return (
    <section className="mx-auto max-w-5xl px-6">
      <div className="flex flex-col gap-4 rounded-2xl border bg-gradient-to-br from-indigo-50 to-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        
        {/* LEFT */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-indigo-500">
            Continue learning
          </p>

          <h3 className="mt-1 text-lg font-semibold text-gray-900">
            {last.subtopic.replace(/-/g, " ")}
          </h3>

          <p className="mt-1 text-sm text-gray-600">
            You last read this topic. Pick up right where you left off.
          </p>
        </div>

        {/* RIGHT */}
        <Link
          href={`/notes/${last.subject}/${last.topic}/${last.subtopic}`}
          className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          Resume
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
