"use client";

import ReaderSidebar from "./ReaderSidebar";

type Topic = {
  subject: string;
  topic: string;
  progress: number;
  nextSubtopic: string | null;
};

type Props = {
  open: boolean;
  onClose: () => void;
  topics: Topic[];
};

export default function SidebarDrawer({
  open,
  onClose,
  topics,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-64 bg-white shadow-xl">
        <ReaderSidebar/>
      </div>
    </div>
  );
}