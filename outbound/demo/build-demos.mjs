#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// Stage 2 — build a live demo site per lead.
// Renders one HTML page per lead and produces a KV bulk-upload file, so all
// demos are served by ONE Cloudflare Worker (see worker.js) instead of one
// deploy per site. That's what makes 100s/day sustainable.
//
//   node outbound/demo/build-demos.mjs --niche "junk removal"
//   node outbound/demo/build-demos.mjs --in path/to/leads_enriched.csv
//
// Outputs:
//   outbound/data/demos/<slug>.html   (preview locally in a browser)
//   outbound/data/kv-demos.json       (wrangler kv bulk put → live)
//   outbound/data/demos-index.json    (placeId → {slug,url} for the sender)
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { parseCsv, colIndex } from "../lib/csv.mjs";
import { findLatest } from "../lib/files.mjs";
import { nicheSlug, slugFor } from "../lib/slug.mjs";
import { renderDemo } from "./template.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "data");
const DEMO_DIR = join(DATA_DIR, "demos");

const PUBLIC_BASE = (process.env.DEMO_PUBLIC_BASE || "https://demos.xevaro.app").replace(/\/$/, "");
const CLAIM_BASE = process.env.DEMO_CLAIM_URL || "https://xevarolabs.com/claim";

const arg = (n, d) => {
  const i = process.argv.indexOf(`--${n}`);
  return i !== -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith("--") ? process.argv[i + 1] : d;
};
const NICHE = arg("niche", "");

let inFile = arg("in", "");
if (!inFile) {
  if (!NICHE) { console.error("  Pass --in <file> or --niche <niche>."); process.exit(1); }
  const f = findLatest(DATA_DIR, { prefix: `leads_${nicheSlug(NICHE)}_`, includes: "_enriched" })
    || findLatest(DATA_DIR, { prefix: `leads_${nicheSlug(NICHE)}_` });
  if (!f) { console.error(`  No leads file for "${NICHE}". Run find-leads (and enrich) first.`); process.exit(1); }
  inFile = join(DATA_DIR, f);
}
if (!existsSync(inFile)) { console.error(`  File not found: ${inFile}`); process.exit(1); }

const { header, rows } = parseCsv(readFileSync(inFile, "utf8"));
const ci = {
  name: colIndex(header, "Company Name"),
  owner: colIndex(header, "Owner / Registered Agent"),
  phone: colIndex(header, "Phone"),
  city: colIndex(header, "City"),
  state: colIndex(header, "State"),
  niche: colIndex(header, "Industry"),
  rating: colIndex(header, "Rating"),
  reviews: colIndex(header, "Reviews"),
  place: colIndex(header, "Place ID"),
};

mkdirSync(DEMO_DIR, { recursive: true });
const kv = [];
const index = {};

for (const r of rows) {
  const business = r[ci.name] || "";
  if (!business) continue;
  const placeId = ci.place >= 0 ? r[ci.place] || "" : "";
  const slug = slugFor(business, placeId);
  const rec = {
    business,
    owner: ci.owner >= 0 ? r[ci.owner] : "",
    phone: ci.phone >= 0 ? r[ci.phone] : "",
    city: ci.city >= 0 ? r[ci.city] : "",
    state: ci.state >= 0 ? r[ci.state] : "",
    niche: ci.niche >= 0 ? r[ci.niche] : NICHE,
    rating: ci.rating >= 0 ? r[ci.rating] : "",
    reviews: ci.reviews >= 0 ? r[ci.reviews] : "",
    claimUrl: `${CLAIM_BASE}?b=${encodeURIComponent(slug)}`,
  };
  const html = renderDemo(rec);
  writeFileSync(join(DEMO_DIR, `${slug}.html`), html);
  kv.push({ key: `DEMO:${slug}`, value: html });
  index[placeId || slug] = { slug, url: `${PUBLIC_BASE}/d/${slug}` };
}

writeFileSync(join(DATA_DIR, "kv-demos.json"), JSON.stringify(kv));
writeFileSync(join(DATA_DIR, "demos-index.json"), JSON.stringify(index, null, 2));

console.log(`\n  Built ${kv.length} demo sites from ${basename(inFile)}`);
console.log(`  Preview:  open outbound/data/demos/<slug>.html`);
console.log(`  Go live:  wrangler kv bulk put outbound/data/kv-demos.json --binding DEMOS`);
console.log(`            (then each is live at ${PUBLIC_BASE}/d/<slug>)\n`);
