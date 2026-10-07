import type { MetadataRoute } from "next";
import { baseUrl } from "@/config/site";
const ai = ["GPTBot", "PerplexityBot", "Google-Extended", "ClaudeBot"];
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/" }, ...ai.map((userAgent) => ({ userAgent, allow: "/" }))], sitemap: `${baseUrl}/sitemap.xml` };
}
