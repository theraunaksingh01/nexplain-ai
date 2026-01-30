import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const { conceptId } = await req.json();

  if (!conceptId) {
    return NextResponse.json(
      { error: "Missing conceptId" },
      { status: 400 }
    );
  }

  // 1️⃣ Get concept info
  const concepts = await query(
    `
    SELECT subject, topic, subtopic
    FROM concepts
    WHERE id = $1
    `,
    [conceptId]
  );

  if (!concepts.length) {
    return NextResponse.json(
      { error: "Concept not found" },
      { status: 404 }
    );
  }

  const { subject, topic, subtopic } = concepts[0];

  // 2️⃣ Get approved patches
  const patches = await query(
    `
  SELECT patch_type, edited_markdown
  FROM ai_content_patches
  WHERE concept_id = $1
    AND status = 'approved'
    AND edited_markdown IS NOT NULL
  ORDER BY created_at ASC
  `,
    [conceptId]
  );

  if (!patches.length) {
    return NextResponse.json(
      { error: "No approved patches" },
      { status: 400 }
    );
  }

  // 3️⃣ Locate markdown file
  const topicDir = path.join(
    process.cwd(),
    "content",
    subject,
    topic
  );

  const file = fs
    .readdirSync(topicDir)
    .find((f) => f.endsWith(`-${subtopic}.md`));

  if (!file) {
    return NextResponse.json(
      { error: "Markdown file not found" },
      { status: 404 }
    );
  }

  const filePath = path.join(topicDir, file);
  let md = fs.readFileSync(filePath, "utf-8");

  // 4️⃣ Append patches (safe MVP behavior)
  md += `\n\n---\n\n## AI Improvements\n`;

  for (const p of patches) {
    md += `\n### ${p.patch_type}\n\n`;
    md += p.edited_markdown + "\n";
  }

  fs.writeFileSync(filePath, md, "utf-8");

  // 5️⃣ Mark patches as applied
  await query(
    `
  UPDATE ai_content_patches
  SET applied_at = now(),
      status = 'applied'
  WHERE concept_id = $1 AND status = 'approved'
  `,
    [conceptId]
  );

  await query(
    `
  UPDATE concepts
  SET
    confidence = LEAST(confidence + 0.1, 1),
    last_verified = now()
  WHERE id = $1
  `,
    [conceptId]
  );


  return NextResponse.json({
    success: true,
    applied: patches.length,
  });
}
