# Xevaro Labs — Weak-Website Cold Email Sequence

**Channel:** Gmail (manual-approve each batch)
**Target:** local businesses that HAVE a website but it's dated / not mobile / slow / ugly
**Goal:** book a 10-min call. Do NOT try to close in email.

## Deliverability rules (non-negotiable)
- Plain text only. No images, no tracking pixels on the first touch, max 1 link (often zero).
- One specific, true observation about THEIR site. If you can't name a real flaw, don't send — pick another lead.
- Send from Gmail in small batches (start ~10-15/day on a warming account, ramp slowly). Never paste 50 into BCC.
- Real sign-off, real reply-to, physical/business address in signature, honest opt-out line. (CAN-SPAM.)
- Personalize {{site_flaw}} per lead — this is the whole game. Generic = spam folder.

## Personalization variables
- `{{owner_first}}` — owner / decision-maker first name (fallback: "there")
- `{{business}}` — business name
- `{{site_flaw}}` — ONE specific, observed weakness (e.g. "not mobile-friendly", "takes ~8s to load", "still says 2019", "no way to request a quote")
- `{{city}}` — city
- `{{outcome}}` — the benefit tied to the flaw (e.g. "more quote requests from phones")

---

## Email 1 — Day 0 (the opener)

**Subject options (pick 1, A/B over batches):**
- `quick note on {{business}}'s website`
- `{{business}} — saw something on your site`
- `{{owner_first}}, your site on mobile`

**Body:**
```
Hi {{owner_first}},

I was looking at {{business}} online and noticed your site {{site_flaw}} —
which is probably costing you {{outcome}} (most people in {{city}} search on
their phones now).

I build fast, modern sites for local businesses and I could put together a
rebuilt version of yours so you can see the difference before deciding anything.

Worth a quick 10-min call this week? If not, no worries at all.

Raheel
Xevaro Labs
Info@xevarolabs.com · xevarolabs.com
[business mailing address]
Reply "stop" and I won't email again.
```

---

## Email 2 — Day 3 (the proof / soft bump)

**Subject:** `re: {{business}}'s website` (same thread)

**Body:**
```
Hi {{owner_first}},

Quick follow-up — I actually mocked up what a refreshed {{business}} site
could look like. Happy to send the link so you can judge for yourself, no
obligation.

Want me to send it over?

Raheel — Xevaro Labs
Reply "stop" to opt out.
```

> Only promise the mockup if we've built (or will build) a demo for that lead. Otherwise drop the mockup line and just bump.

---

## Email 3 — Day 7 (the breakup)

**Subject:** `re: {{business}}'s website` (same thread)

**Body:**
```
Hi {{owner_first}},

I'll close the loop here so I'm not cluttering your inbox. If getting more
customers from your website ever moves up the list, just reply and I'll pick
it back up.

Either way, wishing {{business}} a strong season.

Raheel — Xevaro Labs
Reply "stop" to opt out.
```

---

## Reply playbook (for the user / me to draft)
- **"How much?"** → don't quote cold. "Depends on scope — that's exactly what the 10 min is for. Builds typically run $X–$Y one-time or $Z/mo managed. When works to talk?"
- **"Send the mockup"** → send demo link, then push for the call.
- **"Not interested"** → mark closed-lost, stop sequence, never re-add.
- **"Who are you?"** → 2 lines: local web/AI studio, here's the site, happy to show examples.
