'use client';

import { useEffect, useState } from "react";

const INTERESTS = [
  "DSA",
  "System Design",
  "Web Development",
  "AI / ML",
  "Interview Prep",
];

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then(res => res.json())
      .then(setProfile);
  }, []);

  async function save() {
    setSaving(true);
    await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    setSaving(false);
  }

  if (!profile) return null;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-6">Your Profile</h1>

      <div className="space-y-6 bg-white p-6 rounded-xl border">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            className="w-full border rounded-md px-3 py-2"
            value={profile.name || ""}
            onChange={e =>
              setProfile({ ...profile, name: e.target.value })
            }
          />
        </div>

        {/* Profession */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Profession
          </label>
          <select
            className="w-full border rounded-md px-3 py-2"
            value={profile.profession || ""}
            onChange={e =>
              setProfile({ ...profile, profession: e.target.value })
            }
          >
            <option value="">Select</option>
            <option value="student">Student</option>
            <option value="developer">Developer</option>
            <option value="professional">Professional</option>
          </select>
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-medium mb-2">
            What do you want to read?
          </label>

          <div className="flex flex-wrap gap-2">
            {INTERESTS.map(i => {
              const selected = profile.interests?.includes(i);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    const next = selected
                      ? profile.interests.filter((x: string) => x !== i)
                      : [...(profile.interests || []), i];

                    setProfile({ ...profile, interests: next });
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm border ${
                    selected
                      ? "bg-indigo-600 text-white"
                      : "bg-white"
                  }`}
                >
                  {i}
                </button>
              );
            })}
          </div>
        </div>

        {/* Save */}
        <div className="pt-4">
          <button
            onClick={save}
            disabled={saving}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md"
          >
            {saving ? "Saving…" : "Save Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}