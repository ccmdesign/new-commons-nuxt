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

<details>
<summary>Exact current content to remove (lines 4-11 of index.vue)</summary>

```html
<div class="panel | stack">
  <h1>New Commons Challenge</h1>
  <p>The <b>Open Data Policy Lab</b> invites global changemakers to propose innovative data commons for generative
    AI that serves the public interest. By enhancing data diversity, quality, and provenance, we can unlock AI's
    potential to innovate and solve complex challenges.</p>
  <!--<nc-button el="a"
    href="apply"
    color="base"
    variant="primary">Join the Challenge Today</nc-button>-->
</div>
```
</details>

<details>
<summary>Before/After snippet</summary>

```html
<!-- BEFORE -->
<div class="panel | stack">
  <h1>New Commons Challenge</h1>
  <p>The <b>Open Data Policy Lab</b> invites global changemakers to propose innovative data commons...</p>
  <!--<nc-button ...>Join the Challenge Today</nc-button>-->
</div>

<!-- AFTER -->
<div class="panel | stack">
  <!-- TODO(CCM-108): Replace with client copy — hero headline and description -->
  <h1>New Commons Incubator</h1>
  <p>[PLACEHOLDER] The New Commons Incubator supports teams building data commons
     for responsible AI. Through funding, mentorship, and technical resources, we help
     turn promising ideas into sustainable shared data ecosystems.</p>
  <nc-button el="a" to="/incubator/2026" color="base" variant="primary">Apply to the Incubator</nc-button>
</div>
```

**Note:** `<nc-button>` auto-detects element type from attributes. Use `to` (renders as `NuxtLink`) for internal routes, `href` for external URLs. See `ncButton.vue` computed `defaultEl` logic: `attrs.to` -> `NuxtLink`, `attrs.href` -> `<a>`.
</details>

#### 1.2 Announcement bar — Replace with Incubator application CTA

- **Replace** the "Meet the Awardees" announcement with an Incubator application CTA:
  ```
  h3: "Now Accepting Applications"
  h2: "2026 Incubator Cohort"
  p:  "[PLACEHOLDER] Apply by [DATE TBD] to join the next cohort..."
  Button: "Apply Now" -> /incubator/2026
  ```
- **Add** a secondary link: "View the 2025 Challenge" -> `/the-2025-challenge` (text link, not button). This satisfies the requirement to "add link to the 2025 Challenge archive page."

**Component API notes:** `<nc-announcement>` accepts:
- `color`: `'primary' | 'base' | 'accent' | 'success' | 'info' | 'cancel'` — controls background tint via `data-color` attribute
- `content`: string — rendered as `<h3>` if no slot is provided
- Default slot — overrides `content` prop entirely. The homepage currently uses the slot with a `.switcher` div containing text + button.

The existing `.hero__announcement` scoped styles in `index.vue` (lines 110-140) handle the h3/h2/p typography. These styles remain unchanged since the new content follows the same element structure (h3 brow + h2 title + p description + button).

<details>
<summary>Before/After snippet</summary>

```html
<!-- BEFORE -->
<nc-announcement color="primary" class="hero__announcement">
  <div class="switcher" style="">
    <div style="flex: 3;">
      <h3>2025 New Commons Challenge</h3>
      <h2>Meet the Awardees</h2>
      <p>Explore the groundbreaking data commons recognized at the 2025 New Commons Showcase.</p>
    </div>
    <nc-button class="hero__announcement-button" to="/the-2025-challenge" color="primary" variant="primary" style="align-self: center;">View Awardees</nc-button>
  </div>
</nc-announcement>

<!-- AFTER -->
<nc-announcement color="primary" class="hero__announcement">
  <!-- TODO(CCM-108): Replace with client copy — announcement bar -->
  <div class="switcher" style="">
    <div style="flex: 3;">
      <h3>Now Accepting Applications</h3>
      <h2>2026 Incubator Cohort</h2>
      <p>[PLACEHOLDER] Apply by [DATE TBD] to join the next cohort of teams building data commons for responsible AI.</p>
      <NuxtLink to="/the-2025-challenge" style="font-size: var(--size-0); font-weight: 300; text-decoration: underline;">View the 2025 Challenge &rarr;</NuxtLink>
    </div>
    <nc-button class="hero__announcement-button" to="/incubator/2026" color="primary" variant="primary" style="align-self: center;">Apply Now</nc-button>
  </div>
</nc-announcement>
```

