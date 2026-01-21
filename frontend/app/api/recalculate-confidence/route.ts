import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: Request) {
    const { conceptId } = await req.json();

    const feedback = (await query(
        `
  SELECT clarity_score
  FROM user_feedback
  WHERE concept_id = $1
  `,
        [conceptId]
    )) as { clarity_score: number }[];

    const positive = feedback.filter(f => f.clarity_score > 0).length;
    const negative = feedback.filter(f => f.clarity_score < 0).length;

    const current = (await query(
        `SELECT confidence FROM concepts WHERE id = $1`,
        [conceptId]
    )) as { confidence: number }[];

    let confidence = current[0].confidence;

    // weighted adjustment
    confidence += positive * 0.005;
    confidence -= negative * 0.01;

    // clamp
    confidence = Math.max(0.6, Math.min(confidence, 0.99));

    await query(
        `UPDATE concepts SET confidence = $1 WHERE id = $2`,
        [confidence, conceptId]
    );


    return NextResponse.json({ confidence });
}
