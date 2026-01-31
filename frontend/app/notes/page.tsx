import Link from "next/link";
import { SubjectCard } from "@/components/SubjectCard";

type CatalogCourse = {
  slug: string;
  title: string;
  description: string;
  badge?: string;
  badgeColor?: 'pink' | 'blue' | 'yellow' | 'green';
};

type Course = {
  title: string;
  description: string;
  slug: string;
  badge: string;
  badgeColor: 'pink' | 'blue' | 'yellow' | 'green';
};

type Subject = {
  key: string;
  label: string;
  courses: CatalogCourse[];
};

const SUBJECTS: Subject[] = [
  // -----------------------------
  // Computer Science
  // -----------------------------
  {
    key: "cs",
    label: "Computer Science",
    courses: [
      {
        slug: "oops",
        title: "Object Oriented Programming",
        description:
          "Classes, objects, inheritance, polymorphism explained clearly.",
        badge: "Core",
        badgeColor: "blue",
      },
      {
        slug: "dbms",
        title: "Database Management Systems",
        description:
          "Databases from fundamentals to real-world internals.",
        badge: "Core",
        badgeColor: "green",
      },
      {
        slug: "operating-systems",
        title: "Operating Systems",
        description:
          "Processes, memory, scheduling and concurrency.",
        badge: "Core",
        badgeColor: "yellow",
      },
      {
        slug: "lld",
        title: "Low Level Design",
        description:
          "Design real-world systems with clean, scalable components.",
        badge: "Advanced",
        badgeColor: "pink",
      },
    ],
  },

  // -----------------------------
  // Machine Learning
  // -----------------------------
  {
    key: "ml",
    label: "Machine Learning",
    courses: [
      {
        slug: "ml-basics",
        title: "ML Fundamentals",
        description:
          "Understand data, features, models, and learning paradigms.",
        badge: "Beginner",
        badgeColor: "blue",
      },
      {
        slug: "supervised-learning",
        title: "Supervised Learning",
        description:
          "Regression, classification, bias–variance tradeoff.",
        badge: "Core",
        badgeColor: "green",
      },
      {
        slug: "unsupervised-learning",
        title: "Unsupervised Learning",
        description:
          "Clustering, dimensionality reduction, PCA.",
      },
      {
        slug: "deep-learning",
        title: "Deep Learning",
        description:
          "Neural networks, CNNs, RNNs and backpropagation.",
        badge: "Advanced",
        badgeColor: "pink",
      },
    ],
  },

  // -----------------------------
  // Data Structures & Algorithms
  // -----------------------------
  {
    key: "dsa",
    label: "Data Structures & Algorithms",
    courses: [
      {
        slug: "arrays-strings",
        title: "Arrays & Strings",
        description:
          "Foundational data structures and problem-solving patterns.",
        badge: "Beginner",
        badgeColor: "blue",
      },
      {
        slug: "linked-list-stack-queue",
        title: "Linked List, Stack & Queue",
        description:
          "Linear data structures with implementation details.",
      },
      {
        slug: "trees",
        title: "Trees",
        description:
          "Binary trees, BSTs, traversal techniques.",
        badge: "Core",
        badgeColor: "green",
      },
      {
        slug: "graphs",
        title: "Graphs",
        description:
          "BFS, DFS, shortest paths, real-world applications.",
        badge: "Advanced",
        badgeColor: "pink",
      },
    ],
  },
];

export default function NotesIndexPage() {
    return (
        <div className="pt-32 mx-auto max-w-7xl px-6 py-20">
            {/* HEADER */}
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold">
                    Explore subjects, the structured way
                </h1>
                <p className="mt-3 text-gray-600">
                    Choose a domain and start learning with clarity.
                </p>
            </div>

            {/* SUBJECTS */}
            {SUBJECTS.map(subject => (
                <section key={subject.key}>
                    <h2 className="pt-24 mb-6 text-2xl font-semibold ">
                        {subject.label}
                    </h2>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {subject.courses.map(course => (
                            <SubjectCard
                                key={course.slug}
                                badge={course.badge}
                                badgeColor={course.badgeColor}
                                title={course.title}
                                description={course.description}
                                tasks={12}               // placeholder
                                progress={0}             // new user
                                avatar="https://api.dicebear.com/7.x/avataaars/svg"
                                buttonText="Start learning"
                                href={`/notes/${subject.key}/${course.slug}`}
                            />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}