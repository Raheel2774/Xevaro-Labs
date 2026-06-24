// Shared slug helpers so every stage names files + demo URLs identically.

// Niche → file slug. Must match find-leads.mjs exactly.
export const nicheSlug = (s) => (s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-");

// Business + Place ID → unique demo slug, e.g. "diaz-tree-service-9x2k".
export const slugFor = (name, placeId = "") => {
  const base =
    (name || "biz")
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "biz";
  const tail = String(placeId).replace(/[^a-z0-9]/gi, "").slice(-4).toLowerCase();
  return tail ? `${base}-${tail}` : base;
};
