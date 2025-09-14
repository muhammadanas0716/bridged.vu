import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, sql } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await ensureSchema();
    const { searchParams } = new URL(req.url);
    const mode = (searchParams.get("mode") || "all").toLowerCase();
    const limit = Math.min(parseInt(searchParams.get("limit") || "10", 10) || 10, 50);
    const offset = Math.max(parseInt(searchParams.get("offset") || "0", 10) || 0, 0);

    const viewer = await getCurrentUser();
    const viewerId = viewer?.id || null;

    let items: any[] = [];

    if (mode === "following") {
      if (!viewerId) {
        return NextResponse.json({ items: [] });
      }
      items = (await sql`
        SELECT i.id,
               i.title,
               i.content,
               i.issue_number,
               i.created_at,
               s.name AS startup_name,
               s.slug AS startup_slug,
               s.website_url AS startup_website_url,
               s.logo_url AS startup_logo_url,
               u.id as author_id,
               u.handle as author_handle,
               u.name as author_name,
               TRUE AS is_following,
               COALESCE(icnt.cnt, 0)::int AS upvotes
        FROM issues i
        JOIN startups s ON s.id = i.startup_id
        JOIN users u ON u.id = i.user_id
        LEFT JOIN (
          SELECT target_id, COUNT(*)::int AS cnt FROM upvotes WHERE target_type = 'issue'::vote_target GROUP BY target_id
        ) icnt ON icnt.target_id = i.id
        WHERE EXISTS (
          SELECT 1 FROM follows fo WHERE fo.follower_id = ${viewerId} AND fo.following_user_id = i.user_id
        )
        ORDER BY i.created_at DESC
        LIMIT ${limit} OFFSET ${offset};
      `) as any[];
    } else {
      items = (await sql`
        SELECT i.id,
               i.title,
               i.content,
               i.issue_number,
               i.created_at,
               s.name AS startup_name,
               s.slug AS startup_slug,
               s.website_url AS startup_website_url,
               s.logo_url AS startup_logo_url,
               u.id as author_id,
               u.handle as author_handle,
               u.name as author_name,
               CASE WHEN f.follower_id IS NOT NULL THEN TRUE ELSE FALSE END AS is_following,
               COALESCE(icnt.cnt, 0)::int AS upvotes
        FROM issues i
        JOIN startups s ON s.id = i.startup_id
        JOIN users u ON u.id = i.user_id
        LEFT JOIN follows f ON f.follower_id = ${viewerId} AND f.following_user_id = u.id
        LEFT JOIN (
          SELECT target_id, COUNT(*)::int AS cnt FROM upvotes WHERE target_type = 'issue'::vote_target GROUP BY target_id
        ) icnt ON icnt.target_id = i.id
        ORDER BY i.created_at DESC
        LIMIT ${limit} OFFSET ${offset};
      `) as any[];
    }

    return NextResponse.json({ items });
  } catch (err) {
    console.error("GET /api/feed error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
