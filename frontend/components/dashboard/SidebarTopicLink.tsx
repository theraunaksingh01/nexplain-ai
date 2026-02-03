"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarTopicLink({ topic }: any) {
  const pathname = usePathname();
  const href = `/notes/${topic.subject}/${topic.topic}`;
  const active = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`flex items-center justify-between
        rounded-lg px-3 py-2 text-sm
        ${active
          ? "bg-indigo-50 text-indigo-700 font-medium"
          : "hover:bg-gray-100"}`}
    >
      <span className="capitalize">{topic.topic}</span>
      {topic.progress === 100 && (
        <span className="text-green-500">✓</span>
      )}
    </Link>
  );
}