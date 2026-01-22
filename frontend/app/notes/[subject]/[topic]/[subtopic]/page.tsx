import { getMarkdownContent } from "@/lib/markdown";
import { getPrevNextConcept } from "@/lib/navigation";
import FeedbackBar from "@/components/notes/FeedbackBar";
import PrevNextNav from "@/components/notes/PrevNextNav";
import ScrollCompletion from "@/components/notes/ScrollCompletion";

export default async function SubTopicPage({
  params,
}: {
  params: Promise<{
    subject: string;
    topic: string;
    subtopic: string;
  }>;
}) {
  const { subject, topic, subtopic } = await params;

  const markdownResult = await getMarkdownContent(
    subject,
    topic,
    subtopic
  );

  const { prev, next } = await getPrevNextConcept(
    subject,
    topic,
    subtopic
  );

  if (!markdownResult) {
    return (
      <div className="text-sm text-gray-500">
        Content not found.
      </div>
    );
  }

  return (
    <article className="prose max-w-none">
      <div
        dangerouslySetInnerHTML={{
          __html: markdownResult.html,
        }}
      />

      {/* FEEDBACK */}
      <div className="mt-10">
        <FeedbackBar
          subject={subject}
          topic={topic}
          subtopic={subtopic}
        />
      </div>

      {/* NAVIGATION */}
      <PrevNextNav
        subject={subject}
        topic={topic}
        currentSubtopic={subtopic}
        prev={prev}
        next={next}
      />

      <ScrollCompletion
        subject={subject}
        topic={topic}
        subtopic={subtopic}
      />

    </article>
  );
}
