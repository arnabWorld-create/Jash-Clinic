import type { Metadata } from "next";
import type { Locale } from "@/config/site";
import { site } from "@/config/site";
import { t, href } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { YEARLY } from "@/lib/years";
import Breadcrumb from "@/components/Breadcrumb";
import Sec from "@/components/Sec";
import Cta from "@/components/Cta";
import ContactBlock from "@/components/ContactBlock";
import ContactForm from "@/components/ContactForm";
export const revalidate = 31536000; // yearly; must be a literal for Next.js
type P = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { return pageMeta("contact", "/contact", (await params).locale); }
export default async function Contact({ params }: P) {
  const { locale } = await params, d = t(locale);
  return (
    <main id="main" lang={locale === "gu" ? "en" : locale}>
      <Breadcrumb items={[["Home", href(locale, "/")], [d.nav.contact, href(locale, "/contact")]]} />
      <Sec><p className="eb">Contact &amp; appointment</p><h1 className="d">Book a visit</h1><Cta d={d} />
        <div className="two" style={{ marginTop: 40, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <ContactBlock />
            <ContactForm privacyHref={href(locale, "/privacy")} />
          </div>
          <div style={{ position: "sticky", top: 80, display: "flex", flexDirection: "column", gap: 12 }}>
            <iframe
              src={site.mapsEmbed}
              width="100%"
              height="420"
              style={{ border: 0, borderRadius: 20, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Jash Fracture & Orthopaedic Hospital on Google Maps"
            />
            <a href={site.mapsUrl} target="_blank" rel="noopener" className="btn b2" style={{ justifyContent: "center", minHeight: 48, fontSize: 15 }}>Open in Google Maps ↗</a>
          </div>
        </div></Sec>
    </main>
  );
}
