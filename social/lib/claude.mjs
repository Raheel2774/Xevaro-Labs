// Thin Anthropic Messages API wrapper (raw fetch, no SDK dependency).
// Used by every AI stage: content planning, post writing, reply + DM drafting.
import { loadEnv, env } from "./env.mjs";

// Defaults to the most capable model; override with CLAUDE_MODEL in .env
// (e.g. claude-sonnet-4-6) to cut cost on high-volume content generation.
const MODEL = () => env("CLAUDE_MODEL") || "claude-opus-4-8";

export async function ask({ system, prompt, maxTokens = 2000, json = false }) {
  loadEnv();
  const key = env("ANTHROPIC_API_KEY");
  if (!key) throw new Error("ANTHROPIC_API_KEY not set — add it to .env (console.anthropic.com).");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL(),
      max_tokens: maxTokens,
      system,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const text = (data.content || []).map((b) => b.text || "").join("").trim();
  return json ? parseJson(text) : text;
}

// Models sometimes wrap JSON in ```json fences or add a sentence — strip both.
function parseJson(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  let raw = fenced ? fenced[1] : text;
  if (!fenced) {
    const s = raw.indexOf("["), o = raw.indexOf("{");
    const start = s === -1 ? o : o === -1 ? s : Math.min(s, o);
    if (start > 0) raw = raw.slice(start);
  }
  return JSON.parse(raw.trim());
}
