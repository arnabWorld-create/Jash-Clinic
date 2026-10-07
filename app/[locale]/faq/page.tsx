import type { Metadata } from "next";
import type { Locale } from "@/config/site";
import { t, href } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { YEARLY } from "@/lib/years";
import { GENERAL_FAQ } from "@/lib/content";
import Breadcrumb from "@/components/Breadcrumb";
import Sec from "@/components/Sec";
import FaqList from "@/components/FaqList";
import BookBar from "@/components/BookBar";
export const revalidate = 31536000; // yearly; must be a literal for Next.js
type P = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { return pageMeta("faq", "/faq", (await params).locale); }
export default async function Faq({ params }: P) {
  const { locale } = await params, d = t(locale);
  return (
    <main id="main" lang={locale === "gu" ? "en" : locale}>
      <Breadcrumb items={[["Home", href(locale, "/")], [d.nav.faq, href(locale, "/faq")]]} />
      <Sec><p className="eb">FAQ</p><h1 className="d">Questions patients ask</h1><div style={{ marginTop: 32 }}><FaqList items={GENERAL_FAQ} /></div></Sec>
      <BookBar locale={locale} a={d.home.ctaA} b={d.home.ctaB} label={d.cta.book} />
    </main>
  );
}
