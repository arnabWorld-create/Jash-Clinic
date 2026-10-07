import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site, baseUrl, type Locale } from "@/config/site";
import { t, href } from "@/lib/i18n";
import { YEARLY } from "@/lib/years";
import { PUBLISHED } from "@/lib/content";
import { article, graph } from "@/lib/schema";
import Breadcrumb from "@/components/Breadcrumb";
import Sec from "@/components/Sec";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import BookBar from "@/components/BookBar";
export const revalidate = 31536000; // yearly; must be a literal for Next.js
export const dynamicParams = false;
type P = { params: Promise<{ locale: Locale; slug: string }> };
export const generateStaticParams = () => site.locales.flatMap((locale) => PUBLISHED.map((a) => ({ locale, slug: a.slug })));
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params, a = PUBLISHED.find((x) => x.slug === slug);
  if (!a) return {};
  const url = baseUrl + href(locale, `/health-guide/${slug}`);
  const title = `${a.title} | Jash Hospital`.slice(0, 60);
  const description = a.intro.slice(0, 155);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: locale === "gu" ? { index: false } : undefined,
    openGraph: { title, description, url, siteName: site.name, locale: locale === "gu" ? "gu_IN" : "en_IN", type: "article", images: [{ url: `${baseUrl}/og.png`, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description },
  };
}
export default async function Article({ params }: P) {
  const { locale, slug } = await params, d = t(locale), a = PUBLISHED.find((x) => x.slug === slug);
  if (!a) notFound();
  const H = (h: string, p: string) => <><h2 className="d" style={{ fontSize: "1.9rem", marginTop: 36 }}>{h}</h2><p style={{ marginTop: 8, fontSize: 18 }}>{p}</p></>;
  const updated = a.publishedAt;
  return (
    <main id="main" lang={locale === "gu" ? "en" : locale}>
      <JsonLd data={graph(article({ title: a.title, published: a.publishedAt, updated: a.publishedAt, reviewed: true }))} />
      <Breadcrumb items={[["Home", href(locale, "/")], [d.nav.guide, href(locale, "/health-guide")], [a.title, href(locale, `/health-guide/${slug}`)]]} />
      <Sec><p className="eb">Health Guide</p><h1 className="d">{a.title}</h1>
        <p className="lead">Written by the clinic team · Last updated {updated} · <span className="tag">Medically reviewed by {site.doctor}</span></p>
        <div style={{ maxWidth: "44rem" }}><p style={{ marginTop: 28, fontSize: 19 }}>{a.intro}</p>{H("Symptoms", a.symptoms)}{H("When to see a doctor", a.see)}{H("Treatment options", a.treatment)}{H("Recovery", a.recovery)}{H("Red flags", a.red)}
          <h2 className="d" style={{ fontSize: "1.9rem", marginTop: 36 }}>Questions patients ask</h2><FaqList items={a.faq} />
          <p className="note">This article gives general information and is not a substitute for medical advice. Outcomes vary and there is no guarantee of any particular result.</p></div></Sec>
      <BookBar locale={locale} a={d.home.ctaA} b={d.home.ctaB} label={d.cta.book} />
    </main>
  );
}
