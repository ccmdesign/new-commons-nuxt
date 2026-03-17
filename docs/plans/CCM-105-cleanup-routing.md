# CCM-105: Cleanup & Routing Architecture

> **Plan deepened on 2026-03-17** — every file referenced below was re-read and verified against the actual codebase. Line numbers, prop defaults, and cross-references have been confirmed accurate.

## Execution Order

Tasks are grouped by sub-task. Dependencies are noted where relevant.

**Recommended order:** 1.1 -> 1.2 -> 1.3 -> 1.4 -> 2.1
(1.1 through 1.3 are independent and can be parallelized; 1.4 and 2.1 depend on each other since the redirect `/the-incubator -> /incubator/2026` requires the destination page from 2.1 to exist first.)

**Critical implementation note:** Task 2.1 (creating `/incubator/2026` and `/the-2025-challenge`) MUST be completed and deployed BEFORE Task 1.4 (redirects). Enabling redirects to non-existent pages will 404.

---

## 1.1 Dead Code Removal

### Task 1.1.1 — Remove legacy Contentful config from `nuxt.config.ts`

**File:** `nuxt.config.ts` (lines 14-19)

**What to change:** Delete the entire `runtimeConfig` block containing `contentfulSpace` and `contentfulToken`. These reference Contentful environment variables from a prior CMS setup. The project now uses Directus + Nuxt Content.

**Exact change:** Delete lines 14-19:
```ts
// DELETE:
  runtimeConfig: {
    public: {
      contentfulSpace: process.env.CONTENTFUL_SPACE_ID || '',
      contentfulToken: process.env.CONTENTFUL_ACCESS_TOKEN || ''
    }
  },
```

**Why:** Dead config from a previous CMS. No other file references `contentfulSpace` or `contentfulToken`.

**Verification confirmed (2026-03-17):** Grep for `contentfulSpace`, `contentfulToken`, and `CONTENTFUL` across the entire codebase returns only `nuxt.config.ts`. Safe to remove.

---

### Task 1.1.2 — Remove unused Pinia store `stores/video.ts`

**File:** `stores/video.ts` (entire file, delete)

**What to change:** Delete the file. No component or composable imports `useVideoStore`. The project uses `composables/useVideos.js` instead (a simple array lookup, not a Pinia store).

**Why:** The store is an artifact from a prior project (references "workstreams" like democracy, politics-society, future-of-work, digital-economy — none of which exist in New Commons). No file imports from `stores/video.ts`.

**Pinia removal decision (RESOLVED):** Yes, Pinia should be fully removed from `package.json`. Here is the evidence:
- `stores/video.ts` is the **only** file that imports from `pinia` in the entire codebase
- `@pinia/nuxt` is **not** listed in the `modules` array in `nuxt.config.ts` (line 10 lists: `@nuxt/content`, `@nuxtjs/sitemap`, `@nuxtjs/robots`, `nuxt-gtag`, `@weareheavy/nuxt-cookie-consent`)
- No component, page, or composable imports `useVideoStore` or any Pinia API
- Therefore, after deleting `stores/video.ts`, both `pinia` (line 28 of package.json) and `@pinia/nuxt` (line 18 of package.json) become unused dead dependencies

**Exact changes:**
1. Delete `stores/video.ts`
2. In `package.json`, remove these two lines from `dependencies`:
   - `"@pinia/nuxt": "^0.11.0",` (line 18)
   - `"pinia": "^3.0.2",` (line 26 — **corrected from original plan which said line 28**)
3. Run `npm install` to update `package-lock.json`

**Post-removal verification:** Run `npm run build` to confirm no Nuxt auto-import or plugin resolution tries to load Pinia. Since `@pinia/nuxt` is NOT in the `modules` array (line 10), Nuxt will not attempt to initialize it.

---

### Task 1.1.3 — Remove orphaned pages

**Files to delete:**
- `pages/prize2.vue` — Earlier iteration of the prize page. Contains placeholder "Apply now" buttons and no real content beyond what `prize.vue` already has.
- `pages/prize-detail.vue` — Stub page with only `<h1>Prize Detail</h1>`. Never linked from anywhere.
- `pages/event.vue` — Contains lorem ipsum and references to "2024 Kluz Prize for PeaceTech" — a completely different project. The event nav link is already commented out in `ncTopbar.vue` (line 10).

**Why:** These pages are reachable via URL but show stale/broken content. Removing them prevents confusion and accidental indexing.

**Verification confirmed:** Grep for `/prize2`, `/prize-detail`, and `/event` across the codebase found:
- `/prize2` — zero references outside the plan doc
- `/prize-detail` — zero references outside the plan doc
- `/event` — only the commented-out nav link in `ncTopbar.vue` line 10: `<!--<li><nc-button el="a" href="/event" ...>Event</nc-button></li>-->`

**`/event` redirect decision (RESOLVED):** No redirect needed. The event page contains content from a completely different project ("2024 Kluz Prize for PeaceTech"), the nav link is already commented out, and there is no evidence of external links to this page. Simply delete the file. If a redirect is ever desired later, it can be added trivially.

