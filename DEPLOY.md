# Xevaro Labs — Deploy Guide

App host: **Vercel** · Domain + Email: **Hostinger** · Database: **Cloudflare D1**

Your Hostinger plan is **Premium Web Hosting** (shared / hPanel) — it can't run this
app's Node server (contact API + SSR). So the app goes on **Vercel** (free), and we
point your Hostinger domain at it. Your **Business Email keeps working** because we
leave the MX records alone. Cloudflare D1 stores contact submissions (API-based, so
it's independent of where the site or DNS lives).

The code is ready. Steps below are the parts only you can do (your accounts/secrets).

---

## 1. Cloudflare D1 database (contact form)

```bash
npm i -D wrangler
npx wrangler login                     # opens browser, authorize
npx wrangler d1 create xevaro_db       # prints a database_id — copy it
npx wrangler d1 execute xevaro_db --remote --file=./db/schema.sql
```
Or via dashboard: **Workers & Pages → D1 → Create database** `xevaro_db`, then open
its **Console** and run the contents of `db/schema.sql`.

Collect these three values (needed in step 3):
- **CF_ACCOUNT_ID** — Cloudflare dashboard, right sidebar "Account ID".
- **CF_D1_DATABASE_ID** — from `wrangler d1 create` output / the DB page.
- **CF_D1_API_TOKEN** — My Profile → API Tokens → Create Token → **"D1 Edit"** template.

View submissions anytime:
```bash
npx wrangler d1 execute xevaro_db --remote \
  --command="SELECT * FROM submissions ORDER BY created_at DESC LIMIT 20"
```

---

## 2. Deploy the app to Vercel

Easiest is via GitHub:
1. Push this project to a GitHub repo (the included `.gitignore` keeps secrets/frames out).
2. vercel.com → **Add New → Project** → import the repo. Framework auto-detects Next.js.
3. Click **Deploy**. You'll get a `*.vercel.app` URL — confirm the site works there first.

(No GitHub? `npm i -g vercel && vercel` from this folder also works.)

---

## 3. Environment variables (on Vercel)

Vercel project → **Settings → Environment Variables** → add for **Production**:
```
CF_ACCOUNT_ID       = ...
CF_D1_DATABASE_ID   = ...
CF_D1_API_TOKEN     = ...
```
Then **Redeploy** so they take effect. (Without them the form still works but won't
save — with them, every submission lands in D1.)

---

## 4. Connect xevarolabs.com (Hostinger DNS → Vercel, email preserved)

1. In Vercel: project → **Settings → Domains → Add** → `xevarolabs.com` and `www.xevarolabs.com`.
   Vercel shows the records to set (they match the table below).
2. In Hostinger **hPanel → Domains → DNS / Nameservers → DNS Zone**:
   - **Leave the nameservers as Hostinger's** (`cosmos/nova.dns-parking.com`).
   - **Do NOT touch any `MX` records** — that's what keeps Business Email working.
   - Add / edit:

   | Type  | Name | Value                    | Notes                         |
   |-------|------|--------------------------|-------------------------------|
   | A     | `@`  | `76.76.21.21`            | Vercel apex (remove old A/parking record) |
   | CNAME | `www`| `cname.vercel-dns.com`   | remove old `www` record first |

3. Back in Vercel, the domain shows **Valid Configuration** once DNS propagates
   (minutes–couple hours). Vercel issues SSL automatically.

> Verify email still works after the change by sending a test to your @xevarolabs.com
> address. If Hostinger added extra mail records (SPF/DKIM `TXT`, `autoconfig`/`mail`
> CNAMEs), leave those in place too.

---

## Summary of who runs what
- **Vercel** — the Next.js app (pages, SSR, `/api/contact`).
- **Cloudflare D1** — contact submissions database.
- **Hostinger** — domain registrar + DNS zone + Business Email (unchanged).
