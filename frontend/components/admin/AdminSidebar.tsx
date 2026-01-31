'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Users", href: "/admin/users" },
  { label: "Reviews", href: "/admin/reviews" },
//   { label: "Audit Logs", href: "/admin/audit" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-white px-4 py-6">
      <h2 className="mb-6 text-lg font-semibold">Admin</h2>

      <nav className="space-y-1">
        {NAV_ITEMS.map(item => {
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-md px-3 py-2 text-sm transition ${
                active
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}