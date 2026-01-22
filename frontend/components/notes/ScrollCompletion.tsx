"use client";

import { useEffect, useRef } from "react";

type Props = {
  subject: string;
  topic: string;
  subtopic: string;
};

export default function ScrollCompletion({
  subject,
  topic,
  subtopic,
}: Props) {
  const startedAt = useRef(Date.now());
  const sent = useRef(false);

  useEffect(() => {
    const onScroll = async () => {
      if (sent.current) return;

      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (height <= 0) return;

      const scrollPercent = scrollTop / height;
      const timeSpent = (Date.now() - startedAt.current) / 1000;

      // ✅ Phase 6.5 rule
      if (scrollPercent >= 0.8 && timeSpent >= 30) {
        sent.current = true;

        // 1️⃣ Resolve conceptId
        const res = await fetch(
          `/api/concept?subject=${subject}&topic=${topic}&subtopic=${subtopic}`
        );

        if (!res.ok) return;

        const concept = await res.json();
        if (!concept?.id) return;

        // 2️⃣ Mark progress
        await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conceptId: concept.id,
            status: "completed",
          }),
        });
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [subject, topic, subtopic]);

  return null; 
}