**Additional cleanup:** After deleting `event.vue`, also remove commented-out nav links from `ncTopbar.vue`:
```html
<!-- DELETE line 10 (event link): -->
<!--<li><nc-button el="a" href="/event" color="base" variant="link">Event</nc-button></li>-->

<!-- DELETE line 15 (apply link): -->
<!--<li><nc-button el="a" href="/apply" color="primary" variant="primary">Apply Now</nc-button></li>-->
```
**Note (added 2026-03-17):** Line 15 has a second commented-out link for "Apply Now" that the original plan missed. Remove both commented-out lines in the same pass.

**Additional note on `event.vue`:** The `event.vue` script block queries the `winners` collection using the shared `useAsyncData` key `'winners'` — the same key used by `pages/winners/index.vue`. This could cause data cache collisions in the SPA if both pages were visited in the same session. Deleting `event.vue` eliminates this latent bug.

---

### Task 1.1.4 — Clean up `composables/utils.js`

**File:** `composables/utils.js` (lines 1-2)

**What to change:** Replace the `defaultDescription` and `defaultTitle` constants with New Commons values.

**Exact change on lines 1-2:**
```js
// REPLACE:
const defaultDescription = 'Our documentary films provide an intimate portrait of the economic, political, and social challenges facing the United States and Europe today.'
const defaultTitle = 'Bertelsmann Foundation Documentaries | Films for Transatlanticists'

// WITH:
const defaultDescription = 'How can AI reflect diverse knowledge, tackle global challenges, and remain ethical? Responsible data commons can unlock AI\'s potential for the public good.'
const defaultTitle = 'New Commons'
```

**Why:** These are leftover defaults from the Bertelsmann Foundation project this codebase was forked from. The functions `getDefaultDescription()` and `getDefaultTitle()` still expose them.

**Usage analysis (RESOLVED):** `getDefaultDescription()` and `getDefaultTitle()` are **not called anywhere** in the codebase. Grep for these function names returns only their definitions in `composables/utils.js` (lines 20-24) and this plan doc. Additionally, `composables/utils.js` itself is **never imported** by any `.vue` or `.js` file in the project (grep for `import.*utils` and `from.*utils` returns zero results in source files).

**Recommended stronger action (updated 2026-03-17):** Delete the entire file. Despite being in the `composables/` directory (which Nuxt auto-imports from), the file exports a default object `_default` whose methods (`getDefaultDescription`, `getDefaultTitle`, `getVideoIdFromYoutubeUrl`, `getVideoIdFromVimeoUrl`, `slugify`) are **never called anywhere** in the codebase (grep confirmed zero usages across all `.vue`, `.js`, `.ts` files). The `slugify` function in `composables/utils.js` is also a separate implementation from the one in `directus/common.js` (which is the one actually used by the content importers). Deleting the file is safe and eliminates dead code that could confuse future developers.

**If the team prefers to keep it:** At minimum, update the strings as originally planned. But full deletion is recommended.

---

## 1.2 Bug Fixes

### Task 1.2.1 — Fix blog card images in `ncBlogCard.vue` and `usePost.js`

**Files affected:**
1. `components/ncBlogCard.vue` (line 30)
2. `composables/usePost.js` (line 3)

**Schema confirmation:** The `content.config.ts` schema (line 18) defines `cover_image: z.string()` as a top-level field on the `blogposts` collection. The Directus importer (`directus/blogposts.js` line 22) writes it as `i.cover_image = item.image ? common.getImage(item.image.id) : ''`. The data is definitively at `post.cover_image`, NOT at `post.meta.body.cover_image`.

**Additional confirmation:** `components/ncBlogPost.vue` (lines 8-9) already accesses the field correctly as `blogpost.cover_image`, proving the top-level path is the correct one.

**Exact change in `components/ncBlogCard.vue` line 30:**
```js
// REPLACE:
  return post?.meta && post?.meta.body && post?.meta.body.cover_image ? post?.meta.body.cover_image : '/images/blog-fallback.webp'
// WITH:
  return post?.cover_image ? post.cover_image : '/images/blog-fallback.webp'
```

**Exact change in `composables/usePost.js` line 3:**
```js
// REPLACE:
    return post.meta && post.meta.body && post.meta.body.cover_image ? post.meta.body.cover_image : '/images/blog-fallback.webp'
// WITH:
    return post?.cover_image ? post.cover_image : '/images/blog-fallback.webp'
```

**Impact scope:** The `usePost.js` composable's `getImage` function is called in:
- `components/ncBlogFeatured.vue` (line 30) — calls `usePost()` and uses `getImage` for sidebar blog card images. **This is the primary consumer** — the sidebar images on the blog listing page will display correctly after the fix.
- `pages/blog/index.vue` (line 30) — calls `usePost()` and destructures `getImage`, but **the result is never used in the template**. The template delegates to `<nc-blog-featured>` and `<nc-blog-card>`, each of which has its own `getImage` logic. This is dead code in `blog/index.vue` but harmless; note for future cleanup.

