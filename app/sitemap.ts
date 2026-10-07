import type { MetadataRoute } from "next";
import { baseUrl } from "@/config/site";
import { facilities } from "@/config/facilities";
import { href, GU_PAGES } from "@/lib/i18n";
import { PUBLISHED } from "@/lib/content";

const services = ["fracture-trauma-care","joint-replacement","arthroscopy-sports-injuries","spine-back-pain","paediatric-orthopaedics","physiotherapy-rehab"];

// Stable last-modified dates. Update these when the corresponding page content changes.
const PAGE_DATES: Record<string, string> = {
  "/": "2025-04-01",
  "/about": "2025-04-01",
  "/services": "2025-04-01",
  "/fracture-trauma-care": "2025-04-01",
  "/joint-replacement": "2025-04-01",
  "/arthroscopy-sports-injuries": "2025-04-01",
  "/spine-back-pain": "2025-04-01",
  "/paediatric-orthopaedics": "2025-04-01",
  "/physiotherapy-rehab": "2025-04-01",
  "/why": "2025-04-01",
  "/facilities": "2025-04-01",
  "/health-guide": "2025-04-01",
  "/faq": "2025-04-01",
  "/contact": "2025-04-01",
  "/privacy": "2025-04-01",
  "/terms": "2025-04-01",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const arts = PUBLISHED;
  // Build a lookup of article slug → publishedAt for stable dates
  const artDates = Object.fromEntries(arts.map((a) => [a.slug, a.publishedAt]));

  const paths = ["/", "/about", "/services", ...services.map((s) => `/services/${s}`), "/why", ...(facilities.length ? ["/facilities"] : []), ...(arts.length ? ["/health-guide", ...arts.map((a) => `/health-guide/${a.slug}`)] : []), "/faq", "/contact", "/privacy", "/terms"];

  return paths.flatMap((p) => (GU_PAGES.includes(p) ? [p, href("gu", p)] : [p])).map((p) => {
    const canonical = p.replace(/^\/gu/, "") || "/";
    // Derive the slug for article paths, else fall back to PAGE_DATES
    const articleSlug = canonical.startsWith("/health-guide/") ? canonical.replace("/health-guide/", "") : null;
    const lastModified = articleSlug ? (artDates[articleSlug] ?? "2025-04-01") : (PAGE_DATES[canonical] ?? "2025-04-01");
    return {
      url: baseUrl + p,
      lastModified,
      changeFrequency: p === "/" || p === "/gu" ? "weekly" as const : "monthly" as const,
      priority: p === "/" ? 1 : p.startsWith("/services") ? 0.9 : 0.7,
      ...(GU_PAGES.includes(canonical) ? { alternates: { languages: { en: baseUrl + canonical, gu: baseUrl + href("gu", canonical) } } } : {}),
    };
  });
}
