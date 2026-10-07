"use server";
import { headers } from "next/headers";
import { site } from "@/config/site";

const hits = new Map<string, number[]>(); // per-instance rate limit; use Redis/Upstash if you scale beyond one instance
type In = { name: string; phone: string; issue: string; time: string; consent: boolean; website?: string };
export async function submitAppointment(i: In): Promise<{ ok: boolean; wa?: string; error?: string }> {
  if (i.website) return { ok: true, wa: "" }; // honeypot filled: a bot. Pretend success.
  const name = (i.name || "").trim().slice(0, 80), phone = (i.phone || "").replace(/[^\d+\s-]/g, "").slice(0, 20), issue = (i.issue || "").trim().slice(0, 500);
  if (!i.consent || name.length < 2 || phone.replace(/\D/g, "").length < 8) return { ok: false, error: "Please enter your name, a valid phone number and tick the consent box." };
  const ip = ((await headers()).get("x-forwarded-for") || "unknown").split(",")[0].trim();
  const now = Date.now(), recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 5) return { ok: false, error: "Too many requests. Please call us instead." };
  hits.set(ip, [...recent, now]);
  const text = `Appointment request\nName: ${name}\nPhone: ${phone}\nProblem: ${issue || "-"}\nPreferred time: ${i.time}`;
  // Optional email (set RESEND_API_KEY, EMAIL_FROM in the host's env). Failure never blocks the WhatsApp path.
  if (process.env.RESEND_API_KEY && process.env.EMAIL_FROM) {
    try { await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.EMAIL_FROM, to: [site.email], subject: "New appointment request", text }) }); } catch {}
  }
  return { ok: true, wa: `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}` };
}
