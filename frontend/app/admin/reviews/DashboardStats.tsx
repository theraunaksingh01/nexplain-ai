export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      
      <StatCard title="Avg Confidence" value="68%" />
      <StatCard title="Needs Review" value="3" />
      <StatCard title="AI Flags" value="5" />

    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <p className="text-xs text-gray-500">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-gray-900">
        {value}
      </p>
    </div>
  );
}
