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

### File

`components/ncInitiativeCard.vue`

---

## 2. Generalize `ncJudgesGrid.vue` with a `collection` Prop

### Current State

`ncJudgesGrid.vue` hard-imports `useJudges` and renders `ncBioCard` with `/judges#slug` URLs. `ncObserversGrid.vue` is a near-identical copy importing `useObservers` instead.

### Change

Add a `collection` prop so the same component can render judges, observers, steering committee members, or any future person collection.

```vue
<script setup>
import ncBioCard from './ncBioCard.vue'

const props = defineProps({
  collection: { type: Array, required: true },
  basePath: { type: String, default: '/judges' },
})
</script>

<template>
  <div class="grid">
    <ncBioCard
      v-for="person in collection"
      :key="person.slug"
      :judge="person"
      :url="`${basePath}#${person.slug}`"
    />
  </div>
</template>
```

### Migration Steps

1. Add `collection` and `basePath` props to `ncJudgesGrid.vue`.
2. Remove the hard-coded `useJudges()` import; instead receive data via prop.
3. Update all existing usages of `<ncJudgesGrid>` to pass `:collection="judges"` (the parent already has or can fetch the judges array).
4. Update `ncObserversGrid.vue` similarly, or replace its usages with `<ncJudgesGrid :collection="observers" base-path="/observers">` and delete `ncObserversGrid.vue`.

### Affected Files

- `components/ncJudgesGrid.vue` (modify)
- `components/ncObserversGrid.vue` (potentially delete)
- `pages/judges.vue` (update usage)
- `pages/observers.vue` (update usage)
- `pages/incubator/indigenous-languages.vue` (new, will use it)

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

### Assets

- Create `public/assets/steering-committee/` directory for headshot images.
- Placeholder image can reuse an existing fallback until real photos are provided.

### Open Question

Should this use Nuxt Content JSON files (`content/steering-committee/*.json`) instead of a JS composable? The existing judges/observers pattern uses composables, so this plan follows that convention for consistency. Switch to Content collections if the team prefers CMS-editable data.

---

## 4. New Page: Initiatives (`pages/initiatives.vue`)

### Route

`/initiatives`

### Layout

1. **Header section** (`<nc-base-section>`): subtitle brow "Our Initiatives", `<h1>` title, tagline paragraph. Follow the pattern from `pages/resources/index.vue`.
2. **Grid section** (`<nc-base-section>`): CSS grid of `<nc-initiative-card>` components. Two cards initially:
   - **The 2025 Challenge** — status: `"Completed"`, links to `/the-2025-challenge`.
   - **Indigenous Languages** — status: `"Active"` or `"Coming Soon"`, links to `/incubator/indigenous-languages`.

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
| 4 | Steering Committee | `<nc-base-section>` + `<nc-judges-grid>` | Uses generalized grid with `:collection="steeringCommittee"` and `base-path="/incubator/indigenous-languages"` |
| 5 | How to Apply | `<nc-base-section>` | Steps or prose with CTA button |
| 6 | Webinar CTA | `<nc-cta>` or `<nc-announcement>` | Styled call-to-action for upcoming webinar |
| 7 | Timeline | `<nc-timeline>` | Reuse existing component with new data array |
| 8 | FAQ CTA | `<nc-cta>` | Link to `/faq`, follow homepage pattern |

### Implementation Notes

- Follow the structure of `pages/incubator/2026.vue` for hero + content sections pattern.
- Partner logos in Panel 3: create simple `<img>` tags or small logo components. Store logo assets in `public/assets/partners/`.
- Timeline data: hardcoded array in `<script setup>` following the `{ date, event }` shape expected by `ncTimeline`.
- All content is placeholder until client provides final copy. Use the `<!-- TODO(CCM-128): ... -->` convention from CCM-108.

---

## 6. Populate Resources Page (`pages/resources/index.vue`)

### Current State

The page is fully functional with filtering, grid layout, and `ncResourceCard` rendering. It queries the `resources` Nuxt Content collection. The page works; it just needs content populated.

### Action

Add 6 resource entries to the Nuxt Content `resources` collection. Determine where existing resources are defined:

- Check for `content/resources/` directory or `content.config.ts` for the collection source.
- Each resource needs: `title`, `description`, `category`, `url` or `file`, `cover_image` (optional).

### Open Question

The resources collection source location needs to be confirmed. If it already has entries, this task is just "add more." If the collection is empty or stub, all 6 need to be created from scratch. The specific 6 resource links are TBD from client.

---

## 7. Homepage Initiatives Section Refactor

### Current State

`pages/index.vue` lines 52-68 have a hardcoded initiatives section with inline HTML cards and styles.

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

Remove the inline `.initiative-card` styles from `index.vue` `<style>` block (lines 179-218) since styling moves into the component.

---

## Implementation Order

1. **`ncInitiativeCard.vue`** — no dependencies, enables everything else.
2. **Generalize `ncJudgesGrid.vue`** — prerequisite for Indigenous Languages page.
3. **`composables/useSteeringCommittee.js`** — prerequisite for Indigenous Languages page.
4. **`pages/initiatives.vue`** — uses `ncInitiativeCard`.
5. **`pages/incubator/indigenous-languages.vue`** — uses generalized grid + timeline + new composable.
6. **Homepage refactor** — swap inline cards for `ncInitiativeCard`.
7. **Resources population** — independent, can happen in parallel.

---

## Files Created

| File | Type |
|------|------|
| `components/ncInitiativeCard.vue` | New component |
| `composables/useSteeringCommittee.js` | New composable |
| `pages/initiatives.vue` | New page |
| `pages/incubator/indigenous-languages.vue` | New page |

## Files Modified

| File | Change |
|------|--------|
| `components/ncJudgesGrid.vue` | Add `collection` + `basePath` props, remove hardcoded import |
| `pages/index.vue` | Replace inline initiative cards with `<nc-initiative-card>` |
| `pages/judges.vue` | Pass `:collection` prop to updated grid |
| `pages/observers.vue` | Pass `:collection` prop or switch to generalized grid |
| `content/resources/*.json` (or equivalent) | Add 6 resource entries |

## Files Potentially Deleted

| File | Reason |
|------|--------|
| `components/ncObserversGrid.vue` | Redundant after `ncJudgesGrid` generalization |
| `composables/useObservers.js` | Only if observer data moves elsewhere (optional) |

---

## Out of Scope (completed in CCM-127)

- `ncFooter.vue` changes
- `ncTopbar.vue` changes
- `ncLogoHeader.vue` / `ncLogoFooter.vue` changes

---

## Open Questions

1. **Steering Committee data:** Who are the members? Bios, headshots, titles needed. Use placeholder composable until provided.
2. **Indigenous Languages page copy:** All 8 panels need final content from client. Build structure with placeholder text.
3. **Resources content:** What are the 6 specific resource links, titles, and categories? Blocked on client input.
4. **Partner logos for Programmatic Offerings:** Which partners should be displayed? Logo assets needed.
5. **Rename `ncJudgesGrid` to `ncPeopleGrid`?** Since it is being generalized, a rename would be clearer. Trade-off: more files to update. Recommend renaming.
6. **`ncBioCard` prop name:** Currently uses `judge` as the prop name. When used for steering committee members this is misleading. Consider renaming to `person` (breaking change across usages).
7. **Indigenous Languages status:** Should it launch as "Coming Soon" or "Active"?
8. **Webinar URL and application form URL:** Needed for CTAs on the Indigenous Languages page. Use `#` placeholders until provided.
