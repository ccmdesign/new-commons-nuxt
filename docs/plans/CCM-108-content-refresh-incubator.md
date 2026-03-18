# CCM-108: Content Refresh & Incubator Page — Implementation Plan

## Overview

Replace Challenge-era content across three pages (homepage, incubator/2026, FAQ) with Incubator-era content. Nearly all final copy is blocked on client input, so the implementation focuses on building the correct **structure and layout** with realistic placeholder text that is trivially swappable.

### Placeholder Convention

All placeholder content MUST follow these rules:

1. Wrap every placeholder block with an HTML comment:
   ```html
   <!-- TODO(CCM-108): Replace with client copy — [description of what goes here] -->
   ```
2. Prefix visible placeholder text with `[PLACEHOLDER]` so it is instantly recognisable in the browser.
3. Keep placeholder text realistic in length and tone so the page looks right in demos.

---

## 1. Homepage Rewrite (`pages/index.vue`)

### Current Structure (top to bottom)

| Section | Component | Current Content |
|---------|-----------|-----------------|
| Hero | `<nc-hero>` | "New Commons Challenge" intro + hero image |
| Announcement bar | `<nc-announcement>` | "Meet the Awardees" CTA linking to `/the-2025-challenge` |
| Video | `<nc-base-section>` | YouTube embed + "The Challenge" text |
| CTA (FAQ + Webinar) | `<nc-cta>` | Two-panel CTA card |
| Blog | `<nc-blog-section>` | Latest 3 blog posts |

### Changes

#### 1.1 Hero — Replace with Incubator intro

- **Keep:** `<nc-hero>` wrapper, `hero__content` layout, hero image + animated `<nc-minimal-logo>`.
- **Replace:** `<h1>` and `<p>` inside `.panel` with Incubator-era placeholder copy.
  ```
  h1: "New Commons Incubator"
  p:  "[PLACEHOLDER] The New Commons Incubator supports teams building data commons..."
  ```
- **Remove:** The commented-out "Join the Challenge Today" button.
- **Add:** A new CTA button: "Apply to the Incubator" linking to `/incubator/2026` (or an external application form URL TBD).

#### 1.2 Announcement bar — Replace with Incubator application CTA

- **Replace** the "Meet the Awardees" announcement with an Incubator application CTA:
  ```
  h3: "Now Accepting Applications"
  h2: "2026 Incubator Cohort"
  p:  "[PLACEHOLDER] Apply by [DATE TBD] to join the next cohort..."
  Button: "Apply Now" -> /incubator/2026
  ```
- **Add** a secondary link: "View the 2025 Challenge" -> `/the-2025-challenge` (text link, not button). This satisfies the requirement to "add link to the 2025 Challenge archive page."

#### 1.3 Video section — Keep embed, update text

- **Keep:** The `<iframe>` YouTube embed and its container.
- **Replace** heading and description text:
  ```
  h2: "About the Incubator"
  p:  "[PLACEHOLDER] Learn how the New Commons Incubator helps teams build sustainable data commons..."
  ```
- **Decision for implementer:** Confirm whether the same YouTube video URL stays or a new one will be provided. For now, keep the existing embed.

#### 1.4 CTA section — Update FAQ panel + Webinar panel

- **FAQ panel (panel-header):**
  - Update text to reference Incubator FAQ:
    ```
    "Have questions about the Incubator?"
    ```
  - Keep the link to `/faq`.
- **Webinar panel (panel-footer):**
  - Replace Challenge webinar text with Incubator webinar placeholder:
    ```
    h2: "Watch the Incubator Info Session"
    p:  "[PLACEHOLDER] Missed the live session? Watch our webinar to learn about the 2026 Incubator..."
    ```
  - Keep the "Watch now!" button pointing to `#video`.

#### 1.5 Blog section — No changes

- Keep `<nc-blog-section>` as-is.

### File-level notes

- No new components needed. All changes are content swaps inside existing markup.
- The `<script setup>` block stays the same (blogposts query).
- No style changes required.

---

## 2. Incubator Page (`pages/incubator/2026.vue`)

### Current State

This page was created by CCM-105 as a copy of the old prize page with a placeholder banner. It currently contains:
- A placeholder banner ("Coming Soon...")
- Old prize hero with Challenge-era copy
- "What are we looking for?" cards (Localized Decision-making / Humanitarian Interventions)
- Prizes section with dollar amounts and support details
- "Who can apply?" / Eligibility section
- Helpful Tips section
- Judges and Observers grids

### Target Structure

Replace everything above the judges grid with proper Incubator content. The page should have these sections in order:

#### 2.1 Hero

