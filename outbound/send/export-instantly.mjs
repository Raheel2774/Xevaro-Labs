#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// Bridge: enriched leads CSV  →  Instantly-ready upload CSV.
// Produces columns Instantly maps to variables: email, first_name, company_name,
// niche, city, demo_link. Only rows with a real email (@) are exported.
// Drop the demo_link into your Instantly sequence as {{demo_link}}.
//
//   node --env-file=.env outbound/send/export-instantly.mjs --in outbound/data/leads_roofing_2026-06-24_enriched.csv
//   node --env-file=.env outbound/send/export-instantly.mjs --niche roofing
//
// Output: outbound/data/instantly_<niche>_<date>.csv  →  upload to Instantly campaign.
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { parseCsv, colIndex, escCsv } from "../lib/csv.mjs";
import { findLatest } from "../lib/files.mjs";
import { nicheSlug, slugFor } from "../lib/slug.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "data");
const arg = (n, d) => {
  const i = process.argv.indexOf(`--${n}`);
  return i !== -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith("--") ? process.argv[i + 1] : d;
};
const PUBLIC_BASE = (process.env.DEMO_PUBLIC_BASE || "https://demos.xevaro.app").replace(/\/$/, "");
const firstName = (full) => (full || "").trim().split(/\s+/)[0] || "";

let inFile = arg("in", "");
const NICHE = arg("niche", "");
if (!inFile) {
  if (!NICHE) { console.error("  Pass --in <file> or --niche <niche>."); process.exit(1); }
  const f = findLatest(DATA_DIR, { prefix: `leads_${nicheSlug(NICHE)}_`, includes: "_enriched" });
  if (!f) { console.error(`  No enriched leads for "${NICHE}".`); process.exit(1); }
  inFile = join(DATA_DIR, f);
}
if (!existsSync(inFile)) { console.error(`  Not found: ${inFile}`); process.exit(1); }

const { header, rows } = parseCsv(readFileSync(inFile, "utf8"));
const ci = {
  name: colIndex(header, "Company Name"),
  owner: colIndex(header, "Owner / Registered Agent"),
  email: colIndex(header, "Email"),
  city: colIndex(header, "City"),
  niche: colIndex(header, "Industry"),
  place: colIndex(header, "Place ID"),
};

const OUT_HEADER = ["email", "first_name", "company_name", "niche", "city", "demo_link"];
const out = [];
const seen = new Set();
for (const r of rows) {
  const email = (r[ci.email] || "").trim();
  if (!email || !/^[^\s@/]+@[^\s@/]+\.[^\s@/]+$/.test(email)) continue; // valid email only — "/" excludes social URLs
  if (seen.has(email.toLowerCase())) continue;
  seen.add(email.toLowerCase());
  const business = r[ci.name] || "";
  const slug = slugFor(business, ci.place >= 0 ? r[ci.place] : "");
  out.push([
    email,
    firstName(r[ci.owner]),                 // blank is fine — use {{first_name | default:"there"}} in Instantly
    business,
    (ci.niche >= 0 && r[ci.niche]) || "",
    r[ci.city] || "",
    `${PUBLIC_BASE}/d/${slug}`,
  ]);
}

const day = new Date().toISOString().slice(0, 10);
const outFile = join(DATA_DIR, `instantly_${nicheSlug(NICHE || "leads")}_${day}.csv`);
writeFileSync(outFile, OUT_HEADER.join(",") + "\n" + out.map((r) => r.map(escCsv).join(",")).join("\n") + "\n");
console.log(`\n  ${basename(inFile)} → ${out.length} sendable contacts`);
console.log(`  → ${outFile}`);
console.log(`  Upload to Instantly → map columns to {{first_name}}, {{company_name}}, {{niche}}, {{demo_link}}.\n`);
