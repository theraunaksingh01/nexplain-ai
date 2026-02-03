import Link from "next/link";

type Topic = {
  subject: string;
  topic: string;
  progress: number;
};

export default function TopicsGrid({
  topics,
}: {
  topics: Topic[];
}) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {topics.map(({ subject, topic, progress }) => {
        const isCompleted = progress === 100;

        return (
          <div
            key={`${subject}-${topic}`}
            className="rounded-2xl border bg-white p-5 shadow-sm
                       flex flex-col justify-between"
          >
            {/* HEADER */}
            <div>
              <h3 className="text-lg font-semibold capitalize">
                {topic.replace("-", " ")}
              </h3>

              <p className="mt-1 text-xs uppercase tracking-wide text-gray-400">
                {subject}
              </p>
            </div>

            {/* PROGRESS */}
            <div className="mt-5">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>

              <div className="h-2 w-full rounded bg-gray-200">
                <div
                  className="h-2 rounded bg-indigo-600 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-6 flex gap-3">
              {isCompleted ? (
                <>
                  <Link
                    href={`/notes/${subject}/${topic}`}
                    className="flex-1 rounded-lg border px-4 py-2
                               text-sm font-medium text-gray-700
                               hover:bg-gray-50 text-center"
                  >
                    Review
                  </Link>

                  <Link
                    href={`/notes/${subject}/${topic}`}
                    className="flex-1 rounded-lg bg-indigo-600 px-4 py-2
                               text-sm font-medium text-white
                               hover:bg-indigo-700 text-center"
                  >
                    Open
                  </Link>
                </>
              ) : (
                <Link
                  href={`/notes/${subject}/${topic}`}
                  className="flex-1 rounded-lg bg-indigo-600 px-4 py-2
                             text-sm font-medium text-white
                             hover:bg-indigo-700 text-center"
                >
                  Resume →
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}