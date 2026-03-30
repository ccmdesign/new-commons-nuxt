# CCM-129: Content Updates, New Pages, and Components — Implementation Plan

## Prerequisites

**This worktree is based on the CCM-105 branch and is behind `main`.** Before starting any implementation, rebase or merge `main` into this branch. Main already includes:

- CCM-107 (branding/nav refresh)
- CCM-108 (content refresh / incubator placeholders)
- CCM-127 (homepage + incubator restructure, footer, FAQ, topbar, logo changes)
- CCM-128 (initiative cards, people grid, new pages, resources page)

---

## What Has Already Been Done

The audit below compares the CCM-129 issue checklist against the current state of `main`.

### Branding & Global Updates

| Task | Status | Evidence |
|------|--------|----------|
| Update `ncLogoHeader.vue` (remove "challenge") | DONE (CCM-127) | SVG on main shows "New Commons" only (width 210, no "CHALLENGE" text paths) |
| Update `ncLogoFooter.vue` (remove "challenge") | DONE (CCM-127) | Footer SVG updated similarly |
| Update `ncFooter.vue` (remove Partners/Observer, add UNESCO + Microsoft) | PARTIALLY DONE (CCM-127) | Partners/Observer subsection removed; Direct Relief + i-data logos removed. Col3 now shows "Partners" with `<nc-unesco-logo />` only. **Microsoft logo is already in col1 via `<nc-ms-logo />`.** However, the issue says "add UNESCO + Microsoft" as partners -- UNESCO is there, MS is in col1 (about ODPL). Verify if client wants MS duplicated in Partners section. |
| Update `ncTopbar.vue` (add Initiatives, remove Rules) | DONE (CCM-127) | Rules link removed; Initiatives link added (`/#initiatives`); also added Resources, kept FAQ, Blog |

### Challenge Page

| Task | Status | Evidence |
|------|--------|----------|
| Update Panel 1 text in `the-2025-challenge.vue` | DONE (CCM-108) | Page now shows 2025 Challenge overview with awardees, gallery, blog section. No placeholder content remains. |

### FAQ Page

| Task | Status | Evidence |
|------|--------|----------|
| Replace all FAQ content with 13 Incubator items | DONE (CCM-127) | FAQ on main has 4 sections: "About the Incubator", "Eligibility & Application", "Program Details", "Data Commons & Governance" with new Incubator-focused content |
| Reorganize accordion sections | DONE (CCM-127) | Sections reorganized from 8 Challenge sections to 4 Incubator sections |

### Incubator Page (`pages/incubator/2026.vue`)

| Task | Status | Evidence |
|------|--------|----------|
| Update hero copy | DONE (CCM-127) | Hero now says "Building a Shared Digital Future" with Incubator description |
| Add "Why the Incubator?" section | DONE (CCM-127) | Section exists with 3 paragraphs |
| Replace "What We Offer" with Programmatic Offerings | DONE (CCM-127) | Programmatic Offerings section with 4 bullet items (Funding, Mentorship, Technical Support, Network Access) |
| Add Helpful Tips / Resources CTA section | DONE (CCM-127) | Two CTA link panels: "Helpful Tips" (links to `/resources`) and "Have Questions?" (links to `/faq`) |
| Add FAQ CTA section | DONE (CCM-127) | Included in the CTA link panels above |
| Remove Judges/Observers sections | DONE (CCM-127) | No `<nc-judges-grid>` or `<nc-observers-grid>` on the page |

### Homepage

| Task | Status | Evidence |
|------|--------|----------|
| Update hero section copy | DONE (CCM-127) | Hero says "The New Commons Incubator" with Incubator description |
| Update FAQ CTA section copy | DONE (CCM-127) | FAQ CTA references "New Commons Incubator" and programme/eligibility |
| Keep blog section as-is | DONE | Blog section unchanged |

### New Pages

| Task | Status | Evidence |
|------|--------|----------|
| Create `pages/initiatives.vue` | DONE (CCM-128) | Page exists on main with grid of initiative cards |
| Create `ncInitiativeCard.vue` | DONE (CCM-128) | Component exists on main |
| Create `pages/resources/index.vue` | DONE (CCM-128) | Page exists on main with resource cards and filtering |
| Create `pages/incubator/indigenous-languages.vue` | DONE (CCM-128) | Page exists on main with all panels (hero, why, offerings, steering committee, how to apply, webinar, timeline, FAQ CTA) |

