"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

type TopicMap = {
  [key: string]: string[];
};

// 🔒 Centralized topic registry (can move to DB later)
const TOPICS: TopicMap = {
  oops: [
    "Introduction",
    "Classes",
    "Objects",
    "Inheritance",
    "Polymorphism",
    "Abstraction",
    "Encapsulation",
  ],
};

export default function NotesSidebar() {
  const params = useParams();

  // ✅ Extract params safely
  const subject = Array.isArray(params.subject)
    ? params.subject[0]
    : params.subject;

  const topic = Array.isArray(params.topic)
    ? params.topic[0]
    : params.topic;

  const activeSubtopic = Array.isArray(params.subtopic)
    ? params.subtopic[0]
    : params.subtopic ?? "introduction";

  // 🛑 Guard: invalid route or topic not registered
  if (!subject || !topic || !TOPICS[topic]) {
    return (
      <p className="text-sm text-gray-500">
        No topics found
      </p>
    );
  }

  return (
    <div>
      {/* Topic title */}
      <h3 className="mb-4 text-xs font-semibold uppercase text-gray-500">
        {topic}
      </h3>

      {/* Topic list */}
      <ul className="space-y-1">
        {TOPICS[topic].map((item: string) => {
          const slug = item.toLowerCase().replace(/\s+/g, "-");
          const isActive = activeSubtopic === slug;

          return (
            <li key={item}>
              <Link
                href={`/notes/${subject}/${topic}/${slug}`}
                className={`block rounded-lg px-3 py-2 text-sm transition
                  ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {item}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