- **Remove** the placeholder banner (`<nc-base-section class="placeholder-banner">`).
- **Replace** hero content:
  ```
  Brow:  "2026 Cohort"
  h1:    "The New Commons Incubator"
  p:     "[PLACEHOLDER] The New Commons Incubator is a 12-month programme that provides..."
  ```
- **Keep** the announcement bar linking to the 2025 Challenge (already present, just update copy if needed).

#### 2.2 Program Overview section (NEW)

- Use `<nc-base-section>` with a simple two-column layout (text + optional image or icon).
- Content structure:
  ```html
  <h2>Program Overview</h2>
  <p>[PLACEHOLDER] The Incubator provides selected teams with funding, mentorship,
     and technical resources to build or enhance data commons for responsible AI...</p>
  ```
- Can reuse the existing `.switcher` layout pattern.

#### 2.3 "What We Offer" section (REPLACES old "What are we looking for?" + Prizes)

- Use the existing two-card layout (`.prize-card` pattern) but rename the CSS class to something like `.offer-card`.
- Cards (3-4 items, using icon + title + description pattern already in use):
  ```
  Card 1: Funding — "[PLACEHOLDER] Up to $X in grant funding..."
  Card 2: Mentorship & Guidance — "[PLACEHOLDER] Access to experts in data governance..."
  Card 3: Technical Support — "[PLACEHOLDER] Hands-on technical assistance..."
  Card 4: Network Access — "[PLACEHOLDER] Connect with the Open Data Policy Lab's global network..."
  ```
- **Implementation note:** The existing `.prize-card` grid layout works well. Reuse the icon assets (`/assets/trophy.svg`, `/assets/mentorship.svg`, `/assets/support.svg`, `/assets/globe.svg`) — they are generic enough.

#### 2.4 "Who Should Apply" section (REPLACES old eligibility)

- Use `<nc-base-section color="faded">`.
- Structure:
  ```html
  <h2>Who Should Apply</h2>
  <p>[PLACEHOLDER] We welcome applications from nonprofits, academic institutions,
     startups, and development organisations working with data commons...</p>
  <h3>Eligibility Criteria</h3>
  <ul>
    <li>[PLACEHOLDER] Must be affiliated with an established organisation...</li>
    <li>[PLACEHOLDER] Project must focus on data commons for AI...</li>
    <li>[PLACEHOLDER] Must demonstrate capacity to implement over 12 months...</li>
  </ul>
  ```

#### 2.5 Timeline section

- **Option A (recommended):** Reuse the existing `<nc-timeline>` component. It is already built and supports a card-based visual timeline. Update the data array in the component or pass timeline data as props.
  - The current `ncTimeline.vue` has hardcoded Challenge dates. For the Incubator, either:
    - (a) Make the component accept a `timeline` prop (preferred — keeps it reusable), or
    - (b) Create a new inline timeline in the page using the same CSS pattern.
- **Option B (simpler):** Build a simple inline ordered list styled as a vertical timeline. Less visual but faster to implement.
- **Recommended approach:** Option A — refactor `<nc-timeline>` to accept a `timeline` prop with a default fallback. Then use it in the Incubator page:
  ```html
  <nc-timeline :timeline="incubatorTimeline" />
  ```
  ```js
  const incubatorTimeline = [
    { date: '2026-03-01T00:00:00Z', event: '[PLACEHOLDER] Applications open' },
    { date: '2026-05-01T00:00:00Z', event: '[PLACEHOLDER] Applications close' },
    { date: '2026-06-15T00:00:00Z', event: '[PLACEHOLDER] Cohort announced' },
    { date: '2026-09-01T00:00:00Z', event: '[PLACEHOLDER] Programme begins' },
  ]
  ```

#### 2.6 Application CTA section

- Use the existing CTA panel pattern (dark background + button).
- Content:
  ```html
  <h2>Ready to Apply?</h2>
  <p>[PLACEHOLDER] Submit your application by [DATE TBD]...</p>
  <nc-button color="primary" variant="primary">Apply Now</nc-button>
  ```
- The button href is TBD (external Google Form or built-in form).

#### 2.7 Judges & Observers — KEEP

- Keep `<nc-judges-grid />` and `<nc-observers-grid />` exactly as they are.
- These components pull their own data and need no changes.

### Sections to REMOVE

- The old "Prizes" section (two winners, USD 100k, etc.)
- The old "Helpful Tips" section (Blueprint, Inspirational Examples)
- The `placeholder-banner` at the top

### Script changes

- Remove `const { rulesUrl } = useSiteLinks()` if the Rules link is no longer needed on this page.
- Add `incubatorTimeline` data (if using Option A for timeline).

### Style changes

