import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { query } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await query(
    `
    SELECT email, name, profession, interests, role
    FROM users
    WHERE email = $1
    `,
    [session.user.email]
  );

  return NextResponse.json(rows[0]);
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, profession, interests } = await req.json();

  await query(
    `
    UPDATE users
    SET
      name = COALESCE($1, name),
      profession = COALESCE($2, profession),
      interests = COALESCE($3, interests)
    WHERE email = $4
    `,
    [name ?? null, profession ?? null, interests ?? null, session.user.email]
  );

  return NextResponse.json({ ok: true });
}