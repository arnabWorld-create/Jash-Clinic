import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Locale } from "@/config/site";
import { t, href } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { YEARLY } from "@/lib/years";
import { facilities } from "@/config/facilities";
import Breadcrumb from "@/components/Breadcrumb";
import Sec from "@/components/Sec";
import BookBar from "@/components/BookBar";
export const revalidate = 31536000; // yearly; must be a literal for Next.js
type P = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { return pageMeta("facilities", "/facilities", (await params).locale); }
export default async function Facilities({ params }: P) {
  const { locale } = await params, d = t(locale);
  if (!facilities.length) notFound(); // hidden until at least one confirmed facility exists
  return (
    <main id="main" lang={locale === "gu" ? "en" : locale}>
      <Breadcrumb items={[["Home", href(locale, "/")], [d.nav.facilities, href(locale, "/facilities")]]} />
      <Sec><p className="eb">Facilities</p><h1 className="d">Our facilities</h1><p className="lead">A look around the hospital in Ahmedabad.</p>
        <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", marginTop: 40 }}>{facilities.map((f) => <figure key={f.name} style={{ margin: 0 }}><div style={{ aspectRatio: "3/2", overflow: "hidden", borderRadius: 20, position: "relative" }}><Image src={f.img} alt={f.alt} placeholder="blur" fill sizes="(min-width:768px) 45vw, 90vw" style={{ objectFit: "cover" }} /></div><figcaption className="d" style={{ fontSize: "1.6rem", marginTop: 12 }}>{f.name}</figcaption></figure>)}</div></Sec>
      <BookBar locale={locale} a={d.home.ctaA} b={d.home.ctaB} label={d.cta.book} />
    </main>
  );
}
