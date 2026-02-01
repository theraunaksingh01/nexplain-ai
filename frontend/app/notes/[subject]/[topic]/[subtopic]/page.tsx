import { getMarkdownContent } from "@/lib/markdown";
import { getPrevNextConcept } from "@/lib/navigation";
import FeedbackBar from "@/components/notes/FeedbackBar";
import PrevNextNav from "@/components/notes/PrevNextNav";
import ScrollCompletion from "@/components/notes/ScrollCompletion";
import TrustBar from "@/components/notes/TrustBar";
import { getTopicProgress } from "@/lib/progress";
import { deriveSubtopicStates } from "@/lib/progress";
import { notFound } from "next/navigation";

/* -----------------------------
   TRUST FETCH
-------------------------------- */
async function getTrust(
  subject: string,
  topic: string,
  subtopic: string
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/trust?subject=${subject}&topic=${topic}&subtopic=${subtopic}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

/* -----------------------------
   PAGE
-------------------------------- */
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

  const progress = await getTopicProgress(subject, topic);
  const states = deriveSubtopicStates(progress);

  const current = states.find((s) => s.state === "current");

  if (
    current &&
    subtopic !== current.subtopic &&
    !states.find(
      (s) => s.subtopic === subtopic && s.state === "completed"
    )
  ) {
    notFound(); // 🚫 user tried to skip ahead
  }

  const markdownResult = await getMarkdownContent(
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


  const trust = await getTrust(subject, topic, subtopic);

  const { prev, next } = await getPrevNextConcept(
    subject,
    topic,
    subtopic
  );

  const version =
    typeof trust.current_version === "number"
      ? trust.current_version
      : 1;


  return (
    <article className="prose max-w-none">
      {/* TRUST BAR */}
      {trust && (
        <TrustBar
          version={version}
          confidence={trust.confidence}
          lastVerified={trust.last_verified}
          status={
            trust.needs_review
              ? "needs_review"
              : trust.expert_verified
                ? "verified"
                : "community"
          }
        />
      )}

      {/* CONTENT */}
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

      {/* PREV / NEXT */}
      <PrevNextNav
        subject={subject}
        topic={topic}
        currentSubtopic={subtopic}
        prev={prev}
        next={next}
      />

      {/* SCROLL COMPLETION */}
      <ScrollCompletion
        subject={subject}
        topic={topic}
        subtopic={subtopic}
      />
    </article>
  );
}
