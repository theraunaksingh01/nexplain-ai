import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export type MarkdownResult = {
  html: string;
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
  const filePath = path.join(
    CONTENT_ROOT,
    subject,
    topic,
    `${subtopic}.md`
  );

  console.log("Loading markdown from:", filePath);

  if (!fs.existsSync(filePath)) {
    console.error("❌ File does not exist");
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");

  // ✅ Parse frontmatter
  const { content, data } = matter(raw);

  // ✅ Convert markdown → HTML
  const html = marked.parse(content) as string;


  return {
    html,
    meta: {
      title: data.title,
      level: data.level,
      confidence: data.confidence,
      last_verified: data.last_verified,
    },
  };
}