**Edge case:** The secondary "View the 2025 Challenge" link is inline text within the `.switcher` div. It uses a NuxtLink rather than `<nc-button variant="link">` to avoid adding button padding. Alternatively, a `<nc-button>` with `color="base" variant="link"` would work, but it would inherit the announcement's `primary` color tinting. Inline NuxtLink is simpler.
</details>

#### 1.3 Video section — Keep embed, update text

- **Keep:** The `<iframe>` YouTube embed and its container.
- **Replace** heading and description text:
  ```
  h2: "About the Incubator"
  p:  "[PLACEHOLDER] Learn how the New Commons Incubator helps teams build sustainable data commons..."
  ```
- **Decision for implementer:** Confirm whether the same YouTube video URL stays or a new one will be provided. For now, keep the existing embed.

**CSS context:** The `#video-section` uses `width="narrow"` on `<nc-base-section>`, which maps to `grid-column: col2 / col11` (see `ncBaseSection.vue` line 60-63). The `.panel` inside is centred with `max-width: 39.5rem` and `margin: 0 auto`. The gradient background (`linear-gradient(to bottom, white 50%, #f7f7f7 50%)`) creates the split-tone effect. All of this is preserved — only the text content of `<h2>` and `<p>` changes.

#### 1.4 CTA section — Update FAQ panel + Webinar panel

**Component API notes:** `<nc-cta>` accepts:
- `singleColumn`: Boolean (default `false`) — when `true`, uses a single content slot spanning `content-start / content-end`. When `false`, splits into left (default slot, `content-start / col6`) and right (`right` slot, `col7 / content-end`).
- The homepage uses `:single-column="true"` with a custom `.cta-panel` div inside the default slot.

The `.cta-panel` is **not** a component — it is custom markup styled in `index.vue`'s scoped styles. It has two child divs:
- `.panel-header` — dark teal background (`#0E2F40`) with `squares.svg` pattern, white text
- `.panel-footer` — purple background (`rgba(88, 42, 142, 1)`) with `waves.png` pattern, white text

- **FAQ panel (panel-header):**
  - Update text to reference Incubator FAQ:
    ```
    "Have questions about the Incubator?"
    ```
  - Keep the link to `/faq`.
  - The FAQ link currently uses `<NuxtLink href="faq">` with a `.button` class and `color="white" variant="link"` attributes. Keep this pattern.
- **Webinar panel (panel-footer):**
  - Replace Challenge webinar text with Incubator webinar placeholder:
    ```
    h2: "Watch the Incubator Info Session"
    p:  "[PLACEHOLDER] Missed the live session? Watch our webinar to learn about the 2026 Incubator..."
    ```
  - Keep the "Watch now!" button pointing to `#video`.
  - The button uses `color="wt" variant="primary2"` — this gives it a white background with dark text (see `ncButton.vue` lines 218-222).

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
- A placeholder banner ("Coming Soon...") — `<nc-base-section class="placeholder-banner" color="primary">`
- Old prize hero with Challenge-era copy — `<nc-hero>` with brow text "A Prize for a Shared Digital Future"
- "What are we looking for?" cards — `<nc-base-section class="fancy-bg" width="narrow" color="primary">` with 2x `.prize-card` in a `.switcher`
- Prizes section — `<nc-base-section class="prize-cta" id="cta" color="faded">` with `.cta-panel | switcher` containing prize list items and eligibility info
- Helpful Tips section — `<nc-base-section class="prize-tips" subgrid color="faded">` with Blueprint and Inspirational Examples text
- Judges and Observers grids — `<nc-base-section color="faded" size="l" id="judges">`

**Script dependency:** The page currently imports `const { rulesUrl } = useSiteLinks()` (from `composables/useSiteLinks.js`). This composable returns `{ rulesUrl: 'https://docs.google.com/document/d/1fYmUkwTqOngtpbVT8BezgmWs14IkvGEO6q5a53jqHhA/...' }`. The `rulesUrl` is used in the Prizes section via `:href="rulesUrl"`. Since we are removing the Prizes section, we can remove this import entirely.

<details>
<summary>Full list of template content to remove (lines 2-105 of incubator/2026.vue)</summary>

Everything from the opening `<nc-base-section class="placeholder-banner">` through the closing `</nc-base-section>` of `.prize-tips` will be replaced. Specifically:

1. **Lines 2-6:** Placeholder banner
2. **Lines 8-26:** Hero with Challenge copy and announcement bar (announcement bar content updates, structure stays)
3. **Lines 28-42:** "What are we looking for?" section with fancy-bg and prize-cards
4. **Lines 44-92:** Prize-cta section with prizes list and eligibility
5. **Lines 94-105:** Prize-tips section with Blueprint and Inspirational Examples

