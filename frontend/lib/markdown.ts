import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export type MarkdownResult = {
  html: string;
  plainText: string;
  meta: {
    title?: string;
    level?: string;
    confidence?: number;
    last_verified?: string;
  };
};

export async function getMarkdownContent(
  subject: string,
  topic: string,
  subtopic: string
): Promise<MarkdownResult | null> {
  const topicDir = path.join(CONTENT_ROOT, subject, topic);

  console.log("📂 Looking in:", topicDir);

  if (!fs.existsSync(topicDir)) {
    console.error("❌ Topic directory does not exist");
    return null;
  }

  // ✅ Find numbered markdown file (e.g. 03-inheritance.md)
  const files = fs.readdirSync(topicDir);

  const matchedFile = files.find((file) =>
    file.endsWith(`-${subtopic}.md`)
  );

  if (!matchedFile) {
    console.error("❌ Markdown file not found for subtopic:", subtopic);
    return null;
  }

  const filePath = path.join(topicDir, matchedFile);
  console.log("✅ Loading markdown:", filePath);

  const raw = fs.readFileSync(filePath, "utf-8");

  // ✅ Parse frontmatter
  const { content, data } = matter(raw);

  // ✅ Markdown → HTML (UI rendering)
  const html = marked.parse(content) as string;

  // ✅ Markdown → Plain text (AI / analytics / summaries)
  const plainText = content
    .replace(/```[\s\S]*?```/g, "") // remove code blocks
    .replace(/[#>*_`]/g, "")       // remove markdown symbols
    .replace(/\n{2,}/g, "\n")      // normalize newlines
    .trim();

  return {
    html,
    plainText,
    meta: {
      title: data.title,
      level: data.level,
      confidence: data.confidence,
      last_verified: data.last_verified,
    },
  };
}
