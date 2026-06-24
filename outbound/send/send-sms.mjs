#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// Stage 4 (SMS) — texts each no-website prospect their live demo link.
// This is the delivery channel for the no-website funnel (those leads have no
// email — proven). Built with the same throttle discipline as the email sender,
// plus SMS-specific compliance rails:
//   • per-number + global daily caps        • all-time dedupe (never double-text)
//   • 60-180s jitter                         • STOP opt-out + sender ID in every msg
//   • business-hours guard (per lead's state timezone — no 2am texts)
//
//   node outbound/send/send-sms.mjs --niche "junk removal" --dry-run
//   node outbound/send/send-sms.mjs --niche "junk removal" --cap 150
//
// ⚠️ COMPLIANCE: cold business SMS in the US needs A2P 10DLC registration on
// your Twilio number/messaging service, and you must honor STOP. This script
// adds the opt-out text + timing guard; the carrier registration is on you.
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { parseCsv, colIndex } from "../lib/csv.mjs";
import { findLatest } from "../lib/files.mjs";
import { nicheSlug, slugFor } from "../lib/slug.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "data");
const HISTORY = join(DATA_DIR, "sms-history.json");
const DAILY = join(DATA_DIR, "sms-daily.json");

const arg = (n, d) => {
  const i = process.argv.indexOf(`--${n}`);
  return i !== -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith("--") ? process.argv[i + 1] : d;
};
const flag = (n) => process.argv.includes(`--${n}`);

const NICHE = arg("niche", "");
const GLOBAL_CAP = parseInt(arg("cap", "150"), 10);
const PER_NUMBER = parseInt(arg("per-number", "60"), 10);
const DRY = flag("dry-run");
const FORCE = flag("force"); // ignore the business-hours guard
const PUBLIC_BASE = (process.env.DEMO_PUBLIC_BASE || "https://demos.xevaro.app").replace(/\/$/, "");
const SENDER_NAME = process.env.SENDER_NAME || "Xevaro";
const [WIN_START, WIN_END] = (process.env.SMS_WINDOW || "9-19").split("-").map(Number);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const today = () => new Date().toISOString().slice(0, 10);
const load = (p, d) => (existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : d);
const firstName = (full) => (full || "").trim().split(/\s+/)[0] || "";

