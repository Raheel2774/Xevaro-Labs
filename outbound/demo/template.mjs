// renderDemo(record) → a complete, self-contained HTML page.
// This is the live site a prospect sees with their own business on it — the
// whole pitch hinges on it looking real and premium. Single file, inline CSS,
// mobile-first, real Google rating when available, sticky call bar.

const NICHES = [
  { k: /tree|arbor|stump/, noun: "tree service", services: ["Tree removal", "Trimming & pruning", "Stump grinding", "Storm cleanup"] },
  { k: /plumb/, noun: "plumbing", services: ["Drain cleaning", "Water heater repair", "Leak detection", "24/7 emergency"] },
  { k: /clean|maid|janitor/, noun: "cleaning service", services: ["Deep cleaning", "Recurring service", "Move in / move out", "Offices"] },
  { k: /junk|haul|debris|demolition/, noun: "junk removal", services: ["Junk removal", "Furniture hauling", "Estate cleanouts", "Construction debris"] },
  { k: /mov(e|ing)/, noun: "moving service", services: ["Local moves", "Loading & hauling", "Packing help", "Same-day jobs"] },
  { k: /detail|car wash/, noun: "auto detailing", services: ["Interior detailing", "Exterior polish", "Ceramic coating", "We come to you"] },
  { k: /pressure|power wash|wash/, noun: "pressure washing", services: ["House washing", "Driveways", "Roof washing", "Decks & patios"] },
  { k: /hvac|heating|cooling|air/, noun: "HVAC", services: ["AC repair", "Heating service", "New installs", "Maintenance plans"] },
  { k: /electric/, noun: "electrical", services: ["Wiring & repairs", "Panel upgrades", "Lighting", "EV chargers"] },
  { k: /roof/, noun: "roofing", services: ["Roof repair", "Replacements", "Inspections", "Storm damage"] },
  { k: /landscap|lawn|yard/, noun: "landscaping", services: ["Lawn care", "Landscaping", "Yard cleanup", "Irrigation"] },
  { k: /fence/, noun: "fencing", services: ["Installation", "Repairs", "Gates", "Staining"] },
];
const DEFAULT = { noun: "local service", services: ["Free estimates", "Fast response", "Licensed & insured", "Satisfaction guaranteed"] };

const pick = (niche, name) => {
  const hay = `${niche} ${name}`.toLowerCase();
  return NICHES.find((n) => n.k.test(hay)) || DEFAULT;
};
const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const initials = (name) =>
  (name || "B").replace(/[^a-zA-Z ]/g, "").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("") || "B";

