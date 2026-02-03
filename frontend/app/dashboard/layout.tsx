// app/dashboard/layout.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  // Admins should not see reader dashboard
  if (session.user.role === "admin") {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {children}
    </div>
  );
}