import Link from "next/link";

type Props = {
  lastProgress: {
    subject: string;
    topic: string;
    subtopic: string;
  } | null;
};

export default function ContinueCard({ lastProgress }: Props) {
  if (!lastProgress) {
    return (
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-1">
          You’re all caught up 🎉
        </h2>
        <p className="text-sm text-gray-600">
          Start a new topic from the library.
        </p>
      </div>
    );
  }

  const { subject, topic, subtopic } = lastProgress;

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-2">
        Continue learning
      </h2>

      <p className="text-sm text-gray-600 mb-4">
        {subject.toUpperCase()} /{" "}
        {topic.replace("-", " ")} /{" "}
        {subtopic.replace("-", " ")}
      </p>

      <Link
        href={`/notes/${subject}/${topic}/${subtopic}`}
        className="inline-flex items-center rounded-lg
                   bg-indigo-600 px-5 py-2.5
                   text-sm font-medium text-white
                   hover:bg-indigo-700"
      >
        Resume →
      </Link>
    </div>
  );
}