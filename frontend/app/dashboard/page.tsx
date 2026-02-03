// app/dashboard/page.tsx
import { getDashboardSummary } from "@/lib/dashboard";
import DashboardClient from "@/components/dashboard/DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { lastProgress, topics } = await getDashboardSummary();

  return (
    <DashboardClient
      lastProgress={lastProgress}
      topics={topics}
    />
  );
}