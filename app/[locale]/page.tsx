import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { Locale } from "@/config/site";
import { YEARLY } from "@/lib/years";
import { t, href } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import Cta from "@/components/Cta";
import InfoRow from "@/components/InfoRow";
import Sec from "@/components/Sec";
import ServiceList from "@/components/ServiceList";
import BookBar from "@/components/BookBar";
import portrait from "@/assets/dr-shah.jpg";

export const revalidate = 31536000; // yearly; must be a literal for Next.js
type P = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { return pageMeta("home", "/", (await params).locale); }

export default async function Home({ params }: P) {
  const { locale } = await params, d = t(locale), h = d.home;
  return (
    <main id="main" lang={locale}>
      <section className="pad hero w">
        <div>
          <p className="eb">{h.eyebrow}</p>
          <h1 className="d">
            <span className="mask"><span data-line>{h.h1a}</span></span>
            <span className="mask"><span data-line>{h.h1b} <span className="mark">{h.h1c}</span> {h.h1d}</span></span>
          </h1>
          <p className="lead">{h.lead}</p>
          <Cta d={d} />
          <InfoRow d={d} />
        </div>
        <div className="pf">
          <div className="pw" style={{ aspectRatio: "4/5", borderRadius: "999px 999px 0 0" }}>
            <Image src={portrait} alt="Dr. Piyush Shah, orthopaedic surgeon, in a white coat" priority placeholder="blur" sizes="(min-width:768px) 33vw, 90vw" style={{ objectPosition: "50% 30%" }} />
          </div>
          <div className="badge d"><small style={{ fontFamily: "var(--f-text)" }}>{h.practising}</small><b>1988</b></div>
        </div>
      </section>
      <Sec>
        <h2 className="sr-only" style={{ position: "absolute", left: -9999 }}>Dr. Piyush Shah</h2>
        <p className="d ans tg" data-words>{h.answer}</p>
        <div className="btns"><Link className="btn b2" href={href(locale, "/about")}>{h.meet}</Link></div>
      </Sec>
      <section className="j" data-j>
        <div className="jbar"><i data-bar /></div>
        {h.journey.map((s) => (
          <article key={s.y} className="jst pad" data-st><div className="jy d">{s.y}</div><div><h3 className="d">{s.h}</h3><p>{s.p}</p></div></article>
        ))}
      </section>
      <Sec><h2 className="d">{h.treat}</h2><ServiceList locale={locale} names={d.services} /></Sec>
      <section className="stats d">
        <div><b>{h.statsA}</b><span style={{ fontFamily: "var(--f-text)" }}>{h.statsAl}</span></div>
        <div><b>{h.statsB}</b><span style={{ fontFamily: "var(--f-text)" }}>{h.statsBl}</span></div>
      </section>
      <BookBar locale={locale} a={h.ctaA} b={h.ctaB} label={d.cta.book} />
    </main>
  );
}
