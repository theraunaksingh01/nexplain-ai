"use client";

import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  // ✅ hook always runs
  const pathname = usePathname();

  // ✅ compute, don’t early return
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

  return (
    <header
      className={`fixed top-6 inset-x-0 z-50 px-4 ${
        hideNavbar ? "hidden" : "block"
      }`}
    >
      <div className="mx-auto max-w-6xl">
        {/* ================= DESKTOP NAVBAR ================= */}
        <div
          className={`hidden md:flex items-center justify-between px-8 py-3 rounded-full transition-all duration-300
            ${
              isScrolled
                ? "bg-white/80 backdrop-blur-xl shadow-lg border border-gray-200"
                : "bg-transparent"
            }`}
        >
          {/* LEFT: Logo */}
          <div className="flex-shrink-0">
            <span className="text-sm font-semibold">
              N<span className="text-indigo-600">Explain</span>
            </span>
          </div>

          {/* CENTER: Nav Links */}
          <div className="flex items-center gap-8">
            {navItems.map((item) =>
              item.items ? (
                <div key={item.name} className="relative group">
                  <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900">
                    {item.name}
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  </button>

                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                    <div className="w-64 rounded-xl bg-white shadow-xl border p-2">
                      {item.items.map((sub) => (
                        <a
                          key={sub.name}
                          className="flex gap-3 rounded-lg p-3 hover:bg-gray-50 transition"
                        >
                          <span className="text-xl">{sub.icon}</span>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {sub.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {sub.desc}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={item.name}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
                >
                  {item.name}
                </a>
              )
            )}
          </div>

          {/* RIGHT: CTA */}
          <div className="flex-shrink-0">
            <a className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition">
              Get Started
            </a>
          </div>
        </div>

        {/* ================= MOBILE HEADER ================= */}
        <div
          className={`md:hidden flex items-center justify-between px-4 py-3 rounded-full transition-all duration-300
            ${
              isScrolled
                ? "bg-white/80 backdrop-blur-xl shadow-lg border border-gray-200"
                : "bg-transparent"
            }`}
        >
          <span className="text-sm font-semibold">
            Clarity<span className="text-indigo-600">Notes</span>
          </span>

          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {mobileOpen && (
          <div className="md:hidden mt-3 rounded-2xl bg-white shadow-xl border p-4">
            {navItems.map((item) =>
              item.items ? (
                <div key={item.name} className="mb-2">
                  <button
                    onClick={() =>
                      setMobileSubmenu(
                        mobileSubmenu === item.name ? null : item.name
                      )
                    }
                    className="flex w-full items-center justify-between py-2 text-sm font-medium"
                  >
                    {item.name}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        mobileSubmenu === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {mobileSubmenu === item.name && (
                    <div className="pl-3 space-y-2">
                      {item.items.map((sub) => (
                        <a
                          key={sub.name}
                          className="flex gap-3 rounded-lg p-2 hover:bg-gray-50"
                          onClick={() => setMobileOpen(false)}
                        >
                          <span>{sub.icon}</span>
                          <div>
                            <div className="text-sm font-medium">
                              {sub.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {sub.desc}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={item.name}
                  className="block py-2 text-sm font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </a>
              )
            )}

            <a
              className="mt-4 block rounded-full bg-indigo-600 py-3 text-center text-sm font-medium text-white"
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </a>
          </div>
        )}
      </div>
    </header>
  );
}