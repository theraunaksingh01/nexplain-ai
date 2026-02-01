import Link from "next/link";

type TopicProgressCardProps = {
  subject: string;
  topic: string;
  progress: number;
  status: "completed" | "in_progress";
  lastSubtopic: string;
};

export default function TopicProgressCard({
  subject,
  topic,
  progress,
  status,
  lastSubtopic,
}: TopicProgressCardProps) {
  const isStarted = progress > 0;

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-3">
        <h3 className="font-medium capitalize">
          {topic.replace("-", " ")}
        </h3>
        <p className="text-xs text-gray-500">
          {subject.toUpperCase()}
        </p>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="mb-1 flex justify-between text-xs text-gray-600">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-100">
          <div
            className="h-2 rounded-full bg-indigo-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* CTA */}
      <Link
        href={`/notes/${subject}/${topic}/${lastSubtopic}`}
        className="text-sm font-medium text-indigo-600 hover:underline"
      >
        {status === "completed" ? "Review →" : "Resume →"}
      </Link>
    </div>
  );
}