#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// Stage 2 — expand each planned idea into a ready-to-publish post.
// Writes native LinkedIn copy + hashtags + an image prompt. Output → data/posts.json.
//
//   node social/generate/make-post.mjs              # make all not-yet-made
//   node social/generate/make-post.mjs --limit 3
//   node social/generate/make-post.mjs --regen      # rewrite even existing
//   node social/generate/make-post.mjs --dry-run
// ─────────────────────────────────────────────────────────────────────────────
import { loadEnv, arg, flag } from "../lib/env.mjs";
import { ask } from "../lib/claude.mjs";
import { brandBrief, readJson, writeJson } from "../lib/store.mjs";
loadEnv();

const LIMIT = parseInt(arg("limit", "0"), 10) || Infinity;
const REGEN = flag("regen");
const DRY = flag("dry-run");

const plan = readJson("content-plan.json", []);
if (!plan.length) {
  console.error("  No content-plan.json — run plan-content.mjs first.");
  process.exit(1);
}

const posts = readJson("posts.json", []);
const made = new Set(posts.map((p) => p.id));
const todo = plan.filter((p) => REGEN || !made.has(p.id)).slice(0, LIMIT);

if (!todo.length) {
  console.log("  Nothing to make — all planned posts already written. Use --regen to rewrite.\n");
  process.exit(0);
}

const system = `You write high-performing LinkedIn posts for Xevaro Labs, an AI
automation + web agency. Format for LinkedIn: a strong one-line hook, a blank
line, then short punchy lines/paragraphs, a clear CTA, then 3-5 relevant
hashtags. 120-220 words. No emoji spam. Sound like a founder, not a brand page.
Return ONLY valid JSON.`;

console.log(`\n  Writing ${todo.length} post(s)${DRY ? " (dry run)" : ""}…\n`);
const brief = brandBrief();
const byId = new Map(posts.map((p) => [p.id, p]));

for (const idea of todo) {
  const prompt = `Brand brief:
${brief}

Write the full LinkedIn post for this idea:
pillar: ${idea.pillar}
hook: ${idea.hook}
angle: ${idea.angle}
cta: ${idea.cta}
keywords: ${(idea.keywords || []).join(", ")}

Return JSON:
{
  "body": "the full post text, ready to paste, including hashtags on the last line",
  "hashtags": ["#tag", ...],
  "imagePrompt": "a concise prompt to generate a matching quote-card / graphic"
}`;

  try {
    const out = await ask({ system, prompt, maxTokens: 1500, json: true });
    const post = {
      ...idea,
      status: "ready",
      body: out.body,
      hashtags: out.hashtags || [],
      imagePrompt: out.imagePrompt || "",
      madeAt: new Date().toISOString(),
    };
    byId.set(idea.id, post);
    console.log(`  ✓ ${idea.id}  ${idea.hook}`);
  } catch (e) {
    console.log(`  ✗ ${idea.id}  ${e.message}`);
  }
}

if (DRY) {
  console.log("\n  Dry run — nothing written.\n");
  process.exit(0);
}

const out = writeJson("posts.json", [...byId.values()].sort((a, b) => a.scheduledFor.localeCompare(b.scheduledFor)));
console.log(`\n  Wrote → ${out}\n  Next: node social/publish/postiz-adapter.mjs --due   (or --now to push all ready)\n`);
