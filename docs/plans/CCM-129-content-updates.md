# CCM-129: Content Updates, New Pages, and Components — Implementation Plan

## Critical Finding: Branch Must Merge `dev`, Not `main`

**The original plan assumed CCM-107/108/127/128 work lives on `main`. This is incorrect.**

The actual state:
- **`main`** branch: cookie consent, blog fixes — no CCM work
- **`dev`** branch: includes all CCM-107, 108, 127, 128 merges
- **This branch** (`feature/CCM-129-content-updates-pages-components`): based on CCM-105, ahead of `main` but missing all `dev` work

**Action:** Merge `origin/dev` (not `main`) into this branch before any implementation.

```bash
git merge origin/dev
```

**Risk:** This will be a large merge (79 files changed, ~4500 lines of new code). Conflicts are likely in files touched by both CCM-105 and CCM-127/128 (e.g., `pages/index.vue`, `components/ncTopbar.vue`, `components/ncFooter.vue`).

---

## What Has Already Been Done (on `dev`)

The audit below compares the CCM-129 issue checklist against the current state of `origin/dev`.

### Branding & Global Updates

| Task | Status | Evidence |
|------|--------|----------|
| Update `ncLogoHeader.vue` (remove "challenge") | DONE (CCM-107) | SVG shows "New Commons" only (width 210, no "CHALLENGE" text paths). Verified: no "challenge" text in SVG on `dev`. |
| Update `ncLogoFooter.vue` (remove "challenge") | DONE (CCM-107) | Footer SVG updated similarly. |
| Update `ncFooter.vue` (remove Partners/Observer, add UNESCO + Microsoft) | PARTIALLY DONE (CCM-127) | On `dev`: col3 has only `<nc-unesco-logo />` under "Partners". Direct Relief + i-data logos removed. "International Observer" subsection removed. MS logo is in col1 ("About ODPL"). **See Step 2 below.** |
| Update `ncTopbar.vue` (add Initiatives, remove Rules) | DONE (CCM-127) | On `dev`: Rules link removed; Initiatives (`/#initiatives`), Resources (`/resources`), FAQ (`/faq`), Blog (`/blog`) all present. **Note:** empty `<script setup>` block was removed on dev. |

**Current branch state (pre-merge):** The branch still has OLD topbar with Rules link, OLD footer with Direct Relief + i-data + International Observer section, OLD Challenge-era content everywhere. All of this will be resolved by the `dev` merge.

### FAQ Page

| Task | Status | Evidence |
|------|--------|----------|
| Replace all FAQ content with 13 Incubator items | DONE (CCM-127) | On `dev`: FAQ has 4 sections ("About the Incubator", "Eligibility & Application", "Program Details", "Data Commons & Governance") with 13 `summary:` entries. Count verified. |
| Reorganize accordion sections | DONE (CCM-127) | Reorganized from 8 Challenge sections to 4 Incubator sections. |

**Current branch state:** Still has old Challenge FAQ with 8 sections and ~30 items. Will be replaced by merge.

### Incubator Page (`pages/incubator/2026.vue`)

| Task | Status | Evidence |
|------|--------|----------|
| Update hero copy | DONE (CCM-127) | On `dev`: Hero says "Building a Shared Digital Future" with Incubator description. |
| Add "Why the Incubator?" section | DONE (CCM-127) | Section exists with 3 paragraphs. |
| Replace "What We Offer" with Programmatic Offerings | DONE (CCM-127) | Programmatic Offerings section with 4 bullet items (Funding, Mentorship, Technical Support, Network Access). |
| Add Helpful Tips / Resources CTA section | DONE (CCM-127) | Two CTA link panels: "Helpful Tips" (links to `/resources`) and "Have Questions?" (links to `/faq`). |
| Add FAQ CTA section | DONE (CCM-127) | Included in the CTA link panels above. |
| Remove Judges/Observers sections | DONE (CCM-127) | No `<nc-judges-grid>` or `<nc-observers-grid>` on the page. |

**Current branch state:** Still has old Challenge-era 2026 page with placeholder banner, judges/observers grids, prize cards, rules link. Will be completely replaced by merge.

### Homepage

