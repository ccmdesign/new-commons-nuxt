# CCM-128: Map New Pages, Reusable Components, and New Components — Implementation Plan

## Overview

Add two new pages (Initiatives listing, Indigenous Languages), populate the existing Resources stub, create a reusable `ncInitiativeCard` component, refactor the homepage initiatives section to use it, and generalize `ncJudgesGrid` to accept any person collection (for the Steering Committee). Footer, topbar, and logo changes were completed in CCM-127 and are out of scope.

---

## 1. New Component: `ncInitiativeCard.vue`

### Purpose

Reusable card for initiative listings (used on both `/initiatives` and the homepage initiatives section).

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `String` | yes | Initiative name |
| `description` | `String` | yes | Short summary |
| `status` | `String` | no | Badge text (e.g. `"Active"`, `"Coming Soon"`, `"Completed"`) |
| `to` | `String` | no | Route or URL for CTA link. If omitted, card renders as a non-clickable `<div>`. |
| `image` | `String` | no | Image path. Falls back to `/assets/patterns/hero.jpg`. |

### Design Notes

- Follow the card pattern established by `ncBlogCard` and `ncResourceCard`: white background, `border-radius: var(--border-radius-l)`, subtle outline, hover shadow when clickable.
- Status badge: small uppercase pill in the top-right or top-left of the card image area. Color should vary by status value (use a simple map: `Active` = primary, `Coming Soon` = muted, `Completed` = base).
- Render as `<NuxtLink>` when `to` is provided; otherwise `<div>`.
- Image uses `aspect-ratio: 16 / 9; object-fit: cover` matching existing cards.

### Verified Card Patterns to Match

> **Source verification (2026-03-30):** Both `ncBlogCard.vue` and `ncResourceCard.vue` confirmed.

The new component should replicate these shared conventions exactly:

| Token | Value (from ncBlogCard / ncResourceCard) |
|-------|------------------------------------------|
| Container outline | `outline: 1px solid var(--black-color-10-tint)` |
| Container background | `background-color: white` |
| Container padding | `var(--space-xs)` |
| Container border-radius | `var(--border-radius-l)` |
| Stack spacing | `--_stack-space: var(--space-xs)` |
| Image border-radius | `var(--border-radius-s)` |
| Image aspect-ratio | `16 / 9` |
| Hover shadow | `box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08)` |
| CTA text style | `font-weight: 600; color: var(--primary-color)` |
| Layout | `display: flex; flex-direction: column; height: 100%` |

**Key difference from ncBlogCard:** ncBlogCard always renders as `<NuxtLink>`. ncResourceCard uses a dynamic `<component :is="...">` pattern for conditional linking — **follow the ncResourceCard pattern** for the initiative card since `to` is optional. However, use `<NuxtLink>` (not `<a>`) for internal routes:

```vue
<component
  :is="to ? resolveComponent('NuxtLink') : 'div'"
  class="initiative-card | stack"
  :to="to || undefined"
>
```

**Status badge implementation:** Use the `ncResourceCard` category badge pattern (`resource-card__category`) as the visual base — `font-size: var(--size--1); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em` — but position absolutely over the image with a background color. Status color map:

```scss
.initiative-card__status { /* base styles */ }
.initiative-card__status[data-status="active"] { background-color: var(--primary-color); color: white; }
.initiative-card__status[data-status="coming-soon"] { background-color: var(--base-color-07-tint); color: var(--base-color-70-tint); }
.initiative-card__status[data-status="completed"] { background-color: var(--base-color); color: white; }
```

### File

`components/ncInitiativeCard.vue`

---

## 2. Generalize `ncJudgesGrid.vue` with a `collection` Prop

### Current State (Verified 2026-03-30)

`ncJudgesGrid.vue` hard-imports `useJudges` and renders `ncBioCard` with `/judges#slug` URLs. `ncObserversGrid.vue` is a near-identical copy importing `useObservers` instead.

