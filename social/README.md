# Xevaro Labs — Social Engine

Inbound counterpart to `outbound/`. Content goes **out** automatically; warm leads
come **in** from engagement, get enriched, and feed a human-approved outreach queue.

```
content plan → write posts → publish (Postiz) → [you engage]
   → harvest engagers → enrich (Apollo) → reply drafts + DM/email queue → you send
```

**Phase 1 = LinkedIn only.** Posting is fully automated; harvesting who engaged is
**manual** on LinkedIn (no API exposes likers/commenters). You paste engagers into
a CSV — everything else is automated. IG + Facebook switch on in Phase 2 by adding
their Postiz channel ids.

---

## One-time setup

1. **Node 24** (already on this machine). No new npm deps — uses native `fetch`.
2. **Self-host Postiz** (your chosen scheduler) and connect your LinkedIn channel.
   Docs: https://docs.postiz.com — Docker is the quickest. Then create a public
   API key under **Settings → Public API**.
3. Fill `.env` (see keys below).
4. Find your LinkedIn channel id:
   ```bash
   node social/publish/postiz-adapter.mjs --list
   ```
   Copy the id into `POSTIZ_LINKEDIN_ID`.
5. (Optional) Edit `social/brand.md` to tune voice for the whole engine.

### `.env` keys

```
ANTHROPIC_API_KEY=...          # content/reply/DM generation (console.anthropic.com)
CLAUDE_MODEL=claude-opus-4-8   # optional; e.g. claude-sonnet-4-6 to cut cost
POSTIZ_URL=https://your-postiz-host
POSTIZ_API_KEY=...             # Postiz → Settings → Public API
POSTIZ_LINKEDIN_ID=...         # from --list
APOLLO_API_KEY=...             # engager → work email (Apollo → Settings → API)
```

---

## Daily use

**Publish phase** (safe to cron):
```bash
node social/run-social.mjs --phase publish --days 7
# or step by step:
node social/generate/plan-content.mjs --days 7
node social/generate/make-post.mjs
node social/publish/postiz-adapter.mjs --due      # --now to push all immediately
```

**Manual harvest** — open your published LinkedIn post, copy the reactors/commenters
into a CSV (template: `social/harvest/engagers.template.csv`), save as
`social/data/engagers.csv`. Columns: `name, profileUrl, type, comment, postId`.

**Outreach phase** (after harvest):
```bash
node social/run-social.mjs --phase outreach --csv social/data/engagers.csv
# or step by step:
node social/harvest/harvest.mjs --csv social/data/engagers.csv
node social/harvest/enrich.mjs
node social/outreach/reply-suggest.mjs
node social/outreach/dm-queue.mjs
```

Outputs to review and act on:
- `social/data/replies.json` — public comment replies to paste under comments.
- `social/data/dm-queue.csv` — LinkedIn DMs to send by hand (approve as you go).
- `social/data/email-handoff.csv` — Apollo-matched work emails → route through `outbound/send/`.

Add `--dry-run` to any command to preview without writing or sending.

---

## Cron (publish only)

The publish phase is unattended-safe. Example: every weekday 9am.
```cron
0 9 * * 1-5  cd "/Users/macbookpro/Desktop/Xevaro Labs Website" && /usr/local/bin/node social/run-social.mjs --phase publish >> social/data/cron.log 2>&1
```
The outreach phase stays human-driven by design (the harvest + send steps are manual
to keep your LinkedIn account safe — no auto-DM).

---

## Files

| File | Stage |
|---|---|
| `generate/plan-content.mjs` | 1 · AI content calendar |
| `generate/make-post.mjs` | 2 · write full posts |
| `publish/postiz-adapter.mjs` | 3 · publish via Postiz (`--list`, `--due`, `--now`) |
| `harvest/harvest.mjs` | 4 · import engagers (manual CSV) |
| `harvest/enrich.mjs` | 5 · Apollo enrichment → work email |
| `outreach/reply-suggest.mjs` | 6a · draft public replies |
| `outreach/dm-queue.mjs` | 6b · DM + email outreach queue |
| `run-social.mjs` | orchestrator (`--phase publish|outreach`) |
| `brand.md` | voice for all AI stages (edit freely) |
| `lib/` | env, JSON store, Claude wrapper |

## Honest limits

- **LinkedIn engagement is manual in Phase 1** — no official API for likers/commenters.
  A risk-managed Apify scraper is a possible Phase 4 add-on; manual keeps you safe.
- **No auto-DM.** Cold auto-DMing engagers gets accounts banned; this engine drafts
  DMs and you click send. Work emails (via Apollo) are the scalable, compliant lane.
- **Postiz public API** shape can vary by version — if a publish call is rejected, run
  `postiz-adapter.mjs --due --print`, compare to your instance's API docs, adjust
  `buildPayload()`.
