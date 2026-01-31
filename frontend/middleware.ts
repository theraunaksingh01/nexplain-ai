import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const pathname = req.nextUrl.pathname;

  // --- Always allow system & public routes ---
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/onboarding" ||
    pathname === "/403"
  ) {
    return NextResponse.next();
  }

  // --- Admin routes protection (existing logic, kept) ---
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Audit pages = admin only
    if (pathname.includes("/audit") && token.role !== "admin") {
      return NextResponse.redirect(new URL("/403", req.url));
    }

    return NextResponse.next();
  }

  // --- If not logged in, allow (public notes later possible) ---
  if (!token) {
    return NextResponse.next();
  }

  // --- Admins skip onboarding entirely ---
  if (token.role === "admin") {
    return NextResponse.next();
  }

  // --- Check onboarding status for logged-in non-admin users ---
  const res = await fetch(
    `${req.nextUrl.origin}/api/profile/status`,
    {
      headers: {
        cookie: req.headers.get("cookie") || "",
      },
    }
  );

  const { onboarded } = await res.json();

  if (!onboarded) {
    const url = req.nextUrl.clone();
    url.pathname = "/onboarding";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!favicon.ico).*)"],
};