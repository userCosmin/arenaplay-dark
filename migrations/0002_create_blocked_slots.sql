-- D1 database: arena-play-leads
-- Applied directly via Cloudflare MCP on 2026-09-10.
-- Adds admin-managed availability blocks (whole-day or specific slot),
-- with optional weekly recurrence, matching the live arenaplay.ro/admin
-- reservation calendar.

CREATE TABLE IF NOT EXISTS blocked_slots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,             -- ISO yyyy-mm-dd; anchor date when recurring = 1
  time TEXT,                      -- slot id (see RESERVATION_SLOTS), NULL = whole day
  recurring INTEGER NOT NULL DEFAULT 0, -- 1 = repeats weekly on this date's weekday, forever
  reason TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_blocked_slots_date ON blocked_slots(date);
