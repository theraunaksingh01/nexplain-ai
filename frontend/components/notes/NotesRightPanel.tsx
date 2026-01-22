export default function NotesRightPanel() {
  return (
    <div className="space-y-4">
      {/* AI SUMMARY */}
      <div className="rounded-xl border bg-white p-4">
        <p className="text-sm font-medium text-gray-900">
          🤖 AI Summary
        </p>

        <button className="mt-3 w-full rounded-lg border px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 transition">
          Generate summary
        </button>
      </div>

      {/* LEARNING TIP */}
      <div className="rounded-xl bg-indigo-50 p-4 text-sm">
        <p className="font-medium text-indigo-700">
          Learning tip
        </p>
        <p className="mt-1 text-indigo-600">
          If this feels unclear, re-read the intuition or try the AI summary.
        </p>
      </div>

      {/* COMPLETION */}
      <button className="w-full rounded-full bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition">
        Mark as Completed
      </button>
    </div>
  );
}
