// JSON state store for the social engine. Everything the pipeline produces
// (content plan, posts, engagement, leads, queues) lives under social/data/
// as readable JSON so you can inspect/edit any stage by hand. Gitignored.
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), ".."); // social/
export const DATA = join(ROOT, "data");
export const dataPath = (f) => join(DATA, f);

export function readJson(file, fallback) {
  const p = dataPath(file);
  if (!existsSync(p)) return fallback;
  try {
    return JSON.parse(readFileSync(p, "utf8"));
  } catch {
    return fallback;
  }
}

export function writeJson(file, obj) {
  mkdirSync(DATA, { recursive: true });
  writeFileSync(dataPath(file), JSON.stringify(obj, null, 2) + "\n");
  return dataPath(file);
}

// Brand voice fed to every AI generator. Edit social/brand.md to retune the
// whole engine's tone in one place — no code changes needed.
const DEFAULT_BRIEF = `Xevaro Labs (xevarolabs.com) — an AI automation + web agency.
We build websites and AI-powered automations (lead engines, chatbots, internal
tools, content systems) for business owners. Our edge: we ship real, working
systems fast, not slideware. We especially help owners who are missing modern
web/automation infrastructure. Voice: confident, concrete, no hype, no emoji
spam, founder-to-founder. We teach in public and show the work.`;

export function brandBrief() {
  const p = join(ROOT, "brand.md");
  if (existsSync(p)) return readFileSync(p, "utf8").trim();
  return DEFAULT_BRIEF;
}
