export function applyConfidenceDecay(
  confidence: number,
  lastVerified: Date
) {
  const now = new Date();
  const days =
    (now.getTime() - lastVerified.getTime()) /
    (1000 * 60 * 60 * 24);

  let decayed = confidence;

  if (days > 180) decayed -= 0.15;
  else if (days > 90) decayed -= 0.1;
  else if (days > 30) decayed -= 0.05;

  return {
    confidence: Math.max(0, Number(decayed.toFixed(2))),
    needsReview: days > 180,
    daysSinceReview: Math.floor(days),
  };
}
