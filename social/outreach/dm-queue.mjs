#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// Stage 6b — build the semi-automated outreach queue (human approves before send).
// For each warm, enriched lead it drafts a personalized LinkedIn DM, and — when
// Apollo found a work email — a ready email you can hand to outbound/send/.
// Output: data/dm-queue.json + data/dm-queue.csv (DMs) + data/email-handoff.csv.
//
//   node social/outreach/dm-queue.mjs
//   node social/outreach/dm-queue.mjs --min-intent 2 --limit 25
//   node social/outreach/dm-queue.mjs --dry-run
// ─────────────────────────────────────────────────────────────────────────────
import { loadEnv, arg, flag } from "../lib/env.mjs";
import { ask } from "../lib/claude.mjs";
import { brandBrief, readJson, writeJson, dataPath } from "../lib/store.mjs";
import { toCsv } from "../../outbound/lib/csv.mjs";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
loadEnv();

const MIN_INTENT = parseInt(arg("min-intent", "2"), 10);
const LIMIT = parseInt(arg("limit", "0"), 10) || Infinity;
const DRY = flag("dry-run");

const leads = readJson("leads-social.json", []);
const posts = new Map(readJson("posts.json", []).map((p) => [p.id, p]));
const warm = leads.filter((l) => (l.intent || 0) >= MIN_INTENT).sort((a, b) => b.intent - a.intent).slice(0, LIMIT);

if (!warm.length) {
  console.error(`  No leads at intent ≥ ${MIN_INTENT}. Lower --min-intent or harvest/enrich more.`);
  process.exit(1);
}

const system = `You write first-touch LinkedIn DMs for the founder of Xevaro Labs,
an AI automation + web agency. The recipient just engaged with our post, so this
is warm. Rules: reference what they engaged with, lead with value/relevance, ONE
soft ask (quick chat or a resource), under 60 words, no link dump, no "Hope you're
well", sound human. Plain text only.`;

const existing = readJson("dm-queue.json", []);
const byUrl = new Map(existing.map((d) => [d.profileUrl, d]));
console.log(`\n  Drafting outreach for ${warm.length} warm lead(s)${DRY ? " (dry run)" : ""}…\n`);

for (const l of warm) {
  if (byUrl.has(l.profileUrl)) continue;
  const post = posts.get(l.postId);
  const context = l.comment ? `commented: "${l.comment}"` : `reacted to our post`;
  const prompt = `Brand brief:\n${brandBrief()}\n
Lead: ${l.name}${l.title ? `, ${l.title}` : ""}${l.company ? ` at ${l.company}` : ""}
They ${context} on our post hook: "${post?.hook || l.postId}".

Write the LinkedIn DM.`;
  let dm = "";
  try {
    dm = await ask({ system, prompt, maxTokens: 300 });
  } catch (e) {
    console.log(`  ✗ ${l.name}  ${e.message}`);
    continue;
  }
  const rec = {
    profileUrl: l.profileUrl,
    name: l.name,
    title: l.title || "",
    company: l.company || "",
    email: l.email || "",
    intent: l.intent,
    dm,
    status: "pending_approval",
    postId: l.postId,
  };
  byUrl.set(l.profileUrl, rec);
  console.log(`  ● ${l.name.padEnd(22)} intent ${l.intent}  ${l.email ? "✉ " + l.email : "(DM only)"}`);
  console.log(`    ↳ ${dm}\n`);
}

if (DRY) {
  console.log("  Dry run — nothing written.\n");
  process.exit(0);
}

const queue = [...byUrl.values()];
writeJson("dm-queue.json", queue);

// CSV 1 — LinkedIn DMs to send by hand (the safe, no-ban path).
const dmCsv = toCsv(
  ["name", "profileUrl", "intent", "dm", "status"],
  queue.map((d) => [d.name, d.profileUrl, d.intent, d.dm, d.status])
);
// CSV 2 — email handoff for Apollo-matched work emails → feed outbound/send/.
const withEmail = queue.filter((d) => d.email);
const emailCsv = toCsv(
  ["email", "name", "company", "subject", "body"],
  withEmail.map((d) => [
    d.email,
    d.name,
    d.company,
    `Following up on your LinkedIn comment`,
    d.dm,
  ])
);

mkdirSync(dirname(dataPath("dm-queue.csv")), { recursive: true });
writeFileSync(dataPath("dm-queue.csv"), dmCsv);
writeFileSync(dataPath("email-handoff.csv"), emailCsv);

console.log(`  Queue: ${queue.length} lead(s) · ${withEmail.length} with work email`);
console.log(`   → ${dataPath("dm-queue.csv")}      (send these LinkedIn DMs by hand, approve as you go)`);
console.log(`   → ${dataPath("email-handoff.csv")} (work emails — route through outbound/send/)\n`);
