// Fails the build when banned claim words appear in public copy.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";
const DIRS = ["app", "components", "content", "dictionaries", "config"], EXT = new Set([".ts", ".tsx", ".mdx", ".md", ".json"]);
const BAN = /testimonial|patient review|\bguarantee[sd]?\b|100%|best doctor|\bno\.\s?1\b|\bcures?\b/i;
const ALLOW = /no guarantee/i; // the disclaimer line only
const hits = [];
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) { if (f !== "node_modules") walk(p); } else if (EXT.has(extname(p))) scan(p); } };
const scan = (p) => readFileSync(p, "utf8").split("\n").forEach((l, i) => {
  const copy = l
    .replace(/\b(?:maxWidth|width|height)\s*=\s*["'][^"']*["']/g, "")
    .replace(/\b(?:maxWidth|width|height|sizes)\s*:\s*["'][^"']*["']/g, "")
    .replace(/\bsizes\s*=\s*["'][^"']*["']/g, "");
  if (BAN.test(copy) && !ALLOW.test(copy)) hits.push(`${p}:${i + 1}: ${l.trim().slice(0, 90)}`);
});
DIRS.forEach((d) => { try { walk(d); } catch {} });
if (hits.length) { console.error("✖ Banned words in public copy:\n" + hits.join("\n")); process.exit(1); }
console.log("✓ Copy lint passed.");