Lines 107-113 (Judges/Observers) are **kept as-is**.
</details>

### Target Structure

Replace everything above the judges grid with proper Incubator content. The page should have these sections in order:

#### 2.1 Hero

- **Remove** the placeholder banner (`<nc-base-section class="placeholder-banner">`).
- **Replace** hero content.
- **Keep** the announcement bar linking to the 2025 Challenge (already present, just update copy if needed).

**`<nc-hero>` API:** Pure slot-based component — no props. Renders a `div.hero.subgrid` that spans `full-start / full-end` with `grid-template-columns: subgrid`. Children are placed at `content-start / content-end`. The `.hero__content` class (styled via `:deep`) creates a flex row with `gap: var(--space-2xl-3xl)` and `align-items: center`.

The current page uses a `.panel` div with a `.hero__brow` paragraph. The scoped `.panel` styles (lines 122-135 of 2026.vue) set `max-width: 80ch`, font sizes, and the brow styling (uppercase, primary color, font-weight 800). These styles should be kept but the brow text and content updated.

**Note:** Unlike the homepage hero, the incubator hero does NOT have a `hero__image-div` with the animated logo. It is text-only. A hero image could be added to match the homepage pattern, but this is a design decision — leave text-only for now.

<details>
<summary>Before/After snippet</summary>

```html
<!-- BEFORE (lines 2-26) -->
<nc-base-section class="placeholder-banner" color="primary">
  <p><strong>Coming Soon:</strong> The 2026 Incubator programme details are being finalised...</p>
</nc-base-section>

<nc-hero>
  <div class="hero__content">
    <div class="panel">
      <p class="hero__brow">A Prize for a Shared Digital Future</p>
      <h1>The Incubator — 2026 Cohort</h1>
      <p>The New Commons Challenge is an initiative led by Microsoft...</p>
      <p>The challenge addresses a critical issue...</p>
    </div>
  </div>
  <nc-announcement color="primary" class="hero__announcement">
    <div class="switcher">
      <div style="flex: 3;">
        <h2>Learn about the 2025 Challenge winners and honorary distinctions</h2>
        <p>See the groundbreaking data commons recognised at the 2025 New Commons Showcase.</p>
      </div>
      <nc-button class="hero__announcement-button" to="/the-2025-challenge" color="primary" variant="primary" style="align-self: center;">The 2025 Challenge</nc-button>
    </div>
  </nc-announcement>
</nc-hero>

<!-- AFTER -->
<nc-hero>
  <div class="hero__content">
    <div class="panel">
      <!-- TODO(CCM-108): Replace with client copy — incubator hero brow, heading, and description -->
      <p class="hero__brow">2026 Cohort</p>
      <h1>The New Commons Incubator</h1>
      <p>[PLACEHOLDER] The New Commons Incubator is a 12-month programme that provides
         selected teams with funding, mentorship, and technical resources to build or
         strengthen data commons for responsible AI development.</p>
    </div>
  </div>
  <nc-announcement color="primary" class="hero__announcement">
    <div class="switcher">
      <div style="flex: 3;">
        <!-- TODO(CCM-108): Replace with client copy — 2025 challenge archive link text -->
        <h2>Explore the 2025 New Commons Challenge</h2>
        <p>[PLACEHOLDER] See the winning data commons and honorary distinctions from the inaugural Challenge.</p>
      </div>
      <nc-button class="hero__announcement-button" to="/the-2025-challenge" color="primary" variant="primary" style="align-self: center;">The 2025 Challenge</nc-button>
    </div>
  </nc-announcement>
</nc-hero>
```
</details>

#### 2.2 Program Overview section (NEW)

- Use `<nc-base-section>` with a simple two-column layout (text + optional image or icon).
- Can reuse the existing `.switcher` layout pattern already defined in the page's scoped styles (line 155-157: `--_switcher-space: var(--space-s)`).

**`<nc-base-section>` API:**
- `width`: `'content'` (default) | `'narrow'` — narrow constrains to `col2 / col11`
- `color`: `''` (transparent) | `'base'` | `'primary'` | `'secondary'` | `'faded'` — sets background and text color
- `subgrid`: Boolean — enables CSS subgrid on the content div

```html
<!-- TODO(CCM-108): Replace with client copy — program overview -->
<nc-base-section>
  <h2>Program Overview</h2>
  <div class="switcher">
    <div class="stack">
      <p>[PLACEHOLDER] The New Commons Incubator is a 12-month programme run by the
         Open Data Policy Lab that helps teams build and sustain data commons for
         responsible AI development. Each cohort receives tailored support to move
         from concept to implementation.</p>
      <p>[PLACEHOLDER] Building on the success of the New Commons Challenge, the Incubator
         takes a deeper, hands-on approach — working closely with selected teams to
         address technical, governance, and sustainability challenges.</p>
    </div>
    <div>
      <!-- Optional: image or illustration. Could reuse /assets/patterns/hero.jpg or a new asset -->
    </div>
  </div>
</nc-base-section>
```

