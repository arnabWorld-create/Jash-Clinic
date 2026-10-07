import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site, baseUrl, type Locale } from "@/config/site";
import { t, href } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { YEARLY } from "@/lib/years";
import { SERVICES, SHARED_FAQ } from "@/lib/content";
import { faq, graph, medicalPage, procedure } from "@/lib/schema";
import seo from "@/config/seo.json";
import Breadcrumb from "@/components/Breadcrumb";
import Sec from "@/components/Sec";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import ServiceList from "@/components/ServiceList";
import BookBar from "@/components/BookBar";
import { Urgent } from "@/components/Cta";
export const revalidate = 31536000; // yearly; must be a literal for Next.js
export const dynamicParams = false;
type P = { params: Promise<{ locale: Locale; slug: string }> };
export const generateStaticParams = () => site.locales.flatMap((locale) => SERVICES.map((s) => ({ locale, slug: s.slug })));
export async function generateMetadata({ params }: P): Promise<Metadata> { const { locale, slug } = await params; return pageMeta(slug as keyof typeof seo, `/services/${slug}`, locale); }
export default async function Service({ params }: P) {
  const { locale, slug } = await params, d = t(locale), s = SERVICES.find((x) => x.slug === slug);
  if (!s) notFound();
  const name = d.services?.[s.slug] ?? s.name, qa = [...s.faq, ...SHARED_FAQ].map(([q, a]) => ({ q, a }));
  const path = href(locale, `/services/${s.slug}`);
  const related = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 3).map((x) => x.slug);
  return (
    <main id="main" lang={locale === "gu" ? "en" : locale}>
      <JsonLd data={graph(procedure(s.name, s.answer), medicalPage({ name: s.name, url: baseUrl + path, reviewed: false }), faq(qa))} />
      <Breadcrumb items={[["Home", href(locale, "/")], [d.nav.services, href(locale, "/services")], [name, path]]} />
      <Sec>
        <p className="eb">Service</p>
        <h1 className="d">{name} in Ahmedabad</h1>
        <div className="ans box d" style={{ fontSize: "clamp(1.2rem,2.4vw,1.7rem)", lineHeight: 1.35, letterSpacing: "-.01em", fontWeight: 600 }}><span style={{ fontFamily: "var(--f-text)" }}>{s.answer}</span></div>
        <p className="lead">{s.detail}</p>
        <div className="btns"><Link className="btn b1" href={href(locale, "/contact")}>{d.cta.book}</Link><Urgent d={d} /></div>
      </Sec>
      <Sec><h2 className="d">Questions patients ask</h2><div style={{ marginTop: 24 }}><FaqList items={qa.map((x) => [x.q, x.a])} schema={false} /></div><p className="note">General information only. It is not medical advice.</p></Sec>
      <Sec><h3 className="d">Related care</h3><ServiceList locale={locale} names={d.services} only={related} /></Sec>
      <BookBar locale={locale} a={d.home.ctaA} b={d.home.ctaB} label={d.cta.book} />
    </main>
  );
}
