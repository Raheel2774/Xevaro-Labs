<div align="center">

# ⬢ Xevaro Labs

### Command the Autonomous Enterprise

**AI automation agency site** — an immersive, 3D "AI OS" experience built to translate complex operations into flawless, zero-friction automated infrastructure. Custom AI agents, orchestrator loops, and enterprise automation. *One keystroke ahead.*

[![Live](https://img.shields.io/badge/live-xevarolabs.com-7A1220?style=flat-square)](https://xevarolabs.com)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r184-000000?style=flat-square&logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Cloudflare D1](https://img.shields.io/badge/Cloudflare-D1-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://developers.cloudflare.com/d1/)

</div>

---

## Overview

Xevaro Labs is the marketing and lead-capture site for an AI automation agency. It pairs a cinematic, WebGL-driven "living system" interface with a production backend: a validated contact pipeline that persists leads to **Cloudflare D1** and a password-protected **admin portal** to review submissions.

- 🌐 **Live:** [xevarolabs.com](https://xevarolabs.com)
- 🧠 **Concept:** a multi-page "AI OS" — every route is a panel in the system
- 🎛️ **Backend:** Next.js API routes → Cloudflare D1 + transactional email

## ✨ Features

- **Immersive 3D interface** — a real-time Three.js / React Three Fiber "AI Living System" background with post-processing, driven by GSAP + Framer Motion and Lenis smooth-scroll.
- **Full agency site** — Home, About, Services, Products, Case Studies, Pricing, Contact, plus interactive `System` and `Deconstruct` showcases.
- **Contact pipeline** — validated `POST /api/contact` writes each lead to Cloudflare D1 and sends a notification email (Nodemailer).
- **Admin portal** — session-protected `/admin` route to browse contact submissions (`/api/admin/login` · `/logout`).
- **Legal pages** — Terms, Privacy, and Refund policies included.
- **Responsive & fast** — App Router, React Server Components, Tailwind design system.

## 🧱 Tech stack

| Layer | Tools |
|---|---|
| **Framework** | Next.js 15 (App Router), React 19, TypeScript 5 |
| **3D / motion** | Three.js, @react-three/fiber + drei + postprocessing, GSAP, Framer Motion, Lenis |
| **Styling** | Tailwind CSS 3, PostCSS, Lucide icons |
| **Backend** | Next.js Route Handlers, Nodemailer |
| **Database** | Cloudflare D1 (SQLite) via REST |
| **Hosting** | Vercel (app) · Hostinger (domain + email) · Cloudflare D1 (data) |

## 📁 Project structure

```text
Xevaro-Labs/
├── app/                      # Next.js App Router
│   ├── page.tsx              # Home — the "AI OS" landing
│   ├── layout.tsx            # Root layout, metadata, fonts
│   ├── about/ services/ products/ case-studies/ pricing/ contact/
│   ├── system/ deconstruct/  # interactive product & vision pages
│   ├── admin/                # password-protected submissions portal
│   ├── terms/ privacy/ refund/   # legal
│   └── api/
│       ├── contact/          # POST → validate → Cloudflare D1 + email
│       └── admin/            # login / logout (session auth)
├── components/
│   ├── 3d/                   # Three.js / R3F scene (AI Living System)
│   ├── os/                   # "AI OS" UI shell
│   ├── keyboard/ sections/ ui/  Navbar.tsx
├── db/schema.sql             # D1 submissions table + indexes
├── lib/                      # server helpers (D1 client, mail, auth)
├── public/                   # static assets
├── wrangler.toml             # Cloudflare D1 binding
└── DEPLOY.md                 # full deploy runbook (Vercel + Hostinger + D1)
```

## 🚀 Getting started

**Prerequisites:** Node.js 18.18+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (see below)
cp .env.example .env.local   # then fill in values

# 3. Run the dev server
npm run dev                  # http://localhost:3000
```

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## 🔐 Environment variables

The site runs statically without these; they enable the contact pipeline and admin portal.

| Variable | Purpose |
|---|---|
| `CF_ACCOUNT_ID` | Cloudflare account ID (D1 REST) |
| `CF_D1_DATABASE_ID` | ID of the `xevaro_db` D1 database |
| `CF_D1_API_TOKEN` | Cloudflare API token with **D1 Edit** scope |
| `ADMIN_PASSWORD` | Password for the `/admin` portal |
| `ADMIN_SESSION_SECRET` | Secret used to sign admin sessions |

> Email delivery (Nodemailer) and the complete provider setup are documented in **[DEPLOY.md](DEPLOY.md)**.

## 🗄️ Database

Contact submissions are stored in Cloudflare D1 (SQLite). Create and seed the schema:

```bash
npm i -D wrangler
npx wrangler login
npx wrangler d1 create xevaro_db          # copy the printed database_id
npx wrangler d1 execute xevaro_db --remote --file=./db/schema.sql
```

Schema lives in [`db/schema.sql`](db/schema.sql) — a `submissions` table (name, company, email, phone, message, source, timestamps) with indexes on `created_at` and `email`.

## ☁️ Deployment

The app deploys to **Vercel**, with the **Hostinger** domain pointed at it (MX records untouched so business email keeps working) and **Cloudflare D1** storing form data independently of the host. The complete, step-by-step runbook — including secrets, DNS, and D1 setup — is in **[DEPLOY.md](DEPLOY.md)**.

---

<div align="center">

**© Xevaro Labs.** All rights reserved.

*Built with Next.js, Three.js, and Cloudflare.*

</div>
