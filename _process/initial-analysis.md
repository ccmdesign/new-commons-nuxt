# New Commons — Website Transition Spec

## From "Challenge" to "Incubator"

**Client:** The GovLab / Open Data Policy Lab (ODPL)
**Contact:** Hannah Chafetz ([hchafetz@thegovlab.org](mailto:hchafetz@thegovlab.org))
**Date:** February 23, 2026
**Target Launch:** April 2026

---

## 1. Project Overview

The GovLab is launching **The New Commons Incubator**, a new initiative that builds on the previous New Commons Challenge. The Incubator offers 3-month training programs for data commons organizers, run in themed cohorts. The first cohort focuses on **data commons for indigenous and low-resourced languages**, in partnership with Microsoft and UNESCO (TBC).

This project requires updates across two websites:

- **newcommons.ai** — primary site (Nuxt.js, hosted on Netlify or similar)
- **opendatapolicylab.org** — ODPL main site (Nuxt.js)

The client references the **Data Stewards Academy** (data-stewards.netlify.app) as a comparable model for multi-cohort, themed training programs.

---

## 2. Current State — newcommons.ai

### Tech Stack

- Nuxt 3 (Vue-based, SPA mode with `ssr: false`)
- Directus CMS → `@nuxt/content` (content imported at build time via `contentImporter.js`)
- Google Analytics (G-DDSZL43JDX) via `nuxt-gtag`
- Microsoft Clarity (t7oy6y6059) via cookie consent
- Cookie Information (consent provider)

> **Note:** `nuxt.config.ts` contains legacy Contentful space/token references — these are dead code. The actual CMS is Directus.

### Current Navigation

`The Prize` | `Winners` | `Blog` | `FAQ` | `Rules ↗`

### Current Logo

"New.Commons **CHALLENGE**" — teal wordmark with geometric icon

### Current Pages


| Page          | Content Summary                                                                                                                                                |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Homepage**  | "New Commons Challenge" hero, "Meet the Awardees" banner with CTA, Challenge explainer video, FAQ callout, webinar recording link, Blog section, partner logos |
| **The Prize** | Challenge details, eligibility, jury section, CTA to apply                                                                                                     |
| **Winners**   | 2025 Challenge awardees showcase                                                                                                                               |
| **Blog**      | News and updates (Oct 2025, Sep 2025, Apr 2025 posts visible)                                                                                                  |
| **FAQ**       | Challenge-specific Q&A                                                                                                                                         |
| **Rules**     | External link to rules document                                                                                                                                |


---

## 3. Phase 1 — Incubator Launch (April 2026)

This is the immediate scope. The site needs to shift from promoting the completed Challenge to launching the Incubator while preserving the Challenge as an archive.

### 3.1 Global Changes


| Element      | Current                     | New                                           |
| ------------ | --------------------------- | --------------------------------------------- |
| **Logo**     | "New.Commons **CHALLENGE**" | "New.Commons" (remove "Challenge")            |
| **Partners** | Current partner logos       | Updated partner logos (Microsoft, UNESCO TBC) |


### 3.2 Navigation (Proposed)

**Current:** `The Prize` · `Winners` · `Blog` · `FAQ` · `Rules ↗`

**Proposed:** `The Incubator` · `The 2025 Challenge` · `Resources` · `Blog` · `FAQ` · `Rules ↗`

> **Note:** Resources confirmed as a main nav item per client request.
>
> **Decision:** Fix navigation to use `<NuxtLink>` instead of plain `<a>` tags (current workaround in `ncTopbar.vue`).

### 3.3 Page-by-Page Changes

#### Homepage


| Section         | Change Type          | Details                                                                                                           |
| --------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Hero            | **Rewrite**          | New copy introducing the New Commons Incubator. Replace "Challenge" language with Incubator positioning.          |
| CTA Banner      | **Replace**          | "Meet the Awardees" → CTA to apply for the Incubator (link to application form)                                   |
| Webinar Section | **Update**           | CTA to sign up for informational webinar. After webinar takes place, replace with YouTube embed of recording.     |
| Video Section   | **Update or Remove** | Current Challenge explainer video — replace with Incubator explainer or remove if no new video is ready at launch |
| FAQ Callout     | **Keep**             | Update link text if needed, still points to FAQ page                                                              |
| Challenge Link  | **New**              | Add link to "The 2025 Challenge" archive page                                                                     |
| Blog Section    | **Keep**             | No changes needed, blog feed remains                                                                              |


> **Question for client:** Will there be a new hero image/visual for the Incubator, or should we reuse/adapt the current abstract blue imagery?

#### The Incubator (cohort-based architecture)

The site will use a cohort-based routing structure from the start to support future iterations.

