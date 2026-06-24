#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// Stage 4 — deliverability-safe email sender.
// Sends each lead's demo link from a rotating pool of inboxes, with:
//   • per-inbox daily cap   (default 25 — keeps inboxes warm, avoids spam flags)
//   • global daily cap      (default 150 — your safe ceiling)
//   • all-time dedupe       (never email the same business twice)
//   • human-like jitter     (random delay between sends)
// Only emails leads that have an address. SMS + call cover the rest.
//
//   node outbound/send/send-demos.mjs --niche "junk removal" --dry-run
//   node outbound/send/send-demos.mjs --niche "junk removal" --cap 150
//
// Requires nodemailer + outbound/send/inboxes.json (copy inboxes.example.json).
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { parseCsv, colIndex } from "../lib/csv.mjs";
import { findLatest } from "../lib/files.mjs";
import { nicheSlug, slugFor } from "../lib/slug.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "data");
const HISTORY = join(DATA_DIR, "send-history.json");
const DAILY = join(DATA_DIR, "send-daily.json");

const arg = (n, d) => {
  const i = process.argv.indexOf(`--${n}`);
  return i !== -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith("--") ? process.argv[i + 1] : d;
};
const flag = (n) => process.argv.includes(`--${n}`);

const NICHE = arg("niche", "");
const GLOBAL_CAP = parseInt(arg("cap", "150"), 10);
const PER_INBOX = parseInt(arg("per-inbox", "25"), 10);
const DRY = flag("dry-run");
const PUBLIC_BASE = (process.env.DEMO_PUBLIC_BASE || "https://demos.xevaro.app").replace(/\/$/, "");
const SENDER_NAME = process.env.SENDER_NAME || "Xevaro Labs";
const SENDER_ADDRESS = process.env.SENDER_ADDRESS || "Xevaro Labs"; // CAN-SPAM: real physical mailing address

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const today = () => new Date().toISOString().slice(0, 10);
const load = (p, d) => (existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : d);
const firstName = (full) => (full || "").trim().split(/\s+/)[0] || "";

// ─── locate enriched leads ───────────────────────────────────────────────────
let inFile = arg("in", "");
if (!inFile) {
  if (!NICHE) { console.error("  Pass --in <file> or --niche <niche>."); process.exit(1); }
  const f = findLatest(DATA_DIR, { prefix: `leads_${nicheSlug(NICHE)}_`, includes: "_enriched" });
  if (!f) { console.error(`  No enriched leads for "${NICHE}". Run enrich-leads first.`); process.exit(1); }
  inFile = join(DATA_DIR, f);
}
const { header, rows } = parseCsv(readFileSync(inFile, "utf8"));
const ci = {
  name: colIndex(header, "Company Name"),
  owner: colIndex(header, "Owner / Registered Agent"),
  email: colIndex(header, "Email"),
  city: colIndex(header, "City"),
  niche: colIndex(header, "Industry"),
  place: colIndex(header, "Place ID"),
};

// ─── build the queue: has email, not already sent ────────────────────────────
const history = new Set(load(HISTORY, []));
let daily = load(DAILY, { date: today(), perInbox: {}, sentToday: 0 });
if (daily.date !== today()) daily = { date: today(), perInbox: {}, sentToday: 0 };

const idFor = (r) => (ci.place >= 0 && r[ci.place]) || (r[ci.email] || r[ci.name]);
const queue = rows.filter((r) => {
  const email = (r[ci.email] || "").trim();
  return email && /^[^\s@/]+@[^\s@/]+\.[^\s@/]+$/.test(email) && !history.has(idFor(r));
});