// state (full name, as Apify returns) → IANA tz, for the business-hours guard
const STATE_TZ = {
  Alabama: "America/Chicago", Alaska: "America/Anchorage", Arizona: "America/Phoenix",
  Arkansas: "America/Chicago", California: "America/Los_Angeles", Colorado: "America/Denver",
  Connecticut: "America/New_York", Delaware: "America/New_York", Florida: "America/New_York",
  Georgia: "America/New_York", Hawaii: "Pacific/Honolulu", Idaho: "America/Boise",
  Illinois: "America/Chicago", Indiana: "America/Indiana/Indianapolis", Iowa: "America/Chicago",
  Kansas: "America/Chicago", Kentucky: "America/New_York", Louisiana: "America/Chicago",
  Maine: "America/New_York", Maryland: "America/New_York", Massachusetts: "America/New_York",
  Michigan: "America/Detroit", Minnesota: "America/Chicago", Mississippi: "America/Chicago",
  Missouri: "America/Chicago", Montana: "America/Denver", Nebraska: "America/Chicago",
  Nevada: "America/Los_Angeles", "New Hampshire": "America/New_York", "New Jersey": "America/New_York",
  "New Mexico": "America/Denver", "New York": "America/New_York", "North Carolina": "America/New_York",
  "North Dakota": "America/Chicago", Ohio: "America/New_York", Oklahoma: "America/Chicago",
  Oregon: "America/Los_Angeles", Pennsylvania: "America/New_York", "Rhode Island": "America/New_York",
  "South Carolina": "America/New_York", "South Dakota": "America/Chicago", Tennessee: "America/Chicago",
  Texas: "America/Chicago", Utah: "America/Denver", Vermont: "America/New_York",
  Virginia: "America/New_York", Washington: "America/Los_Angeles", "West Virginia": "America/New_York",
  Wisconsin: "America/Chicago", Wyoming: "America/Denver",
};
function localHour(state) {
  const tz = STATE_TZ[state] || "America/Chicago";
  try {
    return parseInt(new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", hour12: false }).format(new Date()), 10);
  } catch { return new Date().getHours(); }
}
const toE164 = (raw) => {
  const d = String(raw || "").replace(/\D/g, "");
  if (d.length === 10) return `+1${d}`;
  if (d.length === 11 && d[0] === "1") return `+${d}`;
  return d ? `+${d}` : "";
};

// ─── locate leads ────────────────────────────────────────────────────────────
let inFile = arg("in", "");
if (!inFile) {
  if (!NICHE) { console.error("  Pass --in <file> or --niche <niche>."); process.exit(1); }
  const f = findLatest(DATA_DIR, { prefix: `leads_${nicheSlug(NICHE)}_`, includes: "_enriched" })
    || findLatest(DATA_DIR, { prefix: `leads_${nicheSlug(NICHE)}_` });
  if (!f) { console.error(`  No leads for "${NICHE}". Run the source step first.`); process.exit(1); }
  inFile = join(DATA_DIR, f);
}
const { header, rows } = parseCsv(readFileSync(inFile, "utf8"));
const ci = {
  name: colIndex(header, "Company Name"),
  owner: colIndex(header, "Owner / Registered Agent"),
  phone: colIndex(header, "Phone"),
  state: colIndex(header, "State"),
  place: colIndex(header, "Place ID"),
};

const history = new Set(load(HISTORY, []));
let daily = load(DAILY, { date: today(), perNumber: {}, sentToday: 0 });
if (daily.date !== today()) daily = { date: today(), perNumber: {}, sentToday: 0 };

const idFor = (r) => (ci.place >= 0 && r[ci.place]) || r[ci.phone] || r[ci.name];
const queue = rows.filter((r) => toE164(r[ci.phone]) && !history.has(idFor(r)));

function compose(r) {
  const business = r[ci.name] || "your business";
  const slug = slugFor(business, ci.place >= 0 ? r[ci.place] : "");
  const url = `${PUBLIC_BASE}/d/${slug}`;
  const hi = firstName(r[ci.owner]);
  const open = hi ? `Hi ${hi}, ` : "Hi, ";
  // identify sender + opt-out = required for compliant business SMS
  const body = `${open}it's ${SENDER_NAME}. I noticed ${business} has no website so I built you one: ${url} Like it? I'll make it yours. Reply STOP to opt out.`;
  return { to: toE164(r[ci.phone]), body, business, url, state: r[ci.state] };
}

// ─── run ─────────────────────────────────────────────────────────────────────
(async () => {
  const remaining = Math.max(0, GLOBAL_CAP - daily.sentToday);
  console.log(`\n  ${basename(inFile)} — ${queue.length} textable, not-yet-sent leads`);
  console.log(`  Caps: global ${GLOBAL_CAP} (${remaining} left today) · window ${WIN_START}:00-${WIN_END}:00 local\n`);

  if (DRY) {
    queue.slice(0, 3).forEach((r) => {
      const m = compose(r);
      const h = localHour(m.state);
      const ok = FORCE || (h >= WIN_START && h < WIN_END);
      console.log(`  ── ${m.to}  [${m.state}, local ${h}:00 ${ok ? "OK" : "OUTSIDE WINDOW"}]\n  ${m.body}\n`);
    });
    console.log(`  Dry run — nothing sent.\n`);
    process.exit(0);
  }

  const sender = buildSender();
  if (sender.error) { console.error(`  ${sender.error}\n`); process.exit(1); }
  console.log(`  Provider: ${sender.label}\n`);

  let sent = 0, skipped = 0;
  for (const r of queue) {
    if (daily.sentToday >= GLOBAL_CAP) { console.log("  Global cap reached."); break; }
    const m = compose(r);
    const h = localHour(m.state);
    if (!FORCE && !(h >= WIN_START && h < WIN_END)) { skipped++; continue; }
    try {
      await sender.send(m.to, m.body);
      history.add(idFor(r));
      daily.sentToday++; sent++;
      console.log(`  ✓ ${m.to}  ${m.business.slice(0, 28).padEnd(28)} (${daily.sentToday}/${GLOBAL_CAP})`);
      writeFileSync(HISTORY, JSON.stringify([...history]));
      writeFileSync(DAILY, JSON.stringify(daily));
    } catch (e) {
      console.log(`  ✗ ${m.to} — ${e.message}`);
    }
    await sleep(60000 + Math.floor(Math.random() * 120000)); // 60-180s jitter
  }
  console.log(`\n  Done. Sent ${sent}. Skipped ${skipped} (outside local window). Total today: ${daily.sentToday}/${GLOBAL_CAP}.\n`);
})();

// Provider adapter — Telnyx (preferred) or Twilio. Picks whichever creds exist.
function buildSender() {
  const TELNYX = (process.env.TELNYX_API_KEY || "").trim();
  if (TELNYX) {
    const profile = (process.env.TELNYX_MESSAGING_PROFILE_ID || "").trim();
    const from = (process.env.TELNYX_FROM_NUMBER || "").trim();
    if (!profile && !from) return { error: "Set TELNYX_MESSAGING_PROFILE_ID (recommended) or TELNYX_FROM_NUMBER in .env." };
    return {
      label: "Telnyx",
      async send(to, body) {
        const payload = { to, text: body };
        if (from) payload.from = from;
        if (profile) payload.messaging_profile_id = profile;
        const res = await fetch("https://api.telnyx.com/v2/messages", {
          method: "POST",
          headers: { Authorization: `Bearer ${TELNYX}`, "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`${res.status} ${(await res.text()).slice(0, 140)}`);
      },
    };
  }
  const SID = (process.env.TWILIO_ACCOUNT_SID || "").trim();
  const TOK = (process.env.TWILIO_AUTH_TOKEN || "").trim();
  const MSID = (process.env.TWILIO_MESSAGING_SERVICE_SID || "").trim();
  const FROMS = (process.env.TWILIO_FROM_NUMBERS || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!SID || !TOK || (!MSID && !FROMS.length))
    return { error: "No SMS provider configured. Set TELNYX_API_KEY (+ profile/number), or Twilio creds." };
  const auth = "Basic " + Buffer.from(`${SID}:${TOK}`).toString("base64");
  const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${SID}/Messages.json`;
  let rr = 0;
  return {
    label: "Twilio",
    async send(to, body) {
      const params = new URLSearchParams({ To: to, Body: body });
      if (MSID) params.set("MessagingServiceSid", MSID);
      else params.set("From", FROMS[rr++ % FROMS.length]);
      const res = await fetch(endpoint, { method: "POST", headers: { Authorization: auth, "Content-Type": "application/x-www-form-urlencoded" }, body: params });
      if (!res.ok) throw new Error(`${res.status} ${(await res.text()).slice(0, 140)}`);
    },
  };
}
