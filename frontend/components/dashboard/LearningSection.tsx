"use client";

import { useState } from "react";
import SidebarTopicLink from "./SidebarTopicLink";
import { ChevronDown } from "lucide-react";

type Topic = {
  subject: string;
  topic: string;
  progress: number;
  nextSubtopic: string | null; 
};

type Props = {
  grouped: Record<string, Topic[]>;
};

export default function LearningSection({ grouped }: Props) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  return (
    <div className="pt-4 border-t">
      <p className="mb-3 px-3 text-xs font-semibold uppercase text-gray-400">
        Learning
      </p>

      <div className="space-y-3">
        {Object.entries(grouped).map(([subject, topics]) => {
          const isCollapsed = collapsed[subject];

          return (
            <div key={subject}>
              <button
                onClick={() =>
                  setCollapsed((c) => ({
                    ...c,
                    [subject]: !c[subject],
                  }))
                }
                className="flex w-full items-center justify-between
                           px-3 py-1 text-xs font-semibold
                           text-gray-500 hover:text-gray-700"
              >
                <span>{subject}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isCollapsed ? "-rotate-90" : ""
                  }`}
                />
              </button>

              {!isCollapsed && (
                <div className="mt-1 space-y-1">
                  {topics.map((t) => (
                    <SidebarTopicLink key={t.topic} topic={t} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}