"use client";

import { useState } from "react";
import AIPatchList from "./AIPatchList";
import ReviewActions from "./[id]/ReviewActions";

export default function ReviewClient({
    conceptId,
}: {
    conceptId: string;
}) {
    const [approvedCount, setApprovedCount] = useState(0);

    return (
        <>
            <div className="rounded-xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">
                    AI Suggested Improvements
                </h2>

                <AIPatchList
                    conceptId={conceptId}
                    onApprovedCountChange={setApprovedCount}
                />
            </div>

            <ReviewActions
                conceptId={conceptId}
                approvedCount={approvedCount}
            />
        </>
    );
}