import type { Metadata } from "next";
import Image from "next/image";
import { site, CONFIRM, type Locale } from "@/config/site";
import { t, href } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { YEARLY } from "@/lib/years";
import { facilities } from "@/config/facilities";
import Breadcrumb from "@/components/Breadcrumb";
import Sec from "@/components/Sec";
import BookBar from "@/components/BookBar";
export const revalidate = 31536000; // yearly; must be a literal for Next.js
type P = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { return pageMeta("why", "/why", (await params).locale); }
const steps = [["Listen and examine", "We hear your history and examine the problem."], ["Investigate only if needed", "X-rays or scans are advised when they will change the treatment."], ["Explain the options", "You get the choices in plain language, including non-surgical ones."], ["Plan and follow up", "A clear plan for treatment, recovery and review."]];
export default async function Why({ params }: P) {
  const { locale } = await params, d = t(locale);
  const reg = site.registration.number !== CONFIRM && site.registration.council !== CONFIRM ? `${site.registration.number} · ${site.registration.council}` : "";
  return (
    <main id="main" lang={locale === "gu" ? "en" : locale}>
      <Breadcrumb items={[["Home", href(locale, "/")], [d.nav.why, href(locale, "/why")]]} />
      <Sec><p className="eb">Why choose us</p><h1 className="d">What to expect when you come to us</h1><p className="lead">Credentials, how a visit works, and what you can check for yourself.</p></Sec>
      <Sec><div className="two" style={{ alignItems: "start" }}><h2 className="d">Credentials and registration</h2><ul style={{ paddingLeft: 20, color: "var(--ink2)" }}><li>MBBS, MS (Orthopaedics), 1988, V.S. Hospital, Ahmedabad</li>{reg && <li>Medical registration: {reg}</li>}<li>In clinical practice since 1988; hospital founded 1992</li></ul></div></Sec>
      <Sec><h2 className="d">How a visit works</h2>{steps.map(([h, p], i) => <div className="stp" key={h}><div className="d" style={{ fontSize: "3rem" }}>0{i + 1}</div><div><h3 className="d">{h}</h3><p style={{ color: "var(--ink2)", marginTop: 6 }}>{p}</p></div></div>)}</Sec>
      {facilities.length > 0 && <Sec><h2 className="d">Facilities</h2><div className="two" style={{ marginTop: 32 }}>{facilities.map((f) => <div key={f.name}><div style={{ aspectRatio: "3/2", overflow: "hidden", borderRadius: 20, position: "relative" }}><Image src={f.img} alt={f.alt} placeholder="blur" fill sizes="(min-width:768px) 40vw, 90vw" style={{ objectFit: "cover" }} /></div><h3 className="d" style={{ marginTop: 12 }}>{f.name}</h3></div>)}</div></Sec>}
      <BookBar locale={locale} a={d.home.ctaA} b={d.home.ctaB} label={d.cta.book} />
    </main>
  );
}
