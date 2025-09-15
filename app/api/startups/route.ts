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

export async function PATCH(req: NextRequest) {
  try {
    const user = await requireUser();
    await ensureSchema();
    const body = await req.json();
    const id = String(body.id || "");
    if (!id) return NextResponse.json({ error: "Missing startup id" }, { status: 400 });

    const owned = (await sql`SELECT 1 FROM startups WHERE id = ${id} AND user_id = ${user.id} LIMIT 1;`) as any[];
    if (owned.length === 0) return NextResponse.json({ error: "Not found or not allowed" }, { status: 404 });

    // Fetch current to check slug changes
    const currentRows = (await sql`SELECT slug FROM startups WHERE id = ${id} LIMIT 1;`) as any[];
    const currentSlug: string = currentRows[0]?.slug;

    const fields: string[] = [];
    const values: any[] = [];
    let newSlug: string | null = null;
    if (typeof body.name === 'string') {
      fields.push('name'); values.push(body.name);
      // compute slug from name
      const base = body.name.toString().toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/[\s-]+/g, "-").replace(/^-+|-+$/g, "") || 'startup';
      // ensure unique
      let candidate = base; let i = 1;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const exists = await sql`SELECT 1 FROM startups WHERE slug = ${candidate} AND id <> ${id} LIMIT 1;` as any[];
        if (!exists.length) break; candidate = `${base}-${++i}`;
      }
      if (candidate !== currentSlug) {
        newSlug = candidate; fields.push('slug'); values.push(candidate);
      }
    }
    if (typeof body.description === 'string') { fields.push('description'); values.push(body.description); }
    if (typeof body.website_url === 'string') { fields.push('website_url'); values.push(body.website_url); }
    if (typeof body.logo_url === 'string') { fields.push('logo_url'); values.push(body.logo_url); }

    if (fields.length === 0) return NextResponse.json({ error: "No fields to update" }, { status: 400 });

    // Build dynamic SET clause
    const setSql = fields.map((f, idx) => `${f} = $${idx + 1}`).join(', ');
    const query = `UPDATE startups SET ${setSql} WHERE id = $${fields.length + 1} RETURNING *;`;
    const rows = await (sql as any).unsafe(query, [...values, id]);
    if (newSlug && currentSlug && newSlug !== currentSlug) {
      await sql`INSERT INTO startup_slug_redirects (slug, startup_id) VALUES (${currentSlug}, ${id}) ON CONFLICT (slug) DO NOTHING;`;
    }
    return NextResponse.json({ startup: rows[0] });
  } catch (err) {
    console.error("PATCH /api/startups error", err);
    return NextResponse.json({ error: "Unauthorized or invalid" }, { status: 401 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await requireUser();
    await ensureSchema();
    const body = await req.json();
    const id = String(body.id || "");
    if (!id) return NextResponse.json({ error: "Missing startup id" }, { status: 400 });

    const owned = (await sql`SELECT 1 FROM startups WHERE id = ${id} AND user_id = ${user.id} LIMIT 1;`) as any[];
    if (owned.length === 0) return NextResponse.json({ error: "Not found or not allowed" }, { status: 404 });

    // Use a transaction to keep things tidy
    await (sql as any).begin(async (tx: any) => {
      // Remove upvotes for issues belonging to this startup
      await tx`DELETE FROM upvotes WHERE target_type = 'issue'::vote_target AND target_id IN (SELECT id FROM issues WHERE startup_id = ${id});`;
      // Remove upvotes directly on this startup
      await tx`DELETE FROM upvotes WHERE target_type = 'startup'::vote_target AND target_id = ${id};`;
      // Delete the startup (will cascade to issues and slug redirects)
      await tx`DELETE FROM startups WHERE id = ${id};`;
    });

    return NextResponse.json({ ok: true, deleted_id: id });
  } catch (err) {
    console.error("DELETE /api/startups error", err);
    return NextResponse.json({ error: "Unauthorized or invalid" }, { status: 401 });
  }
}