**CSS note:** The `.switcher` class is a global utility (not just scoped) that creates a responsive two-column layout. The page overrides `--_switcher-space` to `var(--space-s)`. No new styles needed for this section.

#### 2.3 "What We Offer" section (REPLACES old "What are we looking for?" + Prizes)

- Use the existing card layout but rename CSS class from `.prize-card` to `.offer-card`.
- Expand from 2 cards to 4 cards (icon + title + description pattern).

**Available SVG icons** (all in `/public/assets/`):
- `money.svg` — dollar sign icon, good for Funding
- `mentorship.svg` — people/guidance icon, good for Mentorship
- `support.svg` — wrench/tools icon, good for Technical Support
- `globe.svg` — globe icon, good for Network Access
- `trophy.svg` — trophy icon (less relevant for Incubator)
- `icon-globe.svg` — alternative globe, used in current "What are we looking for?" cards
- `icon-people.svg` — people icon, used in current Humanitarian Interventions card

**Current `.prize-card` CSS pattern** (lines 159-188 of 2026.vue) — this is the layout to reuse:
```css
.prize-card {  /* rename to .offer-card */
  background-color: var(--white-color);
  padding: 2.5rem;
  border-radius: var(--border-radius-m);
  color: var(--base-color);
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "icon title"
    "icon description";
  gap: var(--space-s);
  /* img -> grid-area: icon; h3 -> grid-area: title; p -> grid-area: description */
}
```

**Layout change:** Currently the cards sit inside a `.switcher` (2 columns). With 4 cards, use a CSS grid instead:
```css
.offer-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-s);
}
```

The `.fancy-bg` parent section (dark blue with `bg-prize.png` background) can be kept or changed. Recommendation: keep the `color="primary"` section background for visual contrast but consider dropping `width="narrow"` to give 4 cards more room.

```html
<!-- TODO(CCM-108): Replace with client copy — what we offer cards -->
<nc-base-section class="fancy-bg" color="primary">
  <h2 class="text-align:center padding-block:l white-color h2">What We Offer</h2>
  <div class="offer-cards">
    <div class="offer-card">
      <img src="/assets/money.svg" alt="Funding">
      <h3>Funding</h3>
      <p>[PLACEHOLDER] Up to $X in grant funding to support the development or enhancement of your data commons over 12 months.</p>
    </div>
    <div class="offer-card">
      <img src="/assets/mentorship.svg" alt="Mentorship">
      <h3>Mentorship &amp; Guidance</h3>
      <p>[PLACEHOLDER] Regular access to experts in data governance, AI ethics, and commons management from the Open Data Policy Lab network.</p>
    </div>
    <div class="offer-card">
      <img src="/assets/support.svg" alt="Technical Support">
      <h3>Technical Support</h3>
      <p>[PLACEHOLDER] Hands-on technical assistance with data infrastructure, interoperability standards, and platform development.</p>
    </div>
    <div class="offer-card">
      <img src="/assets/globe.svg" alt="Network Access">
      <h3>Network Access</h3>
      <p>[PLACEHOLDER] Connect with the Open Data Policy Lab's global network of policymakers, technologists, and data practitioners.</p>
    </div>
  </div>
</nc-base-section>
```

#### 2.4 "Who Should Apply" section (REPLACES old eligibility)

- Use `<nc-base-section color="faded">` — renders with `var(--base-color-07-tint)` background and `var(--base-color)` text.
- Reuses the `.cta-panel | switcher` pattern from the current Prizes section for a two-column layout (left: heading + CTA, right: criteria details).

**Current pattern being replaced** (lines 78-91 of 2026.vue): The "Who can apply?" section uses a `.cta-panel | switcher` with an h2 on the left and eligibility text + link buttons on the right. We keep this same structural pattern but update content.

