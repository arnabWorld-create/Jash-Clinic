import type { Metadata } from "next";
import seo from "@/config/seo.json";
import { site, baseUrl, type Locale } from "@/config/site";
import { href, GU_PAGES } from "@/lib/i18n";
type Key = keyof typeof seo;
// One call per page: unique title/description, canonical, hreflang (en/gu/x-default), OpenGraph, Twitter.
export function pageMeta(key: Key, path: string, locale: Locale = "en"): Metadata {
  const m = seo[key];
  const url = baseUrl + href(locale, path);
  const gu = GU_PAGES.includes(path);
  return {
    title: { absolute: m.title }, description: m.description,
    alternates: { canonical: url, ...(gu ? { languages: { en: baseUrl + path, gu: baseUrl + href("gu", path), "x-default": baseUrl + path } } : {}) },
    openGraph: { title: m.title, description: m.description, url, siteName: site.name, locale: locale === "gu" ? "gu_IN" : "en_IN", type: "website", images: [{ url: `${baseUrl}/og.png`, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: m.title, description: m.description },
    robots: locale === "gu" && !gu ? { index: false, follow: true } : undefined,
  };
}
