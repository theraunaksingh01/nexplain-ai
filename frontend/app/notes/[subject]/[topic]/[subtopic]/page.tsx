import { getMarkdownContent } from "@/lib/markdown";
import AISuggestions from "@/components/notes/AISuggestions";
import FeedbackBar from "@/components/notes/FeedbackBar";


async function getConceptMeta(
    subject: string,
    topic: string,
    subtopic: string
) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/concept?subject=${subject}&topic=${topic}&subtopic=${subtopic}`,
        { cache: "no-store" }
    );

    if (!res.ok) return null;
    return res.json();
}

export default async function SubTopicPage({
    params,
}: {
    params: Promise<{
        subject: string;
        topic: string;
        subtopic: string;
    }>;
}) {
    // ✅ REQUIRED for Next.js dynamic routes
    const { subject, topic, subtopic } = await params;

    const markdownResult = await getMarkdownContent(
        subject,
        topic,
        subtopic
    );

    const dbMeta = await getConceptMeta(
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

    const { html } = markdownResult;

    return (
        <article className="prose max-w-none">
            {/* TRUST / VERSION BAR (FROM DB) */}
            {dbMeta && (
                <div className="mb-6 flex flex-wrap gap-4 rounded-lg border bg-gray-50 px-4 py-2 text-xs text-gray-600">
                    <span>
                        <strong>Version:</strong> v{dbMeta.current_version}
                    </span>

                    <span>
                        <strong>Confidence:</strong>{" "}
                        {Math.round(dbMeta.confidence * 100)}%
                    </span>

                    <span>
                        <strong>Last verified:</strong>{" "}
                        {dbMeta.last_verified
                            ? new Date(dbMeta.last_verified)
                                .toISOString()
                                .split("T")[0]
                            : "N/A"}
                    </span>
                </div>
            )}

            {/* MARKDOWN CONTENT */}
            <div
                dangerouslySetInnerHTML={{ __html: html }}
            />
            
            <FeedbackBar
                subject={subject}
                topic={topic}
                subtopic={subtopic}
            />


        </article>
    );
}
