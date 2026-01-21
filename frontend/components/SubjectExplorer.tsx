"use client";

import { useState } from "react";

const DATA = {
  cs: {
    label: "Computer Science",
    subjects: [
      {
        title: "OOPS",
        desc: "Object-oriented programming explained clearly with examples.",
        href: "/notes/cs/oops",
        image: "/subjects/oops.jpg",
      },
      {
        title: "DBMS",
        desc: "Databases from fundamentals to real-world internals.",
        href: "/notes/dbms",
        image: "/subjects/dbms.jpg",
      },
      {
        title: "Operating Systems",
        desc: "Processes, memory, scheduling and concurrency.",
        href: "/notes/os",
        image: "/subjects/os.jpg",
      },
      {
        title: "LLD",
        desc: "Low-level design with practical system components.",
        href: "/notes/lld",
        image: "/subjects/lld.jpg",
      },
    ],
  },
  ml: {
    label: "Machine Learning",
    subjects: [
      {
        title: "ML Basics",
        desc: "Foundations of machine learning and data-driven models.",
        href: "/notes/ml-basics",
        image: "/subjects/ml-basics.jpg",
      },
      {
        title: "Supervised Learning",
        desc: "Regression, classification, bias-variance tradeoff.",
        href: "/notes/supervised",
        image: "/subjects/supervised.jpg",
      },
      {
        title: "Unsupervised Learning",
        desc: "Clustering, PCA and representation learning.",
        href: "/notes/unsupervised",
        image: "/subjects/unsupervised.jpg",
      },
    ],
  },
};

export default function SubjectExplorer() {
  const [activeTab, setActiveTab] = useState<"cs" | "ml">("cs");

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Explore subjects, the structured way
          </h2>
          <p className="mt-3 text-gray-600">
            Choose a domain and start learning with clarity.
          </p>
        </div>

        {/* CONNECTED TABS */}
        <div className="mb-12 flex justify-center">
          <div className="flex rounded-full border bg-gray-50 p-1">
            {Object.entries(DATA).map(([key, tab]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as "cs" | "ml")}
                className={`rounded-full px-6 py-2 text-sm font-medium transition
                  ${
                    activeTab === key
                      ? "bg-indigo-600 text-white shadow"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* SUBJECT CARDS */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DATA[activeTab].subjects.map((subj) => (
            <a
              key={subj.title}
              href={subj.href}
              className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {/* Image */}
              <div className="h-40 w-full overflow-hidden bg-gray-100">
                <img
                  src={subj.image}
                  alt={subj.title}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
                  {subj.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  {subj.desc}
                </p>

                <span className="mt-4 inline-block text-sm font-medium text-indigo-600">
                  Start learning →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
