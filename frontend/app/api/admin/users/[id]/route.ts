import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { query } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { role, name } = await req.json();

  if (role && !["admin", "expert", "reader"].includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  await query(
    `
    UPDATE users
    SET
      role = COALESCE($1, role),
      name = COALESCE($2, name)
    WHERE id = $3
    `,
    [role ?? null, name ?? null, params.id]
  );

  return NextResponse.json({ ok: true });
}