Both `ncBlogFeatured.vue` and `ncBlogCard.vue` have their **own** `getImage` implementations that need fixing independently. The `ncBlogCard.vue` has a local `getImage` on line 30 (separate from `usePost.js`) that also uses the broken `post.meta.body.cover_image` path.

**Why:** All blog cards currently show the fallback image because `post.meta.body.cover_image` never resolves. The data is at `post.cover_image`.

**Verification:** Run the dev server and confirm blog cards now show actual cover images. The fallback image exists at `public/images/blog-fallback.webp` (confirmed present).

---

### Task 1.2.2 — Fix video slug mismatches in `useVideos.js`

**File:** `composables/useVideos.js`

**What to change:** The `slug` values in the `videos` array must match the actual winner collection slugs. The consumer is `pages/winners/[slug].vue` (line 90), which does `videos.find(video => video.slug === route.params?.slug)`.

**Slug generation logic (verified from source):** The winner slugs are generated in `directus/winners.js` (line 89):
```js
i.slug = item.title ? common.slugify(item.title) : common.slugify(item.applicant);
```

The `common.slugify` function (`directus/common.js` lines 70-91) lowercases the title, replaces special chars, replaces spaces with hyphens, and removes non-word chars.

**Current slugs in `useVideos.js` vs expected slugs (derived from the fallback `honorsCards` data in `winners/index.vue` lines 118-139):**

| useVideos.js slug | Expected slug (from winners/index.vue honorsCards) | Match? |
|---|---|---|
| `amazon-rainforest-evolution-index` | (awardee, not in honorsCards — slug depends on Directus title) | Likely correct |
| `malawi-voice-data-commons` | (awardee, not in honorsCards — slug depends on Directus title) | Likely correct, but may be `malawi-voice-data-commons-project` if full title includes "Project" |
| `advancing-climate-justice-the-climate-mobility-case-database` | `climate-mobility-case-database` | **MISMATCH** |
| `place-hub-in-nigeria` | `the-place-trust-in-nigeria` | **MISMATCH** |
| `know-your-city-academy` | `know-your-city-academy` | Match |
| `querido-diario` | `querido-diario` | Match (assuming title is exactly "Querido Diario") |

**Content files are not committed** (confirmed: `content/` directory does not exist in the repo). The JSON files are generated at build time by `contentImporter.js`. To get the **definitive** slugs, the implementer must:
1. Run `node contentImporter.js` (requires `.env` with `BASE_URL` and `API_KEY` for Directus)
2. Check the generated `content/winners/*.json` filenames and `slug` fields

**Minimum fix (based on honorsCards evidence):**
```js
// REPLACE in useVideos.js:
    slug: "advancing-climate-justice-the-climate-mobility-case-database",
// WITH:
    slug: "climate-mobility-case-database",

// REPLACE:
    slug: "place-hub-in-nigeria",
// WITH:
    slug: "the-place-trust-in-nigeria",
```

**Risk:** The awardee slugs (`amazon-rainforest-evolution-index`, `malawi-voice-data-commons`) cannot be verified without running the importer. These are derived from `common.slugify(item.title)` where `item.title` comes from Directus. If titles in Directus include extra words (e.g., "Amazon Rainforest Evolution Index Project"), the slugs will differ.

**Why:** When slugs don't match, the video lookup returns `undefined` and no video renders on the winner detail page.

---

### Task 1.2.3 — Replace placeholder gallery alt text in `winners/index.vue`

**File:** `pages/winners/index.vue` (lines 147-244)

**What to change:** All 24 images in the `highlights` array have `alt: 'Replace alt text'`. Replace each with a descriptive alt string based on the filename/subject.

**Exact replacements (line-by-line):**

