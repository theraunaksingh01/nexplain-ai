"use client";

import { useEffect, useState } from "react";

type Version = {
  version: number;
  created_at: string;
  change_summary: string;
};

export default function VersionHistory({
  conceptId,
}: {
  conceptId: string;
}) {
  const [versions, setVersions] = useState<Version[]>([]);

  async function load() {
    const res = await fetch(
      `/api/versions?conceptId=${conceptId}`
    );
    const data = await res.json();
    setVersions(data.versions || []);
  }

  async function rollback(v: number) {
    if (!confirm(`Rollback to v${v}?`)) return;

    await fetch("/api/versions/rollback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conceptId,
        targetVersion: v,
      }),
    });

    alert(`Rolled back to v${v}`);
    load();
  }

  useEffect(() => {
    load();
  }, [conceptId]);

  return (
    <div className="space-y-3">
      {versions.map((v) => (
        <div
          key={v.version}
          className="flex items-center justify-between rounded border p-3 text-sm"
        >
          <div>
            <strong>v{v.version}</strong>{" "}
            <span className="text-gray-500">
              — {v.change_summary}
            </span>
          </div>

          <button
            onClick={() => rollback(v.version)}
            className="text-xs text-red-600 hover:underline"
          >
            Rollback
          </button>
        </div>
      ))}
    </div>
  );
}