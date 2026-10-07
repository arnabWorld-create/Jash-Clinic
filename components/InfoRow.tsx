import { site } from "@/config/site";
import { addressLine } from "@/lib/links";
export default function InfoRow({ d }: { d: { info: { address: string; opd: string; maps: string } } }) {
  return (
    <div className="info">
      <span><b>{d.info.address}:</b> {addressLine}</span>
      <span><b>{d.info.opd}:</b> {site.opd}</span>
      <a href={site.mapsUrl} target="_blank" rel="noopener">{d.info.maps}</a>
    </div>
  );
}
