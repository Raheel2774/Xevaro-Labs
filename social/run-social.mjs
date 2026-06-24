#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// Orchestrator — runs the social engine in two phases around the one manual step.
//
//   PUBLISH phase (fully automatable, safe to cron):
//     plan → make → publish (Postiz)
//   …then YOU do the manual harvest (copy engagers off the LinkedIn post into a CSV)…
//   OUTREACH phase (run after harvest):
//     enrich (Apollo) → reply drafts → DM/email queue
//
//   node social/run-social.mjs --phase publish --days 7
//   node social/run-social.mjs --phase outreach --csv social/data/engagers.csv
//   node social/run-social.mjs --phase publish --dry-run
// ─────────────────────────────────────────────────────────────────────────────
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv, arg, flag } from "./lib/env.mjs";
loadEnv();

const __dirname = dirname(fileURLToPath(import.meta.url));
const PHASE = arg("phase", "publish");
const DAYS = arg("days", "7");
const CSV = arg("csv", "");
const dry = flag("dry-run") ? ["--dry-run"] : [];

const step = (label, file, args) => {
  console.log(`\n══════ ${label} ══════`);
  const res = spawnSync("node", [join(__dirname, file), ...args], { stdio: "inherit", env: process.env });
  if (res.status !== 0) {
    console.log(`\n  ${label} stopped (exit ${res.status}). Fix the above, then re-run. Halting.\n`);
    process.exit(res.status || 1);
  }
};

if (PHASE === "publish") {
  console.log(`\n  Social engine — PUBLISH phase${dry.length ? " (dry run)" : ""}`);
  step("1 · plan content", "generate/plan-content.mjs", ["--days", DAYS, ...dry]);
  step("2 · write posts", "generate/make-post.mjs", [...dry]);
  step("3 · publish (Postiz)", "publish/postiz-adapter.mjs", [dry.length ? "--due" : "--due", ...(dry.length ? ["--print"] : [])]);
  console.log(`\n  Published/scheduled. After people engage:`);
  console.log(`   1) copy engagers off the post into a CSV (cols: name,profileUrl,type,comment,postId)`);
  console.log(`   2) node social/run-social.mjs --phase outreach --csv <that.csv>\n`);
} else if (PHASE === "outreach") {
  if (!CSV) {
    console.error("  Outreach phase needs --csv <engagers.csv> (your manual harvest export).");
    process.exit(1);
  }
  console.log(`\n  Social engine — OUTREACH phase${dry.length ? " (dry run)" : ""}`);
  step("4 · harvest engagers", "harvest/harvest.mjs", ["--csv", CSV]);
  step("5 · enrich (Apollo)", "harvest/enrich.mjs", [...dry]);
  step("6a · reply drafts", "outreach/reply-suggest.mjs", [...dry]);
  step("6b · DM + email queue", "outreach/dm-queue.mjs", [...dry]);
  console.log(`\n  Review social/data/dm-queue.csv + email-handoff.csv, then send your approved outreach.\n`);
} else {
  console.error(`  Unknown --phase "${PHASE}". Use "publish" or "outreach".`);
  process.exit(1);
}
