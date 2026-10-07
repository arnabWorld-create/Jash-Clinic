import { S, G } from "@/content/data";
export const SERVICES = S.map(([slug, name, icon, answer, detail, faq]) => ({ slug, name, icon, answer, detail, faq }));
export const ARTICLES = G.map(([slug, title, publishedAt, reviewed, intro, symptoms, see, treatment, recovery, red, faq]) => ({ slug, title, publishedAt, reviewed, intro, symptoms, see, treatment, recovery, red, faq }));
// Only doctor-reviewed articles are ever published.
export const PUBLISHED = ARTICLES.filter((a) => a.reviewed);
export const SHARED_FAQ: [string, string][] = [
  ["How do I book an appointment?", "Tap the WhatsApp button, call 079-26746413, or use the form on the Contact page."],
  ["What should I bring to my first visit?", "Any earlier reports, X-rays or scans, a list of your medicines, and someone to accompany you if walking is difficult."],
];
export const GENERAL_FAQ: [string, string][] = [
  ["What should I bring to my first visit?", "Any earlier reports, X-rays or scans, a list of your medicines, and someone to accompany you if walking is difficult."],
  ["How do I book an appointment?", "Tap the WhatsApp button, call 079-26746413, or use the form on the Contact page."],
  ["What are the OPD timings?", "Monday to Saturday, morning 10:30 AM to 1:30 PM and evening 6:00 PM to 8:00 PM. Sunday closed."],
  ["What should I do after a serious injury?", "For severe injury, go to the nearest hospital emergency department. For urgent but less severe injuries, call during OPD hours."],
];
