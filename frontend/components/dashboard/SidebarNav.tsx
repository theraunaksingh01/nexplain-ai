"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarNav() {
  const pathname = usePathname();

  const link = (href: string, label: string) => {
    const active = pathname === href;

    return (
      <Link
        href={href}
        className={`block rounded-lg px-3 py-2 text-sm
          ${active
            ? "bg-indigo-50 text-indigo-700 font-medium"
            : "hover:bg-gray-100"}`}
      >
        {label}
      </Link>
    );
  };

  return (
    <nav className="mb-6 space-y-1">
      {link("/dashboard", "Dashboard")}
      {link("/dashboard/reading-list", "Reading list")}
      {link("/dashboard/progress", "Progress")}
    </nav>
  );
}