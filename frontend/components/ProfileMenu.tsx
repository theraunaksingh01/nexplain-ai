"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

type Props = {
  role: "admin" | "expert" | "reader";
};

export default function ProfileMenu({ role }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initial = role[0].toUpperCase();

  return (
    <div ref={ref} className="relative">
      {/* Avatar */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center
                   rounded-full bg-indigo-600 text-sm
                   font-semibold text-white"
      >
        {initial}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-xl
                     border bg-white shadow-lg"
        >
          <div className="border-b px-4 py-3">
            <p className="text-sm font-medium capitalize">
              {role}
            </p>
            <p className="text-xs text-gray-500">
              Logged in
            </p>
          </div>

          <nav className="p-2 text-sm">
            <Link
              href="/dashboard"
              className="block rounded-lg px-3 py-2 hover:bg-gray-100"
            >
              Dashboard
            </Link>

            <Link
              href="/dashboard/reading-list"
              className="block rounded-lg px-3 py-2 hover:bg-gray-100"
            >
              Reading list
            </Link>

            <Link
              href="/profile"
              className="block rounded-lg px-3 py-2 hover:bg-gray-100"
            >
              Profile
            </Link>

            <button
              onClick={() => signOut()}
              className="mt-1 w-full rounded-lg
                         px-3 py-2 text-left
                         text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}