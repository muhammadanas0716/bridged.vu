import postgres from "postgres";

const connString = process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING || "";
if (!connString) {
  // eslint-disable-next-line no-console
  console.warn("POSTGRES_URL is not set. Check your .env.local");
}

export const sql = postgres(connString, {
  ssl: { rejectUnauthorized: false },
});

let warned = false;

// Migrations are now responsible for schema.
// This function remains to keep existing call sites safe.
export async function ensureSchema() {
  if (warned) return;
  warned = true;
  try {
    await sql`SELECT 1 FROM schema_migrations LIMIT 1;`;
  } catch {
    // eslint-disable-next-line no-console
    console.warn("Schema migrations not found. Run `npm run migrate` to initialize the database.");
  }
}

export type DbUser = {
  id: string;
  email: string;
  name: string | null;
  handle: string | null;
  bio: string | null;
  created_at: string;
};
