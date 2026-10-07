import type { Metadata } from "next";
import type { Locale } from "@/config/site";
import { t, href } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { YEARLY } from "@/lib/years";
import Breadcrumb from "@/components/Breadcrumb";
import Sec from "@/components/Sec";
export const revalidate = 31536000; // yearly; must be a literal for Next.js
type P = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { return pageMeta("terms", "/terms", (await params).locale); }
const items: [string, string][] = [["General information only","This website gives general health information. It is not medical advice and does not replace an examination by a doctor."],["No doctor-patient relationship online","Reading this site or sending a form does not create a doctor-patient relationship. That begins only when you are examined."],["Emergencies","This site is not for emergencies. For severe injury, go to the nearest hospital emergency department."],["Results vary","Outcomes differ from patient to patient. There is no guarantee of any particular result."],["Accuracy and links","We try to keep information accurate and up to date but cannot promise it is complete. We are not responsible for external websites."]];
export default async function Page({ params }: P) {
  const { locale } = await params;
  return (
    <main id="main" lang={locale === "gu" ? "en" : locale}>
      <Breadcrumb items={[["Home", href(locale, "/")], ["Terms and Medical Disclaimer", href(locale, "/terms")]]} />
      <Sec><p className="eb">Legal</p><h1 className="d">Terms and Medical Disclaimer</h1>{items.map(([h, p]) => <div key={h}><h2 className="d" style={{ fontSize: "1.8rem", marginTop: 32 }}>{h}</h2><p style={{ color: "var(--ink2)", maxWidth: "42rem", marginTop: 8 }}>{p}</p></div>)}</Sec>
    </main>
  );
}
