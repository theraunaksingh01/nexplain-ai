import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text } = await req.json();

  if (!text || text.length < 5) {
    return NextResponse.json(
      { error: "Invalid input" },
      { status: 400 }
    );
  }

  // MOCK AI RESPONSE 
  return NextResponse.json({
    explanation: `In simple terms: ${text} means that a child entity can reuse and extend the behavior of a parent entity.`
  });
}
