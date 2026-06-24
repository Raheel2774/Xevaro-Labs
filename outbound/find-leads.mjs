#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// Stage 1 — the lead engine.
// Finds businesses in a niche, nationwide, that have a phone but NO website.
// Uses Google's new Places API (places:searchText): name, phone, and website
// come back in a single request, so one query covers up to 60 results cheaply.
//
//   node outbound/find-leads.mjs --niche "junk removal" --count 100
//
// Output: outbound/data/leads_<niche>_<YYYY-MM-DD>.csv  (your CSV schema)
// Dedupes against itself and any prior file for the same niche+day.
// ─────────────────────────────────────────────────────────────────────────────
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { METROS } from "./lib/cities.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "data");

// ─── config from CLI / env ───────────────────────────────────────────────────
function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const NICHE = arg("niche", "junk removal");
const TARGET = parseInt(arg("count", "100"), 10);
const API_KEY = (process.env.GOOGLE_PLACES_API_KEY || "").trim();

if (!API_KEY) {
  console.error(
    "\n  Missing GOOGLE_PLACES_API_KEY.\n" +
      "  Get a free key (with $200/mo credit): https://console.cloud.google.com\n" +
      "  Enable 'Places API (New)', then add to .env:\n" +
      "    GOOGLE_PLACES_API_KEY=your_key\n" +
      "  Run with:  export $(grep -v '^#' .env | xargs) && node outbound/find-leads.mjs ...\n"
  );
  process.exit(1);
}

const SEARCH_URL = "https://places.googleapis.com/v1/places:searchText";
const FIELD_MASK = [
  "nextPageToken",
  "places.id",
  "places.displayName",
  "places.nationalPhoneNumber",
  "places.websiteUri",
  "places.formattedAddress",
  "places.businessStatus",
  "places.rating",
  "places.userRatingCount",
].join(",");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── one paged search for a single metro ─────────────────────────────────────
async function searchMetro(niche, city, state) {
  const out = [];
  let pageToken = null;
  for (let page = 0; page < 3; page++) {
    const body = { textQuery: `${niche} in ${city}, ${state}`, pageSize: 20 };
    if (pageToken) body.pageToken = pageToken;

    const res = await fetch(SEARCH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": FIELD_MASK,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const txt = await res.text();
      console.error(`  ! ${city}, ${state} → ${res.status}: ${txt.slice(0, 200)}`);
      break;
    }
    const data = await res.json();
    for (const p of data.places || []) out.push(p);

    pageToken = data.nextPageToken;
    if (!pageToken) break;
    await sleep(2200); // new page tokens need a moment to activate
  }
  return out;
}

// ─── CSV helpers (schema matches your existing lead files) ───────────────────
const HEADER = [
  "Company Name", "Industry", "Owner / Registered Agent", "Phone", "Email",
  "City", "State", "Website Status", "SOS Status", "Google Maps", "Address", "Rating", "Reviews", "Place ID",
];
const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
const mapsUrl = (p) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    p.displayName?.text || ""
  )}&query_place_id=${p.id}`;

function loadExisting(file) {
  const seen = new Set();
  if (!existsSync(file)) return seen;
  const lines = readFileSync(file, "utf8").split("\n").slice(1);
  for (const line of lines) {
    const m = line.match(/"([^"]*)"$/); // last column = Place ID
    if (m && m[1]) seen.add(m[1]);
  }
  return seen;
}

// ─── main ────────────────────────────────────────────────────────────────────
(async () => {
  mkdirSync(DATA_DIR, { recursive: true });
  const day = new Date().toISOString().slice(0, 10);
  const slug = NICHE.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const outFile = join(DATA_DIR, `leads_${slug}_${day}.csv`);

  const seenIds = loadExisting(outFile);
  const seenPhones = new Set();
  const rows = [];

  console.log(`\n  Niche: ${NICHE}  ·  target: ${TARGET} no-website leads\n`);

  for (const [city, state] of METROS) {
    if (rows.length >= TARGET) break;
    process.stdout.write(`  ${city}, ${state} … `);
    let kept = 0;
    try {
      const places = await searchMetro(NICHE, city, state);
      for (const p of places) {
        const phone = p.nationalPhoneNumber;
        const hasSite = !!p.websiteUri;
        const operational = !p.businessStatus || p.businessStatus === "OPERATIONAL";
        if (!phone || hasSite || !operational) continue;
        if (seenIds.has(p.id) || seenPhones.has(phone)) continue;
        seenIds.add(p.id);
        seenPhones.add(phone);
        rows.push([
          p.displayName?.text || "", NICHE, "", phone, "",
          city, state, "No Website", "", mapsUrl(p), p.formattedAddress || "",
          p.rating || "", p.userRatingCount || "", p.id,
        ]);
        kept++;
        if (rows.length >= TARGET) break;
      }
    } catch (e) {
      console.log(`error: ${e.message}`);
      continue;
    }
    console.log(`+${kept}  (total ${rows.length})`);
    await sleep(400);
  }

  const existingBody = existsSync(outFile)
    ? readFileSync(outFile, "utf8").split("\n").slice(1).filter(Boolean).join("\n") + "\n"
    : "";
  const newBody = rows.map((r) => r.map(esc).join(",")).join("\n");
  writeFileSync(outFile, HEADER.map(esc).join(",") + "\n" + existingBody + newBody + "\n");

  console.log(`\n  Done. ${rows.length} new no-website leads → ${outFile}\n`);
  if (rows.length < TARGET) {
    console.log(
      `  Got fewer than ${TARGET}. Add metros in lib/cities.mjs, broaden the\n` +
        `  niche term, or run again tomorrow (dedupe keeps it clean).\n`
    );
  }
})();
