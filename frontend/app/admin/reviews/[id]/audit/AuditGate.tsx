"use client";

import { useRole } from "@/hooks/useRole";
import AuditTimeline from "../../AuditTimeline";
import { useSession } from "next-auth/react";

type Props = {
  auditEvents: any[];
  versions: any[];
};

export default function AuditGate({
  auditEvents,
  versions,
}: Props) {
  const { data: session } = useSession();
const role = session?.user?.role;

  if (role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 px-8 py-24">
        <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">
            Access Restricted
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Audit logs and version history are visible to admins only.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-24">
      <div className="mx-auto max-w-5xl space-y-6">

        {/* HEADER */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold">
            Admin Audit & Version History
          </h1>
        </div>

        {/* VERSION HISTORY */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">
            Version History
          </h2>

          {versions.length === 0 ? (
            <p className="text-sm text-gray-500">
              No versions recorded yet.
            </p>
          ) : (
            <ul className="space-y-3 text-sm">
              {versions.map((v) => (
                <li
                  key={v.version}
                  className="rounded border p-3"
                >
                  <div className="font-medium">
                    Version v{v.version}
                  </div>
                  <div className="text-xs text-gray-500">
                    {v.created_by} ·{" "}
                    {new Date(v.created_at).toLocaleString()}
                  </div>
                  {v.change_summary && (
                    <p className="mt-1 text-xs text-gray-600">
                      {v.change_summary}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* AUDIT TIMELINE */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">
            Audit Timeline
          </h2>
          <AuditTimeline events={auditEvents} />
        </div>

      </div>
    </div>
  );
}