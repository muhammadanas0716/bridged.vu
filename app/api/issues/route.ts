import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, sql } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    await ensureSchema();
    const body = await req.json();
    const startup_id = (body.startup_id || "").toString();
    const title = (body.title || "").toString().trim();
    const content = (body.content || "").toString().trim();
    const publish = Boolean(body.publish ?? true);

    if (!startup_id || !title || !content) {
      return NextResponse.json({ error: "startup_id, title, and content are required" }, { status: 400 });
    }

    // Verify ownership of startup
    const owned = (await sql`SELECT 1 FROM startups WHERE id = ${startup_id} AND user_id = ${user.id} LIMIT 1;`) as any[];
    if ((owned as any[]).length === 0) {
      return NextResponse.json({ error: "Not found or not allowed" }, { status: 404 });
    }

    // Calculate next issue number per startup
    const seq = (await sql`SELECT COALESCE(MAX(issue_number), 0) + 1 AS next FROM issues WHERE startup_id = ${startup_id};`) as any[];
    const nextNumber = seq[0]?.next || 1;
    const id = randomUUID();
    const published_at = publish ? new Date().toISOString() : null;

    const rows = (await sql`
      INSERT INTO issues (id, startup_id, user_id, issue_number, title, content, published_at)
      VALUES (${id}, ${startup_id}, ${user.id}, ${nextNumber}, ${title}, ${content}, ${published_at})
      RETURNING *;
    `) as any[];
    return NextResponse.json({ issue: rows[0] }, { status: 201 });
  } catch (err) {
    console.error("POST /api/issues error", err);
    return NextResponse.json({ error: "Unauthorized or invalid" }, { status: 401 });
  }
}
