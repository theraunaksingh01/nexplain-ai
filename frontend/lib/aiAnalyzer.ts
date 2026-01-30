import { generateSummaryWithOllama } from "@/lib/ai";

export type AISuggestedPatch = {
  patch_type: "example" | "definition" | "clarification" | "edge_case";
  reason: string;
};

export type AIAnalysis = {
  summary: string;
  suggested_patches: AISuggestedPatch[];
};

export async function analyzeContentWithAI(
  content: string
): Promise<AIAnalysis> {
  // 1️⃣ SUMMARY (safe, already works)
  const summaryBullets = await generateSummaryWithOllama(content);

  const suggested_patches: AISuggestedPatch[] = [];

  const lower = content.toLowerCase();

  // 2️⃣ RULE-BASED GAP DETECTION (MVP, reliable)
  if (!lower.includes("example")) {
    suggested_patches.push({
      patch_type: "example",
      reason: "No concrete example is present in the explanation",
    });
  }

  if (!lower.includes("definition")) {
    suggested_patches.push({
      patch_type: "definition",
      reason: "Formal definition is missing or unclear",
    });
  }

  if (content.length < 600) {
    suggested_patches.push({
      patch_type: "clarification",
      reason: "Explanation is too short and may lack clarity",
    });
  }

  if (!lower.includes("edge") && !lower.includes("case")) {
    suggested_patches.push({
      patch_type: "edge_case",
      reason: "Edge cases are not discussed",
    });
  }

  return {
    summary: summaryBullets.join(" "),
    suggested_patches,
  };
}
