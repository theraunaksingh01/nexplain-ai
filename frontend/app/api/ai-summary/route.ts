import { NextResponse } from "next/server";
import { getMarkdownContent } from "@/lib/markdown";
import { generateSummaryWithOllama } from "@/lib/ai";

export async function POST(req: Request) {
  const { subject, topic, subtopic } = await req.json();

  if (!subject || !topic || !subtopic) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }

  const markdown = await getMarkdownContent(
    subject,
    topic,
    subtopic
  );

  if (!markdown) {
    return NextResponse.json(
      { error: "Content not found" },
      { status: 404 }
    );
  }

  const summary = await generateSummaryWithOllama(
    markdown.plainText
  );

  return NextResponse.json({
    summary,
    disclaimer:
      "AI-generated summary. Always verify with the full explanation.",
  });
}
