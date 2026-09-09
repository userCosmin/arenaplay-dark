-- D1 database: arena-play-leads
-- Applied directly via Cloudflare MCP on 2026-09-09. Kept here so the schema
-- is reproducible (`wrangler d1 execute arena-play-leads --file=migrations/0001_create_leads.sql`)
-- and visible in version control.

CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,               -- petreceri | playground | afterschool | arena-mobila | contact
  status TEXT NOT NULL DEFAULT 'nou', -- nou | confirmat | anulat
  name TEXT,
  phone TEXT,
  email TEXT,
  preferred_date TEXT,
  preferred_time TEXT,
  message TEXT,
  payload TEXT NOT NULL,            -- full submitted form data, as JSON
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_type ON leads(type);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
