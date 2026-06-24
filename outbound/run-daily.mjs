#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// Orchestrator — runs the whole pipeline once, capped at your daily number.
//   source → enrich → build demos → send
//
//   node outbound/run-daily.mjs --niche "junk removal" --count 150
//   node outbound/run-daily.mjs --niche "junk removal" --count 150 --dry-run
//
// 150 is the safe solo default (deliverability + follow-up capacity). Raise it
// only once you've added sending inboxes and a caller. Each stage no-ops or
// guides you if its API key / config isn't set yet, so you can wire it up
// incrementally without the run blowing up.
// ─────────────────────────────────────────────────────────────────────────────
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const arg = (n, d) => {
  const i = process.argv.indexOf(`--${n}`);
  return i !== -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith("--") ? process.argv[i + 1] : d;
};
const dry = process.argv.includes("--dry-run") ? ["--dry-run"] : [];
const NICHE = arg("niche", "");
const COUNT = arg("count", "150");
if (!NICHE) { console.error("  Usage: node outbound/run-daily.mjs --niche \"<niche>\" --count 150"); process.exit(1); }

const step = (label, file, args) => {
  console.log(`\n══════ ${label} ══════`);
  const res = spawnSync("node", [join(__dirname, file), ...args], { stdio: "inherit", env: process.env });
  if (res.status !== 0) {
    console.log(`\n  ${label} stopped (exit ${res.status}). Fix the above, then re-run. Halting pipeline.\n`);
    process.exit(res.status || 1);
  }
};

const useApify = !!(process.env.APIFY_TOKEN || "").trim();

console.log(`\n  Daily run — niche "${NICHE}", cap ${COUNT}${dry.length ? " (dry run)" : ""}`);
console.log(`  Source: ${useApify ? "Apify (find + email in one)" : "Google Places + Outscraper"}`);

if (useApify) {
  // One pass: finds no-website leads AND fills email — output is already _enriched.
  step("1 · source + enrich (Apify)", "find-leads-apify.mjs", ["--niche", NICHE, "--count", COUNT]);
} else {
  step("1 · source no-website leads", "find-leads.mjs", ["--niche", NICHE, "--count", COUNT]);
  step("1b · enrich (owner + email)", "enrich-leads.mjs", ["--niche", NICHE, ...dry]);
}
step("2 · build demo sites", "demo/build-demos.mjs", ["--niche", NICHE]);
step("4 · text demos (throttled SMS)", "send/send-sms.mjs", ["--niche", NICHE, "--cap", COUNT, ...dry]);
console.log(`\n  Pipeline complete. Now: upload demos to KV (if new), then make your warm calls.\n`);
