import TopicProgressCard from "./TopicProgressCard";

type Topic = {
  subject: string;
  topic: string;
  progress: number;
};

type TopicsGridProps = {
  topics: Topic[];
};

export default function TopicsGrid({ topics }: TopicsGridProps) {
  if (!topics.length) {
    return (
      <p className="text-sm text-gray-500">
        You haven’t started any topics yet.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {topics.map((t) => (
        <TopicProgressCard
          key={`${t.subject}-${t.topic}`}
          subject={t.subject}
          topic={t.topic}
          progress={t.progress}
        />
      ))}
    </div>
  );
}