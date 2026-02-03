"use client";

import { useState } from "react";
import ReaderSidebar from "./ReaderSidebar";
import SidebarDrawer from "./SidebarDrawer";
import ContinueCard from "./ContinueCard";
import TopicsGrid from "./TopicsGrid";

type Topic = {
  subject: string;
  topic: string;
  progress: number;
  nextSubtopic: string | null;
};

type Props = {
  lastProgress: any;
  topics: Topic[];
};

export default function DashboardClient({
  lastProgress,
  topics,
}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <ReaderSidebar />
      </div>

      {/* Mobile drawer */}
      <SidebarDrawer
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        topics={topics}   // ✅ THIS WAS MISSING BEFORE
      />

      <main className="flex-1 p-8 space-y-8">
        <ContinueCard lastProgress={lastProgress} />
        <TopicsGrid topics={topics} />
      </main>
    </div>
  );
}