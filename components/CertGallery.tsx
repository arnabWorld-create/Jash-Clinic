"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import type { Cert } from "@/config/certs";
export default function CertGallery({ items }: { items: Cert[] }) {
  const [open, setOpen] = useState<Cert | null>(null);
  const from = useRef<HTMLElement | null>(null);
  const close = () => { setOpen(null); from.current?.focus(); };
  return (
    <>
      <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", marginTop: 32 }}>
        {items.map((c) => (
          <figure key={c.title} style={{ margin: 0 }}>
            <button className="zm" style={{ border: 0, padding: 0, background: "none", cursor: "zoom-in", width: "100%" }} aria-label={`Enlarge: ${c.title}`} onClick={(e) => { from.current = e.currentTarget; setOpen(c); }}>
              <Image src={c.img} alt={`Framed certificate: ${c.title}`} placeholder="blur" sizes="(min-width:768px) 40vw, 90vw" style={{ borderRadius: 14, border: "1px solid var(--line)", height: "auto", width: "100%" }} />
            </button>
            <figcaption style={{ marginTop: 10, fontSize: 15 }}><b>{c.title}</b><br /><span style={{ color: "var(--ink2)" }}>{c.by}</span></figcaption>
          </figure>
        ))}
      </div>
      {open && (
        <div className="lb on" role="dialog" aria-modal="true" aria-label="Certificate" onClick={close} onKeyDown={(e) => e.key === "Escape" && close()}>
          <button autoFocus aria-label="Close" onClick={close}>×</button>
          <Image src={open.img} alt={`Framed certificate: ${open.title}`} sizes="100vw" style={{ maxWidth: "100%", maxHeight: "90svh", width: "auto", height: "auto" }} />
        </div>
      )}
    </>
  );
}
