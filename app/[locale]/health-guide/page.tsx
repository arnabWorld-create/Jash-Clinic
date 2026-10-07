import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/config/site";
import { t, href } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { YEARLY } from "@/lib/years";
import { PUBLISHED } from "@/lib/content";
import Breadcrumb from "@/components/Breadcrumb";
import Sec from "@/components/Sec";
import BookBar from "@/components/BookBar";
export const revalidate = 31536000; // yearly; must be a literal for Next.js
type P = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { return pageMeta("guide", "/health-guide", (await params).locale); }
export default async function Guide({ params }: P) {
  const { locale } = await params, d = t(locale);
  if (!PUBLISHED.length) notFound(); // only doctor-reviewed articles are published
  return (
    <main id="main" lang={locale === "gu" ? "en" : locale}>
      <Breadcrumb items={[["Home", href(locale, "/")], [d.nav.guide, href(locale, "/health-guide")]]} />
      <Sec><p className="eb">Health Guide</p><h1 className="d">Plain-language bone and joint advice</h1><ul className="sl">{PUBLISHED.map((a, i) => <li key={a.slug}><Link href={href(locale, `/health-guide/${a.slug}`)}><span className="n">0{i + 1}</span><span className="t d">{a.title}</span><span aria-hidden="true">→</span></Link></li>)}</ul></Sec>
      <BookBar locale={locale} a={d.home.ctaA} b={d.home.ctaB} label={d.cta.book} />
    </main>
  );
}
