const OLLAMA_URL = "http://localhost:11434/api/generate";
const MODEL = "tinyllama";

/**
 * Detects obvious non-English output (tinyllama issue)
 */
function looksNonEnglish(text: string): boolean {
  return /[áéíóúñ¿¡]/i.test(text);
}

/**
 * 🔑 EXPORT THIS
 * Low-level Ollama call (shared)
 */
export async function callOllama(
  prompt: string
): Promise<string> {
  const res = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      stream: false,
    }),
  });

  const data = await res.json();
  return (data.response || "").trim();
}

/**
 * ----------------------------------------
 * AI SUMMARY (used in right panel only)
 * ----------------------------------------
 */
export async function generateSummaryWithOllama(
  content: string
): Promise<string[]> {
  const prompt = `
You are an English-only educational assistant.

Summarize the following study material into 3–5 short bullet points.

Rules:
- Use ONLY simple English
- Do NOT translate
- Do NOT add new concepts
- Do NOT use metaphors
- Keep bullets factual and concise

CONTENT (English):
${content}

OUTPUT (English bullet points only):
`;

  let response = await callOllama(prompt);

  // Retry once if non-English detected
  if (looksNonEnglish(response)) {
    response = await callOllama(prompt);
  }

  // Final safety fallback
  if (looksNonEnglish(response) || !response) {
    return [
      "This topic explains the core idea using simple concepts.",
      "It focuses on understanding rather than memorization.",
      "Reading the full explanation is recommended.",
    ];
  }

  return response
    .split("\n")
    .map((line) =>
      line.replace(/^[-•\d.]+\s*/, "").trim()
    )
    .filter(Boolean);
}
