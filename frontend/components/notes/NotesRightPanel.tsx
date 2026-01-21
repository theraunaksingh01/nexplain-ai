export default function NotesRightPanel() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium text-gray-700">
          Your Progress
        </p>
        <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
          <div className="h-2 w-1/4 rounded-full bg-indigo-600" />
        </div>
        <p className="mt-1 text-xs text-gray-500">25% completed</p>
      </div>

      <div className="rounded-lg bg-indigo-50 p-4 text-sm">
        <p className="font-medium text-indigo-700">
          Feeling confident?
        </p>
        <p className="mt-1 text-indigo-600">
          Move to the next concept once this is clear.
        </p>
      </div>

      <button className="w-full rounded-full bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition">
        Mark as Completed
      </button>
    </div>
  );
}
