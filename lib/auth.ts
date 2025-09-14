import { cookies, headers } from "next/headers";
import { sql, ensureSchema, DbUser } from "./db";
import bcrypt from "bcryptjs";
import { randomUUID, randomBytes } from "crypto";

const SESSION_COOKIE = "fd_session";
const SESSION_TTL_DAYS = 30;

export async function hashPassword(password: string) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export async function createUser({
  email,
  password,
  name,
  handle,
}: {
  email: string;
  password: string;
  name?: string;
  handle?: string;
}): Promise<DbUser> {
  await ensureSchema();
  const id = randomUUID();
  const password_hash = await hashPassword(password);
  const safeHandle = handle || suggestHandleFromEmail(email);

  const rows = (await sql`
    INSERT INTO users (id, email, password_hash, name, handle)
    VALUES (${id}, ${email.toLowerCase()}, ${password_hash}, ${name || null}, ${safeHandle})
    ON CONFLICT (email) DO NOTHING
    RETURNING id, email, name, handle, bio, created_at;
  `) as any[];

  if (rows.length === 0) {
    // email exists, fetch and return
    const existing = (await sql`
      SELECT id, email, name, handle, bio, created_at FROM users WHERE email = ${email.toLowerCase()} LIMIT 1;
    `) as any[];
    if (existing.length) return existing[0];
    throw new Error("Unable to create or fetch user");
  }
  return rows[0];
}

export function suggestHandleFromEmail(email: string) {
  const base = (email.split("@")[0] ?? "").replace(/[^a-zA-Z0-9_]/g, "").slice(0, 20) || "user";
  const suffix = Math.random().toString(36).slice(2, 6);
  return `${base}_${suffix}`.toLowerCase();
}

export async function findUserByEmail(email: string): Promise<(DbUser & { password_hash: string }) | null> {
  await ensureSchema();
  const rows = (await sql`
    SELECT id, email, name, handle, bio, created_at, password_hash FROM users WHERE email = ${email.toLowerCase()} LIMIT 1;
  `) as any[];
  return rows[0] || null;
}

export async function getCurrentUser(): Promise<DbUser | null> {
  await ensureSchema();
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const now = new Date();
  const rows = (await sql`
    SELECT u.id, u.email, u.name, u.handle, u.bio, u.created_at
    FROM sessions s
    JOIN users u ON u.id = s.user_id
    WHERE s.token = ${token} AND s.expires_at > ${now.toISOString()} LIMIT 1;
  `) as any[];
  return rows[0] || null;
}

export async function requireUser(): Promise<DbUser> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}

export async function createSession(userId: string) {
  await ensureSchema();
  const token = randomUUID() + "." + randomBytes(16).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);
  const h = await headers();
  const ua = h.get("user-agent") || null;
  const ip = h.get("x-forwarded-for") || null;
  await sql`
    INSERT INTO sessions (token, user_id, expires_at, user_agent, ip)
    VALUES (${token}, ${userId}, ${expiresAt.toISOString()}, ${ua}, ${ip});
  `;

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    expires: expiresAt,
  });
}

export async function destroySession() {
  await ensureSchema();
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    await sql`DELETE FROM sessions WHERE token = ${token};`;
  }
  cookieStore.set(SESSION_COOKIE, "", { path: "/", httpOnly: true, maxAge: 0 });
}
