#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// Stage 1b — enrichment pass. Fills Owner name + Email on a leads CSV.
//   Email : paid Outscraper lookup (no-website coverage ~35-45%).
//   Owner : free state SOS registry where available (great in CO), else the
//           contact name Outscraper returns with the email.
//
//   node outbound/enrich-leads.mjs --niche "junk removal" --limit 5 --dry-run
//   node outbound/enrich-leads.mjs --niche "junk removal"
//   node outbound/enrich-leads.mjs --in path/to/leads.csv
//
// ALWAYS test with --limit 5 --dry-run first to confirm cost before spending.
// Output: <input>_enriched.csv
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { parseCsv, toCsv, colIndex } from "./lib/csv.mjs";
import { findLatest } from "./lib/files.mjs";
import { nicheSlug } from "./lib/slug.mjs";
import { enrichBusinesses } from "./lib/outscraper.mjs";
import { lookupOwner } from "./lib/sos.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "data");
const COST_PER_LEAD = 0.01; // Outscraper, rough

const arg = (n, d) => {
  const i = process.argv.indexOf(`--${n}`);
  return i !== -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith("--")
    ? process.argv[i + 1]
    : d;
};
const flag = (n) => process.argv.includes(`--${n}`);

const NICHE = arg("niche", "");
const LIMIT = parseInt(arg("limit", "0"), 10); // 0 = all
const DRY = flag("dry-run");

// ─── locate input file ───────────────────────────────────────────────────────
let inFile = arg("in", "");
if (!inFile) {
  if (!NICHE) { console.error("  Pass --in <file> or --niche <niche>."); process.exit(1); }
  const f = findLatest(DATA_DIR, { prefix: `leads_${nicheSlug(NICHE)}_`, excludes: "_enriched" });
  if (!f) { console.error(`  No leads file for "${NICHE}" in ${DATA_DIR}. Run find-leads first.`); process.exit(1); }
  inFile = join(DATA_DIR, f);
}
if (!existsSync(inFile)) { console.error(`  File not found: ${inFile}`); process.exit(1); }

const { header, rows } = parseCsv(readFileSync(inFile, "utf8"));
const ci = {
  name: colIndex(header, "Company Name"),
  owner: colIndex(header, "Owner / Registered Agent"),
  email: colIndex(header, "Email"),
  city: colIndex(header, "City"),
  state: colIndex(header, "State"),
  address: colIndex(header, "Address"),
};
const work = LIMIT > 0 ? rows.slice(0, LIMIT) : rows;

// ─── dry run: show scope + cost, no spend ────────────────────────────────────
if (DRY) {
  const need = work.filter((r) => !(r[ci.email] || "").trim()).length;
  console.log(`\n  File: ${basename(inFile)}`);
  console.log(`  Rows to enrich: ${work.length} (of ${rows.length})`);
  console.log(`  Need email lookup: ${need}`);
  console.log(`  Est. Outscraper cost: ~$${(need * COST_PER_LEAD).toFixed(2)}`);
  console.log(`  Owner names free via SOS for CO rows.`);
  console.log(`\n  Dry run — nothing spent. Re-run without --dry-run to enrich.\n`);
  process.exit(0);
}

const API_KEY = (process.env.OUTSCRAPER_API_KEY || "").trim();
if (!API_KEY) {
  console.error(
    "\n  Missing OUTSCRAPER_API_KEY. Get one at https://app.outscraper.com → Profile → API.\n" +
      "  Add to .env, then:  export $(grep -v '^#' .env | xargs)\n"
  );
  process.exit(1);
}

// ─── enrich ──────────────────────────────────────────────────────────────────
(async () => {
  const queries = work.map((r, idx) => {
    const name = r[ci.name] || "";
    const loc = (ci.address >= 0 && r[ci.address]) || `${r[ci.city] || ""}, ${r[ci.state] || ""}`;
    return { ref: idx, query: `${name}, ${loc}` };
  });

  console.log(`\n  Enriching ${queries.length} leads (est. ~$${(queries.length * COST_PER_LEAD).toFixed(2)})\n`);
  const found = await enrichBusinesses(queries, API_KEY, { log: (m) => console.log(m) });

  let emails = 0, owners = 0;
  for (let idx = 0; idx < work.length; idx++) {
    const r = work[idx];
    const got = found.get(idx) || { email: "", emailName: "" };

    if (!(r[ci.email] || "").trim() && got.email) { r[ci.email] = got.email; emails++; }

    if (ci.owner >= 0 && !(r[ci.owner] || "").trim()) {
      let owner = await lookupOwner({ name: r[ci.name], state: r[ci.state] });
      if (!owner && got.emailName) owner = got.emailName;
      if (owner) { r[ci.owner] = owner; owners++; }
    }
  }

  const outFile = inFile.replace(/\.csv$/, "_enriched.csv");
  writeFileSync(outFile, toCsv(header, rows));
  console.log(`\n  Done. +${emails} emails, +${owners} owner names on ${work.length} leads.`);
  console.log(`  Email coverage: ${Math.round((emails / work.length) * 100)}%  →  ${outFile}\n`);
})();
