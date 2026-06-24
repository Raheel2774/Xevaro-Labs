# Outbound engine

Automated cold-video/demo outbound for selling websites + AI automations to US
business owners who have **no website**. Built to a **150/day safe ceiling**
(deliverability + one caller's follow-up capacity); turn the dial up with more
inboxes + a caller.

```
1.  source + email (RECOMMENDED)  find-leads-apify.mjs  ✅  (find no-website + email, 1 run)
1a. source only (alt)             find-leads.mjs        ✅  (Google Places)
1b. email enrich (alt)            enrich-leads.mjs      ✅  (Outscraper)
2.  build live demo sites         demo/build-demos.mjs  ✅  (one Worker serves all)
4.  TEXT demos (throttled SMS)    send/send-sms.mjs     ✅  ← delivery channel
4b. email demos (alt funnel only) send/send-demos.mjs   ✅  (no-website leads have no email)
—   you call: "get the text?"     manual
run everything, capped:          run-daily.mjs          ✅  (auto-uses Apify if APIFY_TOKEN set)
```

> **Live-tested reality:** no-website businesses have **no scrapeable email**
> (8/8 Denver test returned none — there's no site to scrape). So this funnel
> delivers the demo by **SMS + call**, not email. The email sender stays only
> for a separate "outdated-website" funnel.

### SMS delivery (Twilio) — what to set up
- A Twilio number + **A2P 10DLC registration** (required for cold US business SMS).
- `.env`: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and either
  `TWILIO_MESSAGING_SERVICE_SID` (recommended) or `TWILIO_FROM_NUMBERS`.
- The sender adds STOP opt-out + a per-state business-hours guard automatically.
- Test first: `node outbound/send/send-sms.mjs --niche "junk removal" --dry-run`

Two source options — pick one:
- **Apify (recommended):** one actor finds no-website businesses AND scrapes
  emails in a single run (~$0.009/lead). Set `APIFY_TOKEN`. Run
  `find-leads-apify.mjs`; output is already enriched (skip step 1b).
- **Google Places + Outscraper:** `find-leads.mjs` then `enrich-leads.mjs`.
  Use if you don't want Apify.

(Stage 3, dynamic personalized video, slots in before send — not built yet.)

## One-time setup
1. Copy env: `cp .env.example .env` and fill in:
   - `GOOGLE_PLACES_API_KEY` — console.cloud.google.com → enable "Places API (New)".
   - `OUTSCRAPER_API_KEY` — app.outscraper.com → Profile → API.
   - `DEMO_PUBLIC_BASE` — your Worker/domain that serves demos.
2. Demo hosting (once):
   ```bash
   cd outbound/demo
   wrangler kv namespace create DEMOS          # paste the id into wrangler.demo.toml
   wrangler deploy -c wrangler.demo.toml
   ```
3. Email inboxes: `cp outbound/send/inboxes.example.json outbound/send/inboxes.json`
   and add 2+ real SMTP inboxes on separate sending domains (warm them first).

Load env into your shell before any run:
```bash
export $(grep -v '^#' .env | xargs)
```

## Daily run (the whole thing)
```bash
node outbound/run-daily.mjs --niche "junk removal" --count 150 --dry-run   # preview
node outbound/run-daily.mjs --niche "junk removal" --count 150             # for real
```
After it runs, push any new demos live and make your calls:
```bash
wrangler kv bulk put outbound/data/kv-demos.json --binding DEMOS -c outbound/demo/wrangler.demo.toml
```

## Run stages individually
```bash
node outbound/find-leads.mjs   --niche "junk removal" --count 150
node outbound/enrich-leads.mjs --niche "junk removal" --limit 5 --dry-run   # check cost first!
node outbound/enrich-leads.mjs --niche "junk removal"
node outbound/demo/build-demos.mjs --niche "junk removal"
node outbound/send/send-demos.mjs  --niche "junk removal" --cap 150 --dry-run
```

## The safety rails (why 150)
- **Email:** rotates inboxes, **25/inbox/day** + **150/day global** cap, never
  emails the same business twice (`data/send-history.json`), 20–90s jitter.
  Cold email past ~30/inbox/day or one domain blasting 100+/day = blacklisted.
- **SMS:** cold US SMS (TCPA / A2P 10DLC) is risky at volume — kept out of the
  automated sender on purpose. Add opt-in SMS later, carefully.
- **Niche pool:** one trade nationwide runs dry in 2–4 months at 150/day —
  rotate niches before yield drops.

## Picking a niche
High no-website rate + real ticket: **junk removal, tree service, mobile
detailing, pressure washing, handyman, fencing, lawn care.** Avoid med spas /
dentists / law firms (already have sites).

## What's automated vs you
Automated: source, enrich, build demos, send. You: record the video (once),
make the warm calls, close. Throttle = `--count`; raise it only as you add
sending inboxes and calling capacity.

## Honest coverage
Business phone ~85% · owner name ~55% in CO (free SOS) / partial elsewhere ·
email ~35–45% (paid). Email is structurally scarce on a no-website list — the
business phone is your primary channel; email is the bonus.
