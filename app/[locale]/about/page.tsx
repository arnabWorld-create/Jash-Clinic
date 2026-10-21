import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { site, CONFIRM, type Locale } from "@/config/site";
import { t, href } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { YEARLY } from "@/lib/years";
import { facilities } from "@/config/facilities";
import { certs } from "@/config/certs";
import Breadcrumb from "@/components/Breadcrumb";
import Sec from "@/components/Sec";
import ServiceList from "@/components/ServiceList";
import ContactBlock from "@/components/ContactBlock";
import CertGallery from "@/components/CertGallery";
import { default as Cta } from "@/components/Cta";
export const revalidate = 31536000; // yearly; must be a literal for Next.js
type P = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { return pageMeta("about", "/about", (await params).locale); }
const reg = site.registration.number !== CONFIRM && site.registration.council !== CONFIRM ? `${site.registration.number} · ${site.registration.council}` : "";
const timeline = [["1988", "MS Orthopaedics", "MBBS and MS in Orthopaedics from V.S. Hospital, Ahmedabad."], ["1988 to 1992", "Training under Late Dr. K.M. Shah", "Four years of hands-on training and work in orthopaedics."], ["1992", "The hospital opens", "Dr. Shah founds Jash Fracture & Orthopaedic Hospital in Ahmedabad."], ["Today", "Practising in Ahmedabad", "Fractures, joints, spine and sports injuries, and children's bone care."]];
const steps = [["Listening first", "Your history and the difficulties you face every day come before any test."], ["Examination, and tests only when needed", "X-rays or scans are advised when they will help decide the treatment."], ["Plain-language explanation", "You and your family understand the problem and the choices."], ["Options, not pressure", "Non-surgical and surgical choices are discussed where they apply."], ["A plan for recovery", "Clear advice on rest, exercise, physiotherapy and follow-up."]];
export default async function About({ params }: P) {
  const { locale } = await params, d = t(locale);
  const shown = certs.filter((c) => c.show);
  return (
    <main id="main" lang={locale === "gu" ? "en" : locale}>
      <Breadcrumb items={[["Home", href(locale, "/")], [d.nav.about, href(locale, "/about")]]} />
      <Sec><div className="two"><div><p className="eb">About</p><h1 className="d">Dr. Piyush Shah</h1><p className="lead">MBBS, MS (Orthopaedics). In clinical practice since 1988; founder of Jash Fracture &amp; Orthopaedic Hospital, Ahmedabad.</p><Cta d={d} urgent={false} />{reg && <p className="lead" style={{ marginTop: 12 }}>Medical registration: {reg}</p>}</div>
        <div className="pw" style={{ aspectRatio: "4/5", borderRadius: 24 }}><Image src="/Doctor.png" alt="Dr. Piyush Shah, orthopaedic surgeon, in his consultation room" width={1086} height={1448} sizes="(min-width:768px) 40vw, 90vw" style={{ objectPosition: "50% 30%" }} /></div></div></Sec>
      <Sec><div className="two" style={{ alignItems: "start" }}><h2 className="d">The story so far</h2><div style={{ fontSize: 19, color: "var(--ink2)", display: "grid", gap: 18 }}>
        <p>Dr. Piyush Shah is an orthopaedic surgeon in Ahmedabad. He completed his MBBS and then his MS in Orthopaedics at V.S. Hospital, finishing in 1988.</p>
        <p>He spent the next four years, from 1988 to 1992, training and working under Late Dr. K.M. Shah.</p>
        <p>In 1992 he founded Jash Fracture &amp; Orthopaedic Hospital on Satellite Road, Ahmedabad, where he continues to see patients with bone, joint and spine problems.</p>
        <p>Patients come to him for fractures and injuries, joint pain, back and spine problems, sports injuries and children's bone conditions. If you are not sure whether your problem needs an orthopaedic doctor, a first consultation is a good place to start.</p></div></div></Sec>
      <Sec><h2 className="d">Education and training</h2>{timeline.map(([y, h, p]) => <div className="stp" key={y}><div className="d" style={{ fontSize: "clamp(2.4rem,8vw,5.5rem)" }}><span className="mark">{y}</span></div><div><h3 className="d">{h}</h3><p style={{ color: "var(--ink2)", marginTop: 8 }}>{p}</p></div></div>)}</Sec>
      {shown.length > 0 && <Sec><h2 className="d">Training and conferences</h2><p className="lead">Certificates from orthopaedic programmes Dr. Shah has attended. They show continuing education, not rankings.</p><CertGallery items={shown} /></Sec>}
      <Sec><div className="two" style={{ alignItems: "start" }}><div><h2 className="d">How a visit works</h2><p className="lead">What you can expect when you see Dr. Shah.</p></div>
        <ol style={{ listStyle: "none", padding: 0, display: "grid", gap: 22 }}>{steps.map(([h, p], i) => <li key={h} style={{ display: "flex", gap: 18 }}><span className="d" style={{ fontSize: "2.2rem", minWidth: 44 }}>0{i + 1}</span><span><b style={{ fontSize: 19 }}>{h}</b><br /><span style={{ color: "var(--ink2)" }}>{p}</span></span></li>)}</ol></div></Sec>
      <Sec><h2 className="d">Areas of care</h2><ServiceList locale={locale} names={d.services} /></Sec>
      {facilities.length > 4 && <Sec><h2 className="d">The hospital</h2><div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", marginTop: 28 }}>{[3, 4, 2].map((i) => <div key={i} style={{ aspectRatio: "4/3", overflow: "hidden", borderRadius: 20, position: "relative" }}><Image src={facilities[i].img} alt={facilities[i].alt} placeholder="blur" fill sizes="(min-width:768px) 30vw, 90vw" style={{ objectFit: "cover" }} /></div>)}</div><p style={{ marginTop: 20 }}><Link href={href(locale, "/facilities")} style={{ fontWeight: 600 }}>See all facilities →</Link></p></Sec>}
      <Sec><h2 className="d">Meet Dr. Shah</h2><p className="lead">Message us on WhatsApp, call, or visit the clinic.</p><ContactBlock /><Cta d={d} urgent={false} /></Sec>
    </main>
  );
}