| Line | Filename | Replacement alt text |
|------|----------|---------------------|
| 150 | `092525_HL011...Malawi Voice Data Commons.webp` | `Malawi Voice Data Commons team at the New Commons Challenge ceremony` |
| 154 | `092525_HL014...Amazon Rainforest Evolution Index Award Winner.webp` | `Amazon Rainforest Evolution Index team receiving their award` |
| 158 | `092525_HL018...Malawi Award Presentation.webp` | `Malawi Voice Data Commons award presentation on stage` |
| 162 | `092525_HL023...Malawi Award Presentation 1.webp` | `Malawi Voice Data Commons award presentation` |
| 166 | `092525_HL026...Amazon Rainforest Presentation.webp` | `Amazon Rainforest Evolution Index team presenting their project` |
| 170 | `Copy of 092525_HL053_New-Commons_Microsoft.webp` | `Speakers at the New Commons Challenge Showcase` |
| 174 | `Copy of IMG_0802.webp` | `Attendees networking at the New Commons Challenge Showcase` |
| 178 | `Copy of IMG_0804.webp` | `Guests at the New Commons Challenge Showcase event` |
| 182 | `Copy of 092525_HL041_New-Commons_Microsoft.webp` | `New Commons Challenge Showcase panel discussion` |
| 186 | `Copy of 092525_HL039_New-Commons_Microsoft.webp` | `New Commons Challenge Showcase presentation` |
| 190 | `Copy of IMG_0800.webp` | `Attendees at the New Commons Challenge Showcase during the 80th UN General Assembly` |
| 194 | `Copy of IMG_0811.webp` | `Guests mingling at the New Commons Challenge Showcase` |
| 198 | `Copy of 092525_HL033_New-Commons_Microsoft.webp` | `Stage view at the New Commons Challenge Showcase` |
| 202 | `Copy of IMG_0812.webp` | `Audience at the New Commons Challenge Showcase event` |
| 206 | `Copy of 092525_HL047_New-Commons_Microsoft.webp` | `New Commons Challenge Showcase highlight moment` |
| 210 | `Copy of 092525_HL003_New-Commons_Microsoft.webp` | `Opening of the New Commons Challenge Showcase` |
| 214 | `Copy of 092525_HL007_New-Commons_Microsoft.webp` | `Early moments at the New Commons Challenge Showcase` |
| 218 | `Copy of 092525_HL023_New-Commons_Microsoft.webp` | `Award ceremony at the New Commons Challenge Showcase` |
| 222 | `Copy of 092525_HL004_New-Commons_Microsoft.webp` | `New Commons Challenge Showcase venue setup` |
| 226 | `Copy of 092525_HL002_New-Commons_Microsoft.webp` | `New Commons Challenge Showcase event beginning` |
| 230 | `Certi Amazonia-New Commons_1.webp` | `CERTI Amazonia team at the New Commons Challenge event` |
| 234 | `Certi Amazonia-New Commons2.webp` | `CERTI Amazonia representatives at the New Commons Showcase` |
| 238 | `MalawiVoice1.webp` | `Malawi Voice Data Commons team members` |
| 242 | `MalawiVoice2.webp` | `Malawi Voice Data Commons team celebrating their award` |

**Why:** Placeholder alt text is an accessibility failure and hurts SEO. Screen readers will literally announce "Replace alt text."

---

## 1.3 Navigation Routing Fix

### Task 1.3.1 — Replace `<a>` tags with `<NuxtLink>` in `ncTopbar.vue`

**File:** `components/ncTopbar.vue` (lines 8-15)

**What to change:** The `@TODO` comment on line 8 explains that `NuxtLink` wasn't working, so `el="a"` with `href` was used as a workaround. This causes full page reloads on every navigation.

**CRITICAL FINDING — ncButton `el` prop bug:** The plan originally stated that simply removing `el="a"` and adding `to="..."` would trigger the NuxtLink path in ncButton's `defaultEl` computed property (line 83). **This will NOT work.** Here is why:

The `el` prop has a default value of `'button'` (line 72 of `ncButton.vue`):
```js
el: {
  type: String,
  default: 'button'
},
```

The `componentEl` computed (line 87) uses:
```js
const componentEl = computed(() => el.value || defaultEl.value)
```

Since `el.value` defaults to `'button'` (which is truthy), `defaultEl` is **never consulted**. The `to` attribute auto-detection in `defaultEl` (line 83: `if (attrs.to) return 'NuxtLink'`) will never execute.

**Root cause of the original TODO:** This is likely why the original developer's NuxtLink attempt failed — the `el` prop's default `'button'` always wins over `defaultEl`.

**Two-part fix required:**

**Part A — Fix `ncButton.vue` line 87** to make `defaultEl` work when `el` is not explicitly passed:
```js
// REPLACE (line 87):
const componentEl = computed(() => el.value || defaultEl.value)

// WITH:
const componentEl = computed(() => {
  // Only use the explicit el prop if it was actually passed by the consumer.
  // When el is still its default ('button'), defer to defaultEl which auto-detects
  // NuxtLink (from `to` attr) or anchor (from `href` attr).
  if (attrs.to || attrs.href || attrs.disabled) return defaultEl.value
  return el.value || defaultEl.value
})
```

**Alternative simpler fix for `ncButton.vue`:** Change the `el` prop default from `'button'` to `''`:
```js
// REPLACE (line 72):
    default: 'button'
// WITH:
    default: ''
```
This way, when `el` is not explicitly set, `el.value` is `''` (falsy), and `defaultEl` is consulted. The fallback in `defaultEl` (line 84) already returns `'button'` as the default. **This is the cleaner fix** and preserves the original intent of the `defaultEl` auto-detection logic.

**Impact analysis of changing the `el` default:** We need to confirm no other consumers rely on `el` defaulting to `'button'`. Searching for `nc-button` and `ncButton` usage across the codebase:
- `ncTopbar.vue` — all uses pass `el="a"` explicitly (will be changed)
- `prize.vue` line 79, 82 — uses `nc-button` without `el` prop, no `to` or `href`, so `defaultEl` returns `'button'` — unchanged behavior
- `index.vue` line 55 — `<NuxtLink href="faq" class="button" ...>` — not using nc-button
- `index.vue` line 61, `prize.vue` line 45 — use `el="a"` explicitly — unchanged behavior
- `winners/[slug].vue` lines 40-48 — uses `el="a"` explicitly for external links — unchanged behavior

