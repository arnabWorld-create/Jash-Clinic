import Link from "next/link";
import Image from "next/image";
import { site } from "@/config/site";
import { href } from "@/lib/i18n";
import { addressLine } from "@/lib/links";
import type { Locale } from "@/config/site";
export default function Footer({ locale, disclaimer, showGuide }: { locale: Locale; disclaimer: string; showGuide: boolean }) {
  const L = (p: string, t: string) => <Link key={p} href={href(locale, p)}>{t}</Link>;
  const links = [L("/services", "Services"), ...(showGuide ? [L("/health-guide", "Health Guide")] : []), L("/faq", "FAQ"), L("/contact", "Contact"), L("/privacy", "Privacy Policy"), L("/terms", "Terms and Medical Disclaimer")];
  return (
    <footer className="ft"><div className="w">
      <div className="brand" style={{ marginBottom: 4 }}>
        <span style={{ background: "var(--paper)", borderRadius: 14, padding: "6px 8px", display: "grid", placeItems: "center" }}><Image src="/New%20Logo.png" alt="Jash Fracture & Orthopaedic Hospital logo" width={52} height={52} style={{ width: 52, height: 52, objectFit: "contain" }} /></span>
        <span className="bt"><b className="d" style={{ fontSize: "2rem" }}>Jash</b><small>Fracture &amp; Orthopaedic Hospital</small></span>
      </div>
      <address style={{ marginTop: 12, fontStyle: "normal" }}>{addressLine}<br />Phone: <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a> · WhatsApp: <a href={`https://wa.me/${site.whatsapp}`}>{site.whatsapp.slice(2)}</a> · <a href={`mailto:${site.email}`}>{site.email}</a><br />OPD: {site.opd}<br />Since {site.FOUNDED}</address>
      <p style={{ marginTop: 12 }}>{links.map((l, i) => <span key={i}>{i > 0 && " · "}{l}</span>)}</p>
      <p style={{ marginTop: 12 }}><a href={site.mapsUrl} target="_blank" rel="noopener">Find us on Google Maps</a></p>
      <small>{disclaimer}</small>
    </div></footer>
  );
}
