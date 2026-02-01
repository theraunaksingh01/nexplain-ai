// components/dashboard/ReaderProfileCard.tsx
import { getAnonUserId } from "@/lib/user";

export default async function ReaderProfileCard() {
  const anonId = await getAnonUserId();
  const shortId = anonId?.slice(0, 8) ?? "guest";

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm flex gap-4">
      {/* Avatar */}
      <div className="h-12 w-12 rounded-full bg-indigo-600
                      text-white flex items-center justify-center font-semibold">
        {shortId[0].toUpperCase()}
      </div>

      {/* Info */}
      <div>
        <p className="text-sm font-medium">Reader</p>
        <p className="text-xs text-gray-500">ID: {shortId}</p>
      </div>
    </div>
  );
}