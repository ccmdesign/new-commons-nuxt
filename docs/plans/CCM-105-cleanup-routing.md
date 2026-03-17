# CCM-105: Cleanup & Routing Architecture

## Execution Order

Tasks are grouped by sub-task. Dependencies are noted where relevant.

**Recommended order:** 1.1 -> 1.2 -> 1.3 -> 1.4 -> 2.1
(1.1 through 1.3 are independent and can be parallelized; 1.4 and 2.1 depend on each other since the redirect `/the-incubator -> /incubator/2026` requires the destination page from 2.1 to exist first.)

---

## 1.1 Dead Code Removal

### Task 1.1.1 — Remove legacy Contentful config from `nuxt.config.ts`

**File:** `nuxt.config.ts` (lines 14-19)

**What to change:** Delete the entire `runtimeConfig.public` block containing `contentfulSpace` and `contentfulToken`. These reference Contentful environment variables from a prior CMS setup. The project now uses Directus + Nuxt Content.

```
// DELETE these lines (14-19):
runtimeConfig: {
  public: {
    contentfulSpace: process.env.CONTENTFUL_SPACE_ID || '',
    contentfulToken: process.env.CONTENTFUL_ACCESS_TOKEN || ''
  }
},
```

**Why:** Dead config from a previous CMS. No other file references `contentfulSpace` or `contentfulToken`.

**Verification:** `grep -r "contentfulSpace\|contentfulToken\|CONTENTFUL" .` returns no results after removal (confirmed only `nuxt.config.ts` references these).

---

### Task 1.1.2 — Remove unused Pinia store `stores/video.ts`

**File:** `stores/video.ts` (entire file, delete)

**What to change:** Delete the file. No component or composable imports `useVideoStore`. The project uses `composables/useVideos.js` instead (a simple array lookup, not a Pinia store).

**Why:** The store is an artifact from a prior project (references "workstreams" like democracy, politics-society, future-of-work, digital-economy — none of which exist in New Commons). No file imports from `stores/video.ts`.

**Follow-up consideration:** After removing the only Pinia store, consider whether to also remove `pinia` and `@pinia/nuxt` from `package.json` dependencies and from the `modules` array in `nuxt.config.ts` (note: Pinia is NOT currently listed in `modules`, so only the package.json cleanup applies). This is optional scope — create a follow-up issue if desired.

---

### Task 1.1.3 — Remove orphaned pages

**Files to delete:**
- `pages/prize2.vue` — Earlier iteration of the prize page. Contains placeholder "Apply now" buttons and no real content beyond what `prize.vue` already has.
- `pages/prize-detail.vue` — Stub page with only `<h1>Prize Detail</h1>`. Never linked from anywhere.
- `pages/event.vue` — Contains lorem ipsum and references to "2024 Kluz Prize for PeaceTech" — a completely different project. The event nav link is already commented out in `ncTopbar.vue`.

**Why:** These pages are reachable via URL but show stale/broken content. Removing them prevents confusion and accidental indexing.

**Verification:** Search codebase for any links to `/prize2`, `/prize-detail`, or `/event`. The event link in `ncTopbar.vue` is already commented out. No other references exist.

---

### Task 1.1.4 — Clean up `composables/utils.js`

**File:** `composables/utils.js` (lines 1-2)

**What to change:** Replace the `defaultDescription` and `defaultTitle` constants with New Commons values.

Current:
```js
const defaultDescription = 'Our documentary films provide an intimate portrait of the economic, political, and social challenges facing the United States and Europe today.'
const defaultTitle = 'Bertelsmann Foundation Documentaries | Films for Transatlanticists'
```

Replace with:
```js
const defaultDescription = 'How can AI reflect diverse knowledge, tackle global challenges, and remain ethical? Responsible data commons can unlock AI\'s potential for the public good.'
const defaultTitle = 'New Commons'
```

**Why:** These are leftover defaults from the Bertelsmann Foundation project this codebase was forked from. The functions `getDefaultDescription()` and `getDefaultTitle()` still expose them.

**Note:** Also verify whether `getDefaultDescription()` and `getDefaultTitle()` are called anywhere. If not, consider removing them entirely and keeping only the `slugify`, `getVideoIdFromYoutubeUrl`, and `getVideoIdFromVimeoUrl` utilities.

---

## 1.2 Bug Fixes

### Task 1.2.1 — Fix blog card images in `ncBlogCard.vue`

