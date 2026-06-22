-- Xevaro OS — contact submissions schema (Cloudflare D1 / SQLite)
-- Apply with: wrangler d1 execute xevaro_db --remote --file=./db/schema.sql

CREATE TABLE IF NOT EXISTS submissions (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT,
  company    TEXT,
  email      TEXT NOT NULL,
  system     TEXT,
  message    TEXT,
  ip         TEXT,
  user_agent TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions (created_at);
CREATE INDEX IF NOT EXISTS idx_submissions_email      ON submissions (email);
