-- Xevaro OS — contact submissions schema (Cloudflare D1 / SQLite)
-- Apply with: wrangler d1 execute xevaro_db --remote --file=./db/schema.sql

CREATE TABLE IF NOT EXISTS submissions (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT,
  company    TEXT,
  email      TEXT NOT NULL,
  phone      TEXT,
  system     TEXT,
  message     TEXT,
  source      TEXT,
  sms_consent TEXT,          -- 'yes'/'no' — A2P 10DLC opt-in record for SMS outreach
  ip          TEXT,
  user_agent  TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Existing deployments: add the SMS consent column once (safe to ignore a "duplicate column" error).
-- wrangler d1 execute xevaro_db --remote --command "ALTER TABLE submissions ADD COLUMN sms_consent TEXT;"

CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions (created_at);
CREATE INDEX IF NOT EXISTS idx_submissions_email      ON submissions (email);
