'use client';

import { useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  name: string | null;
  role: "admin" | "expert" | "reader";
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/users")
      .then(res => res.json())
      .then(setUsers);
  }, []);

  async function updateUser(
    id: string,
    data: Partial<Pick<User, "name" | "role">>
  ) {
    setSaving(id);

    await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, ...data } : u))
    );

    setSaving(null);
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="pt-32 mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Users
        </h1>
        <p className="text-sm text-gray-500">
          Manage users, roles, and identities
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left font-medium">Email</th>
              <th className="px-6 py-3 text-left font-medium">Name</th>
              <th className="px-6 py-3 text-left font-medium">Role</th>
              <th className="px-6 py-3 text-right font-medium"></th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr
                key={user.id}
                className="border-t border-gray-100 hover:bg-gray-50 transition"
              >
                {/* Email */}
                <td className="px-6 py-4 text-gray-900">
                  {user.email}
                </td>

                {/* Name */}
                <td className="px-6 py-4">
                  <input
                    defaultValue={user.name || ""}
                    placeholder="—"
                    className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onBlur={(e) =>
                      updateUser(user.id, { name: e.target.value })
                    }
                  />
                </td>

                {/* Role */}
                <td className="px-6 py-4">
                  <select
                    defaultValue={user.role}
                    className="rounded-md border border-gray-300 px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) =>
                      updateUser(user.id, { role: e.target.value as any })
                    }
                  >
                    <option value="reader">Reader</option>
                    <option value="expert">Expert</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                {/* Status */}
                <td className="px-6 py-4 text-right text-xs text-gray-400">
                  {saving === user.id ? "Saving…" : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}