Changing the default to `''` is safe.

**Vue attrs double-binding note (added 2026-03-17):** `ncButton.vue` does NOT set `inheritAttrs: false`. This means `v-bind="attrs"` on the root `<component>` (line 16) and Vue's automatic attribute fallthrough both apply attrs. This is existing behavior that already works for `el="a" href="..."` today, so no new risk is introduced. However, if this causes issues with duplicate `to` attributes on the rendered NuxtLink, add a `<script>` block with `defineOptions({ inheritAttrs: false })` or a separate `<script>` section. Verified that the current double-bind pattern is standard for dynamic component wrappers in Vue 3 and does not cause runtime errors.

**Part B — Update `ncTopbar.vue`** (lines 8-14):

```html
<!-- REPLACE lines 8-14: -->
        <!-- @TODO: Por algum motivo os NuxtLink não estão funcionando aqui. Só consegui fazer as rotas funcionar com o el="a" -->
        <li><nc-button el="a" href="/prize" color="base" variant="link">The Prize</nc-button></li>
        <!--<li><nc-button el="a" href="/event" color="base" variant="link">Event</nc-button></li>-->
        <li><nc-button el="a" href="/winners" color="base" variant="link">Winners</nc-button></li>
        <li><nc-button el="a" href="/blog"  color="base" variant="link">Blog</nc-button></li>
        <li><nc-button el="a" href="/faq"   color="base" variant="link">FAQ</nc-button></li>
        <li><nc-button el="a"               color="base" variant="link" href="https://docs.google.com/document/d/1fYmUkwTqOngtpbVT8BezgmWs14IkvGEO6q5a53jqHhA/edit?tab=t.0" target="_blank">Rules <nc-arrow-link-up /></nc-button></li>

<!-- WITH: -->
        <li><nc-button to="/prize" color="base" variant="link">The Prize</nc-button></li>
        <li><nc-button to="/winners" color="base" variant="link">Winners</nc-button></li>
        <li><nc-button to="/blog"  color="base" variant="link">Blog</nc-button></li>
        <li><nc-button to="/faq"   color="base" variant="link">FAQ</nc-button></li>
        <li><nc-button el="a"               color="base" variant="link" href="https://docs.google.com/document/d/1fYmUkwTqOngtpbVT8BezgmWs14IkvGEO6q5a53jqHhA/edit?tab=t.0" target="_blank">Rules <nc-arrow-link-up /></nc-button></li>
```

Keep the external "Rules" link as `el="a" href="..."` since it opens in a new tab to Google Docs.

**Also fix other `el="a"` internal links elsewhere in the codebase:**
- `pages/prize.vue` line 17: `<nc-button class="hero__announcement-button" el="a" href="/winners" ...>Meet the Winners</nc-button>` — change to `to="/winners"`
- `pages/index.vue` line 29: `<nc-button class="hero__announcement-button" el="a" href="/winners" ...>View Awardees</nc-button>` — change to `to="/winners"`
- `pages/index.vue` line 61: `<nc-button el="a" href="#video" ...>Watch now!</nc-button>` — keep as `el="a"` since `#video` is an anchor link, not a route

**Why:** Using `<a>` tags for internal routes bypasses Vue Router, causing full-page reloads, losing SPA state, and degrading performance.

**Verification:**
1. Click each nav link and confirm the page loads without a full browser refresh (check the network tab — no full document reload).
2. Confirm the active route styling still works.
3. Confirm the "Rules" external link still opens in a new tab.
4. Confirm `nc-button` components without any explicit `el`, `to`, or `href` still render as `<button>` elements.

---

## 1.4 Redirect Configuration

### Task 1.4.1 — Add redirects via `routeRules` in `nuxt.config.ts`

**File:** `nuxt.config.ts`

**What to change:** Add a `routeRules` block to the Nuxt config. Since the project uses `ssr: false` (SPA mode, line 77) and deploys to Netlify, also create a `public/_redirects` file as a fallback.

**Important SPA-mode caveat:** With `ssr: false`, Nuxt `routeRules` redirects only work client-side (after the SPA shell loads). For server-side redirects (SEO crawlers, direct URL hits), the Netlify `_redirects` file is the **primary** mechanism, not a fallback. Both should be created, but the `_redirects` file is the critical one for production.

**Exact change — add to `nuxt.config.ts` after line 77 (`ssr: false,`):**
```ts
  routeRules: {
    '/prize': { redirect: '/incubator/2026' },
    '/the-prize': { redirect: '/incubator/2026' },
    '/the-incubator': { redirect: '/incubator/2026' },
    '/winners': { redirect: '/the-2025-challenge' },
  },
```