### Component Work

| Task | Status | Evidence |
|------|--------|----------|
| Generalize `ncJudgesGrid.vue` to accept collection prop | DONE (CCM-128) | `ncPeopleGrid.vue` created on main with `collection`, `basePath`, `imageBasePath` props. `ncBioCard.vue` updated with `imageBasePath` prop. |

---

## What Still Needs to Be Done (Phase 1 — Unblocked)

After reviewing all Phase 1 items against `main`, **all Phase 1 work is complete.** There are, however, remaining TODO comments and minor gaps that should be addressed:

### Step 1: Merge `main` into this branch

**Priority:** Prerequisite for all other steps.

This worktree is based on CCM-105 and is missing all work from CCM-107, CCM-108, CCM-127, and CCM-128.

**Action:** `git merge main` (or rebase).

**Acceptance criteria:**
- [ ] Branch includes all commits from main through CCM-128
- [ ] No merge conflicts (or all conflicts resolved)
- [ ] `npm run build` succeeds

---

### Step 2: Footer — Verify Microsoft placement

**Priority:** Low (may already be correct).

The issue says "add UNESCO + Microsoft" to the footer. On main:
- Col1 ("About ODPL") already has `<nc-ms-logo />` alongside ODPL and GovLab logos
- Col3 ("Partners") has `<nc-unesco-logo />` only

**Decision needed:** Does the client want the Microsoft logo ALSO in the Partners section, or is its placement in the "About ODPL" section sufficient?

**Action:** Clarify with client. If MS should be in Partners too, add `<nc-ms-logo />` to the col3 `.logos` div.

**Acceptance criteria:**
- [ ] Footer partner logos match client expectations
- [ ] Both UNESCO and Microsoft logos visible in the footer

---

### Step 3: Topbar — Verify Initiatives link destination

**Priority:** Low.

The topbar links to `/#initiatives` (an anchor on the homepage). The issue says "add Initiatives link." On main, there is also a dedicated `/initiatives` page. Verify whether the nav should link to `/initiatives` (dedicated page) or `/#initiatives` (homepage anchor).

**Action:** Clarify with client. If it should be the dedicated page, update the `to` prop.

**Acceptance criteria:**
- [ ] Initiatives nav link goes to the correct destination

---

### Step 4: Resolve remaining TODO comments

**Priority:** Medium. These are cleanup items in the implemented pages.

TODOs found on `main`:

| File | TODO | Blocked? |
|------|------|----------|
| `pages/index.vue` | `[CCM-127] Add Call for Proposals section (Panel 2) when application form URL is available` | YES — blocked on form URL |
| `pages/index.vue` | `[CCM-127] Add Webinars section (Panel 3) when webinar signup URL is available` | YES — blocked on webinar URL |
| `pages/incubator/2026.vue` | `[CCM-127] Add Call for Proposals section when application form URL is available` | YES — blocked on form URL |
| `pages/incubator/2026.vue` | `[CCM-127] Add Webinars section when webinar signup URL is available` | YES — blocked on webinar URL |
| `pages/incubator/2026.vue` | `[CCM-127] Update programme duration when confirmed (currently TBD)` | YES — blocked on duration |
| `pages/incubator/2026.vue` | `[CCM-127] Add Call for Proposals repeat section when application form URL is available` | YES — blocked on form URL |
| `pages/incubator/indigenous-languages.vue` | Multiple `TODO(CCM-128)` for placeholder copy, form URL, webinar URL, steering committee names, duration | YES — blocked on client content |

**Action:** Re-tag all these TODOs from `[CCM-127]` / `(CCM-128)` to `[CCM-129]` for tracking consistency. Do NOT resolve them — they are blocked.

**Acceptance criteria:**
- [ ] All TODO comments reference CCM-129
- [ ] No resolved TODO is left as a comment
- [ ] No orphan TODOs from CCM-127 or CCM-128

---

### Step 5: FAQ count verification

**Priority:** Low.

The issue specifies "13 new Incubator FAQ items." Count the FAQ items on main to verify all 13 are present.

**Action:** Count items in each `faq` object section on `pages/faq.vue`.

**Acceptance criteria:**
- [ ] Exactly 13 FAQ items present (or documented reason for difference)

---

### Step 6: Clean up dead code from CCM-128 todos

**Priority:** Low.

