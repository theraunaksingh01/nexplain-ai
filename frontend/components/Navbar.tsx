"use client";

import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import ProfileMenu from "@/components/ProfileMenu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  const { data: session, status } = useSession();
  const pathname = usePathname();

  const hideNavbar = pathname.startsWith("/admin");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    {
      name: "Features",
      items: [
        { name: "AI Interviews", desc: "Smart interview analysis", icon: "🎯" },
        { name: "Skill Assessment", desc: "Evaluate candidates", icon: "📊" },
        { name: "Analytics", desc: "Hiring insights", icon: "📈" },
      ],
    },
    {
      name: "Solution",
      items: [
        { name: "Recruiters", desc: "Faster hiring", icon: "👩‍💼" },
        { name: "Startups", desc: "Scale teams", icon: "🚀" },
        { name: "Enterprises", desc: "Enterprise workflows", icon: "🏢" },
      ],
    },
    { name: "Pricing" },
    { name: "About" },
  ];

  if (hideNavbar) return null;

  return (
    <header className="fixed top-6 inset-x-0 z-50 px-4">
      <div className="mx-auto max-w-6xl">

        {/* ================= DESKTOP NAVBAR ================= */}
        <div
          className={`hidden md:flex items-center justify-between px-8 py-3 rounded-full transition-all
            ${isScrolled
              ? "bg-white/80 backdrop-blur-xl shadow-lg border border-gray-200"
              : "bg-transparent"
            }`}
        >
          {/* Logo */}
          <span className="text-sm font-semibold">
            N<span className="text-indigo-600">Explain</span>
          </span>

          {/* Nav */}
          <div className="flex items-center gap-8">
            {navItems.map((item) =>
              item.items ? (
                <div key={item.name} className="relative group">
                  <button className="flex items-center gap-1 text-sm font-medium">
                    {item.name}
                    <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition" />
                  </button>

                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3
                                  opacity-0 invisible group-hover:opacity-100
                                  group-hover:visible transition">
                    <div className="w-64 rounded-xl bg-white shadow-xl border p-2">
                      {item.items.map((sub) => (
                        <div key={sub.name}
                             className="flex gap-3 rounded-lg p-3 hover:bg-gray-50">
                          <span className="text-xl">{sub.icon}</span>
                          <div>
                            <div className="text-sm font-medium">{sub.name}</div>
                            <div className="text-xs text-gray-500">{sub.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <span key={item.name} className="text-sm font-medium cursor-pointer">
                  {item.name}
                </span>
              )
            )}
          </div>

          {/* Right */}
          {status === "loading" ? null : session ? (
            <ProfileMenu role={session.user.role} />
          ) : (
            <a
              href="/login"
              className="rounded-full bg-indigo-600 px-5 py-2
                         text-sm font-medium text-white hover:bg-indigo-700"
            >
              Get Started
            </a>
          )}
        </div>

        {/* ================= MOBILE HEADER ================= */}
        <div
          className={`md:hidden flex items-center justify-between px-4 py-3 rounded-full
            ${isScrolled
              ? "bg-white/80 backdrop-blur-xl shadow-lg border border-gray-200"
              : "bg-transparent"
            }`}
        >
          <span className="text-sm font-semibold">
            N<span className="text-indigo-600">Explain</span>
          </span>

          <button onClick={() => setMobileOpen((v) => !v)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {mobileOpen && (
          <div className="md:hidden mt-3 rounded-2xl bg-white shadow-xl border p-4">

            {/* USER (mobile only) */}
            {session && (
              <div className="mb-4 rounded-xl border p-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-indigo-600
                                  flex items-center justify-center
                                  text-sm font-semibold text-white">
                    {session.user.role[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium capitalize">
                      {session.user.role}
                    </p>
                    <p className="text-xs text-gray-500">Logged in</p>
                  </div>
                </div>

                <div className="mt-3 space-y-1 text-sm">
                  <a href="/dashboard" className="block px-3 py-2 rounded-lg hover:bg-gray-100">
                    Dashboard
                  </a>
                  <a href="/dashboard/reading-list" className="block px-3 py-2 rounded-lg hover:bg-gray-100">
                    Reading list
                  </a>
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-3 py-2
                               text-red-600 rounded-lg hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}

            {/* Nav items */}
            {navItems.map((item) =>
              item.items ? (
                <div key={item.name} className="mb-2">
                  <button
                    onClick={() =>
                      setMobileSubmenu(mobileSubmenu === item.name ? null : item.name)
                    }
                    className="flex w-full items-center justify-between py-2 text-sm font-medium"
                  >
                    {item.name}
                    <ChevronDown
                      className={`h-4 w-4 transition ${mobileSubmenu === item.name ? "rotate-180" : ""}`}
                    />
                  </button>

                  {mobileSubmenu === item.name && (
                    <div className="pl-3 space-y-2">
                      {item.items.map((sub) => (
                        <div key={sub.name} className="flex gap-3 p-2 rounded-lg hover:bg-gray-50">
                          <span>{sub.icon}</span>
                          <div>
                            <div className="text-sm font-medium">{sub.name}</div>
                            <div className="text-xs text-gray-500">{sub.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div key={item.name} className="py-2 text-sm font-medium">
                  {item.name}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </header>
  );
}