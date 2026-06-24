#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// Stage 6a — draft public replies to commenters (you approve & post manually).
// LinkedIn has no API to post replies for you, so this builds an approval queue:
// AI-written, helpful, on-brand replies you can paste in seconds. No bot risk.
// Output → data/replies.json (+ readable console table).
//
//   node social/outreach/reply-suggest.mjs
//   node social/outreach/reply-suggest.mjs --limit 10 --dry-run
// ─────────────────────────────────────────────────────────────────────────────
import { loadEnv, arg, flag } from "../lib/env.mjs";
import { ask } from "../lib/claude.mjs";
import { brandBrief, readJson, writeJson } from "../lib/store.mjs";
loadEnv();

const LIMIT = parseInt(arg("limit", "0"), 10) || Infinity;
const DRY = flag("dry-run");

const engagement = readJson("engagement.json", []);
const posts = new Map(readJson("posts.json", []).map((p) => [p.id, p]));
const commenters = engagement
  .filter((e) => (e.type || "").toLowerCase().startsWith("comment") && e.comment)
  .sort((a, b) => b.intent - a.intent)
  .slice(0, LIMIT);

if (!commenters.length) {
  console.log("  No comments to reply to yet.\n");
  process.exit(0);
}

const system = `You write LinkedIn comment replies for the founder of Xevaro Labs,
an AI automation + web agency. Replies are warm, genuinely helpful, 1-3 sentences,
no pitch-slapping. If the commenter shows buying intent, gently open the door to
a DM/call without being salesy. Plain text only, no hashtags.`;

const existing = readJson("replies.json", []);
const seen = new Set(existing.map((r) => r.key));
console.log(`\n  Drafting replies for ${commenters.length} comment(s)${DRY ? " (dry run)" : ""}…\n`);

for (const c of commenters) {
  if (seen.has(c.key)) continue;
  const post = posts.get(c.postId);
  const prompt = `Brand brief:\n${brandBrief()}\n
Our post hook: "${post?.hook || c.postId}"
${c.name} commented: "${c.comment}"

Write the reply.`;
  let reply = "";
  try {
    reply = await ask({ system, prompt, maxTokens: 400 });
  } catch (e) {
    console.log(`  ✗ ${c.name}  ${e.message}`);
    continue;
  }
  existing.push({ key: c.key, name: c.name, profileUrl: c.profileUrl, comment: c.comment, reply, status: "pending", postId: c.postId });
  console.log(`  ● ${c.name} — "${c.comment}"`);
  console.log(`    ↳ ${reply}\n`);
}

if (DRY) {
  console.log("  Dry run — nothing written.\n");
  process.exit(0);
}
const out = writeJson("replies.json", existing);
console.log(`  ${existing.length} reply(ies) queued → ${out}`);
console.log(`  Open it, paste the good ones under each comment on LinkedIn.\n`);
