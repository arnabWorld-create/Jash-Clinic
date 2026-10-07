import Link from "next/link";
import { site } from "@/config/site";
import { href } from "@/lib/i18n";
import { telHref, waHref } from "@/lib/links";
import type { Locale } from "@/config/site";
export default function MobileBar({ locale, d }: { locale: Locale; d: { cta: { callShort: string; urgentShort: string; bookShort: string } } }) {
  return (
    <nav className="bn" id="bn" aria-label="Quick contact">
      <a href={telHref}>{d.cta.callShort}</a>
      <a href={waHref()} target="_blank" rel="noopener">WhatsApp</a>
      <a className="e" href={site.emergency24x7 ? `tel:${site.emergency}` : telHref}>{d.cta.urgentShort}</a>
      <Link className="k" href={href(locale, "/contact")}>{d.cta.bookShort}</Link>
    </nav>
  );
}