```html
<!-- TODO(CCM-108): Replace with client copy — eligibility section -->
<nc-base-section color="faded">
  <div class="cta-panel | switcher">
    <div>
      <h2>Who Should Apply</h2>
    </div>
    <div class="stack" style="--_stack-space: var(--space-2xs)">
      <p>[PLACEHOLDER] We welcome applications from nonprofits, academic institutions,
         startups, and development organisations working to build or strengthen
         data commons for responsible AI.</p>
      <h3 class="margin-top:s">Eligibility Criteria</h3>
      <ul>
        <li>[PLACEHOLDER] Must be affiliated with an established organisation capable of managing funds</li>
        <li>[PLACEHOLDER] Project must focus on data commons that support responsible AI development</li>
        <li>[PLACEHOLDER] Must demonstrate capacity to implement over 12 months</li>
        <li>[PLACEHOLDER] Government entities may not apply as lead applicants</li>
      </ul>
    </div>
  </div>
</nc-base-section>
```

**CSS reuse note:** The `.cta-panel` styles (lines 190-207) give white text on dark/purple backgrounds. Since this section uses `color="faded"` (light grey bg), the white text would be invisible. The `.cta-panel` styles need modification for this context — either:
- (a) Remove the `.cta-panel` class and use plain markup in the `faded` section, or
- (b) Add a `.cta-panel--light` modifier that does not set `color: var(--white-color)`.

**Risk:** The current `.cta-panel` applies `color: var(--white-color)` unconditionally (line 192). If reused inside `color="faded"`, all text becomes white-on-light-grey = invisible. Recommendation: do NOT reuse `.cta-panel` here. Use a plain `.switcher` div with no color override.

#### 2.5 Timeline section

**Current `<nc-timeline>` component analysis** (`components/ncTimeline.vue`):

The component is currently NOT prop-driven. Key details:
- Uses `<ccm-base-section>` (NOT `<nc-base-section>`) — this is a lower-level grid component
- Has a hardcoded `timeline` array of 4 items with `{ date: string, event: string }` shape
- Renders exactly 4 cards via `v-for="i in 4"` (hardcoded count!)
- Uses `timeline[i-1]` indexing (1-based loop)
- Date formatting: `toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'Canada/Pacific' })`
- Time formatting: `toLocaleTimeString(...)` with AM/PM replacement
- Progress indicator: cards get `.active` class when `i <= 4` and `.full` class when `i <= 3` — this is currently static (all cards active). Originally this was meant to show progress through the challenge timeline.
- The component is currently **commented out** in `index.vue` (line 43: `<!--<nc-timeline id="timeline" />-->`)

**Refactor required:** To accept a `timeline` prop:

```vue
<!-- ncTimeline.vue — refactored -->
<script setup>
const props = defineProps({
  timeline: {
    type: Array,
    required: true,
    validator: (val) => val.every(item => 'date' in item && 'event' in item)
  },
  title: { type: String, default: 'Timeline' },
  subtitle: { type: String, default: '' }
})
</script>
```

The `v-for="i in 4"` must change to `v-for="(item, i) in timeline"`. The `.active` / `.full` classes should be driven by comparing `new Date(item.date)` against today's date.

**Risk:** The timeline progress bar CSS uses `::before` (dot) and `::after` (connecting line) pseudo-elements on each `.card`. The gradient on `.active::after` is hardcoded to work with exactly 4 cards (33.33% stops). With a different number of cards, the gradient percentages would need recalculating or switching to a simpler solid colour.

**Recommendation:** Option A — refactor the component. The `v-for` and prop changes are straightforward. For the gradient issue, use a simple solid-colour bar (`background: var(--primary-color)`) for active segments instead of the percentage-based gradient. This works for any number of cards.

```js
// In the incubator page's <script setup>:
const incubatorTimeline = [
  { date: '2026-03-01T00:00:00-05:00', event: '[PLACEHOLDER] Applications open' },
  { date: '2026-05-01T00:00:00-04:00', event: '[PLACEHOLDER] Applications close' },
  { date: '2026-06-15T00:00:00-04:00', event: '[PLACEHOLDER] Cohort announced' },
  { date: '2026-09-01T00:00:00-04:00', event: '[PLACEHOLDER] Programme begins' },
]
```

```html
<nc-timeline :timeline="incubatorTimeline" title="Timeline" subtitle="Key dates for the 2026 Incubator:" />
```

#### 2.6 Application CTA section

- Use the existing CTA panel pattern (dark background + button).
- Reuse the `.cta-panel` CSS which provides `color: var(--white-color)`, dark `background-color: var(--base-color)`, and `border-radius`.
- The button href is TBD (external Google Form or built-in form).

```html
<!-- TODO(CCM-108): Replace with client copy — application CTA -->
<nc-base-section>
  <div class="cta-panel" style="border-radius: var(--border-radius-m);">
    <div class="stack" style="text-align: center; max-width: 40rem; margin: 0 auto;">
      <h2>Ready to Apply?</h2>
      <p>[PLACEHOLDER] Submit your application by [DATE TBD]. Selected teams will be
         notified by [DATE TBD] and the programme begins in [MONTH TBD] 2026.</p>
      <nc-button href="#" color="primary" variant="primary">Apply Now</nc-button>
    </div>
  </div>
</nc-base-section>
```

