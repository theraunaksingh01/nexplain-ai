import Link from "next/link";
import { getTopicProgress } from "@/lib/progress";

type Props = {
  subject: string;
  topic: string;
  activeSubtopic: string;
};

export default async function NotesSidebar({
  subject,
  topic,
  activeSubtopic,
}: Props) {
  const progress = await getTopicProgress(subject, topic);

  if (!progress.length) {
    return (
      <p className="text-sm text-gray-500">
        No topics found.
      </p>
    );
  }

  const completedCount = progress.filter(
    (p) => p.status === "completed"
  ).length;

  const percentage = Math.round(
    (completedCount / progress.length) * 100
  );

  // find current subtopic
  const current =
    progress.find((p) => p.status !== "completed") ??
    progress[progress.length - 1];

  return (
    <div>
      {/* HEADER */}
      <div className="mb-4">
        <h3 className="text-xs font-semibold uppercase text-gray-500">
          {topic}
        </h3>

        <p className="mt-1 text-xs text-gray-400">
          {percentage}% completed
        </p>

        <div className="mt-2 h-1 w-full rounded bg-gray-200">
          <div
            className="h-1 rounded bg-indigo-600"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* SUBTOPICS */}
      <ul className="space-y-1">
        {progress.map(({ subtopic, status }) => {
          const isActive = subtopic === activeSubtopic;
          const isCurrent = subtopic === current.subtopic;

          return (
            <li key={`${topic}-${subtopic}`}>
              <Link
                href={`/notes/${subject}/${topic}/${subtopic}`}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition
                  ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <span className="capitalize">
                  {subtopic.replace("-", " ")}
                </span>

                {status === "completed" && "✔"}
                {isCurrent && status !== "completed" && "▶"}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}