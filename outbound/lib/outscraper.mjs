// Outscraper client — finds an email (and any contact name) for a business
// that has no website, by re-locating it on Google Maps with the email
// enrichment add-on. Async job API: submit → poll results_location.
// Docs: https://app.outscraper.com/api-docs

const BASE = (process.env.OUTSCRAPER_BASE || "https://api.outscraper.cloud").replace(/\/$/, "");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// items: [{ ref, query }]  →  Map<ref, { email, emailName }>
export async function enrichBusinesses(items, apiKey, opts = {}) {
  const batchSize = opts.batchSize || 25;
  const log = opts.log || (() => {});
  const out = new Map();
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    log(`  Outscraper: ${i + 1}-${i + batch.length} of ${items.length} …`);
    let data = [];
    try {
      data = await submitAndPoll(batch.map((b) => b.query), apiKey);
    } catch (e) {
      log(`  ! batch failed: ${e.message}`);
    }
    batch.forEach((b, idx) => out.set(b.ref, extractContact(data[idx])));
  }
  return out;
}

async function submitAndPoll(queries, apiKey) {
  const url = new URL(`${BASE}/maps/search-v3`);
  for (const q of queries) url.searchParams.append("query", q);
  url.searchParams.set("limit", "1");
  url.searchParams.set("enrichment", "emails_validator_service");
  url.searchParams.set("async", "true");

  const res = await fetch(url, { headers: { "X-API-KEY": apiKey } });
  if (!res.ok) throw new Error(`submit ${res.status}: ${(await res.text()).slice(0, 150)}`);
  const job = await res.json();
  if (Array.isArray(job.data)) return job.data; // came back synchronously

  const loc = job.results_location;
  if (!loc) throw new Error("no results_location in response");
  for (let t = 0; t < 36; t++) {
    await sleep(5000);
    const r = await fetch(loc, { headers: { "X-API-KEY": apiKey } });
    if (!r.ok) continue;
    const j = await r.json();
    if (j.status === "Success") return j.data || [];
    if (j.status === "Error") throw new Error("job returned Error status");
  }
  throw new Error("timed out waiting for results");
}

function extractContact(placeList) {
  const p = Array.isArray(placeList) ? placeList[0] : placeList;
  if (!p) return { email: "", emailName: "" };
  const email =
    p.email_1 || (Array.isArray(p.emails) && p.emails[0]) || "";
  const emailName = p.email_1_full_name || "";
  return { email: typeof email === "string" ? email : "", emailName };
}
