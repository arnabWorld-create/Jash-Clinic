// SINGLE SOURCE OF TRUTH. Every unknown stays the exact string "[CONFIRM]"; `npm run check:confirm` blocks launch while any remain.
export const CONFIRM = "[CONFIRM]";
export const site = {
  name: "Jash Fracture & Orthopaedic Hospital",
  doctor: "Dr. Piyush Shah",            // spelling confirmed by client; plaque and certificates read "Piyush D. Shah"
  credentials: "MBBS, MS (Orthopaedics)",
  medicalCollege: "V.S. Hospital, Ahmedabad",            // exact college behind "V.S. Hospital, Ahmedabad"
  START_YEAR: 1988,                    // [CONFIRM which year client counts from; client said 35 years]
  FOUNDED: 1992,
  showYears: false,                    // keep false until the 35 vs 38 conflict is resolved; UI then shows 'Since 1988' / 'Since 1992' only
  city: "Ahmedabad", region: "Gujarat", country: "IN",
  address: { street: "Gold Coin Complex - A, Opp. BRTS Stop, Jodhpur, Satellite Road", area: "Satellite Road", postalCode: "380015" },
  phone: "+917926746413", phoneDisplay: "079-26746413", whatsapp: "919824048818", emergency: CONFIRM, email: "drpiyushshah5@gmail.com",
  emergency24x7: false,                // false = "Urgent injury? Call during OPD hours" wording; true = "Emergency? Call now"
  registration: { number: CONFIRM, council: CONFIRM },
  facilities: [] as { name: string; photo: string; alt: string }[], // confirmed only; empty hides the section and nav item
  opd: "Monday to Saturday · Morning 10:30 AM to 1:30 PM · Evening 6:00 PM to 8:00 PM · Sunday closed",
  opdSchedule: { days: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], slots: [{ opens: "10:30", closes: "13:30" }, { opens: "18:00", closes: "20:00" }] }, // Saturday evening hours confirmed by client
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Gold%20Coin%20Complex%20-%20A%2C%20Opp.%20BRTS%20Stop%2C%20Jodhpur%2C%20Satellite%20Road%2C%20Ahmedabad%20380015", mapsEmbed: "https://www.google.com/maps?q=Gold%20Coin%20Complex%20-%20A%2C%20Opp.%20BRTS%20Stop%2C%20Jodhpur%2C%20Satellite%20Road%2C%20Ahmedabad%20380015&output=embed", gbpUrl: CONFIRM,
  domain: CONFIRM, socials: [] as string[],
  locales: ["en", "gu"] as const,
} as const;
export type Locale = (typeof site.locales)[number];
// Set NEXT_PUBLIC_SITE_URL (e.g. https://yourdomain.in) in the host, or fill `domain` above. The build check fails if localhost leaks into output.
export const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || (site.domain === CONFIRM ? "http://localhost:3000" : `https://${site.domain}`);
