"use client";
import { useState } from "react";
import Link from "next/link";
import { submitAppointment } from "@/app/actions";
export default function ContactForm({ privacyHref }: { privacyHref: string }) {
  const [state, setState] = useState<{ ok?: boolean; msg?: string }>({});
  const [busy, setBusy] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget), form = e.currentTarget;
    setBusy(true);
    try {
      const r = await submitAppointment({ name: String(f.get("n")), phone: String(f.get("p")), issue: String(f.get("i")), time: String(f.get("t")), consent: f.get("c") === "on", website: String(f.get("website") || "") });
      if (r.ok) { if (r.wa) window.open(r.wa, "_blank", "noopener"); setState({ ok: true, msg: `Thank you, ${String(f.get("n")).slice(0, 40)}. We will contact you to confirm your appointment.` }); form.reset(); }
      else setState({ ok: false, msg: r.error });
    } catch { setState({ ok: false, msg: "Something went wrong. Please call or message us on WhatsApp." }); }
    setBusy(false);
  }
  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: -9999 }} aria-hidden="true" />
      <label>Name<input required name="n" autoComplete="name" /></label>
      <label>Phone<input required name="p" type="tel" autoComplete="tel" /></label>
      <label>What is the problem?<textarea name="i" rows={3} /></label>
      <label>Preferred time<select name="t"><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label>
      <p className="note" style={{ margin: 0 }}>We collect your name, phone number and a short description of the problem to arrange your appointment. This is sent to the clinic through WhatsApp or email. See our <Link href={privacyHref}>Privacy Policy</Link>.</p>
      <label style={{ display: "flex", gap: 12, alignItems: "flex-start", fontWeight: 400 }}><input required type="checkbox" name="c" style={{ width: 28, minHeight: 28, marginTop: 2 }} />I agree to my details being used for this purpose.</label>
      <button className="btn b1" type="submit" disabled={busy}>{busy ? "Sending…" : "Send on WhatsApp"}</button>
      <div role="status" aria-live="polite">{state.msg && <div className={state.ok ? "ok" : "ok"} style={state.ok ? undefined : { background: "var(--lemon)" }}>{state.msg}</div>}</div>
    </form>
  );
}
