import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { analyzeContentWithAI } from "@/lib/aiAnalyzer";
import { getMarkdownContent } from "@/lib/markdown";
import { generatePatchesFromAnalysis } from "@/lib/aiPatchGenerator";

export async function POST(req: Request) {
  const { conceptId } = await req.json();

  if (!conceptId) {
    return NextResponse.json(
      { error: "Missing conceptId" },
      { status: 400 }
    );
  }

  const pending = await query(
    `
  SELECT 1
  FROM ai_content_patches
  WHERE concept_id = $1
    AND status = 'pending'
  LIMIT 1
  `,
    [conceptId]
  );

  if (pending.length > 0) {
    return NextResponse.json(
      {
        error:
          "AI suggestions already exist for this topic. Review or resolve them before running analysis again.",
      },
      { status: 400 }
    );
  }

  /* -------------------------------------------------
     1️⃣ Fetch concept identifiers
  -------------------------------------------------- */
  const conceptRows = await query(
    `
    SELECT subject, topic, subtopic
    FROM concepts
    WHERE id = $1
    `,
    [conceptId]
  );

  if (!conceptRows.length) {
    return NextResponse.json(
      { error: "Concept not found" },
      { status: 404 }
    );
  }

  const { subject, topic, subtopic } = conceptRows[0];

  /* -------------------------------------------------
     2️⃣ Load markdown content
  -------------------------------------------------- */
  const md = await getMarkdownContent(subject, topic, subtopic);

  if (!md) {
    console.error("❌ Markdown missing", {
      subject,
      topic,
      subtopic,
    });

    return NextResponse.json(
      { error: "Markdown file not found" },
      { status: 404 }
    );
  }

  let contentForAI = md.plainText;

  // Allow weak / short content
  if (!contentForAI || contentForAI.length < 50) {
    console.warn("⚠️ Markdown too small, using fallback input");

    contentForAI = `
Topic: ${subtopic}

This topic exists but the explanation is very short.
Analyze what is missing and suggest improvements.
`;
  }

  /* -------------------------------------------------
     3️⃣ Run AI analysis
  -------------------------------------------------- */
  const analysis = await analyzeContentWithAI(contentForAI);

  /* -------------------------------------------------
     4️⃣ Persist AI analysis
  -------------------------------------------------- */
  const analysisInsert = await query(
    `
    INSERT INTO ai_analysis_history
      (concept_id, analysis, model)
    VALUES ($1, $2, 'ollama-tinyllama')
    RETURNING id
    `,
    [conceptId, analysis]
  );

  const analysisId = analysisInsert[0].id;

  /* -------------------------------------------------
     5️⃣ Generate concrete AI patches
  -------------------------------------------------- */
  for (const patch of analysis.suggested_patches) {
    await query(
      `
    INSERT INTO ai_content_patches
      (
        analysis_id,
        concept_id,
        patch_type,
        ai_reason,
        status
      )
    VALUES
      ($1, $2, $3, $4, 'pending')
    `,
      [
        analysisId,
        conceptId,
        patch.patch_type,
        patch.reason, // ✅ THIS IS THE KEY
      ]
    );
  }
  console.log("✅ AI analysis + patches created", {
    conceptId,
    patches: analysis.suggested_patches.length,
  });

  // 🔍 AUDIT LOG — AI analysis run
  await query(
    `
  INSERT INTO audit_events
    (concept_id, event_type, actor_role, details)
  VALUES ($1, 'ai_analysis', 'system', $2)
  `,
    [
      conceptId,
      JSON.stringify({
        patches_created: analysis.suggested_patches.length,
      }),
    ]
  );

  return NextResponse.json({
    success: true,
    patches_created: analysis.suggested_patches.length,
  });
}
