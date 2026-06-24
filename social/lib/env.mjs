// Loads .env from the project root once (Node 20.6+ has process.loadEnvFile).
// Safe no-op if the file is missing — every script calls loadEnv() at the top.
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", ".."); // project root
let done = false;

export function loadEnv() {
  if (done) return;
  done = true;
  const p = join(ROOT, ".env");
  if (existsSync(p) && process.loadEnvFile) {
    try {
      process.loadEnvFile(p);
    } catch {
      /* malformed .env — ignore, scripts will warn on the specific missing key */
    }
  }
}

// --foo bar  → "bar" (or default if absent). --foo --bar → default (no value).
export const arg = (n, d) => {
  const i = process.argv.indexOf(`--${n}`);
  return i !== -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith("--")
    ? process.argv[i + 1]
    : d;
};

export const flag = (n) => process.argv.includes(`--${n}`);

export const env = (n) => (process.env[n] || "").trim();