**File:** `components/ncBlogCard.vue` (line 30)

**What to change:** The `getImage` function navigates `post.meta.body.cover_image`, but the Nuxt Content collection schema defines `cover_image` as a top-level field on the blogpost object (see `content.config.ts` line 18). The Directus importer (`directus/blogposts.js` line 22) writes `cover_image` directly to the JSON — it is NOT nested under `meta.body`.

Current:
```js
const getImage = (post) => {
  return post?.meta && post?.meta.body && post?.meta.body.cover_image ? post?.meta.body.cover_image : '/images/blog-fallback.webp'
}
```

Replace with:
```js
const getImage = (post) => {
  return post?.cover_image ? post.cover_image : '/images/blog-fallback.webp'
}
```

**Also fix:** `composables/usePost.js` (line 3) has the same bug:
```js
// Current:
return post.meta && post.meta.body && post.meta.body.cover_image ? post.meta.body.cover_image : '/images/blog-fallback.webp'
// Replace with:
return post?.cover_image ? post.cover_image : '/images/blog-fallback.webp'
```

**Why:** All blog cards currently show the fallback image because `post.meta.body.cover_image` never resolves. The data is at `post.cover_image`.

**Verification:** Run the dev server and confirm blog cards now show actual cover images.

---

### Task 1.2.2 — Fix video slug mismatches in `useVideos.js`

**File:** `composables/useVideos.js`

**What to change:** The `slug` values in the `videos` array must match the actual winner collection slugs. The consumer is `pages/winners/[slug].vue` (line 90), which does `videos.find(video => video.slug === route.params?.slug)`.

Current slugs in `useVideos.js`:
1. `amazon-rainforest-evolution-index`
2. `malawi-voice-data-commons`
3. `advancing-climate-justice-the-climate-mobility-case-database`
4. `place-hub-in-nigeria`
5. `know-your-city-academy`
6. `querido-diario`

**Action required:** Cross-reference these slugs against the actual winner JSON slugs from the Directus-generated content files. Since content files are generated at build time and not committed, the implementer must either:
1. Run the content importer (`node contentImporter.js` or similar) to generate the JSON files, then check the `slug` field in each `content/winners/*.json` file.
2. Or check the Directus CMS directly for the winner slugs.

**Known likely mismatches** (based on the hardcoded honorsCards fallback in `winners/index.vue`):
- `place-hub-in-nigeria` in useVideos vs `the-place-trust-in-nigeria` in winners/index.vue
- `advancing-climate-justice-the-climate-mobility-case-database` in useVideos vs `climate-mobility-case-database` in winners/index.vue

**Why:** When slugs don't match, the video lookup returns `undefined` and no video renders on the winner detail page.

---

### Task 1.2.3 — Replace placeholder gallery alt text in `winners/index.vue`

**File:** `pages/winners/index.vue` (lines 147-243)

**What to change:** All 24 images in the `highlights` array have `alt: 'Replace alt text'`. Replace each with a descriptive alt string based on the filename/subject.

Suggested alt text (derive from filenames):

| Filename pattern | Suggested alt |
|---|---|
| `Malawi Voice Data Commons` | "Malawi Voice Data Commons team at the New Commons Challenge ceremony" |
| `Amazon Rainforest Evolution Index Award Winner` | "Amazon Rainforest Evolution Index team receiving their award" |
| `Malawi Award Presentation` | "Malawi Voice Data Commons award presentation" |
| `Amazon Rainforest Presentation` | "Amazon Rainforest Evolution Index presentation" |
| `Certi Amazonia-New Commons` | "CERTI Amazonia team at the New Commons event" |
| `MalawiVoice` | "Malawi Voice Data Commons team" |
| Generic `HL0XX` images | "New Commons Challenge Showcase event at the 80th UN General Assembly" |
| `IMG_08XX` | "Attendees at the New Commons Challenge Showcase" |

**Why:** Placeholder alt text is an accessibility failure and hurts SEO. Screen readers will literally announce "Replace alt text."

---

## 1.3 Navigation Routing Fix

### Task 1.3.1 — Replace `<a>` tags with `<NuxtLink>` in `ncTopbar.vue`

**File:** `components/ncTopbar.vue` (lines 8-15)

**What to change:** The `@TODO` comment on line 8 explains that `NuxtLink` wasn't working, so `el="a"` with `href` was used as a workaround. This causes full page reloads on every navigation.

