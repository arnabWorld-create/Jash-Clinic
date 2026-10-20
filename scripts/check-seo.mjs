// Fails when titles/descriptions are too long, too short or duplicated.
import { readFileSync } from "node:fs";
const datasets = [
  ["en", JSON.parse(readFileSync("config/seo.json", "utf8"))],
  ["gu", JSON.parse(readFileSync("config/seo-gu.json", "utf8"))],
];
const bad = [], seenT = new Set(), seenD = new Set();
for (const [locale, seo] of datasets) for (const [k, m] of Object.entries(seo)) {
  const key = `${locale}:${k}`;
  if (m.title.length > 60) bad.push(`${k}: title ${m.title.length} chars (max 60)`);
  if (m.description.length < 70 || m.description.length > 160) bad.push(`${k}: description ${m.description.length} chars (70-160)`);
  if (seenT.has(m.title)) bad.push(`${key}: duplicate title`); seenT.add(m.title);
  if (seenD.has(m.description)) bad.push(`${key}: duplicate description`); seenD.add(m.description);
}
if (bad.length) { console.error("✖ SEO metadata problems:\n" + bad.join("\n")); process.exit(1); }
console.log(`✓ ${datasets.reduce((count, [, seo]) => count + Object.keys(seo).length, 0)} English and Gujarati metadata entries have unique, well-sized titles and descriptions.`);
