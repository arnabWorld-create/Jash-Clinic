# CONFIRM LIST (internal; never published)

## Launching with what we have
The site is built so an unconfirmed value is hidden, never shown as a placeholder. It can go live now as an information site. Each item below switches on by itself once added to `config/site.ts`:
- **Phone / WhatsApp / email:** call, WhatsApp, Book buttons, the mobile bar and the appointment form appear. Without any of them the site cannot take bookings.
- **Address, OPD timings, Maps link:** the info row, Contact details and footer map link appear.
- **Registration number + council:** footer, About, Why Choose Us.
- **Facilities:** the page now shows the five supplied photos (operation theatre, X-ray and examination room, in-patient room, waiting area, corridor), named only for what is visible. Add more entries to `facilities` as photos arrive.
- **Health Guide:** appears only when an article has `reviewed: true`. Until Dr. Shah reviews them, the section stays hidden.
- **Years count:** public pages show only "Since 1988" and "Since 1992" because the 35 vs 38 conflict is unresolved.
- Photo: the portrait is a crop of a phone snapshot (head and shoulders, no desk records). Replace per IMAGE-SHOOT-LIST when possible.

Every item is a `"[CONFIRM]"` in `config/site.ts` or in copy. `npm run prelaunch` fails until all are resolved.

## Contact
- DONE (supplied by client): phone 079-26746413, WhatsApp 9824048818, email, address (Gold Coin Complex - A, Satellite Road, Ahmedabad 380015). Maps link and embed are built from the address: open it once to check the pin is correct
- OPD timings supplied: morning 10:30 AM to 1:30 PM, evening 6:00 PM to 8:00 PM. Still needed: which days OPD runs (a clinic notice mentions Saturday evening closed; Sunday?), which makes structured `openingHours` schema possible. Also: Google Business Profile URL, domain name, and a 24x7 emergency number only if one exists
- OPD timings; Google Maps URL + embed; Google Business Profile URL (footer "Find us on Google Maps" only)
- Domain name; social profiles (if any)
- Whether a 24x7 emergency service exists. `emergency24x7` stays `false` (safer wording) until confirmed, then add the emergency number

## Registration
- Medical registration number and council name (footer, About, Why Choose Us, Physician schema `identifier`)
- Exact medical college behind "V.S. Hospital, Ahmedabad" (Physician `alumniOf`)
- Spelling of the doctor's name: public copy uses "Pyush"; a desk plaque seen in a supplied photo reads "Piyush D. Shah". Credentials and memberships to list

## Years
- Which year to count from. `START_YEAR = 1988` (MS completed) gives 38 years; the client said 35. Resolve in `config/site.ts` only. Hospital founding year 1992 (34 years)

## Facilities (`facilities: []` = section and nav item hidden)
- Which of these exist and may be named: X-ray, operation theatre, in-patient rooms, physiotherapy. Each needs a confirmed photo. Notes from the supplied snapshots (X-ray unit, OT table, ward beds) are NOT confirmation
- Internal only: a notice in the clinic says OPD is closed on Saturday evening (confirm and fold into OPD timings); a desk certificate refers to a Guinness awareness-ribbon attempt (confirm before any mention)

## Services
- Final service list and which procedures are actually performed (joint replacement, arthroscopy, spine, paediatric, in-house physiotherapy)

## Medical content approvals (Dr. Shah must sign off)
- All 6 service pages and their FAQs (general statements; word count still below the 500-800 target)
- All 6 Health Guide articles. Set `reviewed: true` in frontmatter only after sign-off. Articles are also still below the 600-900 word target
- Article "last updated" dates

## Legal
- Privacy Policy and Terms/Medical Disclaimer: lawyer review; retention period, contact for data requests, analytics/cookies

## Gujarati proofreading
- All Gujarati strings (needs native proofreading). Gujarati versions of article, service and legal pages are still to be written