**Actual current code for `ncJudgesGrid.vue`:**
```vue
<template>
  <div class="grid">
    <ncBioCard
      v-for="(judge, i) in judges"
      :key="judge.name"
      :judge="judge"
      :url="`/judges#${judge.slug}`"
    />
  </div>
</template>

<script setup>
import useJudges from '../composables/useJudges'
import ncBioCard from './ncBioCard.vue'

const judges = useJudges()
</script>
```

### ncBioCard API (Verified)

Props:
- `judge` — `Object, required` — expects `{ name, description, img, slug, bio }`
- `url` — `String, required` — link for "Read More" button

**CRITICAL: ncBioCard hardcodes image paths as `/assets/judges/${judge.img}`.**
This means any non-judge person data (observers, steering committee) must either:
1. Store images in `/public/assets/judges/` (messy), or
2. **Refactor ncBioCard** to accept a configurable `imageBasePath` prop, or
3. Have each person object include a full image path (e.g., `img: '/assets/steering-committee/photo.jpg'`) and update ncBioCard to detect absolute paths.

**Recommended approach:** Add an optional `imageBasePath` prop to `ncBioCard` (default: `/assets/judges/`). This is the smallest change with the cleanest result:

```vue
<!-- ncBioCard.vue change -->
<script setup>
defineProps({
  judge: { type: Object, required: true },
  url: { type: String, required: true },
  imageBasePath: { type: String, default: '/assets/judges/' },
})
</script>

<template>
  <img :src="`${imageBasePath}${judge.img}`" :alt="judge.name">
  <!-- ... rest unchanged ... -->
</template>
```

### Change

Add a `collection` prop so the same component can render judges, observers, steering committee members, or any future person collection.

```vue
<script setup>
import ncBioCard from './ncBioCard.vue'

const props = defineProps({
  collection: { type: Array, required: true },
  basePath: { type: String, default: '/judges' },
  imageBasePath: { type: String, default: '/assets/judges/' },
})
</script>

<template>
  <div class="grid">
    <ncBioCard
      v-for="person in collection"
      :key="person.slug"
      :judge="person"
      :url="`${basePath}#${person.slug}`"
      :image-base-path="imageBasePath"
    />
  </div>
</template>
```

### Migration Steps

1. Add `imageBasePath` prop to `ncBioCard.vue` and update the `<img>` src template.
2. Add `collection`, `basePath`, and `imageBasePath` props to `ncJudgesGrid.vue`.
3. Remove the hard-coded `useJudges()` import; instead receive data via prop.
4. Update all existing usages of `<ncJudgesGrid>` to pass `:collection="judges"` (the parent already has or can fetch the judges array).
5. Update `ncObserversGrid.vue` similarly, or replace its usages with `<ncJudgesGrid :collection="observers" base-path="/observers">` and delete `ncObserversGrid.vue`.

### Usage Verification (2026-03-30)

**`pages/judges.vue`** — Does NOT use `ncJudgesGrid`. It imports `useJudges` directly and renders its own full-width bio layout with `switcher` class. The grid component is only used elsewhere (likely the homepage or challenge pages). **Search the full codebase for `ncJudgesGrid` and `ncObserversGrid` usage before modifying.**

**`pages/observers.vue`** — Same pattern: imports `useObservers` directly, renders its own layout. Does NOT use `ncObserversGrid` either.

**Important:** The `pages/judges.vue` and `pages/observers.vue` pages are detail pages (full bio with large image + text). They use the composable directly and do NOT need modification for the grid generalization. The grid components are used for card-style grids on other pages (e.g., challenge page, homepage). Confirm actual usages before proceeding.

### Affected Files

- `components/ncBioCard.vue` (add `imageBasePath` prop)
- `components/ncJudgesGrid.vue` (add `collection` + `basePath` + `imageBasePath` props, remove hardcoded import)
- `components/ncObserversGrid.vue` (potentially delete)
- Any page/component that currently uses `<ncJudgesGrid>` or `<ncObserversGrid>` (find with grep)
- `pages/incubator/indigenous-languages.vue` (new, will use it)

### Rename Decision

**Recommend: YES, rename to `ncPeopleGrid.vue`.** Since `pages/judges.vue` and `pages/observers.vue` do NOT use the grid component, the rename only affects whichever pages embed the card grid. The word "judges" in the component name will confuse future developers when it renders steering committee members.

---

## 3. New Content Collection: Steering Committee

### Structure

Create a composable following the `useJudges.js` pattern (hardcoded array export).

**File:** `composables/useSteeringCommittee.js`

```js
export const steeringCommittee = [
  {
    name: "TBD",
    slug: "tbd",
    description: "Title, Organization",
    img: "placeholder.jpg",
    bio: "Bio text here."
  },
  // ...
]

