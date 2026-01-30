export default async function TopicIntroPage({
  params,
}: {
  params: Promise<{ subject: string; topic: string }>;
}) {
  const { topic } = await params;

  return (
    <div className="prose max-w-none">
      <h1 className="capitalize">{topic}</h1>
      <p>
        This section covers all core concepts related to{" "}
        <strong>{topic}</strong>. Select a topic from the left to begin.
      </p>
    </div>
  );
}
