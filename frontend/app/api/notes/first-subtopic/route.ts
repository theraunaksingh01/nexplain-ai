import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const subject = searchParams.get("subject");
  const topic = searchParams.get("topic");

  if (!subject || !topic) {
    return NextResponse.json(
      { error: "Missing subject or topic" },
      { status: 400 }
    );
  }

  const basePath = path.join(
    process.cwd(),
    "content",
    subject,
    topic
  );

  if (!fs.existsSync(basePath)) {
    return NextResponse.json(
      { error: "Topic not found" },
      { status: 404 }
    );
  }

  const files = fs
    .readdirSync(basePath)
    .filter(f => f.endsWith(".md"))
    .sort(); // IMPORTANT: respects 01-, 02-, etc.

  if (!files.length) {
    return NextResponse.json(
      { error: "No subtopics found" },
      { status: 404 }
    );
  }

  const firstFile = files[0];
  const slug = firstFile.replace(/\.md$/, "");

  return NextResponse.json({ subtopic: slug });
}