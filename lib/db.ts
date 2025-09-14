import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
  // eslint-disable-next-line no-console
  console.warn("DATABASE_URL or POSTGRES_URL is not set. Check your .env.local");
}

export const sql = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL || "");

let initialized = false;

export async function ensureSchema() {
  if (initialized) return;
  initialized = true;

  // Create tables if they don't exist. Lightweight, idempotent.
  await sql`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT,
    handle TEXT UNIQUE,
    bio TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );`;

  // Sessions for simple cookie-based auth
  await sql`
  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    user_agent TEXT,
    ip TEXT
  );`;

  // Startups/projects owned by a user
  await sql`
  CREATE TABLE IF NOT EXISTS startups (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    website_url TEXT,
    logo_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );`;

  // Issues/updates/newsletter entries per startup
  await sql`
  CREATE TABLE IF NOT EXISTS issues (
    id TEXT PRIMARY KEY,
    startup_id TEXT NOT NULL REFERENCES startups(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    issue_number INT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(startup_id, issue_number)
  );`;

  // Upvotes for both startups and issues
  await sql`
  DO $$ BEGIN
    CREATE TYPE vote_target AS ENUM ('startup', 'issue');
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;`;

  await sql`
  CREATE TABLE IF NOT EXISTS upvotes (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    target_type vote_target NOT NULL,
    target_id TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, target_type, target_id)
  );`;

  // Follows between users
  await sql`
  CREATE TABLE IF NOT EXISTS follows (
    follower_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    following_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (follower_id, following_user_id)
  );`;
}

export type DbUser = {
  id: string;
  email: string;
  name: string | null;
  handle: string | null;
  bio: string | null;
  created_at: string;
};
