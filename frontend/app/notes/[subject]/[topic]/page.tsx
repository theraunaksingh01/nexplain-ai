// app/notes/[subject]/[topic]/page.tsx
import { redirect } from "next/navigation";
import { getTopicProgress } from "@/lib/progress";

export default async function TopicIntroPage({
  params,
}: {
  params: Promise<{ subject: string; topic: string }>;
}) {
  const { subject, topic } = await params;

  const progress = await getTopicProgress(subject, topic);

  // no subtopics at all → fallback UI
  if (!progress.length) {
    return (
      <div className="prose max-w-none">
        <h1 className="capitalize">{topic}</h1>
        <p>No content available yet.</p>
      </div>
    );
  }

  // find first unfinished subtopic
  const next = progress.find(
    (p) => p.status !== "completed"
  );

  // resume where user left
  if (next) {
    redirect(`/notes/${subject}/${topic}/${next.subtopic}`);
  }

  // all completed → go to last subtopic
  const last = progress[progress.length - 1];
  redirect(`/notes/${subject}/${topic}/${last.subtopic}`);
}