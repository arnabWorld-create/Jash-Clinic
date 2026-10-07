import Link from "next/link";
import Icon from "@/components/Icon";
import { SERVICES } from "@/lib/content";
import { href } from "@/lib/i18n";
import type { Locale } from "@/config/site";
export default function ServiceList({ locale, names, only }: { locale: Locale; names?: Record<string, string>; only?: string[] }) {
  const list = only ? SERVICES.filter((s) => only.includes(s.slug)) : SERVICES;
  return (
    <ul className="sl">
      {list.map((s, i) => (
        <li key={s.slug}>
          <Link href={href(locale, `/services/${s.slug}`)}><span className="n">0{i + 1}</span><Icon d={s.icon} /><span className="t d">{names?.[s.slug] ?? s.name}</span><span aria-hidden="true">→</span></Link>
        </li>
      ))}
    </ul>
  );
}
