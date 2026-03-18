# CCM-106: New Page Templates — Resources & Challenge Archive

## Overview

This issue covers two workstreams:
1. **Challenge archive finalization** — consolidate judges/observers into `the-2025-challenge.vue` and add any missing challenge description/rules content.
2. **Resources page (full stack)** — new Directus collection, content importer, Nuxt Content schema, composable, page, and card component.

---

## Phase 1: Challenge Archive Finalization

### 1.1 Consolidate judges/observers into the-2025-challenge.vue

**Current state:** `the-2025-challenge.vue` already has winners, honorary distinctions, showcase description, and photo gallery. Judges and observers live on **separate pages** (`/judges`, `/observers`) using hardcoded composables (`useJudges.js`, `useObservers.js`) — not the Directus-backed `judges` collection.

**Tasks:**

1. Add a "Jury" section to `pages/the-2025-challenge.vue` after the Showcase section, using the existing `<nc-judges-grid />` component.
2. Add an "International Observer" section below it, using the existing `<nc-observers-grid />` component.
3. Verify both grids render correctly and link to their respective detail pages (`/judges#slug`, `/observers#slug`).

**Files to modify:**
- `pages/the-2025-challenge.vue` — add two new `<nc-base-section>` blocks with `<nc-judges-grid />` and `<nc-observers-grid />`.

**No files to delete yet** — `/judges` and `/observers` pages should remain functional since the bio cards link to them for full bios. Consider adding redirects later if full consolidation is desired.

### 1.2 Add challenge description and rules reference

**Current state:** The page has an overview paragraph but no explicit "About the Challenge" or "Rules" section.

**Tasks:**

1. Add a section (after the overview hero, before the Awardees section) with:
   - Brief challenge description (what the New Commons Challenge is, its purpose).
   - A link or reference to the challenge rules (ask client for URL or PDF if not already available).
2. This can be placeholder text marked with a `<!-- TODO: confirm with client -->` comment if final copy is not available.

**Decision for implementer:** Confirm whether rules content exists as a PDF/external link or needs to be authored. If a PDF, add it to `/public/documents/` and link from the page.

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

**Decision for implementer:** Confirm the category taxonomy with the client. Start with the values above as defaults; the frontend filter will be driven by whatever values appear in the data.

### 2.2 Create Directus importer — `directus/resources.js`

Follow the exact pattern used in `directus/blogposts.js`:

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

Add to `contentImporter.js`:

```js
const { getResources } = require('./directus/resources');
// ... existing imports ...

// Add to the import sequence:
getResources();
```

Update the console log banner to include `RESOURCES`.

### 2.4 Add resources schema to `content.config.ts`

Add a new collection definition:

```ts
resources: defineCollection({
  source: 'resources/*.json',
  type: 'data',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    category: z.string(),
    url: z.string().optional(),
    file: z.string().optional(),
    cover_image: z.string().optional(),
  })
}),
```

### 2.5 Create composable — `composables/useResources.js`

Follow the `usePost.js` pattern:

```js
export default function useResources() {
  const getImage = (resource) => {
    return resource?.cover_image ? resource.cover_image : '/images/resource-fallback.webp'
  }

  const getResourceLink = (resource) => {
    return resource?.url || resource?.file || '#'
  }

  const categories = (resources) => {
    if (!resources?.length) return []
    const cats = [...new Set(resources.map(r => r.category).filter(Boolean))]
    return cats.sort()
  }

  return {
    getImage,
    getResourceLink,
    categories,
  }
}
```

---

## Phase 3: Resources Frontend

### 3.1 Create `components/ncResourceCard.vue`

Model after `ncBlogCard.vue`. Key differences:
- Links externally (via `url` or `file`) instead of to an internal route.
- Shows a `category` badge instead of a date.
- Opens in a new tab for external links.

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
```

**Styling:** Match `ncBlogCard.vue` patterns — white card, border-radius, hover shadow, stack layout, 16:9 image aspect ratio.

### 3.2 Create `pages/resources/index.vue`

Structure modeled after `pages/blog/index.vue`:

```vue
<template>
  <nc-base-section id="resources-header" background-color="transparent">
    <h4 class="subtitle">Reports, Toolkits, and More</h4>
    <h1 class="title">Resources</h1>
    <p class="tagline">Explore resources from the New Commons initiative.</p>
  </nc-base-section>

  <nc-base-section background-color="transparent">
    <!-- Category filter buttons -->
    <div class="resource-filters">
      <button
        :class="{ active: !activeCategory }"
        @click="activeCategory = null"
      >All</button>
      <button
        v-for="cat in categoryList"
        :key="cat"
        :class="{ active: activeCategory === cat }"
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
```

**Grid styling:** Use the same `grid-template-columns: repeat(3, minmax(300px, 1fr))` pattern from blog index.

**Filter styling:** Horizontal row of pill/chip buttons. Active state with `primary-color` background.

### 3.3 Add fallback image

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
2. Verify `/winners` redirects to `/the-2025-challenge`.
3. Verify `/winners/[slug]` detail pages still work.
4. Verify judges/observers bio links still function.

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
| `contentImporter.js` | Add `getResources()` call |
| `content.config.ts` | Add `resources` collection schema |
| `pages/the-2025-challenge.vue` | Add judges/observers sections; add challenge description/rules section |

### Directus (admin panel)
| Action | Detail |
|--------|--------|
| Create collection | `new_commons_resources` with fields listed in 2.1 |
| Populate data | 4-6 sample resources per 4.1 |

---

## Open Questions

1. **Challenge rules content:** Does a rules document or URL exist? If so, where? If not, should we create placeholder text?
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
