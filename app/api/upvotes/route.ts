import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, sql } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    await ensureSchema();
    const body = await req.json();
    const target_type = String(body.target_type || "").toLowerCase();
    const target_id = String(body.target_id || "");
    if (!target_id || (target_type !== "startup" && target_type !== "issue")) {
      return NextResponse.json({ error: "Invalid target" }, { status: 400 });
    }

    // Toggle behavior: if exists, remove; else, add
    const exists = (await sql`SELECT 1 FROM upvotes WHERE user_id = ${user.id} AND target_type = ${target_type}::vote_target AND target_id = ${target_id} LIMIT 1;`) as any[];
    if (exists.length) {
      await sql`DELETE FROM upvotes WHERE user_id = ${user.id} AND target_type = ${target_type}::vote_target AND target_id = ${target_id};`;
      return NextResponse.json({ upvoted: false });
    }
    const id = randomUUID();
    await sql`INSERT INTO upvotes (id, user_id, target_type, target_id) VALUES (${id}, ${user.id}, ${target_type}::vote_target, ${target_id});`;
    return NextResponse.json({ upvoted: true });
  } catch (err) {
    console.error("POST /api/upvotes error", err);
    return NextResponse.json({ error: "Unauthorized or invalid" }, { status: 401 });
  }
}
