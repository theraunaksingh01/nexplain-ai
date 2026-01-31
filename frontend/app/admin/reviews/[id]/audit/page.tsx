import { notFound } from "next/navigation";
import { query } from "@/lib/db";
import AuditGate from "./AuditGate";

export default async function AuditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: conceptId } = await params;

  const auditEvents = await query(
    `
    SELECT event_type, actor_role, details, created_at
    FROM audit_events
    WHERE concept_id = $1
    ORDER BY created_at DESC
    `,
    [conceptId]
  );

  const versions = await query(
    `
    SELECT
      version,
      markdown_path,
      created_by,
      change_summary,
      created_at
    FROM concept_versions
    WHERE concept_id = $1
    ORDER BY version DESC
    `,
    [conceptId]
  );

  if (!auditEvents) notFound();

  return (
    <AuditGate
      auditEvents={auditEvents}
      versions={versions}
    />
  );
}