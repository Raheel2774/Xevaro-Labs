import { readdirSync } from "node:fs";

// Newest CSV in `dir` whose name starts with `prefix`, with optional
// substring include/exclude filters. Lexical sort works because filenames
// end in an ISO date (YYYY-MM-DD).
export function findLatest(dir, { prefix, includes = "", excludes = "" }) {
  let files;
  try {
    files = readdirSync(dir);
  } catch {
    return null;
  }
  const match = files
    .filter((f) => f.endsWith(".csv"))
    .filter((f) => f.startsWith(prefix))
    .filter((f) => (includes ? f.includes(includes) : true))
    .filter((f) => (excludes ? !f.includes(excludes) : true))
    .sort();
  return match.length ? match[match.length - 1] : null;
}
