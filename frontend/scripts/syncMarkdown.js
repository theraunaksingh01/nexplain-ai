import fs from "fs";
import path from "path";
import pkg from "pg";
import matter from "gray-matter";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pkg;

const CONTENT_ROOT = path.join(process.cwd(), "content");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function sync() {
  await client.connect();

  const subjects = fs.readdirSync(CONTENT_ROOT);

  for (const subject of subjects) {
    const subjectPath = path.join(CONTENT_ROOT, subject);
    if (!fs.statSync(subjectPath).isDirectory()) continue;

    const topics = fs.readdirSync(subjectPath);

    for (const topic of topics) {
      const topicPath = path.join(subjectPath, topic);
      if (!fs.statSync(topicPath).isDirectory()) continue;

      const files = fs.readdirSync(topicPath);

      for (const file of files) {
        if (!file.endsWith(".md")) continue;

        const subtopic = file.replace(".md", "");
        const fullPath = path.join(topicPath, file);

        const raw = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(raw);

        const conceptRes = await client.query(
          `
          INSERT INTO concepts (subject, topic, subtopic, confidence, last_verified)
          VALUES ($1, $2, $3, $4, $5)
          ON CONFLICT (subject, topic, subtopic)
          DO UPDATE SET updated_at = NOW()
          RETURNING id, current_version
          `,
          [
            subject,
            topic,
            subtopic,
            data.confidence ?? 0.75,
            data.last_verified ?? new Date(),
          ]
        );

        const conceptId = conceptRes.rows[0].id;
        const version = conceptRes.rows[0].current_version;

        await client.query(
          `
          INSERT INTO concept_versions (concept_id, version, markdown_path, created_by, change_summary)
          VALUES ($1, $2, $3, 'human', 'Initial markdown sync')
          ON CONFLICT (concept_id, version)
          DO NOTHING
          `,
          [
            conceptId,
            version,
            `content/${subject}/${topic}/${file}`,
          ]
        );

        console.log(`✔ Synced: ${subject}/${topic}/${subtopic}`);
      }
    }
  }

  await client.end();
}

sync().catch((err) => {
  console.error("❌ Sync failed:", err);
  process.exit(1);
});
