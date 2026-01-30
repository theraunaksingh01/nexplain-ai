"use client";

import { useEffect, useState } from "react";
import AIPatchList from "./AIPatchList";
import ReviewActions from "./[id]/ReviewActions";
import DiffViewer from "./DiffViewer";
import AuditTimeline from "./AuditTimeline";

type DiffPart = {
    added?: boolean;
    removed?: boolean;
    value: string;
};

export default function ReviewClient({
    conceptId,
}: {
    conceptId: string;
}) {
    const [approvedCount, setApprovedCount] = useState(0);
    const [diff, setDiff] = useState<DiffPart[]>([]);
    const [loadingDiff, setLoadingDiff] = useState(false);

    const [events, setEvents] = useState<any[]>([]);

    async function loadAudit() {
        const res = await fetch(
            `/api/audit?conceptId=${conceptId}`
        );
        const data = await res.json();
        setEvents(data.events || []);
    }

    useEffect(() => {
        loadAudit();
    }, [conceptId]);
    /* -------------------------------------------------
       LOAD DIFF (Previous Version vs Current)
    -------------------------------------------------- */
    async function loadDiff() {
        setLoadingDiff(true);
        try {
            const res = await fetch(
                `/api/diff?conceptId=${conceptId}`
            );
            const data = await res.json();
            setDiff(data.diff || []);
        } catch {
            setDiff([]);
        } finally {
            setLoadingDiff(false);
        }
    }

    // Reload diff whenever approved patches change
    useEffect(() => {
        loadDiff();
    }, [conceptId, approvedCount]);

    return (
        <div className="space-y-6">
            {/* ================================
          1️⃣ AI SUGGESTED IMPROVEMENTS
         ================================ */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">
                    AI Suggested Improvements
                </h2>

                <AIPatchList
                    conceptId={conceptId}
                    onApprovedCountChange={setApprovedCount}
                />
            </div>

            {/* ================================
          2️⃣ CONTENT CHANGES PREVIEW (DIFF)
         ================================ */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
                <h2 className="mb-2 text-lg font-semibold">
                    Content Changes Preview
                </h2>

                <p className="mb-4 text-sm text-gray-500">
                    Preview of how the content will change compared to the
                    previous published version.
                </p>

                {loadingDiff ? (
                    <p className="text-sm text-gray-500">
                        Loading diff…
                    </p>
                ) : (
                    <DiffViewer diff={diff} />
                )}
            </div>

            {/* ================================
          3️⃣ PUBLISH ACTIONS
         ================================ */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
                <ReviewActions
                    conceptId={conceptId}
                    approvedCount={approvedCount}
                />
            </div>

            
        </div>
    );
}