CCM-128 review found these issues on main (from `todos/CCM-128-*.md` files):
1. `ncJudgesGrid.vue` and `ncObserversGrid.vue` are dead code — not deleted after `ncPeopleGrid` replaced them
2. Initiatives data duplicated across 3 files (pages/index.vue, pages/initiatives.vue, composables/useInitiatives.js)
3. Empty `<script setup>` block in `ncTopbar.vue`

**Action:** Verify these were resolved by the CCM-128 fix commit. If not, fix them:
- Delete `ncJudgesGrid.vue` and `ncObserversGrid.vue` if no longer imported anywhere
- Ensure initiatives data lives in one place (the composable) and is imported elsewhere
- Remove empty `<script setup>` if unused

**Acceptance criteria:**
- [ ] No dead grid components
- [ ] Single source of truth for initiatives data
- [ ] Clean component files (no empty blocks)

---

## Phase 2: Blocked on Client (Deferred)

These items require content/URLs from the client and cannot proceed until provided.

### Blocked on Application Form URL
- Homepage Panel 2 (Call for Proposals CTA)
- Incubator page Panel 2 + Panel 7 (Call for Proposals CTAs)
- Indigenous Languages page hero CTA + "How to Apply" section

### Blocked on Webinar Signup URL
- Homepage Panel 3 (Webinar signup)
- Incubator page Panel 3
- Indigenous Languages page Panel 6

### Blocked on Steering Committee Names
- `composables/useSteeringCommittee.js` — currently has placeholder entries
- Indigenous Languages page Panel 4 (Steering Committee grid)

### Blocked on Programme Duration
- Replace "X-week" placeholders in Incubator + Indigenous Languages pages
- Replace "approximately X hours" in FAQ

### Blocked on Other Content
- Homepage Panel 4 (blank in audit doc)
- "View Sample Program" link
- Resources for participants ("such as XYZ")

**Recommended workflow for Phase 2:** When each piece of content arrives, create a targeted commit replacing the `TODO [CCM-129]` comment with the real content. No structural changes needed — the page shells are all in place.

---

## Phase 3: Indigenous Languages Page (Mostly Blocked)

The page structure is complete on main (created in CCM-128). All 8 panels exist:
1. Hero section -- structure ready, CTA blocked on form URL
2. Why section -- content ready (placeholder copy in place)
3. Programmatic Offerings -- structure ready, duration blocked
4. Steering Committee grid -- structure ready, names blocked
5. How to Apply -- structure ready, form URL blocked
6. Webinar CTA -- structure ready, signup URL blocked
7. Timeline -- structure ready, some dates TBC
8. FAQ CTA -- content ready

**No implementation work needed for Phase 3 structure.** Only content population when client provides it.

---

## Phase 4: QA

Feeds into CCM-109. Not implementation work for this ticket, but noting the checklist:
- [ ] Cross-browser testing on all new/updated pages
- [ ] Mobile responsiveness check
- [ ] Verify all redirects still work
- [ ] Check OG meta tags on new pages
- [ ] Verify Nuxt Content collections load correctly
- [ ] Client content sign-off on all pages

---

## Risks

1. **Worktree divergence.** The CCM-129 worktree is significantly behind main. Merging may require conflict resolution, especially in files touched by CCM-127 and CCM-128 (index.vue, faq.vue, incubator/2026.vue, ncTopbar.vue, ncFooter.vue).

2. **Footer partner interpretation.** The issue says "add UNESCO + Microsoft" but the implementation split them: UNESCO in Partners, MS in About ODPL. Client may want both in the same section.

3. **Initiatives nav destination.** The topbar links to `/#initiatives` (homepage section) vs `/initiatives` (dedicated page). These serve different purposes and the choice affects UX.

4. **FAQ count.** The issue says 13 items; need to verify the count matches exactly.

---

## Open Questions

1. **Footer:** Should Microsoft logo appear in the "Partners" section alongside UNESCO, or is its current placement in "About ODPL" sufficient?
2. **Topbar:** Should the Initiatives link go to `/initiatives` (dedicated page) or `/#initiatives` (homepage anchor)?
3. **FAQ count:** Are all 13 FAQ items accounted for, or did content change during implementation?
4. **TODO re-tagging:** Should all CCM-127/CCM-128 TODOs be re-tagged to CCM-129, or should they remain as-is since they describe the original context?
5. **Dead code cleanup:** Should `ncJudgesGrid.vue` and `ncObserversGrid.vue` be deleted in this ticket or tracked separately?
