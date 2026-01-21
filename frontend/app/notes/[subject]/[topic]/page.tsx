export default function TopicIntroPage({
  params,
}: {
  params: { subject: string; topic: string };
}) {
  return (
    <div className="prose max-w-none">
      <h1 className="capitalize">{params.topic}</h1>
      <p>
        This section covers all core concepts related to{" "}
        <strong>{params.topic}</strong>.
      </p>
      <p>Select a topic from the left to begin.</p>
    </div>
  );
}
