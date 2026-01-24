type TrustStatus = "community" | "needs_review" | "verified";

type Props = {
  version: number;
  confidence: number;
  lastVerified: string | null;
  status: TrustStatus;
};

function formatDate(date: string | null) {
  if (!date) return "Never";
  return new Date(date).toISOString().split("T")[0];
}

function statusConfig(status: TrustStatus) {
  switch (status) {
    case "verified":
      return {
        label: "Expert verified",
        className: "bg-green-100 text-green-700",
        hint: "Reviewed and approved by a subject expert",
      };
    case "needs_review":
      return {
        label: "Needs expert review",
        className: "bg-yellow-100 text-yellow-800",
        hint: "Confidence dropped or content is outdated",
      };
    default:
      return {
        label: "Community reviewed",
        className: "bg-blue-100 text-blue-700",
        hint: "Reviewed by learners, awaiting expert verification",
      };
  }
}

export default function TrustBar({
  version,
  confidence,
  lastVerified,
  status,
}: Props) {
  const statusMeta = statusConfig(status);

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border bg-gray-50 px-4 py-2 text-xs text-gray-600">
      
      <span>
        <strong>Version:</strong> v{version}
      </span>

      <span>
        <strong>Confidence:</strong>{" "}
        {Math.round(confidence * 100)}%
      </span>

      <span>
        <strong>Last verified:</strong>{" "}
        {formatDate(lastVerified)}
      </span>

      <span
        className={`rounded-full px-3 py-1 font-medium ${statusMeta.className}`}
        title={statusMeta.hint}
      >
        {statusMeta.label}
      </span>
    </div>
  );
}
