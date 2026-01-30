import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const { conceptId, targetVersion } = await req.json();

  if (!conceptId || !targetVersion) {
    return NextResponse.json(
      { error: "Missing parameters" },
      { status: 400 }
    );
  }

  // 1️⃣ Get target version
  const versions = await query(
    `
    SELECT markdown_path
    FROM concept_versions
    WHERE concept_id = $1 AND version = $2
    `,
    [conceptId, targetVersion]
  );

  if (!versions.length) {
    return NextResponse.json(
      { error: "Version not found" },
      { status: 404 }
    );
  }

  const sourcePath = versions[0].markdown_path;
  const content = fs.readFileSync(sourcePath, "utf-8");

  // 2️⃣ Get latest version number
  const latest = await query(
    `
    SELECT MAX(version) as v
    FROM concept_versions
    WHERE concept_id = $1
    `,
    [conceptId]
  );

  const nextVersion = (latest[0].v || 0) + 1;

  // 3️⃣ Write new version file
  const dir = path.dirname(sourcePath);
  const newPath = path.join(dir, `v${nextVersion}.md`);
  fs.writeFileSync(newPath, content, "utf-8");

  // 4️⃣ Insert version record
  await query(
    `
    INSERT INTO concept_versions
      (concept_id, version, markdown_path, created_by, change_summary)
    VALUES ($1, $2, $3, 'human', $4)
    `,
    [
      conceptId,
      nextVersion,
      newPath,
      `Rollback to v${targetVersion}`,
    ]
  );

  // 5️⃣ Audit log
  await query(
    `
    INSERT INTO audit_events
      (concept_id, event_type, actor_role, details)
    VALUES ($1, 'rollback', 'admin', $2)
    `,
    [
      conceptId,
      JSON.stringify({
        from: targetVersion,
        to: nextVersion,
      }),
    ]
  );

  return NextResponse.json({
    success: true,
    version: nextVersion,
  });
}