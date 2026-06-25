# Project: Local Business Website Outreach — Manual-Send Version

You are helping me (a freelance web developer in Zimbabwe) find local businesses with no website, build each one a free one-page HTML demo, deploy it live, and prepare a ready-to-send WhatsApp message for each — but **you never send anything yourself**. Your output is a list I read and send manually from my own WhatsApp. This removes all the automation/ban-risk concerns of driving WhatsApp directly, so everything here can run in a normal Claude Code web session — no persistent local process needed.

When I say **"find me more"**, **"find 10 salons in Bulawayo"**, or **"show me the queue"**, run the matching part of the pipeline below, picking up from where the lead database left off.

---

## 0. Project setup

- Init a Node project. Install: `axios` (or native fetch) and a lightweight JSON/lowdb store.
- Folder structure:
  ```
  /data/leads.json        <- master lead database
  /data/queries.json      <- category+area combos already searched
  /demos/<lead-slug>/index.html   <- generated demo, before deploy
  /reports/queue.html     <- the send-queue report (see step 7)
  ```
- `.env` needs:
  - `GOOGLE_PLACES_API_KEY` — for Places Text Search + Place Details (the Details call's `website` field is the reliable way to check for a site).
  - `CLOUDFLARE_API_TOKEN` — to deploy each demo to Cloudflare Pages via Wrangler.
- Add `maps.googleapis.com` and `api.cloudflare.com` to this environment's allowed network domains (Settings → Network access). Nothing WhatsApp-related needs allowlisting — we never connect to WhatsApp programmatically.

## 1. Lead schema (`/data/leads.json`)

```json
{
  "id": "place_id from Google",
  "name": "", "category": "", "area": "", "address": "",
  "phone_raw": "",
  "phone_intl": "",
  "wa_link": "",
  "rating": 0, "review_count": 0,
  "has_website": null, "website_evidence": "",
  "demo_path": "", "live_url": "",
  "message_drafted": "",
  "status": "new",
  "do_not_contact": false,
  "found_at": "", "added_to_queue_at": "",
  "notes": ""
}
```
`status` flow: `new` → `filtered_out` (has a site / too few reviews) → `demo_built` → `deployed` → `queued` → (I mark manually, outside this system, once I've sent it).

## 2. Discovery — "find me more"

1. Rotate through category+area combos not yet searched (track in `/data/queries.json`). Categories: salons, barbers, boutiques, bakeries, cake makers, auto repair, plumbers, electricians, gyms, guest houses, photographers, caterers, tailors, car washes, tutoring centers. Default area Harare, but use whatever area I name.
2. Google Places **Text Search** per combo, then **Place Details** per result for `website`, `formatted_phone_number`, `international_phone_number`, `formatted_address`, `rating`, `user_ratings_total`, `reviews`.
3. Skip `place_id`s already in `leads.json`. Save new ones with `status: "new"`.

## 3. Website check

- `has_website = false` if there's no `website` field, or it's only a Facebook/Instagram/Linktree/WhatsApp-catalog link.
- Quality bar to proceed: `rating >= 4.0`, `review_count >= 3`, valid phone number. Otherwise `status: "filtered_out"`.

## 4. Phone formatting (replaces automated WhatsApp verification)

- Normalize the phone to international format (e.g. `+263 71 234 5678` → `263712345678`).
- Build `wa_link = "https://wa.me/" + phone_intl`.
- Note in `notes`: "Click the link before sending — if it doesn't open a chat, this number isn't on WhatsApp; skip it." This is the only verification step, and it happens at send time, by me, for free.

## 5. Build and deploy the demo

For every lead passing step 3:
- Generate `/demos/<slug>/index.html` using the established design system: `Fraunces` (display) + `Sora` (body) fonts; dark espresso base (`#241712`) with a two-accent warm palette (default gold `#CFA24C` / rose `#B6677A`, adjustable per category); one signature SVG divider motif nodding to the business's craft; no stock photos (abstract CSS/SVG pattern blocks instead); real name/address/phone/rating/hours; 2-3 **paraphrased** (never quoted verbatim) review highlights from the Details `reviews` field; a top banner reading "FREE CONCEPT — not yet live"; WhatsApp CTA buttons using `wa_link`.
- Deploy it immediately to Cloudflare Pages via Wrangler using `CLOUDFLARE_API_TOKEN`. Store the resulting URL in `live_url`.
- Set `status: "deployed"`.

## 6. Draft the message

For each `deployed` lead, write `message_drafted`:
- One specific real detail about them (their rating, a paraphrased review theme).
- The free demo, with the **live URL** included directly in the text (no attachment needed).
- The $50 build-and-launch offer, low pressure, short (~50-60 words).
- Vary phrasing meaningfully between leads.
- Set `status: "queued"`.

## 7. The send-queue report — your actual deliverable

Generate `/reports/queue.html`: a simple page, one card per `queued` lead, each showing:
- Business name, category, rating/reviews
- A clickable `wa.me` link/button ("Open chat")
- The drafted message in a box with a "Copy" button (plain JS `navigator.clipboard`)
- The live demo URL
- A "Mark as sent" button that just updates a local flag for my own tracking (no real send happens — I do that myself in WhatsApp)

When I say "show me the queue," regenerate this report with everything currently at `status: "queued"` and tell me how many are ready.

## 8. Opt-outs

If I tell you a business replied negatively or asked not to be contacted, set `do_not_contact: true` for that lead immediately and exclude them from all future reports, permanently.

## 9. Reporting

After any `find me more` run: tell me how many new leads found, how many filtered out (and why), how many demos built and deployed, and how many are now sitting in the queue ready for me to send.

---

## Notes

- Even sending manually, pace yourself — don't blast 30 near-identical messages in one sitting. WhatsApp's spam reporting is triggered by recipients, not just automation, so natural variation and reasonable pacing (the kind that happens naturally when you're copy-pasting and reading each one) still matters.
- Don't scrape Google Maps directly — always use the official Places API with the key I provide.