**Also create:** `public/_redirects` (Netlify-specific):
```
/prize          /incubator/2026        301
/the-prize      /incubator/2026        301
/the-incubator  /incubator/2026        301
/winners        /the-2025-challenge    301
```

**`/winners` redirect and detail pages (RESOLVED):** The `/winners` redirect **will NOT affect** `/winners/[slug]` detail pages. Netlify `_redirects` rules are matched exactly by default (not as prefixes). The rule `/winners /the-2025-challenge 301` only matches the exact path `/winners`, not `/winners/amazon-rainforest-evolution-index`. Similarly, Nuxt `routeRules` with the key `'/winners'` matches only that exact route.

However, if `/winners` gets a 301 redirect, the "Back to Winners" link in `pages/winners/[slug].vue` (line 5: `<nuxt-link to="/winners">`) will redirect to `/the-2025-challenge`. This is acceptable if `/the-2025-challenge` exists.

**Dependency:** The `/incubator/2026` page must exist (Task 2.1) before this redirect works. The `/the-2025-challenge` page must also exist or be created.

**`/the-2025-challenge` page (RESOLVED):** This page does **not** currently exist. It must be created as part of this ticket. The simplest approach is:
1. Create `pages/the-2025-challenge.vue` by moving/copying the content from `pages/winners/index.vue`
2. Keep `pages/winners/[slug].vue` in place (detail pages stay at `/winners/[slug]` — see above)
3. Update internal links: the "Back to Winners" link in `[slug].vue` line 5 should point to `/the-2025-challenge`
4. Update the topbar nav link from `/winners` to `/the-2025-challenge`

**Full list of internal links that reference `/winners` and need updating (verified 2026-03-17):**
1. `components/ncTopbar.vue` line 11: `href="/winners"` -> `to="/the-2025-challenge"`
2. `pages/prize.vue` line 17: `el="a" href="/winners"` -> `to="/the-2025-challenge"` (also remove `el="a"`)
3. `pages/index.vue` line 29: `el="a" href="/winners"` -> `to="/the-2025-challenge"` (also remove `el="a"`)
4. `pages/winners/[slug].vue` line 5: `to="/winners"` -> `to="/the-2025-challenge"`

**Links that reference `/winners/[slug]` and should NOT change:**
5. `pages/winners/index.vue` lines 19, 32: NuxtLink `to="/winners/${card.slug}"` — detail page links, remain at `/winners/[slug]`
6. `components/ncWinners.vue` line 7: NuxtLink `:to="/winners/${winner.slug}"` — **missed in original plan**. This component renders winner cards with links to detail pages. These links stay as-is since detail pages remain at `/winners/[slug]`.

**Why:** Old URLs from marketing materials and external links need to redirect to the new information architecture.

**Risk (UPDATED):** The `/winners` redirect will cause the current `/winners` page to redirect to `/the-2025-challenge`. Since we are creating that page with the same content, the user experience is preserved. Detail pages at `/winners/[slug]` are unaffected by the redirect.

---

## 2.1 Cohort-Based Routing

### Task 2.1.1 — Create incubator directory and 2026 page

**Files to create:**
- `pages/incubator/` (directory)
- `pages/incubator/2026.vue` (new page)

**What to change:** Create `pages/incubator/2026.vue` as a new page based on the layout and structure of `pages/prize.vue`. This should:
1. Use the same component structure (`nc-hero`, `nc-base-section`, `nc-judges-grid`, `nc-observers-grid`, etc.)
2. Update copy to reference "The Incubator" / "2026 Cohort" instead of "The Prize"
3. Include the same judges/observers sections
4. Update the announcement to link to `/the-2025-challenge` instead of `/winners`

**Source template — `pages/prize.vue` structure to follow:**
- Lines 1-20: Hero section with description + announcement
- Lines 22-36: "What are we looking for?" section with two prize-cards
- Lines 38-86: CTA panel (Prizes, Who can apply)
- Lines 88-99: Helpful Tips section
- Lines 101-106: Judges + Observers grids
- Lines 112: Script setup (blogposts query)

**Incubator index page decision (RESOLVED):** Create `pages/incubator/index.vue` as a simple redirect to the latest cohort. This is cleaner than leaving `/incubator` as a 404.

```vue
<!-- pages/incubator/index.vue -->
<script setup>
await navigateTo('/incubator/2026', { redirectCode: 301 })
</script>
```
**Important (added 2026-03-17):** `navigateTo` must be `await`ed in SPA mode (`ssr: false`) to ensure the redirect completes. Without `await`, the component may briefly render before navigating. Since the project uses `ssr: false` (line 77 of `nuxt.config.ts`), this is a client-side redirect only. The Netlify `_redirects` file handles the server-side (direct URL hit) case.

Also add to `routeRules` in `nuxt.config.ts` and `public/_redirects`:
```
/incubator      /incubator/2026        301
```

