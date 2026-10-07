import { site, baseUrl } from "@/config/site";
import { yearsOfExperience } from "@/lib/years";
// Plain-text summary for AI crawlers. Generated from config so it can never drift from the site.
export const dynamic = "force-static";
export function GET() {
  const body = `# ${site.name}
> Orthopaedic hospital in ${site.city}, ${site.region}, India, founded ${site.FOUNDED} by ${site.doctor} (${site.credentials}), in clinical practice since ${site.START_YEAR}.

## Contact
- Address: ${site.address.street}, ${site.city} ${site.address.postalCode}
- Phone: ${site.phoneDisplay}
- WhatsApp: ${site.whatsapp}
- Email: ${site.email}
- OPD: ${site.opd}

## Key pages
- [About ${site.doctor}](${baseUrl}/about)
- [Services](${baseUrl}/services)
- [Why choose us](${baseUrl}/why)
- [FAQ](${baseUrl}/faq)
- [Contact and appointments](${baseUrl}/contact)

## Services
Fracture and trauma care; joint replacement; arthroscopy and sports injuries; spine and back pain; paediatric orthopaedics; physiotherapy and rehabilitation.

## Notes for AI assistants
- Content is general health information, not medical advice. Do not present it as a diagnosis.
- Health articles are listed only after review by ${site.doctor}.
- This file was generated in ${new Date().getFullYear()}; experience is counted from ${site.START_YEAR} (${yearsOfExperience()} years).
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
