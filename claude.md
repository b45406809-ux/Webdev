# Project: Local Business Website Outreach — Standalone HTML Files

You are helping me (a freelance web developer in Zimbabwe) find local businesses with no website and build each one a free, downloadable HTML demo file. Each file includes:
- The business name, phone number, and WhatsApp link prominently at the top
- A personalized WhatsApp message with a copy button
- The full, beautifully designed website for that business
- Unique design per category/business (luxury rose gold, Afrocentric bold, neon urban, classic elegant, organic warm)

**Workflow:** Find leads → Build unique HTML files → Send files to you via chat → You send files directly to clients. No hosting needed. Clients open the HTML file in their browser to see the demo.

When I say **"find me more"**, **"find 10 salons in Bulawayo"**, or **"show me the queue"**, run the matching part of the pipeline below, picking up from where the lead database left off.

---

## 0. Project setup

- Node project with `axios` (or native fetch) and `lowdb` for JSON storage.
- Folder structure:
  ```
  /data/leads.json        <- master lead database
  /data/queries.json      <- category+area combos already searched
  /reports/queue.html     <- tracking report for completed sends (updated manually)
  /demos/                 <- folder for keeping local copies (optional)
  ```
- `.env` notes:
  - Originally had `GOOGLE_PLACES_API_KEY` for Places API, but you don't have one → using manual WebSearch discovery instead
  - No deployment tokens needed anymore (no Cloudflare, no GitHub Pages)
- No special network allowlisting needed — we use Claude's WebSearch for discovery.

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

1. Use Claude's WebSearch tool to find businesses (e.g., "best hair salons in Harare 2024", "barbers Bulawayo reviews")
2. Manually add leads via `addLead(name, category, area, phone, address, rating, reviewCount)` function
3. Categories: salons, barbers, boutiques, bakeries, cake makers, auto repair, plumbers, electricians, gyms, guest houses, photographers, caterers, tailors, car washes, tutoring centers
4. Skip businesses already in `/data/leads.json`. Save new ones with `status: "new"`.

## 3. Website check

- `has_website = false` if there's no `website` field, or it's only a Facebook/Instagram/Linktree/WhatsApp-catalog link.
- Quality bar to proceed: `rating >= 4.0`, `review_count >= 3`, valid phone number. Otherwise `status: "filtered_out"`.

## 4. Phone formatting (replaces automated WhatsApp verification)

- Normalize the phone to international format (e.g. `+263 71 234 5678` → `263712345678`).
- Build `wa_link = "https://wa.me/" + phone_intl`.
- Note in `notes`: "Click the link before sending — if it doesn't open a chat, this number isn't on WhatsApp; skip it." This is the only verification step, and it happens at send time, by me, for free.

## 5. Build demo HTML files

For every lead passing step 3:
- Generate a **standalone HTML file** named `{Business_Name}.html` (e.g., `Red_Rose_Hair_Beauty_Salon.html`)
- Each file includes:
  - **Header section** with business name, phone (+263 format), WhatsApp link
  - **Message section** showing the personalized WhatsApp message with a "Copy" button
  - **Full demo website** with unique design per category:
    - **Salons**: Luxury rose gold (floating petals, shimmer animations)
    - **Afrocentric**: Bold design (Kente borders, terracotta & amber colors)
    - **Modern/Urban**: Neon cyberpunk (cyan/pink, glitch effects, scanlines)
    - **Classic/Elegant**: Light theme (navy/gold, serif typography)
    - **Natural/Organic**: Warm aesthetic (earth tones, animated waves)
  - Real business info, rating, reviews (paraphrased, not verbatim)
  - Service cards, testimonials, CTA buttons
- Files are self-contained and open directly in any browser — no hosting needed
- Set `status: "deployed"`

## 6. Draft the message (integrated in HTML file)

For each `deployed` lead, the personalized WhatsApp message is **built into the HTML file**:
- One specific real detail about them (their rating, a paraphrased review theme)
- A brief description of what they're seeing (free demo of their website)
- The $50 build-and-launch offer, low pressure, short (~50-60 words)
- Vary phrasing meaningfully between leads
- Include the message prominently in the header section with a "Copy" button (uses `navigator.clipboard`)
- Set `status: "queued"`

## 7. Deliverable — your HTML files ready to send

When you ask for the queue or new demos:
- **Generate the standalone HTML files** (one per lead) with all business info + message built in
- **Send them to you via chat** using SendUserFile — you download them
- You then **share these HTML files directly with clients** (via WhatsApp, email, however you prefer)
- Clients open the file in their browser to see the full demo

Each file is named clearly (e.g., `Red_Rose_Hair_Beauty_Salon.html`) so you don't mix them up. They include:
- Business name & details at the top
- Personalized WhatsApp message with "Copy" button
- Complete demo website design inside
- All ready to download and share immediately

## 8. Opt-outs

If I tell you a business replied negatively or asked not to be contacted, set `do_not_contact: true` for that lead immediately and exclude them from all future reports, permanently.

## 9. Reporting

After any discovery run: tell me:
- How many new leads found
- How many filtered out (and why)
- How many HTML files built and ready
- What each file contains (salons, phone, messages)
- Download links for the files

---

## Workflow Notes

- **Files are standalone**: Each HTML file is self-contained, no server/hosting needed. Just download and share.
- **Personalized messages**: Each file has a unique, paraphrased message written specifically for that business.
- **Pacing matters**: Even though you're sending files manually, don't blast 30 businesses in one sitting. WhatsApp's spam detection is triggered by recipients reporting, so natural pacing (like you'd do manually) still matters.
- **Easy tracking**: Update `leads.json` manually as you send — mark `status: "sent"` or add notes when clients reply.
- **Design variety**: Each business gets a unique design based on their category (salons get luxury rose gold, modern salons get neon, etc.) so clients see something polished and custom, not templated.
- **No API keys needed**: We use Claude's WebSearch for discovery — no Google Places API key, no deployment tokens, no hosting bills.
