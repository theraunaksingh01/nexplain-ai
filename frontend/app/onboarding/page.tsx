'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const INTERESTS = [
    "DSA",
    "System Design",
    "Web Development",
    "AI / ML",
    "Interview Prep",
];

const INTEREST_TO_ROUTE: Record<string, string> = {
    "DSA": "/notes/cs/dsa",
    "System Design": "/notes/cs/system-design",
    "Web Development": "/notes/web",
    "AI / ML": "/notes/ai",
    "Interview Prep": "/notes/interview",
};

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [profile, setProfile] = useState<any>({
        name: "",
        profession: "",
        interests: [],
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch("/api/profile")
            .then(res => res.json())
            .then(data => {
                if (data?.name && data?.interests?.length) {
                    router.replace("/");
                } else {
                    setProfile({
                        name: data?.name || "",
                        profession: data?.profession || "",
                        interests: data?.interests || [],
                    });
                }
            });
    }, [router]);

    async function finish() {
        setSaving(true);

        await fetch("/api/profile", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profile),
        });

        const firstInterest = profile.interests?.[0];

        // Example mapping (you already conceptually have this)
        const INTEREST_TO_TOPIC: Record<string, { subject: string; topic: string }> = {
            "DSA": { subject: "cs", topic: "dsa" },
            "System Design": { subject: "cs", topic: "system-design" },
            "Web Development": { subject: "web", topic: "html-css" },
            "AI / ML": { subject: "ai", topic: "ml-basics" },
            "Interview Prep": { subject: "cs", topic: "oops" },
        };

        const mapping = INTEREST_TO_TOPIC[firstInterest];
        if (!mapping) {
            setSaving(false);
            router.push("/");
            return;
        }

        const res = await fetch(
            `/api/notes/first-subtopic?subject=${mapping.subject}&topic=${mapping.topic}`
        );

        if (!res.ok) {
            setSaving(false);
            router.push(`/notes/${mapping.subject}/${mapping.topic}`);
            return;
        }

        const { subtopic } = await res.json();

        setSaving(false);
        router.push(
            `/notes/${mapping.subject}/${mapping.topic}/${subtopic}`
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50">
            <div className="w-full max-w-xl bg-white rounded-xl p-8 shadow-sm border">
                {/* Progress */}
                <div className="mb-6 text-sm text-gray-500">
                    Step {step} of 3
                </div>

                {/* STEP 1 */}
                {step === 1 && (
                    <>
                        <h1 className="text-2xl font-semibold mb-6">
                            Let’s get to know you
                        </h1>

                        <div className="space-y-4">
                            <input
                                placeholder="Your name"
                                className="w-full border rounded-md px-4 py-2"
                                value={profile.name}
                                onChange={e =>
                                    setProfile({ ...profile, name: e.target.value })
                                }
                            />

                            <select
                                className="w-full border rounded-md px-4 py-2"
                                value={profile.profession}
                                onChange={e =>
                                    setProfile({
                                        ...profile,
                                        profession: e.target.value,
                                    })
                                }
                            >
                                <option value="">Your role</option>
                                <option value="student">Student</option>
                                <option value="developer">Developer</option>
                                <option value="professional">Professional</option>
                            </select>
                        </div>

                        <div className="mt-6 text-right">
                            <button
                                disabled={!profile.name}
                                onClick={() => setStep(2)}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
                            >
                                Continue
                            </button>
                        </div>
                    </>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <>
                        <h1 className="text-2xl font-semibold mb-4">
                            What do you want to read?
                        </h1>

                        <p className="text-sm text-gray-500 mb-6">
                            Choose topics you’re interested in
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {INTERESTS.map(i => {
                                const selected = profile.interests.includes(i);
                                return (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            const next = selected
                                                ? profile.interests.filter((x: string) => x !== i)
                                                : [...profile.interests, i];

                                            setProfile({ ...profile, interests: next });
                                        }}
                                        className={`px-4 py-2 rounded-full border text-sm ${selected
                                            ? "bg-indigo-600 text-white"
                                            : "bg-white"
                                            }`}
                                    >
                                        {i}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-6 flex justify-between">
                            <button
                                onClick={() => setStep(1)}
                                className="text-sm text-gray-500"
                            >
                                Back
                            </button>

                            <button
                                disabled={!profile.interests.length}
                                onClick={() => setStep(3)}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
                            >
                                Continue
                            </button>
                        </div>
                    </>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                    <>
                        <h1 className="text-2xl font-semibold mb-4">
                            You’re all set 🎉
                        </h1>

                        <p className="text-gray-600 mb-6">
                            We’ll personalize your notes based on your interests.
                        </p>

                        <button
                            onClick={finish}
                            disabled={saving}
                            className="w-full bg-indigo-600 text-white px-4 py-3 rounded-md"
                        >
                            {saving ? "Setting things up…" : "Go to notes"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}