"use client";

import { useEffect } from "react";

export default function AnonInit() {
  useEffect(() => {
    fetch("/api/anon/init", { method: "POST" });
  }, []);

  return null;
}