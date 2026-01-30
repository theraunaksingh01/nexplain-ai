"use client";

type AuditEvent = {
  event_type: string;
  actor_role: string;
  details: any;
  created_at_formatted: string;
};

function labelForEvent(e: AuditEvent) {
  switch (e.event_type) {
    case "ai_analysis":
      return "🧠 AI analysis run";
    case "patch_approved":
      return "✅ Patch approved";
    case "patch_rejected":
      return "❌ Patch rejected";
    case "publish":
      return "🚀 Changes published";
    default:
      return e.event_type;
  }
}

export default function AuditTimeline({
  events,
}: {
  events: AuditEvent[];
}) {
  if (!events.length) {
    return (
      <p className="text-sm text-gray-500">
        No audit events yet.
      </p>
    );
  }

  return (
    <ul className="space-y-4 text-sm">
      {events.map((e, idx) => (
        <li key={idx} className="border-l-2 pl-4">
          <div className="font-medium">
            {labelForEvent(e)}
          </div>

          <div className="text-xs text-gray-500">
            {e.actor_role} · {e.created_at_formatted}
          </div>

          {e.details && (
            <pre className="mt-1 rounded bg-gray-50 p-2 text-xs text-gray-500">
              {JSON.stringify(e.details, null, 2)}
            </pre>
          )}
        </li>
      ))}
    </ul>
  );
}