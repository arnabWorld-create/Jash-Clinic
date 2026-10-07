# SEO + GEO PLAN: Jash Fracture & Orthopaedic Hospital, Ahmedabad

## 0. Read this first
- **The preview link is not what Google ranks.** It is a single page with in-page routes. Ranking needs the real Next.js site (server-rendered pages, one URL per page) deployed on the client's own domain. Everything below assumes that build.
- **Nobody can promise "number 1".** Rankings depend on competition, the Google Business Profile, links and time. Expect first movement in 4 to 8 weeks and real results in 3 to 6 months.
- For a doctor, **Google Maps / Business Profile brings most local calls**, more than the website. Do both.

## 1. Already built into the project
Per-page unique title + description + canonical + hreflang + OpenGraph (`config/seo.json`, `lib/seo.ts`) · sitemap with Gujarati alternates (`app/sitemap.ts`) · robots allowing GPTBot, PerplexityBot, Google-Extended, ClaudeBot · `/llms.txt` generated from config · JSON-LD: Hospital/LocalBusiness with opening hours, Physician, BreadcrumbList, FAQPage, MedicalWebPage, Article · `npm run check:seo` (title ≤60, description 70-160, no duplicates) · `check:confirm`, `lint:copy`, `check:articles` guardrails.

## 2. Keyword map (one main intent per page)
| Page | Main keyword | Support |
|---|---|---|
| Home | orthopaedic doctor in Ahmedabad | bone doctor Ahmedabad, orthopaedic surgeon Satellite |
| Fracture & trauma | fracture treatment in Ahmedabad | fracture hospital Ahmedabad, broken bone doctor |
| Joint replacement | joint replacement surgeon Ahmedabad | knee pain doctor Ahmedabad, hip pain |
| Arthroscopy & sports | arthroscopy / sports injury Ahmedabad | ligament tear, meniscus tear |
| Spine & back pain | back pain doctor in Ahmedabad | spine specialist, sciatica |
| Paediatric | child orthopaedic doctor Ahmedabad | clubfoot, flat feet in children |
| Physiotherapy | physiotherapy after fracture Ahmedabad | rehab, post-surgery physio |
| Contact | orthopaedic doctor Satellite Road | near Jodhpur Cross Roads, BRTS |
Use area words naturally (Satellite, Jodhpur, Ahmedabad). Gujarati terms to add with the Gujarati pages (e.g. "હાડકાંના ડૉક્ટર અમદાવાદ"), proofread by a native speaker.

## 3. Local SEO (biggest lever)
1. **Google Business Profile**: claim/verify. Name exactly "Jash Fracture & Orthopaedic Hospital". Primary category: Orthopedic surgeon (or Orthopaedic clinic), plus Hospital/Physiotherapist as secondary only if true. Add hours (Mon-Sat, 10:30-13:30 and 18:00-20:00, Sunday closed), phone, website, services, 10+ real photos, weekly posts, and Q&A.
2. **NAP must be identical everywhere**: Jash Fracture & Orthopaedic Hospital · Gold Coin Complex - A, Opp. BRTS Stop, Jodhpur, Satellite Road, Ahmedabad 380015 · 079-26746413. Same on the site, GBP and every listing.
3. **Listings**: Bing Places, Apple Business Connect, Justdial, Practo, Lybrate, Sulekha, IMA/state directories. Match NAP exactly.
4. **Reviews**: they help ranking, but check medical-advertising rules with the client first. Never offer gifts or discounts for reviews, never write reviews for patients, and reply to every review without sharing medical details. The website itself does not solicit reviews.
5. Add an embedded Google Map (already in config) and a link to the GBP.

## 4. GEO: getting cited by ChatGPT, Gemini, Perplexity, AI Overviews
- Every service page starts with a 40-60 word direct answer, then detail, then a visible FAQ (4-6 questions in the words patients use, English and Gujarati).
- State facts the same way everywhere (name, 1988, 1992, address). AI systems trust consistent entities.
- Show author + "Medically reviewed by Dr. Piyush Shah" + last-updated date on articles, only once truly reviewed.
- Keep `llms.txt`, schema and visible text in agreement. FAQ schema only where the same Q&A is visible.
- Get mentioned on other sites (Practo/Justdial profile, local news, medical association pages). Third-party mentions are what AI answers lean on.

## 5. Content calendar (after doctor sign-off)
Now: 6 articles + 6 service pages expanded to 500-800 words. Next 12 (one every 2 weeks): knee pain causes, frozen shoulder, tennis elbow, heel pain, sciatica, osteoporosis and fractures in older adults, ankle sprain, ACL tear, child fracture first aid, fracture healing foods, post-knee-replacement exercises, when is surgery needed. Each: symptoms, when to see a doctor, treatment options, recovery, red flags, FAQ.

## 6. Technical
LCP < 2.0s, CLS ≈ 0 (fixed image sizes, next/image, font swap), mobile first, HTTPS, one canonical URL per page, no content hidden behind JS, 404 page, redirect www/non-www. Submit `sitemap.xml` in Google Search Console and Bing Webmaster Tools on launch day; check Coverage weekly for a month.

## 7. Measure
Search Console (queries, pages, position) · GBP insights (calls, directions, website clicks) · WhatsApp and call-button clicks (privacy-friendly analytics) · rank checks for the 8 keywords above, monthly.

## 8. Monthly routine (about 3 hours)
2 GBP posts, 1 new article or page update, check Search Console errors, reply to reviews, confirm hours/holidays on GBP and site.
