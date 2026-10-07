import Link from "next/link";
import Sec from "@/components/Sec";
import { href } from "@/lib/i18n";
import type { Locale } from "@/config/site";
export default function BookBar({ locale, a, b, label }: { locale: Locale; a: string; b: string; label: string }) {
  return <Sec><h2 className="d">{a} <span className="mark">{b}</span></h2><div className="btns"><Link className="btn b1" href={href(locale, "/contact")}>{label}</Link></div></Sec>;
}
