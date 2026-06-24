#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// Stage 5 — enrich engagers via Apollo (LinkedIn URL → title, company, work email).
// Turns an un-messageable social engager into a contactable lead, so warm ones
// can be routed into your existing outbound/ email sender.
//
// Setup (.env):  APOLLO_API_KEY=...   (Apollo → Settings → API; consumes credits)
// NOTE: you also have Apollo connected over MCP for ad-hoc lookups; this script
// uses the REST API so it can run unattended in the cron pipeline.
//
//   node social/harvest/enrich.mjs
//   node social/harvest/enrich.mjs --dry-run
//   node social/harvest/enrich.mjs --emails   # also reveal personal emails (more credits)
// ─────────────────────────────────────────────────────────────────────────────
import { loadEnv, flag, env } from "../lib/env.mjs";
import { readJson, writeJson } from "../lib/store.mjs";
loadEnv();

const KEY = env("APOLLO_API_KEY");
const DRY = flag("dry-run");
const REVEAL = flag("emails");

const engagement = readJson("engagement.json", []);
if (!engagement.length) {
  console.error("  No engagement.json — run harvest.mjs first.");
  process.exit(1);
}

const todo = engagement.filter((e) => !e.enriched);
if (!todo.length) {
  console.log("  All engagers already enriched.\n");
  process.exit(0);
}
if (!KEY && !DRY) {
  console.error("  APOLLO_API_KEY not set in .env (Apollo → Settings → API).");
  process.exit(1);
}

const firstLast = (name) => {
  const parts = (name || "").trim().split(/\s+/);
  return { first_name: parts[0] || "", last_name: parts.slice(1).join(" ") || "" };
};

async function match(e) {
  const { first_name, last_name } = firstLast(e.name);
  const body = {
    linkedin_url: e.profileUrl,
    first_name,
    last_name,
    reveal_personal_emails: REVEAL,
  };
  const res = await fetch("https://api.apollo.io/api/v1/people/match", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": KEY, accept: "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Apollo ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.person || null;
}

const leads = readJson("leads-social.json", []);
const byUrl = new Map(leads.map((l) => [l.profileUrl, l]));
console.log(`\n  Enriching ${todo.length} engager(s)${DRY ? " (dry run)" : ""}…\n`);

for (const e of todo) {
  if (DRY) {
    console.log(`  · would match ${e.name} (${e.profileUrl})`);
    continue;
  }
  try {
    const p = await match(e);
    const lead = {
      ...e,
      enriched: true,
      title: p?.title || "",
      company: p?.organization?.name || "",
      companyDomain: p?.organization?.primary_domain || "",
      email: p?.email || "",
      apolloId: p?.id || "",
    };
    byUrl.set(e.profileUrl, lead);
    e.enriched = true;
    console.log(`  ✓ ${e.name.padEnd(22)} ${lead.title || "?"} @ ${lead.company || "?"}  ${lead.email || "(no email)"}`);
  } catch (err) {
    console.log(`  ✗ ${e.name}  ${err.message}`);
  }
}

if (DRY) {
  console.log("\n  Dry run — nothing written.\n");
  process.exit(0);
}

writeJson("engagement.json", engagement);
const out = writeJson("leads-social.json", [...byUrl.values()].sort((a, b) => b.intent - a.intent));
console.log(`\n  Wrote ${byUrl.size} enriched lead(s) → ${out}`);
console.log(`  Next: node social/outreach/reply-suggest.mjs  &&  node social/outreach/dm-queue.mjs\n`);
