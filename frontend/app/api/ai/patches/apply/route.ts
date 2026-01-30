import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const { conceptId, comment } = await req.json();

  if (!conceptId) {
    return NextResponse.json(
      { error: "Missing conceptId" },
      { status: 400 }
    );
  }

  /* -------------------------------------------------
     1️⃣ FETCH CONCEPT INFO
  -------------------------------------------------- */
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

  /* -------------------------------------------------
     2️⃣ FETCH APPROVED PATCHES
  -------------------------------------------------- */
  const patches = await query(
    `
    SELECT id, patch_type, edited_markdown
    FROM ai_content_patches
    WHERE concept_id = $1
      AND status = 'approved'
    ORDER BY created_at ASC
    `,
    [conceptId]
  );

  if (!patches.length) {
    return NextResponse.json(
      { error: "No approved patches to apply" },
      { status: 400 }
    );
  }

  /* -------------------------------------------------
     3️⃣ LOCATE MAIN MARKDOWN FILE
  -------------------------------------------------- */
  const topicDir = path.join(
    process.cwd(),
    "content",
    subject,
    topic
  );

  const fileName = fs
    .readdirSync(topicDir)
    .find((f) => f.endsWith(`-${subtopic}.md`));

  if (!fileName) {
    return NextResponse.json(
      { error: "Markdown file not found" },
      { status: 404 }
    );
  }

  const mainFilePath = path.join(topicDir, fileName);
  const currentMarkdown = fs.readFileSync(
    mainFilePath,
    "utf-8"
  );

  /* -------------------------------------------------
     4️⃣ DETERMINE NEXT VERSION
  -------------------------------------------------- */
  const versionRows = await query(
    `
    SELECT COALESCE(MAX(version), 0) + 1 AS next_version
    FROM concept_versions
    WHERE concept_id = $1
    `,
    [conceptId]
  );

  const nextVersion = versionRows[0].next_version;

  /* -------------------------------------------------
     5️⃣ SAVE SNAPSHOT TO .versions/
  -------------------------------------------------- */
  const versionsDir = path.join(topicDir, ".versions");

  if (!fs.existsSync(versionsDir)) {
    fs.mkdirSync(versionsDir);
  }

  const versionFileName = `v${nextVersion}.md`;
  const versionFilePath = path.join(
    versionsDir,
    versionFileName
  );

  fs.writeFileSync(
    versionFilePath,
    currentMarkdown,
    "utf-8"
  );

  /* -------------------------------------------------
     6️⃣ INSERT VERSION RECORD
  -------------------------------------------------- */
  await query(
    `
    INSERT INTO concept_versions (
      concept_id,
      version,
      markdown_path,
      created_by,
      change_summary
    )
    VALUES ($1, $2, $3, 'human', $4)
    `,
    [
      conceptId,
      nextVersion,
      versionFilePath,
      comment || `Applied ${patches.length} AI-approved changes`,
    ]
  );

  /* -------------------------------------------------
     7️⃣ APPLY PATCHES TO MAIN MARKDOWN
  -------------------------------------------------- */
  let updatedMarkdown = currentMarkdown;

  updatedMarkdown += `\n\n---\n\n## AI Improvements\n`;

  for (const p of patches) {
    updatedMarkdown += `\n### ${p.patch_type.replace("_", " ")}\n\n`;
    updatedMarkdown += p.edited_markdown + "\n";
  }

  fs.writeFileSync(
    mainFilePath,
    updatedMarkdown,
    "utf-8"
  );

  /* -------------------------------------------------
     8️⃣ MARK PATCHES AS APPLIED
  -------------------------------------------------- */
  await query(
    `
    UPDATE ai_content_patches
    SET status = 'applied',
        applied_at = now()
    WHERE concept_id = $1
      AND status = 'approved'
    `,
    [conceptId]
  );

  // 🔍 AUDIT LOG — publish action
  await query(
    `
  INSERT INTO audit_events
    (concept_id, event_type, actor_role, details)
  VALUES ($1, 'publish', 'admin', $2)
  `,
    [
      conceptId,
      JSON.stringify({
        version: nextVersion,
        applied: patches.length,
      }),
    ]
  );

  return NextResponse.json({
    success: true,
    version: nextVersion,
    applied: patches.length,
  });
}