**Architecture notes:**
- The directory-based structure (`/incubator/2026`, `/incubator/2027`, etc.) inherently supports future cohorts
- Each cohort page can eventually pull cohort-specific content from the CMS

**Why:** Transitioning from "prize" to "incubator" terminology reflects the program's evolution. Year-based routing makes it easy to archive past cohorts while keeping them accessible.

---

### Task 2.1.2 — Create the-2025-challenge page

**File:** Create `pages/the-2025-challenge.vue` from `pages/winners/index.vue`

**What to change:**
1. Copy `pages/winners/index.vue` to `pages/the-2025-challenge.vue`
2. Delete `pages/winners/index.vue` (it will be handled by the redirect)
3. Keep `pages/winners/[slug].vue` in place (detail pages continue to work at `/winners/[slug]`)
4. Update the honors card links in the new file from `/winners/${card.slug}` to `/winners/${card.slug}` (these stay the same since detail pages remain at `/winners/[slug]`)

**Internal link updates required (consolidated from Task 1.4.1, verified 2026-03-17):**
1. `components/ncTopbar.vue` line 11: nav link from `href="/winners"` to `to="/the-2025-challenge"`, label from "Winners" to "The 2025 Challenge" (or similar)
2. `pages/prize.vue` line 17: "Meet the Winners" button from `el="a" href="/winners"` to `to="/the-2025-challenge"`
3. `pages/index.vue` line 29: "View Awardees" button from `el="a" href="/winners"` to `to="/the-2025-challenge"`
4. `pages/winners/[slug].vue` line 5: "Back to Winners" link from `to="/winners"` to `to="/the-2025-challenge"`, update label text to "Back to The 2025 Challenge"

**Links that stay as-is (detail page links):**
5. `components/ncWinners.vue` line 7: `:to="/winners/${winner.slug}"` — remains, detail pages stay at `/winners/[slug]`
6. `pages/the-2025-challenge.vue` (moved from `winners/index.vue`) lines 19, 32: `:to="/winners/${card.slug}"` — remains

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| **ncButton `el` prop default blocks NuxtLink auto-detection** | High — NuxtLink fix won't work without ncButton fix | Fix ncButton `el` default from `'button'` to `''` first; verify no regressions in other nc-button usages |
| `/winners` redirect breaks current winner detail page back-links | Medium — "Back to Winners" link redirects | Update back-link in `[slug].vue` to point to `/the-2025-challenge` |
| `/the-2025-challenge` page does not exist yet | High — redirect target 404s | Must create the page as part of this ticket before enabling the redirect |
| Video slug mismatches cannot be fully verified without content data | Medium — videos don't render | Must run content importer or check Directus to get actual slugs; two mismatches confirmed from fallback data |
| Removing Pinia may affect build if any auto-import magic depends on it | Low — Pinia is not in modules array | Verify build succeeds after removal; `@pinia/nuxt` is not in `modules`, so no auto-import is configured |
| SPA-mode `routeRules` only work client-side | Medium — SEO crawlers won't see redirects | Netlify `_redirects` file is the primary server-side redirect mechanism; both must be created |
| `composables/utils.js` is entirely unused | Low — dead code, no breakage | Update strings as planned; note for future full-file removal |
| Blog image fix assumes `cover_image` is always a string URL | Low — confirmed by schema | Schema defines `cover_image: z.string()` and importer writes `common.getImage(item.image.id)` which returns a URL string |
| **`ncButton` `inheritAttrs` not set to false** (added 2026-03-17) | Low — attrs may be applied twice to root element | Existing behavior, already works for `el="a" href="..."`. Monitor for duplicate attribute warnings in console; fix with `defineOptions({ inheritAttrs: false })` if needed |
| **`ncWinners.vue` links to `/winners/[slug]` not documented** (added 2026-03-17) | Low — these are detail page links that stay as-is | No change needed, but implementer should verify these links still work after the `/winners` redirect is added |
| **`blog/index.vue` has duplicate `useAsyncData` key `'blogposts'`** (added 2026-03-17) | Low — lines 22 and 25 both use key `'blogposts'` for different queries (all posts vs. limited 4) | Out of scope for this ticket, but the second query (featured, line 25) will overwrite the first in the cache, potentially causing the main grid to show only 4 posts. Note for follow-up. |
| **`navigateTo` without `await` in SPA mode** (added 2026-03-17) | Low — component may flash before redirect | Use `await navigateTo(...)` in `incubator/index.vue` |
| **`event.vue` shared `useAsyncData` key `'winners'`** (added 2026-03-17) | Low — only matters if event page was visited; we are deleting it | Deletion eliminates this latent cache collision bug |

---

## Acceptance Criteria

### 1.1 Dead Code Removal
- [ ] `nuxt.config.ts` has no `contentfulSpace` or `contentfulToken` references
- [ ] `stores/video.ts` is deleted
- [ ] `pinia` and `@pinia/nuxt` removed from `package.json`
- [ ] `pages/prize2.vue`, `pages/prize-detail.vue`, `pages/event.vue` are deleted
- [ ] Both commented-out nav links removed from `ncTopbar.vue` (event on line 10, apply on line 15)
- [ ] `composables/utils.js` no longer references "Bertelsmann Foundation"
- [ ] Project builds successfully after removals (`npm run build`)
- [ ] No runtime errors in dev server after removals

