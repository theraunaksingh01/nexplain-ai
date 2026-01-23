"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "nexplain_cookie_ack";

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const acknowledged = localStorage.getItem(STORAGE_KEY);
    if (!acknowledged) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[90%] max-w-xl -translate-x-1/2 rounded-xl border bg-white p-4 shadow-lg">
      <p className="text-sm text-gray-700">
        We use cookies to remember your learning progress.
      </p>
      <button
        onClick={handleAccept}
        className="mt-2 text-sm font-medium text-indigo-600"
      >
        Got it
      </button>
    </div>
  );
}
