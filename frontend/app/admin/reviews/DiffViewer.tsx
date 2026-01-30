"use client";

type DiffPart = {
  added?: boolean;
  removed?: boolean;
  value: string;
};

export default function DiffViewer({
  diff,
}: {
  diff: DiffPart[];
}) {
  if (!diff.length) {
    return (
      <p className="text-sm text-gray-500">
        No previous version to compare.
      </p>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-4 text-sm font-mono">
      {diff.map((part, idx) => (
        <pre
          key={idx}
          className={`whitespace-pre-wrap px-2 py-1 ${
            part.added
              ? "bg-green-50 text-green-800"
              : part.removed
              ? "bg-red-50 text-red-700"
              : "text-gray-800"
          }`}
        >
          {part.added && "+ "}
          {part.removed && "- "}
          {part.value}
        </pre>
      ))}
    </div>
  );
}