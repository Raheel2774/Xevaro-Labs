#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// Stage 4 — engagement harvest (Phase 1: manual import).
// LinkedIn has NO official API for "who liked/commented on my post", so for
// Phase 1 you copy engagers off the post into a CSV and import them here.
// (Phase 4 can swap this for a risk-managed Apify LinkedIn scraper.)
//
// CSV columns: name, profileUrl, type(comment|reaction), comment, postId
// A starter file lives at social/harvest/engagers.template.csv
//
//   node social/harvest/harvest.mjs --csv social/data/engagers.csv
//   node social/harvest/harvest.mjs --csv social/data/engagers.csv --post 2026-06-25-1
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync } from "node:fs";
import { loadEnv, arg } from "../lib/env.mjs";
import { readJson, writeJson } from "../lib/store.mjs";
import { parseCsv, colIndex } from "../../outbound/lib/csv.mjs";
loadEnv();

const CSV = arg("csv", "");
const DEFAULT_POST = arg("post", "");
if (!CSV) {
  console.error("  Usage: node social/harvest/harvest.mjs --csv <file> [--post <postId>]");
  console.error("  Template columns: name, profileUrl, type, comment, postId");
  process.exit(1);
}

let text;
try {
  text = readFileSync(CSV, "utf8");
} catch {
  console.error(`  Can't read ${CSV}`);
  process.exit(1);
}

const { header, rows } = parseCsv(text);
const ci = {
  name: colIndex(header, "name"),
  profileUrl: colIndex(header, "profileUrl"),
  type: colIndex(header, "type"),
  comment: colIndex(header, "comment"),
  postId: colIndex(header, "postId"),
};
if (ci.name === -1 || ci.profileUrl === -1) {
  console.error("  CSV needs at least 'name' and 'profileUrl' columns.");
  process.exit(1);
}

// Intent score: a question beats a plain comment beats a reaction.
const score = (type, comment) => {
  const t = (type || "").toLowerCase();
  if (t.startsWith("comment")) return /\?/.test(comment || "") ? 3 : 2;
  return 1; // reaction / like
};

const existing = readJson("engagement.json", []);
const seen = new Set(existing.map((e) => e.key));
let added = 0;

for (const r of rows) {
  const profileUrl = (r[ci.profileUrl] || "").trim();
  if (!profileUrl) continue;
  const postId = (ci.postId !== -1 ? r[ci.postId] : "").trim() || DEFAULT_POST || "unknown";
  const key = `${profileUrl}|${postId}`;
  if (seen.has(key)) continue;
  seen.add(key);
  const comment = ci.comment !== -1 ? (r[ci.comment] || "").trim() : "";
  const type = (ci.type !== -1 ? r[ci.type] : "").trim() || "reaction";
  existing.push({
    key,
    name: (r[ci.name] || "").trim(),
    profileUrl,
    type,
    comment,
    postId,
    intent: score(type, comment),
    enriched: false,
    harvestedAt: new Date().toISOString(),
  });
  added++;
}

const out = writeJson("engagement.json", existing);
console.log(`\n  Imported ${added} new engager(s) (${existing.length} total) → ${out}`);
console.log(`  Next: node social/harvest/enrich.mjs   (find their work email via Apollo)\n`);
