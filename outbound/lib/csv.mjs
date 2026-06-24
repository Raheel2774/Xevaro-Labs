// Tiny RFC-4180-ish CSV parser/writer — handles quoted fields, commas,
// escaped quotes ("") and newlines inside quotes. No external deps.

export function parseCsv(text) {
  const rows = [];
  let row = [], field = "", inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQ = false;
      } else field += c;
    } else if (c === '"') inQ = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (c !== "\r") field += c;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  const header = rows.shift() || [];
  const body = rows.filter((r) => r.some((v) => v !== ""));
  return { header, rows: body };
}

export const escCsv = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;

export function toCsv(header, rows) {
  return [header, ...rows].map((r) => r.map(escCsv).join(",")).join("\n") + "\n";
}

// Case-insensitive header lookup → column index (or -1).
export const colIndex = (header, name) =>
  header.findIndex((h) => h.trim().toLowerCase() === name.toLowerCase());
