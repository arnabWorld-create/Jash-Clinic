"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo.png";

type Props = { locale: "en" | "gu"; nav: { href: string; label: string; key: string }[]; book: { href: string; label: string } | null };

export default function Header({ locale, nav, book }: Props) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() || "/";
  const hd = useRef<HTMLElement>(null), mn = useRef<HTMLDivElement>(null), opener = useRef<HTMLElement | null>(null);
  const bare = pathname.replace(/^\/gu/, "") || "/";
  const langHref = { en: bare, gu: bare === "/" ? "/gu" : `/gu${bare}` };

  useEffect(() => { setOpen(false); }, [pathname]);

  // hide on scroll down, show on scroll up; never hide while focus is inside the header
  useEffect(() => {
    let ly = 0;
    const on = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (!document.body.classList.contains("mo")) setHidden(y > ly && y > 100 && !hd.current?.matches(":focus-within"));
      ly = y;
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // full-screen menu: scroll lock, inert background, focus trap, Escape, focus restore
  useEffect(() => {
    const bg = ["main", "footer", ".bn", ".hd"].map((s) => document.querySelector<HTMLElement>(s));
    document.body.classList.toggle("mo", open);
    document.documentElement.classList.toggle("lock", open);
    bg.forEach((e) => e && ((e as any).inert = open));
    if (open) {
      mn.current?.querySelector<HTMLElement>("button")?.focus();
      const key = (e: KeyboardEvent) => {
        if (e.key === "Escape") return setOpen(false);
        if (e.key !== "Tab" || !mn.current) return;
        const f = Array.from(mn.current.querySelectorAll<HTMLElement>("a,button"));
        const a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      };
      document.addEventListener("keydown", key);
      return () => document.removeEventListener("keydown", key);
    } else opener.current?.focus();
  }, [open]);

  const links = nav.map((n) => (
    <Link key={n.key} href={n.href} className={bare === n.href.replace(/^\/gu/, "") ? "on" : undefined} aria-current={bare === n.href.replace(/^\/gu/, "") ? "page" : undefined}>{n.label}</Link>
  ));
  const here = locale === "gu" ? "gu" : "en";
  const lang = (
    <>
      <Link href={langHref.en} lang="en" aria-current={here === "en" ? "true" : undefined} className={here === "en" ? "cur" : undefined}>EN</Link>
      <Link href={langHref.gu} lang="gu" aria-current={here === "gu" ? "true" : undefined} className={here === "gu" ? "cur" : undefined}>ગુ</Link>
    </>
  );
  return (
    <>
      <header ref={hd} className={`hd${hidden ? " hide" : ""}${scrolled ? " sc" : ""}`}>
        <div className="hi pad w">
          <Link className="brand" href={locale === "gu" ? "/gu" : "/"} aria-label="Jash Fracture & Orthopaedic Hospital, home">
            <Image src={logo} alt="" width={37} height={44} priority style={{ height: 44, width: "auto" }} />
            <span className="bt"><b className="d">Jash</b><small>Fracture &amp; Orthopaedic Hospital</small></span>
          </Link>
          <nav className="nv" aria-label="Main">{links}</nav>
          <div className="lgm" role="group" aria-label="Language">{lang}</div>
          {book && <Link className="pill" href={book.href}>{book.label}</Link>}
          <button className="hb" aria-label="Open menu" aria-expanded={open} aria-controls="menu" onClick={(e) => { opener.current = e.currentTarget; setOpen(true); }}><i /><i /></button>
        </div>
      </header>
      <div ref={mn} id="menu" className="mn" role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open}>
        <button className="x" aria-label="Close menu" onClick={() => setOpen(false)}>×</button>
        <nav style={{ display: "flex", flexDirection: "column" }}>{links}</nav>
        <div className="lgm" role="group" aria-label="Language" style={{ alignSelf: "flex-start", marginTop: 24, borderColor: "rgba(250,250,245,.3)" }}>{lang}</div>
        {book && <Link className="btn b4" style={{ marginTop: 24, alignSelf: "flex-start" }} href={book.href}>{book.label}</Link>}
      </div>
    </>
  );
}