The `ncButton` component (line 83 of `ncButton.vue`) already supports `NuxtLink` — when a `to` prop is passed, `defaultEl` resolves to `'NuxtLink'`. The fix is to:

1. Remove `el="a"` and `href="..."` from internal nav links
2. Add `to="..."` instead (which triggers the NuxtLink path in ncButton)

Current:
```html
<li><nc-button el="a" href="/prize" color="base" variant="link">The Prize</nc-button></li>
<li><nc-button el="a" href="/winners" color="base" variant="link">Winners</nc-button></li>
<li><nc-button el="a" href="/blog"  color="base" variant="link">Blog</nc-button></li>
<li><nc-button el="a" href="/faq"   color="base" variant="link">FAQ</nc-button></li>
```

Replace with:
```html
<li><nc-button to="/prize" color="base" variant="link">The Prize</nc-button></li>
<li><nc-button to="/winners" color="base" variant="link">Winners</nc-button></li>
<li><nc-button to="/blog"  color="base" variant="link">Blog</nc-button></li>
<li><nc-button to="/faq"   color="base" variant="link">FAQ</nc-button></li>
```

Keep the external "Rules" link as `el="a" href="..."` since it opens in a new tab to Google Docs.

Also remove the `@TODO` comment on line 8.

**Why:** Using `<a>` tags for internal routes bypasses Vue Router, causing full-page reloads, losing SPA state, and degrading performance.

**Risk:** The original developer noted NuxtLink "wasn't working" — this may have been due to a now-resolved Nuxt/Vue version issue, or due to passing `el="a"` which overrides the auto-detection. Test thoroughly after the change. If `to` prop still doesn't work through ncButton, the alternative is to wrap the button in a `<NuxtLink>` directly.

**Verification:**
1. Click each nav link and confirm the page loads without a full browser refresh (check the network tab — no full document reload).
2. Confirm the active route styling still works.

---

## 1.4 Redirect Configuration

### Task 1.4.1 — Add redirects via `routeRules` in `nuxt.config.ts`

**File:** `nuxt.config.ts`

**What to change:** Add a `routeRules` block to the Nuxt config. Since the project uses `ssr: false` (SPA mode) and deploys to Netlify, also create a `public/_redirects` file as a fallback.

