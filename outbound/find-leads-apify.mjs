#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// Stage 1 + 1b in ONE pass, via Apify (replaces Outscraper + Google Places).
// Actor: lukaskrivka/google-maps-with-contact-details
//   • website:"withoutWebsite" → only no-website businesses (our target)
//   • company-contacts enrichment ON → emails + socials in the same run
//   • CO owner names added inline from the free SOS registry
//
//   node outbound/find-leads-apify.mjs --niche "junk removal" --count 150
//
// Cost ≈ $0.009/lead. Output: outbound/data/leads_<niche>_<date>_enriched.csv
// (named *_enriched so build-demos/send pick it up directly — no enrich step).
// ─────────────────────────────────────────────────────────────────────────────
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { METROS } from "./lib/cities.mjs";
import { toCsv, escCsv } from "./lib/csv.mjs";
import { nicheSlug } from "./lib/slug.mjs";
import { lookupOwner, hasRegistry } from "./lib/sos.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "data");
const API = "https://api.apify.com/v2";
const ACTOR = "lukaskrivka~google-maps-with-contact-details";

const arg = (n, d) => {
  const i = process.argv.indexOf(`--${n}`);
  return i !== -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith("--") ? process.argv[i + 1] : d;
};
const NICHE = arg("niche", "junk removal");
const TARGET = parseInt(arg("count", "150"), 10);
// Website filter: "withoutWebsite" (phone/call channel) | "withWebsite" (email channel — emails are scrapeable) | "all"
// Default to has-website so the EMAIL machine gets emailable leads. Use --no-website for the call list.
const WEBSITE = process.argv.includes("--no-website") ? "withoutWebsite" : arg("website", "withWebsite");
const TOKEN = (process.env.APIFY_TOKEN || "").trim();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

if (!TOKEN) {
  console.error(
    "\n  Missing APIFY_TOKEN. Get it at https://console.apify.com/account/integrations\n" +
      "  Add to .env:  APIFY_TOKEN=apify_api_xxx\n"
  );
  process.exit(1);
}

const HEADER = [
  "Company Name", "Industry", "Owner / Registered Agent", "Phone", "Email",
  "City", "State", "Website Status", "SOS Status", "Google Maps", "Address", "Rating", "Reviews", "Place ID",
];

// ─── run the actor for one metro, return its dataset items ───────────────────
async function runMetro(city, state, want) {
  const input = {
    searchStringsArray: [NICHE],
    city,
    state,
    countryCode: "us",
    maxCrawledPlacesPerSearch: want,
    ...(WEBSITE === "all" ? {} : { website: WEBSITE }),
    language: "en",
  };
  const start = await fetch(`${API}/acts/${ACTOR}/runs?token=${TOKEN}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!start.ok) throw new Error(`start ${start.status}: ${(await start.text()).slice(0, 150)}`);
  const { data: run } = await start.json();

  for (let t = 0; t < 100; t++) {
    await sleep(5000);
    const s = await fetch(`${API}/actor-runs/${run.id}?token=${TOKEN}`);
    if (!s.ok) continue;
    const { data: st } = await s.json();
    if (st.status === "SUCCEEDED") {
      const r = await fetch(`${API}/datasets/${st.defaultDatasetId}/items?clean=true&token=${TOKEN}`);
      return r.ok ? await r.json() : [];
    }
    if (["FAILED", "ABORTED", "TIMED-OUT"].includes(st.status)) throw new Error(`run ${st.status}`);
  }
  throw new Error("run did not finish in time");
}

const field = (o, ...keys) => { for (const k of keys) if (o[k]) return o[k]; return ""; };
const emailOf = (o) => (Array.isArray(o.emails) && o.emails[0]) || field(o, "email") || "";

// ─── main ────────────────────────────────────────────────────────────────────
(async () => {
  mkdirSync(DATA_DIR, { recursive: true });
  const day = new Date().toISOString().slice(0, 10);
  const outFile = join(DATA_DIR, `leads_${nicheSlug(NICHE)}_${day}_enriched.csv`);
  const seenIds = new Set();
  const seenPhones = new Set();
  if (existsSync(outFile)) {
    for (const line of readFileSync(outFile, "utf8").split("\n").slice(1)) {
      const m = line.match(/"([^"]*)"$/);
      if (m && m[1]) seenIds.add(m[1]);
    }
  }
  const rows = [];

  console.log(`\n  Niche: ${NICHE}  ·  target: ${TARGET} no-website leads (Apify)\n`);

  for (const [city, state] of METROS) {
    if (rows.length >= TARGET) break;
    const want = Math.min(40, (TARGET - rows.length) + 8);
    process.stdout.write(`  ${city}, ${state} … `);
    let kept = 0, withEmail = 0;
    try {
      const items = await runMetro(city, state, want);
      for (const it of items) {
        const name = field(it, "title", "name");
        const phone = field(it, "phone", "phoneUnformatted");
        const placeId = field(it, "placeId", "fid", "cid") || `${name}-${city}`;
        if (!name || !phone) continue;
        if (seenIds.has(placeId) || seenPhones.has(phone)) continue;
        seenIds.add(placeId);
        seenPhones.add(phone);

        const email = emailOf(it);
        let owner = "";
        if (hasRegistry(state)) owner = (await lookupOwner({ name, state })) || "";

        rows.push([
          name, NICHE, owner, phone, email,
          field(it, "city") || city, field(it, "state") || state,
          field(it, "website") || (WEBSITE === "withoutWebsite" ? "No Website" : "Has Website"), "", field(it, "url", "googleMapsUrl"),
          field(it, "address", "street"), field(it, "totalScore"), field(it, "reviewsCount"), placeId,
        ]);
        if (email) withEmail++;
        kept++;
        if (rows.length >= TARGET) break;
      }
    } catch (e) {
      console.log(`error: ${e.message}`);
      continue;
    }
    console.log(`+${kept} (${withEmail} w/ email)  total ${rows.length}`);
  }

  const existing = existsSync(outFile)
    ? readFileSync(outFile, "utf8").split("\n").slice(1).filter(Boolean).join("\n") + "\n"
    : "";
  const body = rows.map((r) => r.map(escCsv).join(",")).join("\n");
  writeFileSync(outFile, HEADER.map(escCsv).join(",") + "\n" + existing + body + "\n");

  const emails = rows.filter((r) => r[4]).length;
  console.log(`\n  Done. ${rows.length} no-website leads, ${emails} with email (${Math.round((emails / (rows.length || 1)) * 100)}%).`);
  console.log(`  → ${outFile}\n`);
})();
