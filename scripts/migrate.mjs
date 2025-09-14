import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import postgres from 'postgres';

const connString = process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING || '';
if (!connString) {
  console.error('POSTGRES_URL/POSTGRES_URL_NON_POOLING not set');
  process.exit(1);
}

const sql = postgres(connString, { ssl: { rejectUnauthorized: false } });

async function ensureMigrationsTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id BIGSERIAL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
}

async function applied() {
  try {
    const rows = await sql`SELECT name FROM schema_migrations ORDER BY name`;
    return new Set(rows.map(r => r.name));
  } catch (e) {
    return new Set();
  }
}

async function run() {
  await ensureMigrationsTable();
  const appliedSet = await applied();
  const dir = path.join(process.cwd(), 'migrations');
  const files = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter(f => f.endsWith('.sql')).sort()
    : [];
  for (const file of files) {
    if (appliedSet.has(file)) continue;
    const sqlText = fs.readFileSync(path.join(dir, file), 'utf8');
    console.log(`Applying migration: ${file}`);
    try {
      await sql.begin(async (trx) => {
        await trx.unsafe(sqlText);
        await trx`INSERT INTO schema_migrations (name) VALUES (${file})`;
      });
      console.log(`Applied: ${file}`);
    } catch (e) {
      console.error(`Failed to apply ${file}:`, e);
      process.exit(1);
    }
  }
  await sql.end();
  console.log('Migrations complete');
}

run();