export default function useSteeringCommittee() {
  return steeringCommittee
}
```

### Verified Data Shape (2026-03-30)

The `useJudges.js` composable exports objects with exactly these fields:
- `name` (String) — full name
- `slug` (String) — URL-safe name
- `description` (String) — title and organization (displayed in italic)
- `img` (String) — filename only (e.g., `"schroeder.jpg"`), resolved by ncBioCard as `/assets/judges/{img}`
- `bio` (String) — full paragraph bio text

`useObservers.js` uses the identical shape.

**The steering committee composable MUST match this shape** for compatibility with `ncBioCard`. The `img` field should be filename-only (not a full path) since `ncBioCard` will prepend the `imageBasePath`.

### Assets

- Create `public/assets/steering-committee/` directory for headshot images.
- Placeholder image: use a copy or symlink from an existing judge photo, or create a generic placeholder.
- **Note:** `public/assets/judges/` already exists with all judge headshot images. The steering committee directory should follow the same naming convention (lowercase, `.jpg`).

### Content vs. Composable Decision

**Verified (2026-03-30):** There is a dual system in this project:
1. **Directus CMS → JSON files** (`content.config.ts` defines collections, `directus/*.js` importers fetch from Directus API and write to `content/*.json`). Used for: blogposts, winners, judges (CMS), resources.
2. **Hardcoded composables** (`composables/useJudges.js`, `composables/useObservers.js`). Used for: judges (with bios), observers.

The judges collection exists in BOTH systems — the Directus importer creates `content/judges/*.json` for card data, while the composable has the full bios. This is intentional: cards use Directus data, full bio pages use the composable.

**For the steering committee:** Follow the composable pattern since:
- No Directus collection exists for steering committee
- Creating one requires Directus admin access and a new importer
- The composable pattern is simpler for initial placeholder content
- If Directus integration is later desired, create `directus/steeringCommittee.js` following `directus/judges.js`

---

## 4. New Page: Initiatives (`pages/initiatives.vue`)

### Route

`/initiatives`

### Layout

1. **Header section** (`<nc-base-section>`): subtitle brow "Our Initiatives", `<h1>` title, tagline paragraph. Follow the pattern from `pages/resources/index.vue`.
2. **Grid section** (`<nc-base-section>`): CSS grid of `<nc-initiative-card>` components. Two cards initially:
   - **The 2025 Challenge** — status: `"Completed"`, links to `/the-2025-challenge`.
   - **Indigenous Languages** — status: `"Active"` or `"Coming Soon"`, links to `/incubator/indigenous-languages`.

### Verified Header Pattern (2026-03-30)

From `pages/resources/index.vue`, the header section uses these specific class names and CSS tokens:

```html
<nc-base-section id="initiatives-header">
  <h4 class="subtitle">Our Initiatives</h4>
  <h1 class="title">Initiatives</h1>
  <p class="tagline">Explore New Commons initiatives supporting data commons for responsible AI.</p>
</nc-base-section>
```

CSS (copy from resources page):
```css
.subtitle {
  font-size: var(--size-0);
  color: var(--primary-color);
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: var(--space-xs-s);
}
.title {
  margin-bottom: var(--space-l-xl);
  font-weight: 600;
  font-size: var(--size-4);
}
.tagline {
  font-size: var(--size-1);
  color: var(--base-color-70-tint);
  font-weight: 300;
}
```

### Grid Layout

Use the same grid pattern from the homepage initiatives section:

```css
.initiatives-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--base-gutter);
}
```

### Data

Hardcoded array in `<script setup>` (only two items, no need for a collection or composable):

```js
const initiatives = [
  {
    title: 'The 2025 Challenge',
    description: 'The inaugural New Commons Challenge awarded two $100,000 prizes to teams building data commons for responsible AI development.',
    status: 'Completed',
    to: '/the-2025-challenge',
    image: '/assets/patterns/hero.jpg',
  },
  {
    title: 'Indigenous Languages',
    description: 'Supporting the development of data commons that preserve and promote indigenous languages in the age of AI.',
    status: 'Coming Soon',
    to: '/incubator/indigenous-languages',
    image: '/assets/patterns/hero.jpg',
  },
]
```

### SEO

```js
useHead({ title: 'Initiatives | New Commons' })
useSeoMeta({ description: 'Explore New Commons initiatives supporting data commons for responsible AI.' })
```

---

## 5. New Page: Indigenous Languages (`pages/incubator/indigenous-languages.vue`)

### Route

`/incubator/indigenous-languages`

### Panels (top to bottom)

| # | Section | Component(s) | Notes |
|---|---------|-------------|-------|
| 1 | Hero | `<nc-hero>` | Title, description, optional CTA button |
| 2 | Why Section | `<nc-base-section>` | Prose explaining the initiative's purpose |
| 3 | Programmatic Offerings | `<nc-base-section>` | List of offerings + partner logo grid |
| 4 | Steering Committee | `<nc-base-section>` + `<nc-judges-grid>` (or `<nc-people-grid>`) | Uses generalized grid with `:collection="steeringCommittee"` and `base-path="/incubator/indigenous-languages"` and `image-base-path="/assets/steering-committee/"` |
| 5 | How to Apply | `<nc-base-section>` | Steps or prose with CTA button |
| 6 | Webinar CTA | `<nc-announcement>` | Styled call-to-action for upcoming webinar |
| 7 | Timeline | `<nc-timeline>` | Reuse existing component with new data array |
| 8 | FAQ CTA | `<nc-cta>` | Link to `/faq`, follow homepage pattern |

### Implementation Notes — Verified Against Existing Code (2026-03-30)

**Follow `pages/incubator/2026.vue` structure** — this is the closest existing page. It uses:
- `<nc-hero>` with a `<div class="hero__content"><div class="panel">` structure for the hero
- `<nc-announcement>` nested inside `<nc-hero>` for the CTA banner below the hero
- `<nc-base-section>` for content sections, with `color="faded"` for alternating backgrounds
- `<nc-button>` for CTAs
- `useHead()` + `useSeoMeta()` for SEO

**Panel 1 — Hero:** `<nc-hero>` is a slot-based wrapper (no props). It provides grid layout and styles for `h1` and `.panel` content. Structure:

```vue
<nc-hero>
  <div class="hero__content">
    <div class="panel">
      <p class="hero__brow">The New Commons Incubator</p>
      <h1>Indigenous Languages</h1>
      <p>Description text...</p>
      <nc-button to="#apply" color="base" variant="primary">Apply Now</nc-button>
    </div>
  </div>
  <nc-announcement color="primary" class="hero__announcement">
    <!-- optional webinar banner -->
  </nc-announcement>
</nc-hero>
```

**Panel 3 — Programmatic Offerings:** Follow the `2026.vue` pattern with `<ul><li>` inside a `<div class="switcher">` wrapper. Partner logos: use `<img>` tags in a flex/grid container. Store in `public/assets/partners/`.

**Panel 4 — Steering Committee:** The `imageBasePath` prop is critical here. Without it, `ncBioCard` will look for images in `/assets/judges/` instead of `/assets/steering-committee/`. See Section 2 above.

**Panel 6 — Webinar CTA:** `<nc-announcement>` accepts a `color` prop (validated: `'primary' | 'base' | 'accent' | 'success' | 'info' | 'cancel'`) and a `content` string prop OR a default slot. The plan originally mentioned `<nc-cta>` — but `<nc-announcement>` is better suited for a banner-style CTA. `<nc-cta>` is a two-column (or single-column) layout wrapper, not a styled banner. Use `<nc-announcement>` for the webinar banner and `<nc-cta :single-column="true">` for the FAQ block.

**Panel 7 — Timeline:** `<nc-timeline>` is currently **marked as unused** with a `TODO: [CCM-127]` comment. It wraps `<ccm-base-section>` (NOT `<nc-base-section>`), so it uses the legacy `background-color` prop system. It accepts:
- `timeline` — `Array` of `{ date: String, event: String }` — date is parsed by `new Date()`, so use ISO 8601 strings (e.g., `'2026-06-15T09:00:00-07:00'`)
- `title` — `String`, default `'Timeline'`
- `subtitle` — `String`, default `''`
- Has a validator: `val.every(item => 'date' in item && 'event' in item)`
- Dates render with `Canada/Pacific` timezone — confirm if this is correct for the Indigenous Languages initiative or if timezone should be parameterized.
- Active/full states are date-based: cards in the past show as "active" with primary color dot.

**Timeline data shape example:**
```js
const timelineData = [
  { date: '2026-06-01T09:00:00-07:00', event: 'Applications Open' },
  { date: '2026-07-15T17:00:00-07:00', event: 'Application Deadline' },
  { date: '2026-08-01T09:00:00-07:00', event: 'Cohort Announced' },
  { date: '2026-09-01T09:00:00-07:00', event: 'Programme Begins' },
]
```

**Panel 8 — FAQ CTA:** Follow the exact homepage pattern from `pages/index.vue` lines 36–50, which uses `<nc-cta :single-column="true">` with a `.cta-panel` div containing a `.panel-header` styled block.

---

## 6. Populate Resources Page (`pages/resources/index.vue`)

### Current State (Verified 2026-03-30)

The page is fully functional with filtering, grid layout, and `ncResourceCard` rendering. It queries the `resources` Nuxt Content collection via `queryCollection('resources').all()`.

### Content Pipeline (Verified)

Resources use the **Directus CMS pipeline**:
1. `directus/resources.js` fetches from Directus API (`new_commons_resources` table)
2. Writes JSON files to `content/resources/*.json`
3. `content.config.ts` defines the `resources` collection reading from `resources/*.json`

Schema fields (from `content.config.ts`):
- `title` (String, required)
- `slug` (String, required)
- `description` (String, required)
- `category` (String, optional)
- `url` (String, optional)
- `file` (String, optional)
- `cover_image` (String, optional)

### Action

**There are two approaches:**

1. **Preferred: Add resources in Directus CMS** and re-run `node contentImporter.js`. This generates the JSON files automatically and is the canonical content workflow.
2. **Fallback: Manually create `content/resources/*.json` files.** The `content/` directory does not currently exist in the worktree (it is `.gitignore`d or generated at build time). Create it manually if Directus is unavailable.

**Important:** The `content/` directory is NOT checked into the worktree. It is generated by `contentImporter.js` at build time. Adding resources means either:
- Adding them in Directus (preferred)
- OR committing static JSON files to `content/resources/` and ensuring the build doesn't wipe them

### Resource JSON example:

```json
{
  "title": "Data Commons Framework",
  "slug": "data-commons-framework",
  "description": "A practical guide for building and governing shared data resources.",
  "category": "Toolkits",
  "url": "https://example.com/resource",
  "cover_image": ""
}
```

### Open Question

The resources collection source location needs to be confirmed. ~~If it already has entries, this task is just "add more."~~ **Confirmed:** Resources come from Directus CMS (`new_commons_resources` table). The 6 resource entries should be added in Directus, then imported. If Directus access is unavailable, create JSON files directly in `content/resources/`.

---

## 7. Homepage Initiatives Section Refactor

### Current State (Verified 2026-03-30)

`pages/index.vue` lines 52-68 have a hardcoded initiatives section with inline HTML cards and styles. The current implementation has:
- A `<NuxtLink>` card for "The 2025 Challenge" (clickable)
- A `<div>` card for "Indigenous Languages" with `initiative-card--placeholder` class and "Coming Soon" badge (non-clickable)
- Inline styles on lines 179-218 (`.initiatives-cards`, `.initiative-card`, `.initiative-card--placeholder`, `.initiative-card__coming-soon`, `.initiative-card__image`)

### Change

Replace the inline cards with `<nc-initiative-card>` components, using the same hardcoded data array from the Initiatives page (or import a shared constant).

```html
<nc-base-section id="initiatives">
  <h2>Initiatives</h2>
  <div class="initiatives-cards">
    <nc-initiative-card
      v-for="initiative in initiatives"
      :key="initiative.title"
      v-bind="initiative"
    />
  </div>
</nc-base-section>
```

### Cleanup

Remove the inline styles from `index.vue` `<style>` block:
- `.initiatives-cards` (line 179-183) — **KEEP** the grid layout definition, OR move it into the parent `<nc-base-section>` if the initiative card handles its own container.
- `.initiative-card` (lines 185-193) — DELETE, moved into component.
- `.initiative-card:hover:not(.initiative-card--placeholder)` (lines 195-197) — DELETE.
- `.initiative-card--placeholder` (lines 199-201) — DELETE.
- `.initiative-card__coming-soon` (lines 204-210) — DELETE.
- `.initiative-card__image` (lines 213-218) — DELETE.

**Keep `.initiatives-cards` grid definition** in `index.vue` since the grid layout is page-specific (the initiatives page may use different column widths).

### Data Array for Script Setup

Add to `<script setup>`:
```js
const initiatives = [
  {
    title: 'The 2025 Challenge',
    description: 'The inaugural New Commons Challenge awarded two $100,000 prizes to teams building data commons for responsible AI development.',
    status: 'Completed',
    to: '/the-2025-challenge',
    image: '/assets/patterns/hero.jpg',
  },
  {
    title: 'Indigenous Languages',
    description: 'Supporting the development of data commons that preserve and promote indigenous languages in the age of AI.',
    status: 'Coming Soon',
    to: '/incubator/indigenous-languages',
    image: '/assets/patterns/hero.jpg',
  },
]
```

---

## Implementation Order

1. **`ncBioCard.vue` — add `imageBasePath` prop** — prerequisite for grid generalization. Small, safe change.
2. **`ncInitiativeCard.vue`** — no dependencies, enables everything else.
3. **Generalize `ncJudgesGrid.vue`** (or rename to `ncPeopleGrid.vue`) — prerequisite for Indigenous Languages page.
4. **`composables/useSteeringCommittee.js`** — prerequisite for Indigenous Languages page.
5. **`pages/initiatives.vue`** — uses `ncInitiativeCard`.
6. **`pages/incubator/indigenous-languages.vue`** — uses generalized grid + timeline + new composable.
7. **Homepage refactor** — swap inline cards for `ncInitiativeCard`.
8. **Resources population** — independent, can happen in parallel. Requires Directus access or manual JSON creation.

---

## Files Created

| File | Type |
|------|------|
| `components/ncInitiativeCard.vue` | New component |
| `composables/useSteeringCommittee.js` | New composable |
| `pages/initiatives.vue` | New page |
| `pages/incubator/indigenous-languages.vue` | New page |
| `public/assets/steering-committee/` | New directory (headshot images) |
| `public/assets/partners/` | New directory (partner logos) |

## Files Modified

| File | Change |
|------|--------|
| `components/ncBioCard.vue` | Add `imageBasePath` prop, update `<img>` src template |
| `components/ncJudgesGrid.vue` | Add `collection` + `basePath` + `imageBasePath` props, remove hardcoded import. Optionally rename to `ncPeopleGrid.vue`. |
| `pages/index.vue` | Replace inline initiative cards with `<nc-initiative-card>`, add data array, remove orphaned styles |
| Any page using `<ncJudgesGrid>` or `<ncObserversGrid>` | Pass `:collection` prop (find with grep first) |

## Files Potentially Deleted

| File | Reason |
|------|--------|
| `components/ncObserversGrid.vue` | Redundant after `ncJudgesGrid` generalization |

---

## Risks and Edge Cases

### 1. ncBioCard Hardcoded Image Path (HIGH)
`ncBioCard.vue` line 3: `:src="/assets/judges/${judge.img}"` — this breaks for any non-judge collection. **Must add `imageBasePath` prop before using ncBioCard for steering committee.** Without this, images will 404.

### 2. ncTimeline Uses Legacy Base Component (MEDIUM)
`ncTimeline.vue` wraps `<ccm-base-section>` (the legacy component), not `<nc-base-section>`. It uses `background-color="gray"` prop. This works but means the timeline section has different prop semantics than the rest of the page. No action needed, but be aware.

### 3. ncTimeline Hardcoded Timezone (LOW)
`ncTimeline.vue` formats all dates in `Canada/Pacific` timezone. If the Indigenous Languages initiative operates in a different timezone, dates will display incorrectly. Consider making timezone a prop if needed.

### 4. content/ Directory Not in Version Control (MEDIUM)
The `content/` directory is generated by `contentImporter.js` from Directus at build time. It is not committed. Resources population requires either Directus access or a workflow change to commit static JSON.

### 5. ncJudgesGrid/ncObserversGrid Usage Unknown (MEDIUM)
`pages/judges.vue` and `pages/observers.vue` do NOT use the grid components — they render their own layouts. The grid components are used somewhere else (possibly the challenge page or via dynamic imports). **Must grep the full codebase** for `ncJudgesGrid` and `ncObserversGrid` usage before refactoring.

### 6. Duplicate Data Between Composable and Directus (LOW)
Judges exist in both `composables/useJudges.js` (with bios) and `directus/judges.js` (CMS import for cards). The steering committee composable follows the composable-only pattern. If it later needs CMS integration, both a Directus table and an importer must be created.

### 7. ncBioCard Prop Name `judge` (LOW)
The prop is named `judge` but will receive steering committee members. Renaming to `person` is a breaking change across all usages. **Recommend deferring** this rename — it is cosmetic and can be done in a follow-up ticket.

---

## Out of Scope (completed in CCM-127)

- `ncFooter.vue` changes
- `ncTopbar.vue` changes
- `ncLogoHeader.vue` / `ncLogoFooter.vue` changes

---

## Open Questions

1. **Steering Committee data:** Who are the members? Bios, headshots, titles needed. Use placeholder composable until provided.
2. **Indigenous Languages page copy:** All 8 panels need final content from client. Build structure with placeholder text.
3. **Resources content:** What are the 6 specific resource links, titles, and categories? Blocked on client input. **Confirmed: resources must be added via Directus CMS or manual JSON in `content/resources/`.**
4. **Partner logos for Programmatic Offerings:** Which partners should be displayed? Logo assets needed.
5. **Rename `ncJudgesGrid` to `ncPeopleGrid`?** Since it is being generalized, a rename would be clearer. **Recommended: YES.** `pages/judges.vue` does not use it, so the rename has limited blast radius.
6. **`ncBioCard` prop name:** Currently uses `judge` as the prop name. When used for steering committee members this is misleading. **Recommend deferring** rename to a follow-up ticket to minimize blast radius.
7. **Indigenous Languages status:** Should it launch as "Coming Soon" or "Active"?
8. **Webinar URL and application form URL:** Needed for CTAs on the Indigenous Languages page. Use `#` placeholders until provided.
9. **(NEW) ncTimeline timezone:** Should dates display in `Canada/Pacific` or a different timezone for the Indigenous Languages initiative?
10. **(NEW) ncJudgesGrid actual usages:** Need to grep the full repo (not just the worktree) to find all pages that embed the grid before refactoring.
