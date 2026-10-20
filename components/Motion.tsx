"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// GSAP + ScrollTrigger (+ Lenis on desktop pointer devices only). Animates transform/opacity only.
// Server HTML is complete without this; if JS or motion is unavailable nothing is hidden.
export default function Motion() {
  const pathname = usePathname();
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let kill = () => {};
    let dead = false;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (dead) return;
      gsap.registerPlugin(ScrollTrigger);
      let lenis: any;
      let tick: ((t: number) => void) | undefined;
      if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const { default: Lenis } = await import("lenis");
        if (dead) return;
        lenis = new Lenis();
        lenis.on("scroll", ScrollTrigger.update);
        tick = (t: number) => lenis.raf(t * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
      }
      document.querySelectorAll<HTMLElement>("[data-words]").forEach((e) => {
        e.setAttribute("aria-label", e.textContent || "");
        e.innerHTML = (e.textContent || "").split(" ").map((w) => `<span aria-hidden="true" style="display:inline-block;opacity:.4">${w}&nbsp;</span>`).join("");
      });
      const mm = gsap.matchMedia();
      mm.add("(min-width: 0px)", () => {
        if (document.querySelector("[data-line]")) gsap.from("[data-line]", { yPercent: 110, stagger: 0.12, duration: 1.1, ease: "power4.out" });
        document.querySelectorAll<HTMLElement>("[data-words]").forEach((e) => gsap.to(e.children, { opacity: 1, stagger: 0.04, ease: "none", scrollTrigger: { trigger: e, start: "top 85%", end: "bottom 55%", scrub: true } }));
        gsap.utils.toArray<HTMLElement>(".sec h2,.sec .lead,.sl li,.stp,.card,figure,details,form,.ans.box,.stats>div,.cta .btn").forEach((el) => {
          if (el.closest("[data-j]")) return;
          gsap.from(el, { y: 30, opacity: 0, duration: 0.75, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
        });
        gsap.utils.toArray<HTMLElement>(".pw img:not(.hero-portrait),.cw img").forEach((im) => gsap.fromTo(im, { yPercent: -5, scale: 1.14 }, { yPercent: 5, scale: 1.14, ease: "none", scrollTrigger: { trigger: im.parentElement!, scrub: true } }));
      });
      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>(".hero-portrait").forEach((im) => gsap.fromTo(im, { yPercent: -5, scale: 1.18 }, { yPercent: 5, scale: 1.18, ease: "none", scrollTrigger: { trigger: im.parentElement!, scrub: true } }));
        gsap.utils.toArray<HTMLElement>("[data-st]").forEach((st) => gsap.from(Array.from(st.children), { y: 36, opacity: 0, stagger: 0.12, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: st, start: "top 88%", once: true } }));
      });
      mm.add("(min-width: 768px)", () => {
        gsap.utils.toArray<HTMLElement>(".hero-portrait").forEach((im) => gsap.fromTo(im, { yPercent: -5, scale: 1.22 }, { yPercent: 5, scale: 1.22, ease: "none", scrollTrigger: { trigger: im.parentElement!, scrub: true } }));
        const j = document.querySelector("[data-j]");
        if (!j) return;
        const s = gsap.utils.toArray<HTMLElement>("[data-st]");
        document.documentElement.classList.add("pin");
        gsap.set(s.slice(1), { autoAlpha: 0, yPercent: 10 });
        const tl = gsap.timeline({ scrollTrigger: { trigger: j, start: "top top", end: "+=240%", pin: true, scrub: 0.6 } });
        tl.to("[data-bar]", { scaleX: 1, duration: s.length * 1.2, ease: "none" }, 0);
        s.forEach((x, i) => { if (i) tl.to(s[i - 1], { autoAlpha: 0, yPercent: -10 }, i * 1.2 - 0.3).to(x, { autoAlpha: 1, yPercent: 0 }, i * 1.2 - 0.3); });
        return () => document.documentElement.classList.remove("pin");
      });
      window.scrollTo(0, 0);
      kill = () => { mm.revert(); ScrollTrigger.getAll().forEach((t) => t.kill()); if (tick) gsap.ticker.remove(tick); lenis?.destroy(); };
    })();
    return () => { dead = true; kill(); };
  }, [pathname]);
  return null;
}
