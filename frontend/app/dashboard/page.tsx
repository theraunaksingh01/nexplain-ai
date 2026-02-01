import ContinueCard from "@/components/dashboard/ContinueCard";
import ReaderProfileCard from "@/components/dashboard/ReaderProfileCard";
import TopicsGrid from "@/components/dashboard/TopicsGrid";
import { getDashboardSummary } from "@/lib/dashboard";

export default async function DashboardPage() {
  const data = await getDashboardSummary();

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 space-y-12">
      <div>
        <h1 className="text-3xl font-bold">
          Your Dashboard
        </h1>
        <p className="mt-2 text-gray-600">
          Pick up right where you left off.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <ReaderProfileCard />
        
      </div>

      <ContinueCard lastProgress={data.lastProgress} />

      <div>
        <h2 className="mb-4 text-lg font-semibold">
          Your topics
        </h2>
        <TopicsGrid topics={data.topics} />
      </div>
    </div>
  );
}