import type { Metadata } from "next";
import type { Locale } from "@/config/site";
import { t, href } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { YEARLY } from "@/lib/years";
import Breadcrumb from "@/components/Breadcrumb";
import Sec from "@/components/Sec";
import ServiceList from "@/components/ServiceList";
import BookBar from "@/components/BookBar";
export const revalidate = 31536000; // yearly; must be a literal for Next.js
type P = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { return pageMeta("services", "/services", (await params).locale); }
export default async function Services({ params }: P) {
  const { locale } = await params, d = t(locale);
  return (
    <main id="main" lang={locale}>
      <Breadcrumb items={[["Home", href(locale, "/")], [d.nav.services, href(locale, "/services")]]} />
      <Sec><p className="eb">{d.nav.services}</p><h1 className="d">Orthopaedic care in Ahmedabad</h1><p className="lead">Fracture, joint, spine, sports and children's bone care.</p><ServiceList locale={locale} names={d.services} /></Sec>
      <BookBar locale={locale} a={d.home.ctaA} b={d.home.ctaB} label={d.cta.book} />
    </main>
  );
}
