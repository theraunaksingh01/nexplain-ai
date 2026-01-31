import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getCurrentUserRole } from "@/lib/auth";
import { requireExpert } from "@/lib/permissions";

export async function POST(req: Request) {
  const { patchId, action } = await req.json();
  const role = await getCurrentUserRole();

  if (role !== "admin") {
    return new Response("Forbidden", { status: 403 });
  }

  // 1️⃣ Fetch concept_id for this patch
  const rows = await query(
    `
  SELECT concept_id
  FROM ai_content_patches
  WHERE id = $1
  `,
    [patchId]
  );

  if (!rows.length) {
    return NextResponse.json(
      { error: "Patch not found" },
      { status: 404 }
    );
  }

  const conceptId = rows[0].concept_id;

  if (!patchId || !["approved", "rejected"].includes(action)) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }

  await query(
    `
    UPDATE ai_content_patches
    SET status = $1
    WHERE id = $2
    `,
    [action, patchId]
  );

  // 🔍 AUDIT LOG — patch decision
  await query(
    `
  INSERT INTO audit_events
    (concept_id, event_type, actor_role, details)
  VALUES ($1, $2, 'expert', $3)
  `,
    [
      conceptId,
      action === "approved"
        ? "patch_approved"
        : "patch_rejected",
      JSON.stringify({ patchId }),
    ]
  );

  return NextResponse.json({ success: true });
}
