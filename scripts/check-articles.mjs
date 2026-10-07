// Blocks production when a published article is not doctor-reviewed. Set ALLOW_DRAFTS=1 to bypass for local work.
import { readdirSync, readFileSync } from "node:fs";
import matter from "gray-matter";
const dir = "content/guide", bad = [];
for (const f of readdirSync(dir).filter((x) => x.endsWith(".mdx"))) {
  const { data } = matter(readFileSync(`${dir}/${f}`, "utf8"));
  if (data.published && data.reviewed !== true) bad.push(f);
}
if (bad.length && !process.env.ALLOW_DRAFTS) { console.error(`✖ Published but unreviewed articles:\n${bad.join("\n")}`); process.exit(1); }
console.log("✓ All published articles are doctor-reviewed.");
