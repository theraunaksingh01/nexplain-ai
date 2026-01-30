import { AIAnalysis } from "@/lib/aiAnalyzer";

/**
 * AI-generated patch explanation only.
 * No markdown generation happens here.
 */
export type GeneratedPatch = {
  patch_type: "example" | "definition" | "clarification" | "edge_case";
  ai_reason: string;
};

export function generatePatchesFromAnalysis(
  analysis: AIAnalysis,
  _subtopic: string
): GeneratedPatch[] {
  const patches: GeneratedPatch[] = [];

  for (const patch of analysis.suggested_patches) {
    patches.push({
      patch_type: patch.patch_type,
      ai_reason: patch.reason, // ✅ PRESERVE AI EXPLANATION
    });
  }

  return patches;
}