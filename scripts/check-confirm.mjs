// Fails the launch if any placeholder survives in the production build (HTML, RSC payloads, JSON-LD, txt, xml).
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";
const ROOT = ".next/server/app", BAD = ["[CONFIRM", "client consent needed", "Doctor review pending", "aggregateRating", "\"@type\":\"Review\"", "testimonial", "image-slot-placeholder", "localhost:3000"], EXT = new Set([".html", ".rsc", ".txt", ".xml", ".json", ".body"]);
const hits = [];
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : EXT.has(extname(p)) && scan(p); } };
const scan = (p) => { const s = readFileSync(p, "utf8"); for (const b of BAD) { const i = s.indexOf(b); if (i > -1) { hits.push(`${p}: ${s.slice(Math.max(0, i - 30), i + 40).replace(/\s+/g, " ")}`); break; } } };
try { walk(ROOT); } catch { console.error("No build output. Run `npm run build` first."); process.exit(2); }
if (hits.length) {
  const localHostHits = hits.filter((hit) => hit.includes("localhost:3000"));
  const placeholderHits = hits.filter((hit) => !hit.includes("localhost:3000"));
  if (localHostHits.length) console.error(`✖ ${localHostHits.length} built file(s) contain localhost URLs. Set NEXT_PUBLIC_SITE_URL to the verified production origin and rebuild.`);
  if (placeholderHits.length) console.error(`✖ ${placeholderHits.length} file(s) still contain placeholders:\n` + placeholderHits.join("\n"));
  process.exit(1);
}
console.log("✓ No [CONFIRM] or consent placeholders in build output.");
