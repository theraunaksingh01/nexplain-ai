import fs from "fs";
import path from "path";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export function getOrderedSubtopics(
  subject: string,
  topic: string
) {
  const dir = path.join(CONTENT_ROOT, subject, topic);

  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort() // 👈 numeric prefix sorting
    .map((file) => {
      const slug = file
        .replace(/^\d+-/, "")
        .replace(".md", "");

      return {
        slug,
        file,
      };
    });
}
