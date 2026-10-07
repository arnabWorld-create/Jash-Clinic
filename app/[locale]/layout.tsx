import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Bricolage_Grotesque, Figtree, Noto_Sans_Gujarati } from "next/font/google";
import { site, baseUrl, type Locale } from "@/config/site";
import { facilities } from "@/config/facilities";
import { graph, hospital, physician, website } from "@/lib/schema";
import { href, t } from "@/lib/i18n";
import { PUBLISHED } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import Motion from "@/components/Motion";
import JsonLd from "@/components/JsonLd";
import "../globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--f-display", axes: ["opsz", "wdth"], display: "swap" });
const text = Figtree({ subsets: ["latin"], variable: "--f-text", display: "swap" });
const gu = Noto_Sans_Gujarati({ subsets: ["gujarati"], variable: "--f-gu", display: "swap" });

export const generateStaticParams = () => site.locales.map((locale) => ({ locale }));
export const metadata: Metadata = { metadataBase: new URL(baseUrl), openGraph: { siteName: site.name, type: "website" }, icons: { icon: "/icon.png", apple: "/apple-icon.png" } };

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!site.locales.includes(locale as Locale)) notFound();
  const l = locale as Locale, d = t(l);
  const nav = [["about", "/about"], ["services", "/services"], ["why", "/why"], ...(facilities.length ? [["facilities", "/facilities"]] : []), ...(PUBLISHED.length ? [["guide", "/health-guide"]] : []), ["faq", "/faq"], ["contact", "/contact"]]
    .map(([key, p]) => ({ key, href: href(l, p), label: (d.nav as Record<string, string>)[key] }));
  return (
    <html lang={locale} className={`${display.variable} ${text.variable} ${gu.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <JsonLd data={graph(website(), hospital(), physician())} />
        <Header locale={l} nav={nav} book={{ href: href(l, "/contact"), label: d.cta.book }} />
        {children}
        <Footer locale={l} disclaimer={d.disclaimer} showGuide={PUBLISHED.length > 0} />
        <MobileBar locale={l} d={d} />
        <Motion />
      </body>
    </html>
  );
}
