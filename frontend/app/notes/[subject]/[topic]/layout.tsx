import NotesSidebar from "@/components/notes/NotesSidebar";
import NotesRightPanel from "@/components/notes/NotesRightPanel";

export default async function NotesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ subject: string; topic: string; subtopic: string }>;
}) {
  const { subject, topic, subtopic } = await params;

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="mx-auto grid max-w-7xl grid-cols-[260px_1fr_280px] gap-6 px-6">
        
        {/* LEFT SIDEBAR */}
        <aside className="sticky top-24 h-[calc(100vh-6rem)] rounded-xl bg-white p-4 shadow-sm">
          <NotesSidebar
            subject={subject}
            topic={topic}
            activeSubtopic={subtopic}
          />
        </aside>

        {/* MAIN CONTENT */}
        <main className="rounded-xl bg-white p-8 shadow-sm">
          {children}
        </main>

        {/* RIGHT PANEL */}
        <aside className="sticky top-24 h-fit rounded-xl bg-white p-4 shadow-sm">
          <NotesRightPanel />
        </aside>
      </div>
    </div>
  );
}