### 1.2 Bug Fixes
- [ ] Blog cards on `/blog` and `/the-2025-challenge` show actual cover images (not fallback)
- [ ] `ncBlogCard.vue` reads `post.cover_image` directly (not `post.meta.body.cover_image`)
- [ ] `composables/usePost.js` reads `post.cover_image` directly
- [ ] Video slugs in `useVideos.js` match actual winner collection slugs (at minimum: `climate-mobility-case-database` and `the-place-trust-in-nigeria` corrected)
- [ ] Winner detail pages render their videos correctly
- [ ] All 24 gallery images in `winners/index.vue` (now `the-2025-challenge.vue`) have descriptive alt text
- [ ] No `alt="Replace alt text"` remains in the codebase

### 1.3 Navigation Routing Fix
- [ ] `ncButton.vue` `el` prop default changed from `'button'` to `''`
- [ ] Internal nav links in `ncTopbar.vue` use `to` prop (NuxtLink routing)
- [ ] Internal links in `prize.vue` and `index.vue` use `to` prop instead of `el="a" href`
- [ ] External "Rules" link still uses `el="a"` with `href` and `target="_blank"`
- [ ] Anchor links (`href="#video"`) still use `el="a"`
- [ ] Clicking nav links does NOT trigger a full page reload
- [ ] `@TODO` comment is removed from `ncTopbar.vue`

### 1.4 Redirect Configuration
- [ ] `/prize` redirects to `/incubator/2026`
- [ ] `/the-prize` redirects to `/incubator/2026`
- [ ] `/the-incubator` redirects to `/incubator/2026`
- [ ] `/incubator` redirects to `/incubator/2026`
- [ ] `/winners` redirects to `/the-2025-challenge`
- [ ] Redirects work both client-side (`routeRules`) and server-side (Netlify `_redirects`)
- [ ] `/winners/[slug]` detail pages are NOT affected by the `/winners` redirect

### 2.1 Cohort-Based Routing
- [ ] `/incubator/2026` renders a page with incubator content
- [ ] Page uses the same design system components as `prize.vue`
- [ ] Directory structure supports future cohort pages (`/incubator/2027`, etc.)
- [ ] `/incubator` (no year) redirects to `/incubator/2026`
- [ ] `/the-2025-challenge` page exists with the current winners content
- [ ] Navigation updated to link to new routes
- [ ] All internal links pointing to `/winners` updated to `/the-2025-challenge`

---

## Open Questions — RESOLVED

### 1. Should Pinia be fully removed from package.json?
**Answer: Yes.** `stores/video.ts` is the only file that imports from `pinia`. `@pinia/nuxt` is not in the Nuxt `modules` array. Both `pinia` and `@pinia/nuxt` can be safely removed from `package.json` dependencies.

### 2. Should /event get a redirect or just be deleted?
**Answer: Just delete.** The event page contains content from a completely different project ("2024 Kluz Prize for PeaceTech"), the nav link is already commented out, and there are no external references. No redirect is warranted.

### 3. Should /incubator (no year) have a landing/redirect page?
**Answer: Yes, redirect.** Create a minimal `pages/incubator/index.vue` that redirects to `/incubator/2026`. Also add the redirect to `routeRules` and `_redirects`. This prevents a 404 if someone navigates to `/incubator` directly.

### 4. Does the /winners -> /the-2025-challenge redirect affect /winners/[slug] detail pages?
**Answer: No.** Both Netlify `_redirects` rules and Nuxt `routeRules` match exact paths by default. `/winners` only matches `/winners`, not `/winners/amazon-rainforest-evolution-index`. Detail pages continue to work. The only impact is that the "Back to Winners" link in `[slug].vue` will redirect through to `/the-2025-challenge` (which is acceptable, or can be updated to point directly there).

### 5. Can video slugs be verified from committed content files?
**Answer: No.** The `content/` directory does not exist in the repo (confirmed). Content files are generated at build time by `contentImporter.js` which requires Directus API credentials. However, two mismatches were confirmed by cross-referencing `useVideos.js` slugs against the hardcoded `honorsCards` fallback in `winners/index.vue`: `place-hub-in-nigeria` should be `the-place-trust-in-nigeria`, and `advancing-climate-justice-the-climate-mobility-case-database` should be `climate-mobility-case-database`. The awardee slugs (`amazon-rainforest-evolution-index`, `malawi-voice-data-commons`) require running the importer to verify.

### 6. Does `/the-2025-challenge` need to be created?
**Answer: Yes, as part of this ticket.** The page does not exist. Create it by moving `pages/winners/index.vue` to `pages/the-2025-challenge.vue` and keeping `pages/winners/[slug].vue` for detail pages.