Add to `nuxt.config.ts`:
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
/prize          /incubator/2026  301
/the-prize      /incubator/2026  301
/the-incubator  /incubator/2026  301
/winners        /the-2025-challenge  301
```

**Dependency:** The `/incubator/2026` page must exist (Task 2.1) before this redirect works. The `/the-2025-challenge` page must also exist or be created (see Open Questions).

**Why:** Old URLs from marketing materials and external links need to redirect to the new information architecture.

**Risk:** The `/winners` redirect will break the current `/winners` page. This is intentional per the spec, but confirm that `/the-2025-challenge` exists or will be created. If `/the-2025-challenge` is a renamed version of the current `/winners` page, the page file must be moved/renamed first.

---

## 2.1 Cohort-Based Routing

### Task 2.1.1 — Create incubator directory and 2026 page

**Files to create:**
- `pages/incubator/` (directory)
- `pages/incubator/2026.vue` (new page)

**What to change:** Create `pages/incubator/2026.vue` as a placeholder page based on the layout and structure of `pages/prize.vue`. This should:
1. Use the same component structure (`nc-hero`, `nc-base-section`, etc.)
2. Update copy to reference "The Incubator" / "2026 Cohort" instead of "The Prize"
3. Include the same judges/observers sections
4. Keep the "Applications closed" announcement pointing to winners

**Architecture notes:**
- The directory-based structure (`/incubator/2026`, `/incubator/2027`, etc.) inherently supports future cohorts
- Consider creating `pages/incubator/index.vue` as a landing page that redirects to the latest cohort, or shows a cohort selector
- Each cohort page can eventually pull cohort-specific content from the CMS

**Why:** Transitioning from "prize" to "incubator" terminology reflects the program's evolution. Year-based routing makes it easy to archive past cohorts while keeping them accessible.

---

### Task 2.1.2 — Handle winners page rename (if applicable)

**File:** `pages/winners/index.vue` -> potentially `pages/the-2025-challenge/index.vue` or `pages/the-2025-challenge.vue`

**What to change:** If the `/winners -> /the-2025-challenge` redirect means the winners page is being moved:
1. Move `pages/winners/index.vue` to `pages/the-2025-challenge.vue` (or create a new page)
2. Update `pages/winners/[slug].vue` routing accordingly (may need to become `pages/the-2025-challenge/[slug].vue`)
3. Update all internal links pointing to `/winners` (in `prize.vue`, `ncTopbar.vue`, winner card links, etc.)

**This needs a decision** — see Open Questions.

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| NuxtLink fix in topbar may not work due to unknown original issue | Medium — nav breaks | Test in dev first; keep `el="a"` fallback ready |
| `/winners` redirect breaks current winner pages and all internal links | High — all winner links 404 | Ensure `/the-2025-challenge` page exists before enabling redirect; update all internal links |
| Video slug mismatches cannot be fully verified without content data | Medium — videos don't render | Must run content importer or check Directus to get actual slugs |
| Removing `event.vue` may break external links | Low — page has lorem ipsum | Redirect `/event` to homepage if external links exist |
| Blog image fix depends on content schema assumption | Low — easy to verify | Check one generated JSON blogpost file to confirm `cover_image` is top-level |

---

## Acceptance Criteria

### 1.1 Dead Code Removal
- [ ] `nuxt.config.ts` has no `contentfulSpace` or `contentfulToken` references
- [ ] `stores/video.ts` is deleted
- [ ] `pages/prize2.vue`, `pages/prize-detail.vue`, `pages/event.vue` are deleted
- [ ] `composables/utils.js` no longer references "Bertelsmann Foundation"
- [ ] Project builds successfully after removals (`npm run build`)
- [ ] No runtime errors in dev server after removals

### 1.2 Bug Fixes
- [ ] Blog cards on `/blog` and `/winners` show actual cover images (not fallback)
- [ ] `ncBlogCard.vue` reads `post.cover_image` directly (not `post.meta.body.cover_image`)
- [ ] `composables/usePost.js` reads `post.cover_image` directly
- [ ] Video slugs in `useVideos.js` match actual winner collection slugs
- [ ] Winner detail pages render their videos correctly
- [ ] All 24 gallery images in `winners/index.vue` have descriptive alt text
- [ ] No `alt="Replace alt text"` remains in the codebase

### 1.3 Navigation Routing Fix
- [ ] Internal nav links in `ncTopbar.vue` use `to` prop (NuxtLink routing)
- [ ] External "Rules" link still uses `el="a"` with `href` and `target="_blank"`
- [ ] Clicking nav links does NOT trigger a full page reload
- [ ] `@TODO` comment is removed from `ncTopbar.vue`

### 1.4 Redirect Configuration
- [ ] `/prize` redirects to `/incubator/2026`
- [ ] `/the-prize` redirects to `/incubator/2026`
- [ ] `/the-incubator` redirects to `/incubator/2026`
- [ ] `/winners` redirects to `/the-2025-challenge`
- [ ] Redirects work both in dev (`routeRules`) and production (Netlify `_redirects`)

### 2.1 Cohort-Based Routing
- [ ] `/incubator/2026` renders a page with prize/incubator content
- [ ] Page uses the same design system components as `prize.vue`
- [ ] Directory structure supports future cohort pages (`/incubator/2027`, etc.)
- [ ] Navigation updated to link to `/incubator/2026` instead of `/prize`

---

## Open Questions for Implementer

1. **Winners page rename:** Does `/winners -> /the-2025-challenge` mean we are renaming the entire winners section? If so, what happens to `/winners/[slug]` detail pages? Do they become `/the-2025-challenge/[slug]`? This affects many internal links.

2. **Content data access:** The content JSON files are generated from Directus and not committed. The implementer needs to either run the importer or check Directus to verify the actual winner slugs for Task 1.2.2.

3. **Pinia removal:** With `stores/video.ts` being the only Pinia store, should we also remove `pinia` and `@pinia/nuxt` from `package.json`? This is cleanup scope that could be a separate issue.

4. **`/event` redirect:** Should we add a redirect from `/event` to `/` (or another page) to handle any existing external links, rather than just deleting the page?

5. **Incubator index page:** Should `pages/incubator/index.vue` exist as a landing page or redirect to the latest cohort? This affects how the URL `/incubator` (without year) behaves.

6. **`/the-2025-challenge` page:** This page does not currently exist. Does it need to be created as part of this ticket, or is it covered by a separate issue? The `/winners` redirect depends on it.
