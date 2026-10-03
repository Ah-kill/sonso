# sonso.co.in

The SoNSo website: plain HTML pages with Jekyll includes, hosted on Firebase Hosting (project `sonso-co`).
Built to the *SoNSo Website Revamp Brief* and *Technical Spec (Lite)*.

The previous site lives untouched in `../sonso landing page/`.

## Editing content

Every page is an `.html` file with a short front matter block at the top:

```
---
layout: default
title: "Page title shown in Google | SoNSo"
description: "One-sentence summary shown in search results."
canonical_path: "/services/build"
page_id: build
---
```

- Shared parts are edited once in `_includes/`: `head.html` (meta, analytics), `header.html` (navigation), `footer.html`, `final-cta.html`, `loop.html` (the four-stage graphic).
- Comments like `<!-- EDIT: ... -->` mark copy that is safe to change, or content that still needs adding.
- Styles are in `assets/css/main.css` (colour and type tokens at the top). Behaviour is in `assets/js/main.js`.
- New page or article: copy an existing one, change the front matter, and add it to `sitemap.xml`.

## Connecting bookings, the lead form and analytics

All in `_config.yml`. Empty values switch the feature off safely.

| Setting | What to paste | Until it's set |
|---|---|---|
| `booking_build` … `booking_unsure` | Google Calendar appointment schedule **Website embed** src URLs (end in `?gv=true`; one per routing row in the spec) | The Book page offers WhatsApp, email and the contact form instead |
| `lead_form_endpoint` | Apps Script web app URL (deploy `apps-script/Code.gs`) | The contact form asks the visitor to send via WhatsApp or email, pre-filled |
| `ga4_id`, `meta_pixel_id`, `google_ads_id` | Tag IDs | No tracking scripts load |

## Tracking (Google Tag Manager)

The GTM container is set by `gtm_id` in `_config.yml`. Add GA4, Google Ads and Meta Pixel tags inside GTM.
The site pushes these events to the dataLayer, for use as GTM Custom Event triggers:

| Event | When |
|---|---|
| `generate_lead` | Contact form sent. Fires on `/thank-you`, once per real submission (or trigger on Page Path = `/thank-you`) |
| `booking_calendar_open` | Visitor clicked "Choose a time" on /book |
| `booking_topic` | Visitor picked a topic on /book |
| `contact_click` | WhatsApp, email or phone link clicked (`method`) |
| `book_call_click` | Any "Book a call" button clicked |

Bookings happen on Google Calendar's own page, which can't redirect back, so a confirmed booking isn't a site event.

## Releasing CSS or JS changes

Bump `asset_version` in `_config.yml` whenever `main.css` or `main.js` changes, so browsers fetch the new files straight away.

## Insights articles

Copy an existing article in `insights/`, update the front matter (including `image`), add a 1200×630 banner to
`assets/img/insights/`, add a card at the top of `insights/index.html`, and add the URL to `sitemap.xml`.

## Build and preview

GitHub Actions builds with Jekyll and deploys automatically (see `/.github/workflows/`):
pull requests get a preview link, merges to `main` go live. One-time setup: run `firebase init hosting:github`
in this folder to create the `FIREBASE_SERVICE_ACCOUNT_SONSO_CO` secret.

Without Ruby, build locally with Node (renders the same Liquid subset):

```
node scripts/build.mjs                       # outputs _site/
firebase serve --only hosting --port 5055    # preview with the real redirects
firebase deploy --only hosting               # manual deploy to sonso.co.in
```

Rollback: Firebase console → Hosting → release history → Roll back.

## Redirects

`firebase.json` 301-redirects the old site's URLs (`/blog/*`, `/sono`, `/services/process-automation`, etc.) to their closest new page.
