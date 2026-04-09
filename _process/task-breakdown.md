# New Commons — Task Breakdown

## Phase 1: Incubator Launch

Tasks are grouped into sequential milestones. Within each milestone, tasks can be worked in parallel. Each milestone should be completed before the next begins, since later work depends on earlier foundations.

---

### Milestone 1: Cleanup & Infrastructure

No client content needed. Can start immediately.

#### 1.1 Dead code removal
- Remove legacy Contentful config from `nuxt.config.ts`
- Remove unused Pinia store (`stores/video.ts`)
- Remove orphaned pages (`prize2.vue`, `prize-detail.vue`)

#### 1.2 Bug fixes
- Fix `ncBlogCard` cover image resolution (`post.cover_image` instead of `post.meta.body.cover_image`)
- Fix video slug mismatches in `useVideos.js`

#### 1.3 Navigation fix
- Replace `<a>` tags with `<NuxtLink>` in `ncTopbar.vue`
- Verify routing works correctly after the fix

#### 1.4 Redirect configuration
- Set up redirect infrastructure (via `routeRules` in `nuxt.config.ts` or `public/_redirects`)
- Configure all old → new URL mappings:
  - `/prize` → `/incubator/2026`
  - `/the-prize` → `/incubator/2026`
  - `/the-incubator` → `/incubator/2026`
  - `/winners` → `/the-2025-challenge`

**Milestone 1 deliverable:** Clean codebase with working redirects and bug fixes. Site still shows current content — nothing user-facing changes yet.

---

### Milestone 2: Architecture & New Templates

No client content needed. Sets up the structural pieces that content will fill.

#### 2.1 Cohort-based routing
- Create `/pages/incubator/` directory structure
- Create `/pages/incubator/2026.vue` page (placeholder content for now, based on `prize.vue` layout)
- Verify redirect from `/the-incubator` → `/incubator/2026` works

#### 2.2 Challenge archive page
- Create `/pages/the-2025-challenge.vue`
- Consolidate content from current `winners/index.vue`, `prize.vue`, and `judges.vue`
- Include: winners showcase, jury grid, challenge description, rules reference
- Redirect `/winners` → `/the-2025-challenge`
- Keep winner detail pages functional at `/winners/[slug]` (or redirect to anchors on the archive page — TBD)

#### 2.3 Resources page — data pipeline
- Create new Directus collection schema (`new_commons_resources`) with fields: title, slug, description, category, url, file, cover_image
- Add resources importer to `contentImporter.js`
- Add resources schema to `content.config.ts`
- Create `/composables/useResources.js`

#### 2.4 Resources page — frontend
- Create `/pages/resources/index.vue` with card grid layout
- Create `ncResourceCard.vue` component
- Add category filtering (client-side, based on category field)

**Milestone 2 deliverable:** All new page templates exist and route correctly. Content is placeholder/structural. Resources pipeline is ready to receive data from Directus.

---

### Milestone 3: Global Updates

Requires: updated logo from client. Can be partially started without it.

#### 3.1 Logo swap
- Replace "New.Commons CHALLENGE" logo with "New.Commons" across all assets
- Update `ncTopbar.vue`, `ncFooter.vue`, and any OG image references
- **Blocked on:** Client providing updated logo file

#### 3.2 Navigation update
- Update nav items: `The Incubator` · `The 2025 Challenge` · `Resources` · `Blog` · `FAQ` · `Rules ↗`
- Update routes to match new page structure
- Update mobile menu if applicable

#### 3.3 Partner logos
- Replace current partner logos with updated set (Microsoft, UNESCO TBC)
- **Blocked on:** Client providing updated logo files

**Milestone 3 deliverable:** Site shell (nav, logo, footer) reflects the new Incubator identity. Pages still have placeholder content.

---

### Milestone 4: Content Integration

Requires: all client content deliverables. This is the final stretch.

#### 4.1 Homepage rewrite
- Replace hero section with Incubator intro copy
- Replace "Meet the Awardees" CTA banner with Incubator application CTA
- Update webinar section (signup CTA or YouTube embed depending on timing)
- Update or remove Challenge explainer video
- Add link to "The 2025 Challenge" archive page
- **Blocked on:** Homepage copy, hero image, application form URL, webinar signup URL

#### 4.2 Incubator page content
- Populate `/incubator/2026` with program details, eligibility, timeline, CTA
- **Blocked on:** Incubator page copy, application form URL

#### 4.3 FAQ content swap
- Replace current Challenge FAQs with Incubator FAQs
- Same layout, new content
- **Blocked on:** New FAQ content from client

#### 4.4 Rules link update
- Update external rules link to new Incubator rules document
- **Blocked on:** New rules document from client

#### 4.5 Resources content
- Populate Directus collection with initial resources
- Verify import pipeline and card rendering
- **Blocked on:** Resources list from client

#### 4.6 Challenge archive finalization
- Add any additional archival copy the client provides
- Final review of consolidated content
- **Blocked on:** Challenge archive copy from client

**Milestone 4 deliverable:** Complete site ready for launch.

---

### Milestone 5: Pre-Launch QA

#### 5.1 Cross-browser testing
- Test on Chrome, Firefox, Safari, mobile browsers

#### 5.2 Redirect verification
- Verify all old URLs redirect correctly
- Check for any broken internal links

#### 5.3 SEO check
- Verify sitemap includes new pages and excludes removed ones
- Check OG tags on all new/updated pages
- Verify robots.txt is correct

#### 5.4 Analytics verification
- Confirm Google Analytics and Microsoft Clarity track new pages
- Verify cookie consent still works

#### 5.5 Content review
- Final pass on all copy with client
- Check for any remaining "Challenge" language that should be "Incubator"

**Milestone 5 deliverable:** Signed off, ready to deploy.

---

## Dependency Map

```
Milestone 1 (Cleanup)          ← No blockers, start immediately
    ↓
Milestone 2 (Architecture)     ← No blockers, start after M1
    ↓
Milestone 3 (Global Updates)   ← Blocked on: logo, partner logos
    ↓
Milestone 4 (Content)          ← Blocked on: all client content
    ↓
Milestone 5 (QA)               ← After all content is in place
```

Milestones 1 and 2 can be completed while waiting for client content. Milestone 3 can be partially started (nav update) but needs assets for logo/partner work. Milestone 4 is entirely dependent on client deliverables.

---

## Files Affected (Key)

| File | Changes |
| ---- | ------- |
| `nuxt.config.ts` | Remove Contentful config, add `routeRules` for redirects |
| `components/ncTopbar.vue` | New nav items, `<NuxtLink>` fix, logo swap |
| `components/ncFooter.vue` | Logo swap, partner logos |
| `components/ncBlogCard.vue` | Fix cover image path |
| `composables/useVideos.js` | Fix slug mismatches |
| `contentImporter.js` | Add resources importer |
| `content.config.ts` | Add resources schema |
| `pages/index.vue` | Homepage rewrite |
| `pages/incubator/2026.vue` | New — Incubator cohort page |
| `pages/the-2025-challenge.vue` | New — consolidated Challenge archive |
| `pages/resources/index.vue` | New — Resources page |
| `components/ncResourceCard.vue` | New — Resource card component |
| `pages/prize.vue` | Remove (redirected) |
| `pages/prize2.vue` | Remove (dead) |
| `pages/prize-detail.vue` | Remove (dead) |
| `stores/video.ts` | Remove (unused) |