- Rename `.prize-card` to `.offer-card` (or keep the class name and just change content — implementer's call on cleanliness).
- Remove `.prize-cta`, `.prize-list`, `.prize-tips` styles that are no longer used.
- Add any new styles for the timeline if building inline.

---

## 3. FAQ Content Swap (`pages/faq.vue`)

### Current Structure

The FAQ page uses `<nc-faq-section>` wrappers with `<nc-collapse>` accordion items. FAQ data is defined inline in `<script setup>` as a `faq` object with these category keys:

| Key | Current Category |
|-----|-----------------|
| `information` | Challenge Information |
| `eligibility` | Eligibility and Institutional Affiliation |
| `application` | Application Process |
| `scope` | Project Scope and Partnerships |
| `criteria` | Proposal Evaluation Criteria |
| `decision` | Localized Decision-Making |
| `support` | Support and Technical Capacity |
| `timeline` | Challenge Timeline and Submission Details |

### New Category Structure

Replace all 8 categories with Incubator-relevant categories. Suggested grouping:

| Key | New Category | Description |
|-----|-------------|-------------|
| `program` | About the Incubator | What is it, who runs it, what do participants receive |
| `eligibility` | Eligibility | Who can apply, geographic restrictions, org types |
| `application` | Application Process | How to apply, deadlines, what to submit |
| `support` | Support & Resources | What support is provided, mentorship, technical help |
| `timeline` | Timeline & Key Dates | When things happen |
| `governance` | Data Governance | How data commons should be governed, requirements |

### Implementation

1. **Keep the template structure exactly as-is** — just update `v-for` bindings if category keys change, and update the `<h3>` headings.
2. **Replace the `faq` object** in `<script setup>` with new placeholder Q&A pairs.
3. Each Q&A item follows the existing shape: `{ summary: string, content: string }`.
4. Prefix all answer content with `<!-- TODO(CCM-108): Replace with client copy -->`.
5. Write 2-4 placeholder questions per category (matching realistic Incubator topics).

### Example placeholder items

```js
program: [
  {
    summary: 'What is the New Commons Incubator?',
    content: `
      <!-- TODO(CCM-108): Replace with client copy — program description -->
      <p>[PLACEHOLDER] The New Commons Incubator is a programme run by the Open Data Policy Lab
         that supports teams in building and sustaining data commons for responsible AI development...</p>
    `
  },
  {
    summary: 'What do Incubator participants receive?',
    content: `
      <!-- TODO(CCM-108): Replace with client copy — participant benefits -->
      <p>[PLACEHOLDER] Participants receive funding, mentorship, technical support,
         and access to the Open Data Policy Lab's global network of experts...</p>
    `
  },
]
```

### Style changes

- None. Keep existing styles as-is.

---

## 4. Implementation Order

Recommended sequence:

1. **FAQ page** (simplest — pure data swap, no layout changes)
2. **Homepage** (content swaps in existing layout, no structural changes)
3. **Incubator page** (most work — removing old sections, building new ones, potential timeline component refactor)

---

## 5. Testing Checklist

- [ ] All three pages render without errors
- [ ] No references to "Challenge" remain in Incubator-era content (except the 2025 Challenge archive link)
- [ ] Every `[PLACEHOLDER]` text is accompanied by a `<!-- TODO(CCM-108) -->` comment
- [ ] Navigation links in `ncTopbar.vue` still work (no route changes needed — "The Incubator" already points to `/incubator/2026`)
- [ ] YouTube embed still plays on homepage
- [ ] Judges and Observers grids render on Incubator page
- [ ] FAQ accordions open/close correctly with new content
- [ ] Page looks reasonable on mobile (no layout regressions)
- [ ] `grep -r "TODO(CCM-108)"` returns all placeholder locations for easy audit

---

## 6. Open Questions for Implementer

1. **Timeline component:** Should `<nc-timeline>` be refactored to accept props (reusable) or should a new inline timeline be built in the Incubator page? Recommendation: refactor to accept props.
2. **YouTube video:** Does the same video stay on the homepage, or will a new Incubator-specific video be provided? Keep current embed for now.
3. **Application CTA destination:** Where does "Apply Now" link to? An external Google Form (like the Challenge used), or a new page? Use `#` as href placeholder until confirmed.
4. **Offer amounts:** The old page showed "USD 100,000" grants. The Incubator funding structure may differ. Use generic "[PLACEHOLDER] Up to $X" until confirmed.
5. **Rules link:** The topbar still has a "Rules" link (`useSiteLinks().rulesUrl`). Does this need updating for the Incubator, or does it stay as the Challenge rules? Leave as-is for now — this is outside CCM-108 scope.
6. **"Helpful Tips" content:** The old prize page had Blueprint and Inspirational Examples links. Should any of this content carry over to the Incubator page, perhaps in a "Resources" subsection? Assume no unless client requests it.