export function renderDemo(rec) {
  const m = pick(rec.niche || "", rec.business || "");
  const noun = m.noun;
  const city = rec.city || "your area";
  const name = esc(rec.business || "Your Business");
  const tel = (rec.phone || "").replace(/[^\d+]/g, "");
  const ownerLine = rec.owner ? `Owner ${esc(rec.owner)} and the team` : "Our team";
  const claim = esc(rec.claimUrl || "#claim");
  const rating = parseFloat(rec.rating) || 0;
  const reviews = parseInt(rec.reviews, 10) || 0;
  const hasRating = rating >= 3 && reviews >= 1;

  const services = m.services
    .map((s) => `<div class="svc"><span class="dot">✓</span><span>${esc(s)}</span></div>`)
    .join("");

  const ratingBlock = hasRating
    ? `<section class="reviews"><div class="wrap rev">
<div class="score"><div class="num">${rating.toFixed(1)}</div><div class="stars">★★★★★</div>
<div class="cnt">${reviews} Google reviews</div></div>
<div class="revcopy"><h2>Rated ${rating.toFixed(1)} by ${esc(city)} customers</h2>
<p>${name} has earned ${reviews}+ reviews for showing up on time and doing the job right. Now with a home online to match.</p></div>
</div></section>`
    : "";

  const heroTrust = hasRating
    ? `<span class="pill"><b>★ ${rating.toFixed(1)}</b> · ${reviews} Google reviews</span><span class="pill">Licensed &amp; insured</span><span class="pill">Same-day response</span>`
    : `<span class="pill"><b>★★★★★</b> Trusted locally</span><span class="pill">Licensed &amp; insured</span><span class="pill">Same-day response</span>`;

  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${name} — ${esc(noun)} in ${esc(city)}</title>
<meta name="description" content="${name}: trusted ${esc(noun)} serving ${esc(city)}. Call for a fast free estimate.">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--ink:#0d0f14;--green:#16a34a;--greenD:#15803d}
body{font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f1115;background:#fff;line-height:1.6}
.wrap{max-width:1000px;margin:0 auto;padding:0 22px}
.bar{position:sticky;top:0;z-index:20;background:var(--ink);color:#fff;display:flex;justify-content:space-between;align-items:center;padding:12px 22px}
.logo{display:flex;align-items:center;gap:11px;font-weight:700;letter-spacing:.2px}
.mono{width:34px;height:34px;border-radius:9px;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;flex:none}
.bar .call{background:var(--green);color:#fff;text-decoration:none;padding:9px 16px;border-radius:9px;font-weight:600;font-size:15px}
.hero{background:radial-gradient(900px 400px at 80% -10%,#1d2740,transparent),var(--ink);color:#fff;padding:70px 0 60px}
.hero h1{font-size:46px;line-height:1.08;font-weight:800;letter-spacing:-.6px}
.hero h1 span{color:#5dd29a}
.hero p{font-size:19px;color:#c7ccd6;margin-top:16px;max-width:620px}
.cta{display:flex;gap:11px;margin-top:28px;flex-wrap:wrap}
.btn{text-decoration:none;font-weight:700;padding:15px 26px;border-radius:11px;font-size:17px;display:inline-block}
.btn.g{background:var(--green);color:#fff}
.btn.g:hover{background:var(--greenD)}
.btn.o{background:rgba(255,255,255,.06);color:#fff;border:1.5px solid rgba(255,255,255,.28)}
.pills{display:flex;gap:10px;margin-top:30px;flex-wrap:wrap}
.pill{font-size:13.5px;color:#dfe3ea;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);padding:7px 13px;border-radius:999px}
.pill b{color:#fbbf24}
.sec{padding:56px 0}
.sec h2{font-size:28px;font-weight:800;letter-spacing:-.3px}
.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-top:26px}
.svc{display:flex;align-items:center;gap:13px;background:#f6f7f9;border:1px solid #ebeef2;border-radius:13px;padding:18px 20px;font-weight:600;font-size:17px}
.dot{width:24px;height:24px;border-radius:50%;background:#e7f6ee;color:var(--green);display:flex;align-items:center;justify-content:center;font-weight:800;flex:none}
.reviews{background:#f7f8fa;border-top:1px solid #eef0f3;border-bottom:1px solid #eef0f3}
.rev{display:flex;gap:34px;align-items:center;padding:48px 22px;flex-wrap:wrap}
.score{text-align:center;flex:none}
.score .num{font-size:54px;font-weight:800;line-height:1;color:var(--ink)}
.score .stars{color:#fbbf24;font-size:22px;letter-spacing:2px;margin-top:6px}
.score .cnt{color:#6b7280;font-size:14px;margin-top:6px}
.revcopy{flex:1;min-width:280px}
.revcopy h2{font-size:24px}
.revcopy p{color:#3b4252;font-size:17px;margin-top:8px;max-width:560px}
.band{background:var(--green);color:#fff;text-align:center;padding:50px 22px}
.band h2{font-size:29px;font-weight:800}
.band a{display:inline-block;margin-top:20px;background:#fff;color:var(--ink);text-decoration:none;font-weight:700;padding:15px 30px;border-radius:11px}
footer{background:var(--ink);color:#aeb4c0;font-size:13px;padding:30px 0;text-align:center}
footer .x{color:#fff;font-weight:600}
.claim{position:sticky;bottom:0;background:#0b1220;color:#fff;display:flex;justify-content:center;gap:14px;align-items:center;padding:11px 16px;font-size:14px;z-index:30;flex-wrap:wrap;border-top:1px solid rgba(255,255,255,.1)}
.claim a{background:var(--green);color:#fff;text-decoration:none;padding:8px 16px;border-radius:8px;font-weight:600}
@media(max-width:640px){.hero h1{font-size:33px}.grid{grid-template-columns:1fr}.logo{font-size:15px}}
</style></head><body>
<div class="bar"><span class="logo"><span class="mono">${esc(initials(rec.business))}</span>${name}</span><a class="call" href="tel:${esc(tel)}">Call ${esc(rec.phone || "")}</a></div>

<header class="hero"><div class="wrap">
<h1>${esc(city)}'s trusted<br><span>${esc(noun)}.</span></h1>
<p>${ownerLine} deliver fast, dependable ${esc(noun)} across ${esc(city)} and nearby. Upfront pricing, no surprises, free estimates.</p>
<div class="cta"><a class="btn g" href="tel:${esc(tel)}">Call now</a><a class="btn o" href="tel:${esc(tel)}">Get a free quote</a></div>
<div class="pills">${heroTrust}</div>
</div></header>

<section class="sec"><div class="wrap"><h2>What we do</h2><div class="grid">${services}</div></div></section>

${ratingBlock}

<section class="sec"><div class="wrap"><h2>Local, reliable, and easy to reach</h2>
<p style="font-size:18px;color:#3b4252;max-width:680px;margin-top:12px">${name} is a ${esc(city)}-based ${esc(noun)} business built on doing the job right and showing up when we say we will. One call gets you a real person and a fair quote — no call centers, no runaround.</p></div></section>

<section class="band"><h2>Need ${esc(noun)} in ${esc(city)}? Let's talk.</h2><a href="tel:${esc(tel)}">Call ${esc(rec.phone || "us")}</a></section>

<footer><div class="wrap">&copy; ${new Date().getFullYear()} ${name}. Serving ${esc(city)} and surrounding areas.<br>Site crafted by <span class="x">Xevaro Labs</span>.</div></footer>

<div class="claim">Free preview built for ${name}. <a href="${claim}">Make it yours →</a></div>
</body></html>`;
}
