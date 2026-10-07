// Fails the launch if any placeholder survives in the production build (HTML, RSC payloads, JSON-LD, txt, xml).
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";
const ROOT = ".next/server/app", BAD = ["[CONFIRM", "client consent needed", "Doctor review pending", "aggregateRating", "\"@type\":\"Review\"", "testimonial", "image-slot-placeholder", "localhost:3000"], EXT = new Set([".html", ".rsc", ".txt", ".xml", ".json", ".body"]);
const hits = [];
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : EXT.has(extname(p)) && scan(p); } };
const scan = (p) => { const s = readFileSync(p, "utf8"); for (const b of BAD) { const i = s.indexOf(b); if (i > -1) { hits.push(`${p}: ${s.slice(Math.max(0, i - 30), i + 40).replace(/\s+/g, " ")}`); break; } } };
try { walk(ROOT); } catch { console.error("No build output. Run `npm run build` first."); process.exit(2); }
if (hits.length) { console.error(`✖ ${hits.length} file(s) still contain placeholders:\n` + hits.join("\n")); process.exit(1); }
console.log("✓ No [CONFIRM] or consent placeholders in build output.");