**Note:** The `href="#"` is a placeholder. When the application URL is confirmed, it will be an external Google Form URL (use `href`) or internal route (use `to`). The `<nc-button>` auto-detects: `href` renders `<a>`, `to` renders `<NuxtLink>`.

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

**Styles to REMOVE** (dead CSS after content removal):
- `.fancy-bg` (lines 139-145) — only if the "What We Offer" section no longer uses the `bg-prize.png` background. If kept with `color="primary"`, this class can be reused but rename to something like `.offer-bg`.
- `.prize-cta` (lines 147-153) — the overlap/negative-margin trick for the prizes panel. No longer needed.
- `.prize-card` (lines 159-188) — rename to `.offer-card` and keep the grid layout.
- `.cta-panel` (lines 190-207) — keep for the Application CTA section (2.6), but remove the `:first-child` / `:last-child` radius rules that assumed two stacked panels. The CTA section only has one panel.
- `.prize-list` (lines 209-232) — the icon + text list for prizes. Remove entirely.
- `.prize-tips` (lines 234-252) — the subgrid layout for helpful tips. Remove entirely.

**Styles to ADD:**
- `.offer-card` — copy from `.prize-card` with same grid layout
- `.offer-cards` — new container grid for 4 cards: `display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-s);`

**Styles to KEEP unchanged:**
- `.panel` (lines 122-135) — hero panel styles
- `.hero__announcement` (lines 253-283) — announcement bar in hero
- `.switcher` override (lines 155-157) — `--_switcher-space: var(--space-s)`

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

### Exact FAQ data format

The `<nc-collapse>` component expects a `data` prop with this shape:
```ts
{ summary: string, content: string }
```
- `summary` — plain text, rendered inside `<h4>` in a `<summary>` element (the clickable accordion header)
- `content` — raw HTML string, rendered via `v-html` inside a `<div>` (supports `<p>`, `<ul>`, `<a>`, etc.)
- The `name` prop on `<nc-collapse>` groups accordions so only one can be open at a time within a group (uses the HTML `<details name="...">` attribute)

The FAQ page template has one `<nc-faq-section>` per category. Each section contains:
1. An `<h3 class="h3">` heading (the category title)
2. Multiple `<nc-collapse>` items via `v-for`

The `<nc-faq-section>` component is a thin wrapper around `<nc-base-section>` that adds a responsive subgrid layout:
- On desktop (>768px): the `<h3>` heading spans `content-start / col4` (left column) and the `<details>` accordions span `col5 / content-end` (right column)
- On mobile: single column, stacked

### Template changes

The template must be updated to match the new category keys. Currently there are 8 `<nc-faq-section>` blocks; replace with 6.

**Important:** The first section has `background-color="transparent"` and the last has `class="last-item"` (adds bottom margin). Preserve these.

```html
<!-- BEFORE: 8 sections with keys: information, eligibility, application, scope, criteria, decision, support, timeline -->
<!-- AFTER: 6 sections with keys: program, eligibility, application, support, timeline, governance -->

<nc-faq-section background-color="transparent">
  <h3 class="h3">About the Incubator</h3>
  <nc-collapse name="program" v-for="item in faq.program" :key="item.summary" :data="item" />
</nc-faq-section>
<nc-faq-section>
  <h3 class="h3">Eligibility</h3>
  <nc-collapse name="eligibility" v-for="item in faq.eligibility" :key="item.summary" :data="item" />
</nc-faq-section>
<nc-faq-section>
  <h3 class="h3">Application Process</h3>
  <nc-collapse name="application" v-for="item in faq.application" :key="item.summary" :data="item" />
</nc-faq-section>
<nc-faq-section>
  <h3 class="h3">Support &amp; Resources</h3>
  <nc-collapse name="support" v-for="item in faq.support" :key="item.summary" :data="item" />
</nc-faq-section>
<nc-faq-section>
  <h3 class="h3">Timeline &amp; Key Dates</h3>
  <nc-collapse name="timeline" v-for="item in faq.timeline" :key="item.summary" :data="item" />
</nc-faq-section>
<nc-faq-section class="last-item">
  <h3 class="h3">Data Governance</h3>
  <nc-collapse name="governance" v-for="item in faq.governance" :key="item.summary" :data="item" />
</nc-faq-section>
```

### Complete placeholder FAQ data

