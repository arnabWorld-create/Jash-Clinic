// Fails when titles/descriptions are too long, too short or duplicated.
import { readFileSync } from "node:fs";
const seo = JSON.parse(readFileSync("config/seo.json", "utf8")), bad = [], seenT = new Set(), seenD = new Set();
for (const [k, m] of Object.entries(seo)) {
  if (m.title.length > 60) bad.push(`${k}: title ${m.title.length} chars (max 60)`);
  if (m.description.length < 70 || m.description.length > 160) bad.push(`${k}: description ${m.description.length} chars (70-160)`);
  if (seenT.has(m.title)) bad.push(`${k}: duplicate title`); seenT.add(m.title);
  if (seenD.has(m.description)) bad.push(`${k}: duplicate description`); seenD.add(m.description);
}
if (bad.length) { console.error("✖ SEO metadata problems:\n" + bad.join("\n")); process.exit(1); }
console.log(`✓ ${Object.keys(seo).length} pages have unique, well-sized titles and descriptions.`);
