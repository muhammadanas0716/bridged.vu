import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, sql } from "@/lib/db";
import { requireUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    await ensureSchema();
    const body = await req.json();
    const following_user_id = String(body.following_user_id || "");
    if (!following_user_id || following_user_id === user.id) {
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });
    }

    const existing = (await sql`SELECT 1 FROM follows WHERE follower_id = ${user.id} AND following_user_id = ${following_user_id} LIMIT 1;`) as any[];
    if (existing.length) {
      await sql`DELETE FROM follows WHERE follower_id = ${user.id} AND following_user_id = ${following_user_id};`;
      return NextResponse.json({ following: false });
    }
    await sql`INSERT INTO follows (follower_id, following_user_id) VALUES (${user.id}, ${following_user_id});`;
    return NextResponse.json({ following: true });
  } catch (err) {
    console.error("POST /api/follow error", err);
    return NextResponse.json({ error: "Unauthorized or invalid" }, { status: 401 });
  }
}
