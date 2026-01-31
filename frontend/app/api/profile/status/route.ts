import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { query } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ onboarded: true });
  }

  const rows = await query(
    `
    SELECT name, interests, role
    FROM users
    WHERE email = $1
    `,
    [session.user.email]
  );

  const user = rows[0];

  // Admins skip onboarding
  if (user?.role === "admin") {
    return NextResponse.json({ onboarded: true });
  }

  const onboarded =
    Boolean(user?.name) && Boolean(user?.interests?.length);

  return NextResponse.json({ onboarded });
}