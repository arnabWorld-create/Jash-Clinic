import { site } from "@/config/site";
import { telHref, waHref } from "@/lib/links";
type D = { cta: { whatsapp: string; call: string; urgent: string; severe: string; book: string } };
export function Urgent({ d, cls = "b6" }: { d: D; cls?: string }) {
  return <a className={`btn ${cls}`} href={site.emergency24x7 ? `tel:${site.emergency}` : telHref}>{d.cta.urgent}</a>;
}
export default function Cta({ d, urgent = true }: { d: D; urgent?: boolean }) {
  return (
    <>
      <div className="btns">
        <a className="btn b5" href={waHref()} target="_blank" rel="noopener">{d.cta.whatsapp}</a>
        <a className="btn b2" href={telHref}>{d.cta.call} {site.phoneDisplay}</a>
        {urgent && <Urgent d={d} />}
      </div>
      {urgent && !site.emergency24x7 && <p className="note">{d.cta.severe}</p>}
    </>
  );
}
