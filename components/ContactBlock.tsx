import { site } from "@/config/site";
import { addressLine } from "@/lib/links";
export default function ContactBlock() {
  return (
    <div className="card" style={{ marginTop: 0 }}>
      <p><b>Address</b><br />{addressLine}</p>
      <p style={{ marginTop: 12 }}><b>Phone</b><br /><a href={`tel:${site.phone}`}>{site.phoneDisplay}</a></p>
      <p style={{ marginTop: 12 }}><b>WhatsApp</b><br /><a href={`https://wa.me/${site.whatsapp}`}>{site.whatsapp.slice(2)}</a></p>
      <p style={{ marginTop: 12 }}><b>Email</b><br /><a href={`mailto:${site.email}`}>{site.email}</a></p>
      <p style={{ marginTop: 12 }}><b>OPD</b><br />{site.opd}</p>
    </div>
  );
}
