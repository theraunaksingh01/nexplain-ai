import ReviewQueue from "./ReviewQueue";
import DashboardStats from "./DashboardStats";

export default async function ReviewsPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-8 py-16">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* HEADER */}
        <header>
          <h1 className="mt-8 text-2xl font-semibold text-gray-900 ">
            Expert Review Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor content quality, AI findings, and expert decisions
          </p>
        </header>

        {/* STATS */}
        <DashboardStats />

        {/* REVIEW QUEUE */}
        <ReviewQueue />
      </div>
    </div>
  );
}