| Element                  | Details                                                                                                                                   |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **URL**                  | `/incubator/2026` (actual page for first cohort)                                                                                          |
| **Redirects**            | `/the-incubator` → `/incubator/2026`, `/the-prize` → `/incubator/2026`, `/prize` → `/incubator/2026`                                     |
| **Content**              | New copy describing the Incubator program — format similar to current Prize page                                                          |
| **Sections (suggested)** | Program overview, What we offer (guidance, training, technical support), Timeline/milestones, Who should apply, Eligibility, CTA to apply |
| **CTA**                  | Link to application form                                                                                                                  |

> **Decision:** `/the-incubator` redirects to `/incubator/2026` for now. Once a second cohort is launched, we'll add a cohort index/selector at `/incubator`.

#### The 2025 Challenge (consolidated archive)


| Element              | Details                                                                                                                                                                |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **URL**              | `/the-2025-challenge` (redirect `/winners` → `/the-2025-challenge`)                                                                                                    |
| **Content**          | Full archive of the 2025 Challenge — consolidates Winners, Prize description, Jury, and related content from orphaned pages (`prize2.vue`, `prize-detail.vue`, etc.) |
| **Jury Section**     | Moved here from "The Prize" page — jury bios/photos (using existing hardcoded data from `useJudges.js`)                                                               |
| **Challenge Details** | Include original Challenge description and rules for archival purposes                                                                                                 |

> **Decision:** Consolidate all Challenge-related content into this single archive page. Remove orphaned pages (`prize2.vue`, `prize-detail.vue`, hardcoded `new-commons-award-announcement.vue`).

#### FAQ


| Element     | Details                                          |
| ----------- | ------------------------------------------------ |
| **URL**     | `/faq` (no change)                               |
| **Content** | New Incubator-specific FAQs. Same format/layout. |
| **Source**  | Client to provide new FAQ content                |


#### Rules


| Element     | Details                              |
| ----------- | ------------------------------------ |
| **URL**     | `/rules` (no change — external link) |
| **Content** | New rules document for the Incubator |
| **Source**  | Client to provide new document       |


#### Resources (New Page)


| Element           | Details                                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **URL**           | `/resources`                                                                                                            |
| **Purpose**       | Feature data commons resources: blueprint, repository of examples, toolkits                                             |
| **Format**        | Client is open to recommendations. Suggested: card grid layout similar to current Blog page, with filterable categories |
| **Content types** | Links to external resources, downloadable documents, featured tools                                                     |


> **Question for client:** What resources exist today? Need a list of items to feature.

> **Decision:** CMS-driven collection. A new Directus collection (`new_commons_resources`) will be created, following the same import pattern as blogposts/winners/judges. A new importer will be added to `contentImporter.js` and a new schema defined in `content.config.ts`. Card-based layout with categories (e.g., "Blueprints," "Case Studies," "Tools") — similar to how the Data Stewards Academy structures their program offerings.

### 3.4 Bug Fixes & Cleanup (Phase 1)

Addressed alongside the main transition work:

| Item | Details |
| ---- | ------- |
| **Blog card images** | Fix `ncBlogCard` to read `post.cover_image` instead of `post.meta.body.cover_image` (currently all cards show fallback image) |
| **Video slug mismatches** | Fix `useVideos.js` slugs: `malawi-voice-data-commons` → `malawi-voice-data-commons-project`, `place-hub-in-nigeria` → `the-place-trust-in-nigeria` |
| **Navigation routing** | Replace `<a>` tags with `<NuxtLink>` in `ncTopbar.vue` |
| **Dead code removal** | Remove legacy Contentful config from `nuxt.config.ts`, unused Pinia store (`stores/video.ts`), orphaned pages (`prize2.vue`, `prize-detail.vue`) |
| **Redirect config** | Create redirect configuration (via `nuxt.config.ts` `routeRules` or `public/_redirects`) for all old → new URL mappings |

### 3.5 ODPL Updates (Phase 1)

> **Decision:** Deferred — will address separately.

~~| Element             | Details                                                                                  |~~
~~| ------------------- | ---------------------------------------------------------------------------------------- |~~
~~| **Homepage Banner** | Add a banner/callout promoting the Incubator with CTA to apply, linking to newcommons.ai |~~
~~| **Placement**       | Likely near top of page, above or below the "What we do" section                         |~~

---

## 4. Future Phases (Scope TBD)

These are documented for planning but not in immediate scope.

### Phase 2 — Applications Closed (June 2026)

- **newcommons.ai:** Remove application CTA and form. Replace with "Applications are closed" messaging. Keep Incubator page with program details.
- **ODPL:** Remove homepage banner.

