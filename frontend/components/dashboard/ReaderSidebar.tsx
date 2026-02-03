// components/dashboard/ReaderSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/reading-list", label: "Reading list" },
  { href: "/dashboard/progress", label: "Progress" },
];

export default function ReaderSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen sticky top-24
                      border-r bg-white px-4 py-6">
      <div className="mb-8 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-indigo-600
                        flex items-center justify-center
                        text-white font-semibold">
          R
        </div>
        <div>
          <p className="text-sm font-medium">Reader</p>
          <p className="text-xs text-gray-500">Account</p>
        </div>
      </div>

      <nav className="space-y-1">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`block rounded-lg px-3 py-2 text-sm
                ${active
                  ? "bg-indigo-50 text-indigo-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"}`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}