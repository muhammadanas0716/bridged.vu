-- History table to support 301 redirects on slug changes
CREATE TABLE IF NOT EXISTS startup_slug_redirects (
  slug TEXT PRIMARY KEY,
  startup_id TEXT NOT NULL REFERENCES startups(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