```js
const faq = {
  program: [
    {
      summary: 'What is the New Commons Incubator?',
      content: `
        <!-- TODO(CCM-108): Replace with client copy — program description -->
        <p>[PLACEHOLDER] The New Commons Incubator is a 12-month programme run by the Open Data Policy Lab
           that supports teams in building and sustaining data commons for responsible AI development.
           It builds on the success of the New Commons Challenge by providing deeper, hands-on support.</p>
      `
    },
    {
      summary: 'What do Incubator participants receive?',
      content: `
        <!-- TODO(CCM-108): Replace with client copy — participant benefits -->
        <p>[PLACEHOLDER] Each selected team receives:</p>
        <ul>
          <li>Grant funding (amount TBD)</li>
          <li>Mentorship from experts in data governance and AI ethics</li>
          <li>Technical support for data infrastructure and platform development</li>
          <li>Access to the Open Data Policy Lab's global network</li>
        </ul>
      `
    },
    {
      summary: 'Who runs the Incubator?',
      content: `
        <!-- TODO(CCM-108): Replace with client copy — organisers -->
        <p>[PLACEHOLDER] The New Commons Incubator is an initiative of the
           <a href="https://opendatapolicylab.org/" target="_blank" rel="noopener">Open Data Policy Lab</a>,
           a collaboration between The GovLab at New York University and Microsoft.</p>
      `
    },
    {
      summary: 'How is the Incubator different from the Challenge?',
      content: `
        <!-- TODO(CCM-108): Replace with client copy — challenge vs incubator -->
        <p>[PLACEHOLDER] While the Challenge was a competitive prize programme that selected two winners,
           the Incubator takes a cohort-based approach, providing sustained support over 12 months to
           multiple teams working on data commons for responsible AI.</p>
      `
    },
  ],
  eligibility: [
    {
      summary: 'Who can apply to the Incubator?',
      content: `
        <!-- TODO(CCM-108): Replace with client copy — eligibility overview -->
        <p>[PLACEHOLDER] We welcome applications from nonprofits, academic institutions, startups,
           and development organisations working with data commons. Applicants must be affiliated
           with an established institution capable of managing funds.</p>
      `
    },
    {
      summary: 'Are there geographic restrictions?',
      content: `
        <!-- TODO(CCM-108): Replace with client copy — geographic eligibility -->
        <p>[PLACEHOLDER] The Incubator is a global programme. We welcome applications from
           organisations worldwide, though we may be unable to deliver support to entities
           subject to sanctions under U.S. law.</p>
      `
    },
    {
      summary: 'Can government agencies apply?',
      content: `
        <!-- TODO(CCM-108): Replace with client copy — government eligibility -->
        <p>[PLACEHOLDER] Government entities may not apply as lead applicants but may participate
           as collaborators or partners on a project.</p>
      `
    },
  ],
  application: [
    {
      summary: 'How do I apply?',
      content: `
        <!-- TODO(CCM-108): Replace with client copy — application process -->
        <p>[PLACEHOLDER] Applications are submitted through our online form. You will need to
           provide information about your organisation, your proposed data commons project,
           and a letter of institutional support.</p>
      `
    },
    {
      summary: 'What is the application deadline?',
      content: `
        <!-- TODO(CCM-108): Replace with client copy — deadline -->
        <p>[PLACEHOLDER] The application deadline is [DATE TBD]. Late applications will not
           be considered.</p>
      `
    },
    {
      summary: 'Can my organisation submit multiple applications?',
      content: `
        <!-- TODO(CCM-108): Replace with client copy — multiple applications -->
        <p>[PLACEHOLDER] Each organisation may submit one application. If you need to revise
           a submission, contact us at
           <a href="mailto:newcommons@opendatapolicylab.org">newcommons@opendatapolicylab.org</a>.</p>
      `
    },
  ],
  support: [
    {
      summary: 'What kind of mentorship is provided?',
      content: `
        <!-- TODO(CCM-108): Replace with client copy — mentorship details -->
        <p>[PLACEHOLDER] Selected teams are paired with mentors from the Open Data Policy Lab
           network who have expertise in data governance, AI ethics, and commons management.
           Mentorship sessions are held regularly throughout the 12-month programme.</p>
      `
    },
    {
      summary: 'What technical support is available?',
      content: `
        <!-- TODO(CCM-108): Replace with client copy — technical support -->
        <p>[PLACEHOLDER] Teams receive hands-on technical assistance with data infrastructure,
           interoperability standards, and platform development. The specifics are tailored
           to each team's needs and stage of development.</p>
      `
    },
  ],
  timeline: [
    {
      summary: 'What are the key dates for the 2026 Incubator?',
      content: `
        <!-- TODO(CCM-108): Replace with client copy — key dates -->
        <p>[PLACEHOLDER] Key dates:</p>
        <ul>
          <li><strong>[DATE TBD]</strong> — Applications open</li>
          <li><strong>[DATE TBD]</strong> — Applications close</li>
          <li><strong>[DATE TBD]</strong> — Cohort announced</li>
          <li><strong>[DATE TBD]</strong> — Programme begins</li>
        </ul>
      `
    },
    {
      summary: 'How long is the Incubator programme?',
      content: `
        <!-- TODO(CCM-108): Replace with client copy — programme duration -->
        <p>[PLACEHOLDER] The Incubator runs for approximately 12 months from the programme
           start date. Teams are expected to make significant progress on their data commons
           within this timeframe.</p>
      `
    },
  ],
  governance: [
    {
      summary: 'What governance structures are expected for data commons?',
      content: `
        <!-- TODO(CCM-108): Replace with client copy — governance expectations -->
        <p>[PLACEHOLDER] Applicants should articulate how their data commons will be
           responsibly governed, including who will be involved in oversight and strategic
           decisions about data access and use.</p>
      `
    },
    {
      summary: 'Are there specific data governance frameworks we should follow?',
      content: `
        <!-- TODO(CCM-108): Replace with client copy — governance frameworks -->
        <p>[PLACEHOLDER] While we do not mandate a specific framework, applicants may find it
           useful to refer to the Open Data Policy Lab's
           <a href="https://incubator.opendatapolicylab.org/files/data-commons-for-ai-blueprint.pdf" target="_blank" rel="noopener">
           Blueprint to Unlock New Data Commons for AI</a> for guidance on governance approaches.</p>
      `
    },
  ],
}
```

