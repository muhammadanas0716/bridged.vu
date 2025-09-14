import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, sql } from "@/lib/db";
import { requireUser, findUserByEmail, hashPassword, verifyPassword } from "@/lib/auth";

export async function GET() {
  try {
    const user = await requireUser();
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await requireUser();
    await ensureSchema();
    const body = await req.json();

    if (body.current_password && body.new_password) {
      const full = await findUserByEmail(user.email);
      if (!full) return NextResponse.json({ error: 'User not found' }, { status: 404 });
      const ok = await verifyPassword(String(body.current_password), (full as any).password_hash);
      if (!ok) return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
      if (String(body.new_password).length < 8) return NextResponse.json({ error: 'New password too short' }, { status: 400 });
      const newHash = await hashPassword(String(body.new_password));
      await sql`UPDATE users SET password_hash = ${newHash} WHERE id = ${user.id};`;
      return NextResponse.json({ ok: true });
    }

    const updates: string[] = [];
    const values: any[] = [];
    if (typeof body.name === 'string') { updates.push('name'); values.push(body.name); }
    if (typeof body.handle === 'string') { updates.push('handle'); values.push(body.handle); }
    if (typeof body.email === 'string') { updates.push('email'); values.push(String(body.email).toLowerCase()); }

    if (updates.length === 0) return NextResponse.json({ error: 'No fields to update' }, { status: 400 });

    if (body.email) {
      const existing = await (sql as any)`SELECT 1 FROM users WHERE email = ${String(body.email).toLowerCase()} AND id <> ${user.id} LIMIT 1;`;
      if (existing.length) return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }
    if (body.handle) {
      const existing = await (sql as any)`SELECT 1 FROM users WHERE handle = ${String(body.handle)} AND id <> ${user.id} LIMIT 1;`;
      if (existing.length) return NextResponse.json({ error: 'Handle already in use' }, { status: 409 });
    }

    const setSql = updates.map((f, idx) => `${f} = $${idx + 1}`).join(', ');
    const query = `UPDATE users SET ${setSql} WHERE id = $${updates.length + 1} RETURNING id, email, name, handle, bio, created_at;`;
    const rows = await (sql as any).unsafe(query, [...values, user.id]);
    return NextResponse.json({ user: rows[0] });
  } catch (err) {
    console.error('PATCH /api/profile error', err);
    return NextResponse.json({ error: 'Unauthorized or invalid' }, { status: 401 });
  }
}

