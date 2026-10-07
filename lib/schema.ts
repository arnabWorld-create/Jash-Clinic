import { site, baseUrl } from "@/config/site";
import { yearsOfExperience } from "@/lib/years";
const id = (k: string) => `${baseUrl}/#${k}`;
export const hospital = () => ({
  "@type": ["Hospital", "LocalBusiness"], "@id": id("hospital"), name: site.name, url: baseUrl,
  telephone: site.phone, email: site.email, hasMap: site.mapsUrl, foundingDate: String(site.FOUNDED), medicalSpecialty: "Orthopedic",
  founder: { "@id": id("drshah") },
  openingHoursSpecification: site.opdSchedule.slots.map((s) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: site.opdSchedule.days, opens: s.opens, closes: s.closes })),
  areaServed: { "@type": "City", name: site.city },
  sameAs: [site.gbpUrl, site.mapsUrl, ...site.socials],
  address: { "@type": "PostalAddress", streetAddress: site.address.street, addressLocality: site.city, addressRegion: site.region, postalCode: site.address.postalCode, addressCountry: site.country },
});
export const physician = () => ({
  "@type": ["Physician", "Person"], "@id": id("drshah"), name: site.doctor, medicalSpecialty: "Orthopedic",
  identifier: site.registration.number,
  alumniOf: { "@type": "CollegeOrUniversity", name: site.medicalCollege },
  worksFor: { "@id": id("hospital") },
  description: `Orthopaedic surgeon with ${yearsOfExperience()} years of experience (clinical practice since ${site.START_YEAR}); founded ${site.name} in ${site.city} in ${site.FOUNDED}.`,
});
export const breadcrumb = (items: [string, string][]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: baseUrl + path })),
});
export const graph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": clean(nodes) });
// FAQPage helper takes the SAME array the page renders, so schema text can never drift from visible text.
export const faq = (qa: { q: string; a: string }[]) => ({
  "@type": "FAQPage",
  mainEntity: qa.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
});

// Drops any field still holding "[CONFIRM]" (and array items) so placeholders never reach JSON-LD. There are no Review / aggregateRating nodes anywhere.
export function clean<T>(o: T): T { const f = (v: any): any => Array.isArray(v) ? v.map(f).filter((x) => x !== undefined) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, f(x)]).filter(([, x]) => x !== undefined)) : v === "[CONFIRM]" ? undefined : v; return f(o); }
export const procedure = (name: string, description: string) => ({ "@type": "MedicalProcedure", name, description });
export const article = (o: { title: string; published: string; updated: string; reviewed: boolean }) => ({
  "@type": "Article", headline: o.title, datePublished: o.published, dateModified: o.updated, author: { "@id": id("hospital") },
  ...(o.reviewed ? { reviewedBy: { "@id": id("drshah") } } : {}),
});

export const website = () => ({
  "@type": "WebSite",
  "@id": id("website"),
  name: site.name,
  url: baseUrl,
  inLanguage: ["en-IN", "gu-IN"],
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${baseUrl}/faq#{search_term_string}` },
    "query-input": "required name=search_term_string",
  },
});
export const medicalPage = (o: { name: string; url: string; reviewed: boolean }) => ({
  "@type": "MedicalWebPage", name: o.name, url: o.url, about: { "@id": id("hospital") },
  ...(o.reviewed ? { reviewedBy: { "@id": id("drshah") } } : {}),
});
