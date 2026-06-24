# Xevaro Labs — 90-Day Growth Playbook ($0 → $10K MRR)

**Locked decisions (2026-06-24):** one-time $500 budget · lead offer = **Automation Retainer** (~$800–1,200/mo) · channel = **cold email to scale + cold calls for fast cash**.

> The single rule of this document: **the machine only works if it runs every weekday.** You are not stuck on strategy. You are stuck on shipping. This playbook removes every decision so you just execute.

---

## 1. The offer you are selling

**"Never Miss a Lead" system for local trades.** (Full pitch: `campaigns/automation-retainer/offer.md`.)

- Missed-call → auto text-back in 5 seconds (stop losing jobs to voicemail)
- Instant speed-to-lead reply on web/Google form leads
- AI responder that answers FAQs + books jobs 24/7
- Rebuilt website included as the "front door"

**Pricing:** $1,000/mo retainer + optional $300 setup. (Floor $800/mo. Don't go lower — kills the math.)

**Why this offer:** one missed roofing/plumbing job = $5K–15K. If the system saves ONE job a month it pays for itself 5–15×. That ROI story closes trades. And it **recurs** — you need only **~8–10 clients** to hit $10K, not 30+.

---

## 2. The math (your target on the fridge)

| Metric | Weekly target | Why |
|---|---|---|
| Emails sent | ~400 (build to this) | Top of funnel |
| Cold calls | 50–75 | Free, fast cash while email warms |
| Replies / conversations | 5–10 | |
| Calls booked | 3–5 | |
| **Closes** | **~1/week** | 1 close/wk × ~$1K = ~$10K MRR by day ~75–90 |

Closing is **yours** — automation books the call, you take it. ~30-min calls. That's the "appear when needed" part.

---

## 3. The 3 systems

1. **Lead Machine** (`run-daily.mjs`) — Apify finds weak-website trades → builds personalized demo → queues cold email. ~90% automated.
2. **Close Machine** — reply/booked call → YOU close on a 30-min call (script in `campaigns/automation-retainer/call-script.md`).
3. **Checkup Machine** — the weekly Scoreboard below + an automated digest (ask Claude to schedule it).

---

## 4. Daily & weekly cadence (your "regular checkups")

**Every weekday (~45–90 min):**
- [ ] Run `node outbound/run-daily.mjs --count 30` (sends + builds queue)
- [ ] Cold-call 10–15 staged leads (script ready)
- [ ] Reply to every inbound within 1 hour
- [ ] Log outcomes in the Scoreboard

**Every Monday (15 min) — THE CHECKUP:**
- [ ] Fill the Scoreboard (below)
- [ ] Are we on the weekly close pace? If not → the fix is almost always **more sends/calls**, not new tactics.
- [ ] Top up domains/inboxes if deliverability dipped

---

## 5. 90-day roadmap

| Phase | Days | Goal | Do this |
|---|---|---|---|
| **0 — Go Live** | 1–7 | First real emails out | Buy 2 domains, connect inbox(es), fill `.env`, send Batch 01, call the 5 roofers |
| **1 — First Cash** | 8–30 | 1–2 clients (~$2K MRR) | Daily sends + daily calls, refine pitch from real objections |
| **2 — Momentum** | 31–60 | 4–5 clients (~$5K MRR) | Reinvest first deal into Instantly + 2nd domain → scale to 400 sends/wk |
| **3 — $10K Run-Rate** | 61–90 | 8–10 clients (~$10K MRR) | Volume + referrals + upsell automations to existing clients |

---

## 6. The lean budget (how $500 lasts 4+ months)

**Go live for under $50 — don't pay for tools until a deal funds them.**

| Phase | Tool | Cost |
|---|---|---|
| Now | 2 sending domains (Porkbun/Cloudflare) | ~$25 one-time |
| Now | Send from your existing Gmail via `send-demos.mjs` (low volume, ~20–30/day) | $0 |
| Now | Apify lead sourcing (pay-as-you-go, ~$5 free tier) | ~$5–10 |
| **After deal #1** | Instantly/Smartlead (warmup + rotation) → scale to 400/wk | ~$37/mo |
| **After deal #1** | 2–3 Google Workspace inboxes | ~$6 ea/mo |

Cold **calling is $0** and is your day-8 cash lever. The first $1K deal funds the whole scaling stack. **Stay lean until then.**

---

## 7. Weekly Scoreboard (copy a new block each Monday)

```
WEEK OF: ____________        TARGET: ~1 close
Emails sent:    ___ / 400
Calls made:     ___ / 50-75
Replies:        ___
Calls booked:   ___
Closed:         ___   ($____ MRR)
Total MRR:      $____ / $10,000
On pace? (Y/N): ___   If N, the fix is: more sends + more calls
Biggest objection heard this week: ______________
```

---

## 8. Go-Live checklist (do this week — the whole game is here)

- [ ] Buy 2 domains close to your brand (e.g. `xevarolabs.co`, `getxevaro.com`) — NOT your main domain
- [ ] Set up SPF + DKIM + DMARC on them (deliverability)
- [ ] Connect 1–2 Gmail/Workspace inboxes to `send/inboxes.json`
- [ ] Create `.env` with: `APIFY_TOKEN`, inbox creds (see `outbound/README.md`)
- [ ] Add your CAN-SPAM footer details: sender name, from-address, physical mailing address
- [ ] Source first 50 weak-website roofers/plumbers: `node outbound/find-leads-apify.mjs`
- [ ] Send Batch 01 (5 roofers already staged) — your approval per batch
- [ ] Call those 5 roofers with the call script
- [ ] Fill Monday Scoreboard

> When all boxes are checked, you are no longer stuck. You are running a business.
