"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  async function handleLogin() {
    await signIn("credentials", {
      email,
      callbackUrl: "/admin/reviews", // 👈 IMPORTANT
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-80 space-y-4 rounded bg-white p-6 shadow">
        <h1 className="text-lg font-semibold">Login</h1>

        <input
          type="email"
          className="w-full rounded border px-3 py-2 text-sm"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full rounded bg-indigo-600 px-3 py-2 text-white"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}