// Owner / registered-agent name lookup from state business registries.
// Only states with a free open-data API are implemented. Colorado is live
// (data.colorado.gov). Others return null → fall back to the contact name
// Outscraper surfaces with the email. Add states by extending REGISTRIES.

const CO_RESOURCE = "https://data.colorado.gov/resource/4ykn-tg5h.json";

const norm = (s) =>
  (s || "")
    .toLowerCase()
    .replace(/\b(llc|inc|co|company|corp|corporation|ltd|services?|the|and|&)\b/g, "")
    .replace(/[^a-z0-9]/g, "");

const REGISTRIES = {
  CO: async (name) => {
    const url = new URL(CO_RESOURCE);
    url.searchParams.set("$q", name);
    url.searchParams.set("$limit", "8");
    const res = await fetch(url);
    if (!res.ok) return null;
    const rows = await res.json();
    const target = norm(name);
    let best = null;
    for (const r of rows) {
      const en = norm(r.entityname);
      if (!en) continue;
      if (en === target || en.includes(target) || target.includes(en)) { best = r; break; }
      if (!best) best = r; // weak fallback to first hit
    }
    if (!best) return null;
    const full = [best.agentfirstname, best.agentmiddlename, best.agentlastname]
      .filter(Boolean)
      .join(" ")
      .trim();
    return full || null;
  },
};

export async function lookupOwner({ name, state }) {
  const fn = REGISTRIES[(state || "").toUpperCase()];
  if (!fn || !name) return null;
  try {
    return await fn(name);
  } catch {
    return null;
  }
}

export const hasRegistry = (state) => !!REGISTRIES[(state || "").toUpperCase()];
