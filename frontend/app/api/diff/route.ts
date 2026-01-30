import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import fs from "fs";
import path from "path";
import { diffLines } from "diff";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const conceptId = searchParams.get("conceptId");

  if (!conceptId) {
    return NextResponse.json({ diff: [] });
  }

  // 1️⃣ Get latest version (before current publish)
  const versions = await query(
    `
    SELECT markdown_path
    FROM concept_versions
    WHERE concept_id = $1
    ORDER BY version DESC
    LIMIT 1
    `,
    [conceptId]
  );

  if (!versions.length) {
    return NextResponse.json({
      diff: [],
      note: "No previous version available",
    });
  }

  const previousPath = versions[0].markdown_path;

  // 2️⃣ Load previous markdown
  const previous = fs.readFileSync(previousPath, "utf-8");

  // 3️⃣ Load current markdown (live file)
  const concept = await query(
    `
    SELECT subject, topic, subtopic
    FROM concepts
    WHERE id = $1
    `,
    [conceptId]
  );

  const { subject, topic, subtopic } = concept[0];

  const topicDir = path.join(
    process.cwd(),
    "content",
    subject,
    topic
  );

  const file = fs
    .readdirSync(topicDir)
    .find((f) => f.endsWith(`-${subtopic}.md`));

  const currentPath = path.join(topicDir, file!);
  const current = fs.readFileSync(currentPath, "utf-8");

  // 4️⃣ Compute diff
  const diff = diffLines(previous, current);

  return NextResponse.json({ diff });
}