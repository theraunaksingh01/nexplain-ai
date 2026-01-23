"use client";

import { useEffect, useState } from "react";

type SubjectProgress = {
  subject: string;
  total: number;
  completed: number;
};

export default function SubjectProgress() {
  const [data, setData] = useState<SubjectProgress[]>([]);

  useEffect(() => {
    fetch("/api/subject-progress")
      .then((res) => res.json())
      .then((res) => setData(res.subjects || []));
  }, []);

  if (!data.length) return null;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Your Progress
      </h3>

      <ul className="space-y-3">
        {data.map((item) => {
          const percent =
            item.total === 0
              ? 0
              : Math.round((item.completed / item.total) * 100);

          return (
            <li key={item.subject}>
              <div className="flex justify-between text-sm">
                <span className="font-medium">
                  {item.subject.toUpperCase()}
                </span>
                <span className="text-gray-500">
                  {item.completed} / {item.total}
                </span>
              </div>

              <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-indigo-600"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
