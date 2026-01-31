"use client";

import { signOut, useSession } from "next-auth/react";

export default function AuthStatus() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-gray-600">
        {session.user.email} ({session.user.role})
      </span>

      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="rounded bg-gray-200 px-2 py-1 text-xs"
      >
        Logout
      </button>
    </div>
  );
}