### Style changes

- None. Keep existing styles as-is. The `.title`, `.last-item`, `<nc-faq-section>`, and `<nc-collapse>` styles all work unchanged with the new content.

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

---

## 7. Risks & Edge Cases Discovered During Research

1. **`.cta-panel` white-text-on-light-background bug:** The `.cta-panel` class in `incubator/2026.vue` unconditionally sets `color: var(--white-color)`. If reused inside a `color="faded"` section (light grey background), text becomes invisible. The "Who Should Apply" section (2.4) must NOT use `.cta-panel` — use a plain `.switcher` instead.

2. **`ncTimeline.vue` hardcoded to exactly 4 items:** The `v-for="i in 4"` loop and the CSS gradient stops (`33.33%`) are designed for exactly 4 timeline cards. Refactoring to accept a prop requires updating both the loop and the progress bar CSS. If the Incubator timeline ends up with more or fewer than 4 items, the gradient-based progress bar breaks. Use solid colour for active segments.

3. **`ncTimeline.vue` uses `<ccm-base-section>`, not `<nc-base-section>`:** The timeline component wraps content in `<ccm-base-section>` (the lower-level grid primitive), while the rest of the page uses `<nc-base-section>` (the higher-level wrapper). This is intentional — `ncTimeline` manages its own grid column placement via the `.timeline` class. Do not change this.

4. **Offer cards layout — 4 cards in `.switcher` may stack wrong:** The `.switcher` utility is designed for 2-column layouts. With 4 `.offer-card` items, it would create 2 rows of 2 on desktop but may stack to 4 rows of 1 on mobile earlier than desired. Use a dedicated `.offer-cards` grid container instead of `.switcher` for the 4-card layout.

5. **`useSiteLinks()` removal from incubator page:** The composable is imported but only used for `rulesUrl` in the Prizes section being removed. Safe to remove the import. However, verify `useSiteLinks()` is not used elsewhere on this page before deleting — confirmed: it is only used once (line 118, `const { rulesUrl } = useSiteLinks()`).

6. **FAQ `name` attribute grouping:** Each `<nc-faq-section>` uses a different `name` value on `<nc-collapse>` (e.g., `name="challenge"`, `name="eligibility"`). This ensures that within each section, opening one accordion closes others. When changing category keys, the `name` values must match the new groupings (e.g., `name="program"`, `name="governance"`) to maintain this exclusive-open behaviour.

7. **Commented-out blog section on incubator page:** Line 114 of `incubator/2026.vue` has `<!--<nc-blog-section id="blog" :posts="blogposts" />-->`. This is currently commented out and there is no `blogposts` query in `<script setup>`. If this should be re-enabled for the Incubator page, a `useAsyncData` query (matching the homepage pattern) would need to be added. Plan assumes it stays commented out.
