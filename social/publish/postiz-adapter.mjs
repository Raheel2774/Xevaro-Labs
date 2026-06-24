#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// Stage 3 — publish via self-hosted Postiz (one API for LinkedIn / IG / FB).
// Reads data/posts.json and pushes posts to your Postiz instance.
//
// Setup (.env):
//   POSTIZ_URL=https://your-postiz-host         # no trailing slash
//   POSTIZ_API_KEY=...                          # Postiz → Settings → Public API
//   POSTIZ_LINKEDIN_ID=...                       # run --list to find channel ids
//
//   node social/publish/postiz-adapter.mjs --list        # show connected channels
//   node social/publish/postiz-adapter.mjs --due         # publish posts whose time has come
//   node social/publish/postiz-adapter.mjs --now         # publish ALL ready posts now
//   node social/publish/postiz-adapter.mjs --due --print # show payloads, send nothing (dry)
//
// NOTE: Postiz's public API shape can differ slightly by version. This adapter
// targets /public/v1. If your instance rejects a field, run with --print, compare
// against your Postiz → Settings → Public API docs, and tweak buildPayload().
// Image upload is a Phase-2 add-on — for now attach graphics in the Postiz UI.
// ─────────────────────────────────────────────────────────────────────────────
import { loadEnv, arg, flag, env } from "../lib/env.mjs";
import { readJson, writeJson } from "../lib/store.mjs";
loadEnv();

const BASE = env("POSTIZ_URL").replace(/\/$/, "");
const KEY = env("POSTIZ_API_KEY");
const DRY = flag("print") || flag("dry-run");

// platform → integration id (extend as you connect IG/FB in Phase 2)
const CHANNELS = {
  linkedin: env("POSTIZ_LINKEDIN_ID"),
  instagram: env("POSTIZ_INSTAGRAM_ID"),
  facebook: env("POSTIZ_FACEBOOK_ID"),
};

function need(cond, msg) {
  if (!cond) {
    console.error(`  ${msg}`);
    process.exit(1);
  }
}

async function api(path, init = {}) {
  need(BASE, "POSTIZ_URL not set in .env");
  need(KEY, "POSTIZ_API_KEY not set in .env (Postiz → Settings → Public API)");
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { "content-type": "application/json", Authorization: KEY, ...(init.headers || {}) },
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Postiz ${res.status} ${path}: ${text}`);
  return text ? JSON.parse(text) : {};
}

// --list: show connected channels + their ids so you can fill .env.
if (flag("list")) {
  const data = await api("/public/v1/integrations").catch((e) => {
    console.error("  " + e.message);
    process.exit(1);
  });
  const list = Array.isArray(data) ? data : data.integrations || [];
  console.log("\n  Connected Postiz channels:\n");
  for (const c of list) console.log(`   ${c.identifier || c.providerIdentifier || "?"}  id=${c.id}  ${c.name || ""}`);
  console.log("\n  Put the LinkedIn id into POSTIZ_LINKEDIN_ID in .env\n");
  process.exit(0);
}

function buildPayload(post, integrationId) {
  const now = flag("now");
  const when = now ? new Date() : new Date(post.scheduledFor);
  return {
    type: now ? "now" : "schedule",
    date: when.toISOString(),
    shortLink: false,
    tags: [],
    posts: [
      {
        integration: { id: integrationId },
        value: [{ content: post.body, image: [] }],
        settings: {},
      },
    ],
  };
}

// Decide what to send.
const all = readJson("posts.json", []);
need(all.length, "No posts.json — run make-post.mjs first.");
const nowMs = Date.now();
const ready = all.filter((p) => p.status === "ready");
const queue = flag("now")
  ? ready
  : flag("due")
    ? ready.filter((p) => new Date(p.scheduledFor).getTime() <= nowMs)
    : (console.error("  Pass --due (publish what's due) or --now (publish all ready). Add --print to preview."), process.exit(1));

if (!queue.length) {
  console.log("  Nothing to publish right now.\n");
  process.exit(0);
}

console.log(`\n  Publishing ${queue.length} post(s)${DRY ? " (PRINT only — nothing sent)" : ""}…\n`);
const byId = new Map(all.map((p) => [p.id, p]));

for (const post of queue) {
  const integrationId = CHANNELS[post.platform];
  if (!integrationId) {
    console.log(`  ✗ ${post.id}  no channel id for "${post.platform}" (set POSTIZ_${post.platform.toUpperCase()}_ID)`);
    continue;
  }
  const payload = buildPayload(post, integrationId);
  if (DRY) {
    console.log(`  — ${post.id} (${post.platform}) —`);
    console.log(JSON.stringify(payload, null, 2));
    continue;
  }
  try {
    const res = await api("/public/v1/posts", { method: "POST", body: JSON.stringify(payload) });
    const rec = byId.get(post.id);
    rec.status = flag("now") ? "published" : "scheduled";
    rec.postizId = res.id || (Array.isArray(res) ? res[0]?.id : undefined) || true;
    rec.publishedAt = new Date().toISOString();
    console.log(`  ✓ ${post.id}  → ${rec.status}`);
  } catch (e) {
    console.log(`  ✗ ${post.id}  ${e.message}`);
  }
}

if (!DRY) {
  writeJson("posts.json", [...byId.values()]);
  console.log(`\n  Done. After people engage, harvest them:\n   node social/harvest/harvest.mjs --csv social/data/engagers.csv\n`);
}
