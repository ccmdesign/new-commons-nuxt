# CCM-106: New Page Templates — Resources & Challenge Archive

## Overview

This issue covers two workstreams:
1. **Challenge archive finalization** — consolidate judges/observers into `the-2025-challenge.vue` and add any missing challenge description/rules content.
2. **Resources page (full stack)** — new Directus collection, content importer, Nuxt Content schema, composable, page, and card component.

---

## Phase 1: Challenge Archive Finalization

### 1.1 Consolidate judges/observers into the-2025-challenge.vue

**Current state:** `the-2025-challenge.vue` already has winners, honorary distinctions, showcase description, and photo gallery. Judges and observers live on **separate pages** (`/judges`, `/observers`) using hardcoded composables (`useJudges.js`, `useObservers.js`) — not the Directus-backed `judges` collection.

> **Codebase research findings:**
> - `the-2025-challenge.vue` currently ends with `<nc-blog-section :posts="blogposts" />` (line 90). New sections should be inserted **before** the blog section so that blog teasers remain the final element on the page.
> - `ncJudgesGrid.vue` uses `import useJudges from '../composables/useJudges'` and renders `<ncBioCard>` cards in a `.grid` layout with `--_grid-min-width: 200px`. The cards link to `/judges#${judge.slug}`.
> - `ncObserversGrid.vue` follows the identical pattern with `useObservers`, linking to `/observers#${observer.slug}`.
> - `ncBioCard.vue` expects props `judge` (Object) and `url` (String). It renders an image from `/assets/judges/${judge.img}`, the judge's name, description, and a "Read More" link.
> - The `judges.vue` and `observers.vue` pages render full bios using a `.switcher` layout with an `id` attribute on each bio (`:id="j.slug"`) — this is how the hash links from the grid cards resolve.
> - `ncBaseSection.vue` accepts `color` (string: `""`, `"faded"`, `"base"`, `"primary"`, `"secondary"`) and `width` (string: `"content"` default, `"narrow"`). The existing challenge page alternates between default and `color="faded"` sections.

**Tasks:**

1. Add a "Jury" section to `pages/the-2025-challenge.vue` **before** the `<nc-blog-section>` block (before line 90), using the existing `<nc-judges-grid />` component.
2. Add an "International Observer" section below it, using the existing `<nc-observers-grid />` component.
3. Verify both grids render correctly and link to their respective detail pages (`/judges#slug`, `/observers#slug`).

**Exact insertion point and pattern to follow:**

```vue
<!-- Insert BEFORE <nc-blog-section :posts="blogposts" /> -->

<nc-base-section color="faded">
  <h2 class="text-align:center">Jury</h2>
  <p class="text-align:center">The panel of experts who evaluated the New Commons Challenge submissions.</p>
  <nc-judges-grid />
</nc-base-section>

<nc-base-section>
  <h2 class="text-align:center">International Observer</h2>
  <nc-observers-grid />
</nc-base-section>

<nc-blog-section :posts="blogposts" />
```

> **Implementation note:** The `color="faded"` alternation follows the existing pattern on the page (Overview -> default, Awardees -> faded, Honorary Distinctions -> default, Showcase -> faded, Gallery -> default). Following this pattern: Jury -> faded, Observers -> default.

**Files to modify:**
- `pages/the-2025-challenge.vue` — add two new `<nc-base-section>` blocks with `<nc-judges-grid />` and `<nc-observers-grid />`.

**No files to delete yet** — `/judges` and `/observers` pages should remain functional since the bio cards link to them for full bios. The hash-based linking (`/judges#slug`) relies on the `id` attribute on each bio div in those pages.

