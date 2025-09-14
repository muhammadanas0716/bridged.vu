import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, sql } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { randomUUID } from "crypto";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  try {
    const user = await requireUser();
    await ensureSchema();
    const startups = (await sql`
      SELECT s.*, COALESCE(u_count.cnt, 0) as upvotes
      FROM startups s
      LEFT JOIN (
        SELECT target_id, COUNT(*)::int AS cnt FROM upvotes WHERE target_type = 'startup'::vote_target GROUP BY target_id
      ) u_count ON u_count.target_id = s.id
      WHERE s.user_id = ${user.id}
      ORDER BY s.created_at DESC;
    `) as any[];
    return NextResponse.json({ startups });
  } catch (err) {
    console.error("GET /api/startups error", err);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    await ensureSchema();
    const body = await req.json();
    const name = (body.name || "").toString().trim();
    const description = body.description ? String(body.description) : null;
    const website_url = body.website_url ? String(body.website_url) : null;
    const logo_url = body.logo_url ? String(body.logo_url) : null;
    if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

    let baseSlug = slugify(name) || "startup";
    let slug = baseSlug;
    // Ensure unique slug
    let i = 1;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const existing = await sql`SELECT 1 FROM startups WHERE slug = ${slug} LIMIT 1;`;
      if ((existing as any[]).length === 0) break;
      slug = `${baseSlug}-${++i}`;
    }

    const id = randomUUID();
    const rows = (await sql`
      INSERT INTO startups (id, user_id, name, slug, description, website_url, logo_url)
      VALUES (${id}, ${user.id}, ${name}, ${slug}, ${description}, ${website_url}, ${logo_url})
      RETURNING *;
    `) as any[];
    return NextResponse.json({ startup: rows[0] }, { status: 201 });
  } catch (err) {
    console.error("POST /api/startups error", err);
    return NextResponse.json({ error: "Unauthorized or invalid" }, { status: 401 });
  }
}
