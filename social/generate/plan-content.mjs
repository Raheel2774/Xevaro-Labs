#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// Stage 1 — AI content calendar.
// Generates N days of on-brand LinkedIn post ideas (hook / angle / CTA) and
// schedules them. Output → data/content-plan.json (consumed by make-post.mjs).
//
//   node social/generate/plan-content.mjs --days 7 --per-day 1
//   node social/generate/plan-content.mjs --days 7 --dry-run
// ─────────────────────────────────────────────────────────────────────────────
import { loadEnv, arg, flag } from "../lib/env.mjs";
import { ask } from "../lib/claude.mjs";
import { brandBrief, readJson, writeJson } from "../lib/store.mjs";
loadEnv();

const DAYS = parseInt(arg("days", "7"), 10);
const PER_DAY = parseInt(arg("per-day", "1"), 10);
const PLATFORM = arg("platform", "linkedin");
const HOUR = parseInt(arg("hour", "9"), 10); // local posting hour
const DRY = flag("dry-run");
const N = DAYS * PER_DAY;

const system = `You are head of content for Xevaro Labs. You write ${PLATFORM} content
that earns inbound leads from business owners and founders. Mix value (teach how
we automate things), proof (mini case studies / results), and soft offers. No
emoji spam, no hashtag stuffing, no engagement-bait. Return ONLY valid JSON.`;

const prompt = `Brand brief:
${brandBrief()}

Generate ${N} distinct ${PLATFORM} post ideas for the next ${DAYS} days.
Vary the content pillars across: "teach" (how-to / automation tip),
"case-study" (a result we delivered), "contrarian" (a sharp take), and
"offer" (a soft pitch). Keep it specific to AI automation + web for owners.

Return a JSON array of exactly ${N} objects, each:
{
  "pillar": "teach" | "case-study" | "contrarian" | "offer",
  "hook": "the scroll-stopping first line",
  "angle": "1-2 sentences on what the post argues / teaches",
  "cta": "the call to action (DM, comment a keyword, book a call, etc.)",
  "keywords": ["3-6 topical keywords"]
}`;

console.log(`\n  Planning ${N} ${PLATFORM} posts over ${DAYS} days${DRY ? " (dry run)" : ""}…`);
let ideas;
try {
  ideas = await ask({ system, prompt, maxTokens: 4000, json: true });
} catch (e) {
  console.error(`  ${e.message}`);
  process.exit(1);
}
if (!Array.isArray(ideas) || !ideas.length) {
  console.error("  Model returned no usable ideas. Re-run.");
  process.exit(1);
}

// Schedule: start tomorrow, PER_DAY posts/day at HOUR (+2h spacing within a day).
const plan = ideas.map((idea, i) => {
  const day = Math.floor(i / PER_DAY) + 1;
  const slot = i % PER_DAY;
  const d = new Date();
  d.setDate(d.getDate() + day);
  d.setHours(HOUR + slot * 2, 0, 0, 0);
  const id = `${d.toISOString().slice(0, 10)}-${slot + 1}`;
  return { id, platform: PLATFORM, status: "planned", scheduledFor: d.toISOString(), ...idea };
});

console.log(`\n  ${plan.length} ideas:`);
for (const p of plan) console.log(`   • [${p.pillar.padEnd(11)}] ${p.scheduledFor.slice(0, 16)}  ${p.hook}`);

if (DRY) {
  console.log("\n  Dry run — nothing written.\n");
  process.exit(0);
}

// Keep any already-made posts; only replace the planned set.
const existing = readJson("content-plan.json", []);
const kept = existing.filter((p) => p.status !== "planned");
const out = writeJson("content-plan.json", [...kept, ...plan]);
console.log(`\n  Wrote ${plan.length} planned posts → ${out}\n  Next: node social/generate/make-post.mjs\n`);