### Phase 3 — Final Showcase Promo (November 2026)

- **newcommons.ai:** Add a new page about the showcase event (date, agenda, how to attend/watch).
- **ODPL:** Add homepage banner promoting the showcase event.

### Phase 4 — Post-Showcase (December 2026 / January 2027)

- **newcommons.ai:** Develop individual pages for participant projects (up to 5 projects). Similar to how the 2025 Challenge winners are showcased.
- **ODPL:** Add homepage banner linking to participant project pages.

> **Note:** The client plans to replicate this full cycle for future Incubator cohorts, potentially with different themes. The site architecture should be designed with this in mind — making it easy to archive one cohort and launch the next.

---

## 5. Content Delivery Requirements

The following content is needed from the client before development can begin on Phase 1:


| Item                                                                             | Status    | Notes                                       |
| -------------------------------------------------------------------------------- | --------- | ------------------------------------------- |
| New homepage copy (Incubator intro)                                              | ⬜ Pending |                                             |
| Incubator page copy (program details, eligibility, timeline)                     | ⬜ Pending |                                             |
| Updated partner logos                                                            | ⬜ Pending | Microsoft, UNESCO (TBC)                     |
| Updated logo (without "Challenge")                                               | ⬜ Pending | Who is handling the rebrand? CCM or client? |
| New FAQ content                                                                  | ⬜ Pending |                                             |
| New Rules document                                                               | ⬜ Pending |                                             |
| Application form URL                                                             | ⬜ Pending |                                             |
| Webinar signup URL                                                               | ⬜ Pending |                                             |
| Resources page content (list of resources to feature)                            | ⬜ Pending |                                             |
| Hero image / visual for Incubator                                                | ⬜ Pending | New or reuse existing?                      |
| Challenge archive page copy (any additional context beyond current Winners page) | ⬜ Pending |                                             |
| Language guidelines for indigenous communities content                           | ⬜ Pending | Client to provide after partner consultations |
| ODPL banner copy + design direction                                              | ⬜ Pending |                                             |


---

## 6. Open Questions

### Resolved

1. ~~**Resources page architecture**~~ → CMS-driven. New Directus collection + importer.
2. ~~**Future-proofing**~~ → Yes, cohort-based routes from the start. `/incubator/2026` for first cohort, `/the-incubator` redirects there.
3. ~~**URL strategy**~~ → Confirmed. `/the-prize` and `/prize` → `/incubator/2026`, `/winners` → `/the-2025-challenge`. Redirect config to be created.
4. ~~**ODPL updates**~~ → Deferred to later.

### Still Open (for client)

1. **Hero visual** — New imagery for the Incubator, or adapt the existing blue abstract visual?
2. **Jury/Advisory section** — Does it move entirely to the Challenge archive page, or also appear on the Incubator page (with new advisory group)?
3. **Blog continuity** — Does the blog remain a shared space for both Challenge archive news and new Incubator updates?
4. **Logo rebrand** — Is CCM handling the logo update, or will the client provide an updated logo file?
5. **Webinar flow** — Two webinars are planned. Should both be listed, or just the next upcoming one at any given time?
6. **Indigenous language sensitivity** — The first cohort focuses on indigenous and low-resourced languages. Client is consulting with community partners on appropriate language guidelines, ethics statements, and terminology. All content copy should follow these guidelines once provided.

---

## 7. Estimate Considerations

### newcommons.ai — Phase 1

**Content & Pages:**
- Logo swap (asset replacement)
- Homepage content rewrite + layout adjustments
- New page: `/incubator/2026` (content + layout, based on existing Prize page template)
- Page restructure: `/the-2025-challenge` (consolidate Winners + Jury + Prize description + orphaned content)
- New page: `/resources` (new template — card grid, CMS-driven via new Directus collection)
- FAQ content swap
- Rules link update

**Infrastructure:**
- Cohort-based routing structure (`/incubator/[year]`)
- Navigation update (rewrite + fix `<NuxtLink>` routing)
- Redirect configuration (all old → new URL mappings)
- New Directus collection + importer for Resources
- New `content.config.ts` schema for Resources

**Bug Fixes & Cleanup:**
- Fix blog card cover image resolution
- Fix video slug mismatches in `useVideos.js`
- Remove dead Contentful config
- Remove unused Pinia store (`stores/video.ts`)
- Remove orphaned pages (`prize2.vue`, `prize-detail.vue`)
- Partner logo updates

### opendatapolicylab.org

- Deferred

### Ongoing (Phases 2–4)

- Content swaps per phase (lower effort if templates are reusable)
- New pages for showcase event and participant projects
- ODPL banner updates per phase

