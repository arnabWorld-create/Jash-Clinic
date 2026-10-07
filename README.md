# Jash Fracture & Orthopaedic Hospital: website (Next.js 15, App Router)

## Run
```
npm install
npm run dev          # http://localhost:3000   (English at /, Gujarati at /gu)
npm run prelaunch    # lint copy + SEO check + build + placeholder check
```

## Go live (Vercel is the simplest)
1. Push this folder to a GitHub repo, import it in Vercel.
2. Add env var `NEXT_PUBLIC_SITE_URL=https://your-domain` (no trailing slash). Optional email of appointment requests: `RESEND_API_KEY`, `EMAIL_FROM`.
3. Connect your domain, then submit `https://your-domain/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
4. Claim and verify the Google Business Profile (see docs/SEO-GEO-PLAN.md).

## Where to edit
- Facts (phone, address, OPD, registration, domain): `config/site.ts`
- Page titles and descriptions: `config/seo.json`
- Service and article text: `content/data.ts`. Articles appear on the site only when `reviewed` is `true` (after Dr. Shah's review).
- Certificates (flip `show` for pharma ones only with approval): `config/certs.ts`
- Facility photos: `config/facilities.ts`, images in `assets/`
- English/Gujarati UI strings: `dictionaries/`

## Known limits (honest list)
- Gujarati exists for Home and Services index. Other `/gu` pages show English, are `noindex` and are left out of hreflang until translated.
- Health Guide is hidden until an article is marked reviewed.
- Styling is hand-written CSS in `app/globals.css` (ported 1:1 from the approved preview), not Tailwind.
- Not yet run through a real `next build` in the authoring environment (no network). Run `npm run prelaunch` first and fix anything it reports.
