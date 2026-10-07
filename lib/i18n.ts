import en from "@/dictionaries/en.json";
import gu from "@/dictionaries/gu.json";
import type { Locale } from "@/config/site";
type Dict = typeof en;
const merge = (a: any, b: any): any => (b && typeof b === "object" && !Array.isArray(b) ? Object.fromEntries(Object.keys({ ...a, ...b }).map((k) => [k, merge(a?.[k], b?.[k])])) : b ?? a);
// Gujarati overrides English key by key; anything not yet translated falls back to English.
export const t = (l: Locale): Dict & { services?: Record<string, string> } => (l === "gu" ? merge(en, gu) : en);
export const href = (l: Locale, path = "/") => (l === "en" ? path : `/gu${path === "/" ? "" : path}`);
// Pages that have real Gujarati content. Others render English under /gu with noindex and no hreflang.
export const GU_PAGES = ["/", "/services"];