| Task | Status | Evidence |
|------|--------|----------|
| Update hero section copy | DONE (CCM-127) | On `dev`: Hero says "The New Commons Incubator" with Incubator description. |
| Update FAQ CTA section copy | DONE (CCM-127) | On `dev`: FAQ CTA references "New Commons Incubator" and programme/eligibility. Webinar panel removed (was Challenge-specific). |
| Add Initiatives section | DONE (CCM-128) | On `dev`: `#initiatives` section with `nc-initiative-card` grid using `useInitiatives()` composable. |
| Add Resources section | DONE (CCM-128) | On `dev`: `#resources-section` with `nc-resource-card` grid, conditionally rendered. |
| Keep blog section as-is | DONE | Blog section unchanged. |

**Current branch state:** Old Challenge homepage with video section, old hero, no initiatives/resources. Will be replaced by merge.

### New Pages

| Task | Status | Evidence |
|------|--------|----------|
| Create `pages/initiatives.vue` | DONE (CCM-128) | On `dev`: Page exists with grid of initiative cards, SEO meta, uses `useInitiatives()`. |
| Create `ncInitiativeCard.vue` | DONE (CCM-128) | On `dev`: Component exists. |
| Create `pages/resources/index.vue` | DONE (CCM-128) | On `dev`: Page exists with resource cards. |
| Create `pages/incubator/indigenous-languages.vue` | DONE (CCM-128) | On `dev`: 251-line page with all 8 panels (hero, why, offerings, steering committee, how to apply, webinar, timeline, FAQ CTA). |

**Current branch state:** None of these pages exist. Will be created by merge.

### Component Work

| Task | Status | Evidence |
|------|--------|----------|
| Generalize `ncJudgesGrid.vue` to accept collection prop | DONE (CCM-128) | On `dev`: `ncPeopleGrid.vue` created with `collection`, `basePath`, `imageBasePath` props. Old `ncJudgesGrid.vue` and `ncObserversGrid.vue` deleted. |

**Current branch state:** Old `ncJudgesGrid.vue` and `ncObserversGrid.vue` still exist (referenced by old incubator/2026.vue). Will be deleted/replaced by merge.

---

## What Still Needs to Be Done (Phase 1 — Unblocked)

After merging `origin/dev`, all structural/page work is complete. Remaining tasks are cleanup and verification.

### Step 1: Merge `origin/dev` into this branch

**Priority:** PREREQUISITE — blocks everything else.

**Action:**
```bash
git merge origin/dev
```

