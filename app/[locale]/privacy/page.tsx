import type { Metadata } from "next";
import type { Locale } from "@/config/site";
import { t, href } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { YEARLY } from "@/lib/years";
import Breadcrumb from "@/components/Breadcrumb";
import Sec from "@/components/Sec";
export const revalidate = 31536000; // yearly; must be a literal for Next.js
type P = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { return pageMeta("privacy", "/privacy", (await params).locale); }
const items: [string, string][] = [["What we collect","When you use the appointment form we collect your name, phone number and a short description of your problem. We do not ask for medical records through this website."],["Why we collect it","Only to contact you and arrange your appointment."],["How it is shared","Your details are sent to the clinic through WhatsApp or email. We do not sell your data or use it for advertising."]];
export default async function Page({ params }: P) {
  const { locale } = await params;
  return (
    <main id="main" lang={locale === "gu" ? "en" : locale}>
      <Breadcrumb items={[["Home", href(locale, "/")], ["Privacy Policy", href(locale, "/privacy")]]} />
      <Sec><p className="eb">Legal</p><h1 className="d">Privacy Policy</h1>{items.map(([h, p]) => <div key={h}><h2 className="d" style={{ fontSize: "1.8rem", marginTop: 32 }}>{h}</h2><p style={{ color: "var(--ink2)", maxWidth: "42rem", marginTop: 8 }}>{p}</p></div>)}</Sec>
    </main>
  );
}