// ─── compose ─────────────────────────────────────────────────────────────────
const SUBJECTS = [
  (b) => `quick question about ${b}`,
  (b) => `missed calls at ${b}?`,
  (b) => `${b} — losing leads to voicemail?`,
];
function compose(r) {
  const business = r[ci.name] || "your business";
  const niche = (ci.niche >= 0 && r[ci.niche]) || "local";
  const hi = firstName(r[ci.owner]) || "there";
  const text =
    `Hi ${hi},\n\n` +
    `Quick question — when someone calls ${business} and you're tied up on a job, what happens to that call?\n\n` +
    `For most ${niche} guys I talk to, the caller just hangs up and dials the next name on Google. That's a paid job, gone.\n\n` +
    `I set up a simple system that auto-texts every missed call back in ~5 seconds, so you catch those leads instead of handing them to a competitor.\n\n` +
    `Worth a look? Just reply "yes" and I'll send over a 2-minute breakdown.\n\n` +
    `${SENDER_NAME}\n${SENDER_ADDRESS}\nReply STOP to opt out.`;
  const subject = SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)](business);
  return { to: r[ci.email].trim(), subject, text, business };
}

// ─── run ─────────────────────────────────────────────────────────────────────
(async () => {
  const remainingGlobal = Math.max(0, GLOBAL_CAP - daily.sentToday);
  console.log(`\n  ${basename(inFile)} — ${queue.length} emailable, not-yet-sent leads`);
  console.log(`  Caps: global ${GLOBAL_CAP} (${remainingGlobal} left today) · per-inbox ${PER_INBOX}\n`);

  if (DRY) {
    queue.slice(0, 3).forEach((r) => {
      const m = compose(r);
      console.log(`  ── to ${m.to}  |  ${m.subject}\n  ${m.text.replace(/\n/g, "\n  ")}\n`);
    });
    console.log(`  Dry run — nothing sent. Would send up to ${Math.min(queue.length, remainingGlobal)} now.\n`);
    process.exit(0);
  }

  const inboxesPath = join(__dirname, "inboxes.json");
  if (!existsSync(inboxesPath)) {
    console.error("  Missing outbound/send/inboxes.json — copy inboxes.example.json and fill in your SMTP inboxes.\n");
    process.exit(1);
  }
  const inboxes = JSON.parse(readFileSync(inboxesPath, "utf8"));
  const { default: nodemailer } = await import("nodemailer");
  const transports = inboxes.map((b) => ({
    box: b,
    tx: nodemailer.createTransport({ host: b.host, port: b.port, secure: b.port === 465, auth: { user: b.user, pass: b.pass } }),
  }));

  let sent = 0, rr = 0;
  for (const r of queue) {
    if (daily.sentToday >= GLOBAL_CAP) { console.log("  Global cap reached for today."); break; }

    // find next inbox under its per-inbox cap
    let chosen = null;
    for (let k = 0; k < transports.length; k++) {
      const t = transports[(rr + k) % transports.length];
      const used = daily.perInbox[t.box.user] || 0;
      const cap = t.box.dailyCap || PER_INBOX;
      if (used < cap) { chosen = t; rr = (rr + k + 1) % transports.length; break; }
    }
    if (!chosen) { console.log("  All inboxes at their daily cap."); break; }

    const m = compose(r);
    try {
      await chosen.tx.sendMail({ from: `"${chosen.box.fromName || SENDER_NAME}" <${chosen.box.user}>`, to: m.to, subject: m.subject, text: m.text });
      history.add(idFor(r));
      daily.perInbox[chosen.box.user] = (daily.perInbox[chosen.box.user] || 0) + 1;
      daily.sentToday++;
      sent++;
      console.log(`  ✓ ${m.to.padEnd(34)} via ${chosen.box.user}  (${daily.sentToday}/${GLOBAL_CAP})`);
      writeFileSync(HISTORY, JSON.stringify([...history]));
      writeFileSync(DAILY, JSON.stringify(daily));
    } catch (e) {
      console.log(`  ✗ ${m.to} — ${e.message}`);
    }
    await sleep(20000 + Math.floor(Math.random() * 70000)); // 20-90s jitter
  }
  console.log(`\n  Done. Sent ${sent} this run. Total today: ${daily.sentToday}/${GLOBAL_CAP}.\n`);
})();