**Expected conflicts (based on 79-file diff):**
- `pages/index.vue` — CCM-105 routing changes vs CCM-127/128 content changes
- `components/ncTopbar.vue` — CCM-105 NuxtLink changes vs CCM-127 nav restructure
- `components/ncFooter.vue` — CCM-105 may have touched this vs CCM-127 partner changes
- `pages/incubator/2026.vue` — CCM-105 routing changes vs CCM-127 complete rewrite (take dev's version)

**Conflict resolution strategy:**
- For full page rewrites (incubator/2026.vue, faq.vue): take `dev`'s version entirely
- For structural files (topbar, footer): take `dev`'s version but verify CCM-105 routing fixes (NuxtLink usage) are preserved
- For index.vue: take `dev`'s version but verify blog query and async data patterns from CCM-105 are preserved

**Acceptance criteria:**
- [ ] Branch includes all commits from `origin/dev` (CCM-107, 108, 127, 128)
- [ ] No merge conflicts remain
- [ ] `npm run build` succeeds
- [ ] All new pages load: `/initiatives`, `/resources`, `/incubator/indigenous-languages`

---

### Step 2: Footer — Verify Microsoft placement

**Priority:** Low (may already be correct).

**Current state on `dev` (`components/ncFooter.vue`):**
```html
<div class="footer__col3 footer__content stack">
  <div class="partners">
    <h3>Partners</h3>
    <div class="logos">
      <nc-unesco-logo />
    </div>
  </div>
</div>
```

Microsoft logo is in col1 as part of "About ODPL" alongside ODPL and GovLab logos.

**Decision needed:** Does the client want the Microsoft logo ALSO in the Partners section alongside UNESCO?

**If yes, the change is (in `components/ncFooter.vue`, Partners logos block):**
```html
<!-- Before -->
<nc-unesco-logo />

<!-- After -->
<nc-unesco-logo />
<nc-ms-logo />
```

**Also note:** The footer on `dev` still has an empty `<script setup>` block. Should be removed for cleanliness.

**Acceptance criteria:**
- [ ] Footer partner logos match client expectations
- [ ] Both UNESCO and Microsoft logos visible in the footer (if client confirms)
- [ ] Empty `<script setup>` removed from footer

---

### Step 3: Topbar — Verify Initiatives link destination

**Priority:** Low.

**Current state on `dev` (`components/ncTopbar.vue`):**
```html
<li><nc-button to="/#initiatives" color="base" variant="link">Initiatives</nc-button></li>
```

Two options:
- `/#initiatives` — scrolls to initiatives section on homepage (current behavior)
- `/initiatives` — navigates to dedicated initiatives page (exists on dev)

**If changing to dedicated page:**
```html
<!-- Change from -->
<li><nc-button to="/#initiatives" color="base" variant="link">Initiatives</nc-button></li>
<!-- To -->
<li><nc-button to="/initiatives" color="base" variant="link">Initiatives</nc-button></li>
```

**Edge case:** If the homepage `#initiatives` anchor is kept for scrolling purposes, the topbar link and the homepage section could coexist. But having the nav go to the dedicated page is cleaner UX since the dedicated page has more detail.

**Acceptance criteria:**
- [ ] Initiatives nav link goes to the correct destination (client-confirmed)

---

### Step 4: Re-tag remaining TODO comments to CCM-129

**Priority:** Medium. These are cleanup items for tracking consistency.

**TODOs on `dev` that need re-tagging:**

**File: `pages/index.vue` (2 TODOs)**
- `<!-- TODO: [CCM-127] Add Call for Proposals section (Panel 2) ... -->` -> `[CCM-129]`
- `<!-- TODO: [CCM-127] Add Webinars section (Panel 3) ... -->` -> `[CCM-129]`

**File: `pages/incubator/2026.vue` (4 TODOs)**
- `[CCM-127]` -> `[CCM-129]` (Call for Proposals, Webinars, programme duration, Call for Proposals repeat)

**File: `pages/incubator/indigenous-languages.vue` (13 TODOs)**
- All `TODO(CCM-128)` -> `TODO(CCM-129)` (12 in template, 1 in `<script>`)

**File: `composables/useSteeringCommittee.js` (1 TODO)**
- `TODO(CCM-128)` -> `TODO(CCM-129)`

**File: `pages/faq.vue` (1 TODO)**
- `[CCM-127]` -> `[CCM-129]` (placeholder content)

**File: `components/ncTimeline.vue` (1 TODO)**
- `[CCM-127]` -> `[CCM-129]` (placeholder content)

**Total: 22 TODOs to re-tag (8 from CCM-127, 14 from CCM-128).**

**Implementation:** Simple find-and-replace:
```bash
# In pages/index.vue, pages/incubator/2026.vue, pages/faq.vue, and components/ncTimeline.vue
sed -i '' 's/\[CCM-127\]/[CCM-129]/g' pages/index.vue pages/incubator/2026.vue pages/faq.vue components/ncTimeline.vue

# In pages/incubator/indigenous-languages.vue and composables/useSteeringCommittee.js
sed -i '' 's/TODO(CCM-128)/TODO(CCM-129)/g' pages/incubator/indigenous-languages.vue composables/useSteeringCommittee.js
```

**Acceptance criteria:**
- [ ] All TODO comments reference CCM-129
- [ ] No orphan TODOs from CCM-127 or CCM-128
- [ ] No TODOs were accidentally resolved (they are still blocked)
- [ ] `grep -r "CCM-127\|CCM-128" pages/ composables/` returns no results

---

### Step 5: FAQ count verification

**Priority:** Low. Already verified during deepening.

**Result:** The FAQ on `dev` has exactly **13 items**, matching the issue requirement:
- "About the Incubator": 3 items (What is it, How different from Challenge, What participants receive)
- "Eligibility & Application": 4 items (Who can apply, Geographic restrictions, Government agencies, How to apply)
- "Program Details": 3 items (What is the programme structure, How long, What happens after)
- "Data Commons & Governance": 3 items (What is a data commons, Governance requirements, Can we use existing data)

**Status: VERIFIED COMPLETE. No action needed.**

**Acceptance criteria:**
- [x] Exactly 13 FAQ items present

---

### Step 6: Clean up dead code

**Priority:** Low.

**Status on `dev` (post CCM-128 fix):**

| Issue | Status on `dev` | Action Needed |
|-------|-----------------|---------------|
| `ncJudgesGrid.vue` dead code | RESOLVED — file deleted from `dev` | None (merge will remove from this branch) |
| `ncObserversGrid.vue` dead code | RESOLVED — file deleted from `dev` | None (merge will remove from this branch) |
| Initiatives data duplication | RESOLVED — both `pages/index.vue` and `pages/initiatives.vue` use `useInitiatives()` composable | None |
| Empty `<script setup>` in `ncTopbar.vue` | RESOLVED — removed on `dev` | None |
| Empty `<script setup>` in `ncFooter.vue` | NOT RESOLVED — still present on `dev` | Remove empty block |

**Implementation for footer cleanup (`components/ncFooter.vue`):**
```html
<!-- Remove this empty block: -->
<script setup>

</script>
```

**Acceptance criteria:**
- [ ] No dead grid components (`ncJudgesGrid.vue`, `ncObserversGrid.vue` absent)
- [ ] Single source of truth for initiatives data (composable only)
- [ ] No empty `<script setup>` blocks in any component
- [ ] `grep -rl "ncJudgesGrid\|ncObserversGrid" components/ pages/` returns no results

---

## Phase 2: Blocked on Client (Deferred)

These items require content/URLs from the client and cannot proceed until provided. All page shells are in place on `dev`.

### Blocked on Application Form URL
- **Homepage** `pages/index.vue`: Panel 2 (Call for Proposals CTA)
- **Incubator** `pages/incubator/2026.vue`: Panels 2 + 7 (Call for Proposals CTAs)
- **Indigenous Languages** `pages/incubator/indigenous-languages.vue`: hero CTA + "How to Apply" section

### Blocked on Webinar Signup URL
- **Homepage** `pages/index.vue`: Panel 3 (Webinar signup)
- **Incubator** `pages/incubator/2026.vue`: Panel 3
- **Indigenous Languages** `pages/incubator/indigenous-languages.vue`: hero announcement + registration button

### Blocked on Steering Committee Names
- **Composable** `composables/useSteeringCommittee.js`: placeholder entries ("Member One", "Member Two", "Member Three")
- **Indigenous Languages** `pages/incubator/indigenous-languages.vue`: Steering Committee grid renders these placeholders

### Blocked on Programme Duration
- **Incubator** `pages/incubator/2026.vue`: "TBD" duration in Programmatic Offerings
- **Indigenous Languages** `pages/incubator/indigenous-languages.vue`: offerings duration
- **FAQ**: verify if any FAQ item references duration (checked: FAQ item "How long is the programme?" exists in "Program Details" section but the answer text would need updating)

### Blocked on Other Content
- **Indigenous Languages** `pages/incubator/indigenous-languages.vue`: hero description (placeholder copy)
- **Indigenous Languages** `pages/incubator/indigenous-languages.vue`: "Why" section (placeholder copy)
- **Indigenous Languages** `pages/incubator/indigenous-languages.vue`: offerings list (placeholder programme details)
- **Indigenous Languages** `pages/incubator/indigenous-languages.vue`: application steps (placeholder content)
- **Indigenous Languages** `pages/incubator/indigenous-languages.vue`: timeline dates (TBC)
- **Indigenous Languages** `pages/incubator/indigenous-languages.vue`: partner logos (assets needed)

**Recommended workflow for Phase 2:** When each piece of content arrives, create a targeted commit replacing the `TODO [CCM-129]` comment with the real content. No structural changes needed — the page shells are all in place.

---

## Phase 3: Indigenous Languages Page (Mostly Blocked)

The page structure is complete on `dev` (created in CCM-128, 251 lines). All 8 panels exist:
1. **Hero** — structure ready, CTA blocked on form URL, description is placeholder copy
2. **Why section** — content is placeholder (3 paragraphs about indigenous languages in AI)
3. **Programmatic Offerings** — structure ready, duration blocked
4. **Steering Committee grid** — structure ready, uses `useSteeringCommittee()` composable with 3 placeholder members
5. **How to Apply** — structure ready, form URL blocked, steps are placeholder
6. **Webinar CTA** — structure ready, signup URL blocked
7. **Timeline** — structure ready, dates TBC (uses `ref()` with placeholder milestone data in `<script>` section)
8. **FAQ CTA** — content ready, links to `/faq`

**13 TODOs** in this file, all blocked on client content.

**No implementation work needed for Phase 3 structure.** Only content population when client provides it.

---

## Phase 4: QA

Feeds into CCM-109. Not implementation work for this ticket, but noting the checklist:
- [ ] Cross-browser testing on all new/updated pages
- [ ] Mobile responsiveness check
- [ ] Verify all redirects still work (CCM-105 redirect rules in `nuxt.config`)
- [ ] Check OG meta tags on new pages (initiatives has SEO meta; resources, indigenous-languages need verification)
- [ ] Verify Nuxt Content collections load correctly (blogposts, resources)
- [ ] Client content sign-off on all pages
- [ ] Verify `/#initiatives` anchor scroll works if homepage section is kept alongside dedicated page

---

## Risks

1. **CRITICAL: Branch must merge `dev`, not `main`.** The plan's prerequisite was wrong. The `main` branch does not contain any CCM work. All CCM-107/108/127/128 work is on `dev`. Merging `main` does nothing (already up to date). Must merge `origin/dev`. This is a 79-file, ~4500-line merge that will likely produce conflicts.

2. **Merge conflict in `pages/index.vue`.** CCM-105 changed routing patterns (NuxtLink usage, async data). CCM-127/128 completely rewrote the page content and structure. Resolution: take `dev`'s version, verify CCM-105 patterns are already incorporated.

3. **Footer partner interpretation.** The issue says "add UNESCO + Microsoft" but the implementation split them: UNESCO in Partners (col3), MS in About ODPL (col1). Client may want both in the same section. Currently UNESCO is the only logo in Partners.

4. **Initiatives nav destination.** The topbar links to `/#initiatives` (homepage section scroll) vs `/initiatives` (dedicated page). These serve different purposes. The homepage has a brief card grid; the dedicated page has header, tagline, and full grid. Currently both exist.

5. **Empty `<script setup>` in footer.** Minor but should be cleaned up for consistency since the topbar's was already removed.

6. **Steering committee placeholders visible.** The indigenous-languages page renders the steering committee grid with placeholder "Member One/Two/Three" data. If the page is deployed before real data arrives, this looks unprofessional. Consider hiding the section conditionally.

---

## Open Questions

1. **Footer:** Should Microsoft logo appear in the "Partners" section alongside UNESCO, or is its current placement in "About ODPL" sufficient?
2. **Topbar:** Should the Initiatives link go to `/initiatives` (dedicated page) or `/#initiatives` (homepage anchor)?
3. **TODO re-tagging:** Confirmed 22 TODOs need re-tagging from CCM-127/CCM-128 to CCM-129 across 6 files.
4. **Indigenous Languages visibility:** Should the page be hidden (e.g., no nav link, `definePageMeta({ middleware: 'draft' })`) until content placeholders are replaced?
5. **Steering Committee grid:** Should the grid section be conditionally hidden (`v-if="steeringCommittee.some(m => m.name !== 'Member One')"`) until real data is provided?

---

## Implementation Order (After Merge)

1. **Merge `origin/dev`** — resolve conflicts, verify build
2. **Re-tag TODOs** — 22 find-and-replace operations across 6 files
3. **Remove footer empty `<script setup>`** — 3-line deletion
4. **Verify FAQ count** — already confirmed (13 items)
5. **Verify dead code cleanup** — already confirmed on `dev`
6. **Address open questions** with client (footer, topbar, indigenous-languages visibility)
7. **Commit and push** — single commit for Steps 2-3, separate commits for client-driven decisions