> **Risk: Image path dependency.** `ncBioCard.vue` hardcodes the image path as `` `/assets/judges/${judge.img}` ``. Both judges and observers use this same path. The observer images must also live under `/assets/judges/`. Verify that `canela.jpg` (the single observer's image) exists in that directory.

### 1.2 Add challenge description and rules reference

**Current state:** The page has an overview paragraph but no explicit "About the Challenge" or "Rules" section.

> **Codebase research findings:**
> - The Rules link **already exists** in `ncTopbar.vue` as an external Google Doc link: `https://docs.google.com/document/d/1fYmUkwTqOngtpbVT8BezgmWs14IkvGEO6q5a53jqHhA/edit?tab=t.0`. This confirms rules content is maintained externally as a Google Doc.
> - The topbar uses `<nc-arrow-link-up />` icon component to denote external links. Use the same pattern if linking to rules from the challenge page.
> - The hero section (lines 2-48 of `the-2025-challenge.vue`) already contains a substantial overview paragraph about the challenge, the awards, and the event context. A separate "About the Challenge" section may be redundant with existing hero copy.

**Tasks:**

1. Add a section (after the overview hero, before the Awardees section) with:
   - Brief challenge description (what the New Commons Challenge is, its purpose).
   - A link to the challenge rules using the existing Google Doc URL from the topbar: `https://docs.google.com/document/d/1fYmUkwTqOngtpbVT8BezgmWs14IkvGEO6q5a53jqHhA/edit?tab=t.0`
2. This can be placeholder text marked with a `<!-- TODO: confirm with client -->` comment if final copy is not available.

**Suggested markup:**

```vue
<nc-base-section>
  <h2 class="text-align:center">About the Challenge</h2>
  <p><!-- TODO: confirm with client --> The New Commons Challenge is an initiative to foster data commons for responsible AI development.</p>
  <p>
    <nc-button
      el="a"
      color="primary"
      variant="ghost"
      href="https://docs.google.com/document/d/1fYmUkwTqOngtpbVT8BezgmWs14IkvGEO6q5a53jqHhA/edit?tab=t.0"
      target="_blank"
    >Read the Challenge Rules <nc-arrow-link-up /></nc-button>
  </p>
</nc-base-section>
```

**Decision for implementer:** The rules already live as a Google Doc (linked from the topbar). Reuse that URL rather than creating a PDF. Confirm with client whether the Google Doc is the canonical long-term location or if it should be downloaded and hosted as a PDF under `/public/documents/`.

---

## Phase 2: Resources Data Pipeline

### 2.1 Create Directus collection schema

Create the `new_commons_resources` collection in Directus with these fields:

| Field | Type | Notes |
|-------|------|-------|
| `id` | UUID (auto) | Primary key |
| `status` | Status | `draft` / `published` — matches existing pattern in `common.js` filter |
| `title` | String | Required |
| `slug` | String | Auto-generated from title by importer (match `common.slugify()`) |
| `description` | Text | Rich text or plain text |
| `category` | String | Enum-like: e.g. `report`, `toolkit`, `dataset`, `video`, `article` |
| `url` | String | External link (optional — either `url` or `file` should be set) |
| `file` | File (M2O to directus_files) | Uploaded document (optional) |
| `cover_image` | File (M2O to directus_files) | Thumbnail image |

> **Codebase research — Directus API patterns from `common.js`:**
> - The SDK uses `@directus/sdk` with `new Directus(process.env.BASE_URL)`.
> - `getDirectusData(collectionName, junctionFields?)` queries with `fields: ['*.*']` (deep-resolves one level of relations), `limit: -1`, and filters by `status._in: ["published"]` (or `["published", "draft"]` if `DEV` env is set).
> - The `status` field **must** be named `status` in the Directus collection, and its values must include `"published"` to match the filter. Other existing collections (`new_commons_blogposts`, `new_commons_winners`, `new_commons_judges`) all follow this pattern.
> - File fields (M2O to `directus_files`) are resolved by the `*.*` fields query — the importer accesses `item.file.id` or `item.cover_image.id` to build the asset URL via `common.getImage(id)`, which returns `${BASE_URL}/assets/${id}`.
> - **Do NOT add a `slug` field to the Directus collection.** The slug is computed at import time by `common.slugify(item.title)`. This follows the pattern in `blogposts.js` where slug is derived from `heading` and in `judges.js` where it's derived from `name`.

**Decision for implementer:** Confirm the category taxonomy with the client. Start with the values above as defaults; the frontend filter will be driven by whatever values appear in the data.

> **Edge case — duplicate titles:** If two resources share the same title, `common.slugify()` will produce the same filename and the second will silently overwrite the first JSON file. The existing importers have this same limitation. For now, ensure unique titles in Directus. A future improvement could append an index suffix.

### 2.2 Create Directus importer — `directus/resources.js`

Follow the exact pattern used in `directus/blogposts.js`.

> **Codebase research — exact field mapping from Directus API response to JSON output:**
>
> The `*.*` fields query deep-resolves file relations. For an M2O file field, the API returns an object like `{ id: "uuid", filename_disk: "...", ... }`. The importer extracts the `id` and passes it to `common.getImage(id)` to construct the asset URL.
>
> **Field mapping table for `objectContructor`:**
>
> | Directus field | API response shape | JSON output field | Transform |
> |---|---|---|---|
> | `title` | `string` | `title` | Direct copy |
> | (derived) | — | `slug` | `common.slugify(item.title)` |
> | `description` | `string` | `description` | Fallback to `''` |
> | `category` | `string` | `category` | Fallback to `''` |
> | `url` | `string` | `url` | Fallback to `''` |
> | `file` | `{ id: string, ... }` or `null` | `file` | `item.file ? common.getImage(item.file.id) : ''` |
> | `cover_image` | `{ id: string, ... }` or `null` | `cover_image` | `item.cover_image ? common.getImage(item.cover_image.id) : ''` |
>
> **Note on existing pattern quirks (replicate for consistency):**
> - The function is named `objectContructor` (typo in original — intentional for consistency with `blogposts.js` and `winners.js`).
> - `await items.data.forEach(...)` — the `await` on `.forEach` is a no-op (forEach doesn't return a Promise), but all existing importers use this pattern. Keep it for consistency.
> - The `getResources` function uses the same rimraf-then-recreate directory pattern found in all three existing importers.

```js
// directus/resources.js
const fs = require("fs");
const { rimraf } = require('rimraf');
const common = require("./common");

const objectContructor = async (dir, fs) => {
  const items = await common.getDirectusData("new_commons_resources");

  await items.data.forEach((item) => {
    let i = {};
    i.title = item.title;
    i.slug = common.slugify(item.title);
    i.description = item.description || '';
    i.category = item.category || '';
    i.url = item.url || '';
    i.file = item.file ? common.getImage(item.file.id) : '';
    i.cover_image = item.cover_image ? common.getImage(item.cover_image.id) : '';

    fs.writeFile(
      dir + "/" + i.slug + ".json",
      JSON.stringify(i),
      function (err, result) {
        if (err) console.log("error", err);
      }
    );
    console.log("WRITING RESOURCE: ", i.slug + ".json");
  });
};

const getResources = async () => {
  const dir = "./content/resources";
  if (fs.existsSync(dir)) {
    Promise.all([rimraf(dir)]).then(() => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      fs.access(dir, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
        if (err) console.log(err);
        else await objectContructor(dir, fs);
      });
    });
  } else {
    if (!fs.existsSync("./content")) {
      fs.mkdirSync("./content");
    }
    fs.mkdirSync(dir);
    fs.access(dir, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
      if (err) console.log(err);
      else objectContructor(dir, fs);
    });
  }
};

module.exports = { getResources };
```

### 2.3 Register importer in `contentImporter.js`

> **Codebase research — exact current state of `contentImporter.js`:**
> ```js
> const chalk = require('chalk');
> const { getBlogposts } = require('./directus/blogposts');
> const { getWinners } = require('./directus/winners');
> const { getJudges } = require('./directus/judges');
>
> console.log('');
> console.log(chalk.green('Starting importing data from Directus...'));
> console.log('');
> console.log(chalk.green('[ NEW COMMONS: BLOGPOSTS - WINNERS - JUDGES ]'));
>
> getBlogposts();
> getWinners();
> getJudges();
> ```

**Exact changes to make:**

```js
// Add after the getJudges import:
const { getResources } = require('./directus/resources');

// Update the banner line to:
console.log(chalk.green('[ NEW COMMONS: BLOGPOSTS - WINNERS - JUDGES - RESOURCES ]'));

// Add after getJudges():
getResources();
```

> **Note:** All importers run concurrently (no `await` chaining). They write to separate directories so there are no conflicts.

### 2.4 Add resources schema to `content.config.ts`

> **Codebase research — exact current schema structure in `content.config.ts`:**
> - The file defines three collections: `blogposts`, `winners`, `judges`.
> - All use `type: 'data'` and `source: '<dir>/*.json'`.
> - String fields that might be empty from the importer (defaulting to `''`) should use `z.string()` not `.optional()` since the importer always writes the field. Use `.optional()` only for fields that may be truly absent from the JSON.
> - The `blogposts` schema includes `z.any()` for `main_content` — an option if description needs to support rich text.
> - The collection key name must match the directory name under `content/`.

Add inside the `collections` object (after the `judges` collection, before the closing `}`):

```ts
resources: defineCollection({
  source: 'resources/*.json',
  type: 'data',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    category: z.string(),
    url: z.string(),
    file: z.string(),
    cover_image: z.string(),
  })
}),
```

> **Implementation note:** Since the importer always writes empty strings for missing values (`item.url || ''`), all fields should be `z.string()` rather than `.optional()`. This matches the blogposts pattern where `cover_image` is `z.string()` even when it could be `''`.

### 2.5 Create composable — `composables/useResources.js`

> **Codebase research — composable patterns:**
> - `usePost.js` exports a default function that returns an object with helper functions. It is used as `const { getImage, formatDate } = usePost()` in components.
> - `useVideos.js` is a different pattern — it exports a hardcoded data array and a default function that finds by slug. Not the right model here.
> - `useJudges.js` / `useObservers.js` are also different — they export hardcoded arrays and a simple return function. Not the right model either.
> - Follow the `usePost.js` pattern: export a default function returning an object of helpers.

```js
export default function useResources() {
  const getImage = (resource) => {
    return resource?.cover_image ? resource.cover_image : '/images/resource-fallback.webp'
  }

  const getResourceLink = (resource) => {
    return resource?.url || resource?.file || '#'
  }

  const isExternalLink = (resource) => {
    const link = getResourceLink(resource)
    return link.startsWith('http') || link.startsWith('//')
  }

  const categories = (resources) => {
    if (!resources?.length) return []
    const cats = [...new Set(resources.map(r => r.category).filter(Boolean))]
    return cats.sort()
  }

  return {
    getImage,
    getResourceLink,
    isExternalLink,
    categories,
  }
}
```

> **Addition: `isExternalLink` helper.** This is useful for the card component to decide whether to use `target="_blank"`. File URLs from the Directus asset pipeline (e.g., `https://directus.example.com/assets/uuid`) are technically external too, so all resource links should open in a new tab. But the helper is available if more nuanced behavior is needed later.

---

## Phase 3: Resources Frontend

### 3.1 Create `components/ncResourceCard.vue`

Model after `ncBlogCard.vue`. Key differences:
- Links externally (via `url` or `file`) instead of to an internal route.
- Shows a `category` badge instead of a date.
- Opens in a new tab for external links.

> **Codebase research — exact CSS patterns from `ncBlogCard.vue` to replicate:**
> ```scss
> // Card container
> outline: 1px solid var(--black-color-10-tint);
> background-color: white;
> padding: var(--space-xs);
> border-radius: var(--border-radius-l);
> height: 100%;
> display: flex;
> flex-direction: column;
> text-decoration: none;
> color: inherit;
> --_stack-space: var(--space-xs);  // stack layout spacing
>
> // Image
> border-radius: var(--border-radius-s);
> width: 100%;
> aspect-ratio: 16 / 9;
> object-fit: cover;
>
> // CTA link
> margin-top: auto;  // pushes to bottom of flex column
> font-weight: 600;
> color: var(--primary-color);
>
> // Hover
> box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
> ```
>
> **Important:** `ncBlogCard.vue` uses `<NuxtLink>` for internal routes. Since resource cards link externally, use a plain `<a>` tag instead. The `v-if="content"` guard pattern is also used in the blog card.

```vue
<template>
  <a
    v-if="content"
    class="resource-card | stack"
    :href="getResourceLink(content)"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      :src="getImage(content)"
      :alt="content.title || 'Resource image'"
      class="resource-card__image"
    >
    <span class="resource-card__category">{{ content.category }}</span>
    <h3 class="resource-card__title">{{ content.title }}</h3>
    <p class="resource-card__description">{{ content.description }}</p>
    <span class="resource-card__cta">View resource</span>
  </a>
</template>

<script setup>
defineProps({
  content: {
    type: Object,
    required: true
  }
})

const { getImage, getResourceLink } = useResources()
</script>

<style lang="scss" scoped>
.resource-card {
  outline: 1px solid var(--black-color-10-tint);
  background-color: white;
  padding: var(--space-xs);
  border-radius: var(--border-radius-l);
  height: 100%;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  --_stack-space: var(--space-xs);
}

.resource-card__image {
  border-radius: var(--border-radius-s);
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.resource-card__category {
  display: inline-block;
  font-size: var(--size--1);
  font-weight: 600;
  text-transform: uppercase;
  color: var(--primary-color);
  letter-spacing: 0.05em;
}

h3 { line-height: 1.35; }

.resource-card__description {
  font-size: var(--size--1);
  color: var(--base-color-70-tint);
  /* Clamp to 3 lines */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.resource-card__cta {
  margin-top: auto;
  font-weight: 600;
  color: var(--primary-color);
}

.resource-card:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}
</style>
```

> **Design decisions captured:**
> - Category is styled as an uppercase colored label (like a tag/badge), following the `blog-card__brow` pattern for the date.
> - Description is clamped to 3 lines to keep cards uniform height.
> - The `<script setup>` imports helpers from `useResources()` composable rather than defining them inline (unlike `ncBlogCard.vue` which defines `getImage` and `formatDate` inline). This is a slight improvement on the pattern for reusability.

### 3.2 Create `pages/resources/index.vue`

Structure modeled after `pages/blog/index.vue`.

> **Codebase research — exact blog index patterns:**
> - Blog index uses `<nc-base-section>` (not `ncHero`) for the header area.
> - Data fetching pattern: `const { data } = await useAsyncData('key', () => queryCollection('name').all())`
> - The blog index passes `background-color="transparent"` to the header section (note: `ncBaseSection` actually accepts `color` not `background-color` as a prop — the `background-color` is passed as an HTML attribute, which works but is inconsistent. Use `color` prop for clarity).
> - The `.subtitle` class uses `font-size: var(--size-0); color: var(--primary-color); font-weight: 600; text-transform: uppercase;`.
> - The `.title` class uses `font-weight: 600; font-size: var(--size-4);`.
> - Grid uses `grid-template-columns: repeat(3, minmax(300px, 1fr))`.
> - The global `.grid` class from `everylayout.css` provides `display: grid; grid-template-columns: repeat(auto-fill, minmax(var(--_grid-min-width, 240px), 1fr)); gap: var(--_grid-gap, var(--base-gutter));` — this can be used with `--_grid-min-width: 300px` override instead of hardcoding the grid-template-columns.

```vue
<template>
  <nc-base-section id="resources-header">
    <h4 class="subtitle">Reports, Toolkits, and More</h4>
    <h1 class="title">Resources</h1>
    <p class="tagline">Explore resources from the New Commons initiative.</p>
  </nc-base-section>

  <nc-base-section>
    <!-- Category filter buttons -->
    <div class="resource-filters | cluster">
      <button
        class="filter-pill"
        :class="{ 'filter-pill--active': !activeCategory }"
        @click="activeCategory = null"
      >All</button>
      <button
        v-for="cat in categoryList"
        :key="cat"
        class="filter-pill"
        :class="{ 'filter-pill--active': activeCategory === cat }"
        @click="activeCategory = cat"
      >{{ cat }}</button>
    </div>
  </nc-base-section>

  <nc-base-section>
    <div class="grid resource-grid">
      <nc-resource-card
        v-for="resource in filteredResources"
        :key="resource.slug"
        :content="resource"
      />
    </div>
    <p v-if="!filteredResources?.length" class="text-align:center">
      No resources found.
    </p>
  </nc-base-section>
</template>

<script setup>
const { data: resources } = await useAsyncData('resources', () =>
  queryCollection('resources').all()
)

const { categories } = useResources()

const activeCategory = ref(null)

const categoryList = computed(() => categories(resources.value))

const filteredResources = computed(() => {
  if (!activeCategory.value) return resources.value ?? []
  return (resources.value ?? []).filter(r => r.category === activeCategory.value)
})
</script>

<style scoped>
.resource-grid {
  --_grid-min-width: 300px;
}

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

.filter-pill {
  border: 1px solid var(--base-color-10-tint);
  background: white;
  padding: var(--space-3xs) var(--space-s);
  border-radius: 999px;
  font-size: var(--size--1);
  font-weight: 500;
  cursor: pointer;
  transition: background 150ms ease, color 150ms ease;
  text-transform: capitalize;
}

.filter-pill--active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.filter-pill:hover:not(.filter-pill--active) {
  background: var(--base-color-07-tint);
}
</style>
```

> **Implementation notes:**
> - Uses the global `.grid` class with a `--_grid-min-width` override instead of hardcoding `grid-template-columns`. This leverages `auto-fill` from the global grid and is more responsive than the blog's `repeat(3, ...)` which doesn't collapse to fewer columns on small screens.
> - Filter pills use the `.cluster` utility class (from everylayout.css) for horizontal wrapping layout with gap.
> - Category text uses `text-transform: capitalize` to display `report` as `Report`, etc.

### 3.3 Add navigation link

> **Codebase research — topbar navigation:**
> The topbar (`ncTopbar.vue`) currently has these nav items: The Incubator, The 2025 Challenge, Blog, FAQ, Rules (external). A `/resources` link should be added to the navigation.

**Add to `components/ncTopbar.vue`** — insert a new `<li>` in the nav list:

```vue
<li><nc-button to="/resources" color="base" variant="link">Resources</nc-button></li>
```

**Suggested placement:** After "Blog" and before "FAQ", maintaining logical grouping of content sections.

### 3.4 Add fallback image

Create or source a generic fallback image at `public/images/resource-fallback.webp` (similar to `blog-fallback.webp`).

---

## Phase 4: Content Population & Testing

### 4.1 Populate Directus with sample resources

Since client content is not yet available, create 4-6 placeholder resources covering different categories:

| Title | Category | Type |
|-------|----------|------|
| "New Commons Challenge 2025 Report" | `report` | URL |
| "Data Commons Governance Toolkit" | `toolkit` | File |
| "Building Responsible AI Datasets" | `article` | URL |
| "Challenge Application Guidelines" | `report` | File |
| "Data Commons Video Introduction" | `video` | URL |
| "Open Data for AI Training" | `dataset` | URL |

### 4.2 Test the full pipeline

1. Run `node contentImporter.js` — verify `content/resources/` directory is created with JSON files.
2. Run `npm run dev` — verify `/resources` page loads, cards render, category filter works.
3. Verify responsive layout at mobile/tablet/desktop breakpoints.

### 4.3 Challenge archive final review

1. Verify `/the-2025-challenge` shows: winners, honorary distinctions, showcase description, gallery, judges grid, observers section.
2. Verify `/winners` redirects to `/the-2025-challenge` (already configured in `nuxt.config.ts` `routeRules`).
3. Verify `/winners/[slug]` detail pages still work (pages exist at `pages/winners/`).
4. Verify judges/observers bio links still function — clicking a bio card in the grid should navigate to `/judges#slug-name` or `/observers#slug-name` and scroll to the correct bio.

> **Existing redirects in `nuxt.config.ts` for reference:**
> ```js
> routeRules: {
>   '/prize': { redirect: '/incubator/2026' },
>   '/the-prize': { redirect: '/incubator/2026' },
>   '/the-incubator': { redirect: '/incubator/2026' },
>   '/incubator': { redirect: '/incubator/2026' },
>   '/winners': { redirect: '/the-2025-challenge' },
> }
> ```
> No additional redirects are needed for Phase 1. The `/judges` and `/observers` pages remain as standalone full-bio pages.

---

## File Inventory

### New files to create
| File | Purpose |
|------|---------|
| `directus/resources.js` | Directus importer for resources collection |
| `composables/useResources.js` | Helper composable for resource data |
| `components/ncResourceCard.vue` | Resource card component |
| `pages/resources/index.vue` | Resources listing page |
| `public/images/resource-fallback.webp` | Fallback image for resources without cover |

### Existing files to modify
| File | Change |
|------|--------|
| `contentImporter.js` | Add `getResources()` import and call; update banner |
| `content.config.ts` | Add `resources` collection schema after `judges` |
| `pages/the-2025-challenge.vue` | Add judges/observers sections before `<nc-blog-section>`; add challenge description/rules section |
| `components/ncTopbar.vue` | Add `/resources` navigation link |

### Directus (admin panel)
| Action | Detail |
|--------|--------|
| Create collection | `new_commons_resources` with fields listed in 2.1 |
| Populate data | 4-6 sample resources per 4.1 |

---

## Risks & Edge Cases Discovered

1. **Observer image path coupling:** `ncBioCard.vue` hardcodes the image path to `/assets/judges/${judge.img}`. Both judges and observers share this path. The single observer (`canela.jpg`) must exist under `/assets/judges/` — verify this file exists or the observer cards will show broken images.

2. **Duplicate slug collision in importer:** All existing importers (blogposts, winners, judges, resources) use `common.slugify(title)` for the filename. If two resources have the same title, the second JSON file silently overwrites the first. There is no deduplication logic. Mitigate by ensuring unique titles in Directus.

3. **`ssr: false` in nuxt.config.ts:** The app runs as a client-side SPA (`ssr: false`). This means `useAsyncData` calls run client-side. The resources page will show a loading flash while data is fetched. This is consistent with existing behavior on the blog page, so no special handling is needed.

4. **Blog page grid responsiveness:** The blog index uses `repeat(3, minmax(300px, 1fr))` which does NOT collapse below 3 columns gracefully. The plan for resources uses the global `.grid` class with `auto-fill` instead, which is more responsive. This is an intentional improvement, not a bug.

5. **No `directus/` directory in the worktree:** The `directus/` directory with importer scripts does not exist in the git worktree — it lives only in the main repo at the project root. The new `directus/resources.js` file must be created in the same location alongside `blogposts.js`, `winners.js`, `judges.js`, and `common.js`.

6. **Content importer race condition:** All importers run concurrently without awaiting each other. The rimraf + mkdir pattern has a theoretical race condition if `./content` doesn't exist and multiple importers try to create it simultaneously. This is an existing issue, not introduced by this change. The `resources` importer follows the same pattern for consistency.

---

## Open Questions

1. **Challenge rules content:** ~~Does a rules document or URL exist?~~ **RESOLVED:** A Google Doc exists and is already linked in the topbar navigation: `https://docs.google.com/document/d/1fYmUkwTqOngtpbVT8BezgmWs14IkvGEO6q5a53jqHhA/edit?tab=t.0`. Use this URL on the challenge page. Remaining question: should this be downloaded as a PDF for permanence?
2. **Resource categories:** Are the proposed categories (`report`, `toolkit`, `dataset`, `video`, `article`) correct, or does the client have a different taxonomy?
3. **Resource linking behavior:** Should resources with a `file` field open a download, or show an inline preview? Current plan assumes direct download link (opens in new tab).
4. **Judges/observers consolidation depth:** Should the standalone `/judges` and `/observers` pages be removed and redirected, or kept as full-bio reference pages? Current plan keeps them and adds grids to the challenge page.
5. **Resource detail pages:** The scope only mentions a listing page. Confirm that individual `/resources/[slug]` detail pages are NOT needed for this issue.

---

## Suggested Implementation Order

1. Phase 1 (Challenge archive) — can be done independently, no Directus setup needed
2. Phase 2.1 (Directus collection) — must be done in the Directus admin panel first
3. Phase 2.2-2.5 (Pipeline + schema + composable) — depends on 2.1
4. Phase 3 (Frontend) — depends on Phase 2
5. Phase 4 (Population + testing) — depends on all above

> **Parallel work opportunity:** Phase 1 and Phase 3.1 (card component + styling) can be developed in parallel since they have no dependencies. The card component can be built and tested with hardcoded mock data before the Directus pipeline is ready.
>
> **Branch strategy:** Per project conventions, work on the `dev` branch (never push directly to `main`). Create a feature branch `feature/CCM-106-resources-challenge-archive` from `dev`.
