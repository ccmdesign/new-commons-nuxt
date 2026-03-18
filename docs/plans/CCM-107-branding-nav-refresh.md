# CCM-107: Global Branding & Navigation Refresh

## Overview

Update site-wide branding from "New.Commons CHALLENGE" to "New.Commons" and verify navigation ordering. Several items are blocked on client-provided assets; this plan focuses on what can be done now and makes blocked items easy to swap later.

---

## Current State (as read from codebase)

| Area | File(s) | Current State |
|------|---------|---------------|
| Header logo | `components/ncLogoHeader.vue` | Inline SVG, 324x28 viewBox. Two `<path>` elements: grid icon + "New.Commons" (fill black) then "CHALLENGE" text (fill black, starts ~x=218) |
| Footer logo | `components/ncLogoFooter.vue` | Inline SVG, 279x24 viewBox. Same structure, white fill, "CHALLENGE" text in second `<path>` |
| OG image | `public/OG.jpg` referenced in `nuxt.config.ts` line 2 | Static JPG, likely contains "CHALLENGE" branding |
| Nav items | `components/ncTopbar.vue` | Order: The Incubator, The 2025 Challenge, Blog, Resources, FAQ, Rules |
| Mobile menu | No hamburger/drawer; topbar simply reflows via CSS `@media (max-width: 768px)` |
| Rules link | Hardcoded Google Doc URL in 3 places: `ncTopbar.vue`, `pages/incubator/2026.vue`, `pages/the-2025-challenge.vue`. Also referenced in FAQ page. |
| Partner logos | `components/ncMsLogo.vue` (Microsoft), `components/ncUnescoLogo.vue` (UNESCO), `components/ncDirectReliefLogo.vue`, `components/ncOdplLogo.vue`, `components/ncGovLabLogo.vue` — all inline SVGs |
| Footer structure | `components/ncFooter.vue` — partners section shows Direct Relief + i-data.png; international observer shows UNESCO |

---

## Implementation Plan

### Task 1: Fix Navigation Order

**Priority: Do now**
**File:** `components/ncTopbar.vue`

The current nav order is: The Incubator, The 2025 Challenge, **Blog, Resources**, FAQ, Rules.
The required order is: The Incubator, The 2025 Challenge, **Resources, Blog**, FAQ, Rules.

**Action:** Swap lines 10-11 so Resources comes before Blog:

```html
<li><nc-button to="/incubator/2026" color="base" variant="link">The Incubator</nc-button></li>
<li><nc-button to="/the-2025-challenge" color="base" variant="link">The 2025 Challenge</nc-button></li>
<li><nc-button to="/resources" color="base" variant="link">Resources</nc-button></li>
<li><nc-button to="/blog" color="base" variant="link">Blog</nc-button></li>
<li><nc-button to="/faq" color="base" variant="link">FAQ</nc-button></li>
<li><nc-button el="a" color="base" variant="link" ...>Rules</nc-button></li>
```

**Effort:** ~5 min

---

### Task 2: Remove "CHALLENGE" from Header Logo

**Priority: Do now**
**File:** `components/ncLogoHeader.vue`

The SVG contains two `<path>` elements:
1. First path: grid icon (blue, `fill="#0091C2"`) + "New.Commons" text (black, `fill="black"`)
2. Second path: "CHALLENGE" text (`fill="black"`, starts at ~x=218)

**Action:**
1. Delete the second `<path>` element (the "CHALLENGE" text)
2. Reduce the SVG `width` from 324 to ~210 and update `viewBox` to `"0 0 210 28"` (trim the right side that held "CHALLENGE")
3. Visually verify in browser that the grid icon + "New.Commons" text renders correctly

**Notes:**
- The exact viewBox width should be determined by finding the rightmost x-coordinate used by the first path's "New.Commons" text. The period/dot glyph path ends around x=106 and the "Commons" text ends around x=210.
- If client later provides a final logo SVG, replace the entire `<template>` content.

**Effort:** ~15 min

---

### Task 3: Remove "CHALLENGE" from Footer Logo

**Priority: Do now**
**File:** `components/ncLogoFooter.vue`

Same structure as header but with `fill="white"` and a mask/clip group. The SVG has two main text path groups inside the `<g mask>`:
1. First path: "New.Commons" text
2. Second path: "CHALLENGE" text (starts ~x=188)
3. Remaining paths: grid icon squares

**Action:**
1. Delete the second `<path>` (CHALLENGE text)
2. Adjust `width` from 279 to ~181 and `viewBox` accordingly
3. Update mask rect to match new width
4. Verify visually

**Effort:** ~15 min

---

### Task 4: Extract Rules URL into a Shared Constant

**Priority: Do now**
**Files:** `components/ncTopbar.vue`, `pages/incubator/2026.vue`, `pages/the-2025-challenge.vue`, `pages/faq.vue`

The same Google Doc URL is hardcoded in 4 places:
```
https://docs.google.com/document/d/1fYmUkwTqOngtpbVT8BezgmWs14IkvGEO6q5a53jqHhA/edit?tab=t.0
```

**Action:**
1. Create a composable `composables/useAppConfig.ts`:
   ```ts
   export const useAppConfig = () => ({
     rulesUrl: 'https://docs.google.com/document/d/1fYmUkwTqOngtpbVT8BezgmWs14IkvGEO6q5a53jqHhA/edit?tab=t.0',
   })
   ```
2. Replace all 4 hardcoded URLs with `useAppConfig().rulesUrl`
3. When the client provides the new Incubator rules URL, only one file needs updating

**Effort:** ~20 min

---

### Task 5: OG Image Update

**Priority: Blocked — needs client asset**
**File:** `public/OG.jpg`, referenced in `nuxt.config.ts` line 2

**Action (when asset arrives):**
1. Replace `public/OG.jpg` with the updated image (without "CHALLENGE")
2. No code changes needed — the reference in `nuxt.config.ts` (`const OG = '/OG.jpg'`) will pick it up automatically

**Interim option:** If a quick placeholder is needed, generate a simple OG image using the updated SVG logo (without CHALLENGE) on the existing background color. The existing image is 1200x630 (standard OG size).

**Effort:** ~10 min when asset is ready

---

### Task 6: Partner Logos Update

**Priority: Blocked — needs client assets**
**Files:** `components/ncMsLogo.vue`, `components/ncUnescoLogo.vue`, `components/ncFooter.vue`

**Current state:**
- Microsoft logo: `ncMsLogo.vue` — inline SVG, white fill
- UNESCO logo: `ncUnescoLogo.vue` — inline SVG, white fill (temple/columns icon)
- Footer structure in `ncFooter.vue` is clean and modular — each logo is its own component

**Action (when assets arrive):**
1. Replace SVG content in `ncMsLogo.vue` with updated Microsoft logo
2. Replace SVG content in `ncUnescoLogo.vue` with updated UNESCO logo (if provided)
3. Add any new partner logo components following the same pattern (inline SVG component, `nc[Name]Logo.vue`)
4. Update `ncFooter.vue` to add/remove logo component references as needed

**No changes needed now** — the component architecture already supports easy swaps.

**Effort:** ~15 min per logo when assets are ready

---

### Task 7: Mobile Navigation Verification

**Priority: Do now (part of Task 1)**
**File:** `components/ncTopbar.vue`

**Current state:** There is no dedicated mobile menu (no hamburger, no drawer, no toggle). The topbar uses a simple CSS reflow at 768px — `h1` and `nav` get `margin-inline: auto` and stack vertically.

**Action:**
1. After fixing nav order in Task 1, verify on mobile viewport that items display correctly
2. Consider whether a hamburger menu is needed for 6 nav items on small screens — current behavior shows all items wrapping, which may be crowded

**Decision for implementer:** If the wrapping nav looks acceptable on 375px viewport, no further work is needed. If it feels too crowded with 6 items, a follow-up issue should be created for a mobile hamburger menu (out of scope for CCM-107).

**Effort:** ~10 min for verification

---

## Implementation Order

1. **Task 1** — Fix nav order (Resources before Blog) — quick win
2. **Task 2** — Remove CHALLENGE from header logo
3. **Task 3** — Remove CHALLENGE from footer logo
4. **Task 4** — Extract rules URL to composable
5. **Task 7** — Mobile nav verification (test Tasks 1-3)
6. **Task 5** — OG image (when asset arrives)
7. **Task 6** — Partner logos (when assets arrive)

Tasks 1-4 can be done in a single PR. Tasks 5-6 can be follow-up PRs when client provides assets.

---

## Open Questions / Decisions for Implementer

1. **Header/footer logo viewBox width:** The exact trim width needs to be determined visually after removing the CHALLENGE path. Suggested approach: remove the path, render in browser, then tighten the viewBox to remove dead space on the right.

2. **Mobile nav treatment:** With 6 items, the wrapping nav may feel crowded on small screens. Decide whether the current CSS reflow is acceptable or if a hamburger menu should be scoped as a follow-up.

3. **Composable naming:** The plan suggests `useAppConfig` but Nuxt already has a built-in `useAppConfig`. Consider using `useSiteConfig` or `useExternalLinks` instead, or using Nuxt's `app.config.ts` directly.

4. **OG image interim:** Decide whether to create a placeholder OG image now (without CHALLENGE text) or wait for client to provide the final.

---

## Files Modified (summary)

| File | Change |
|------|--------|
| `components/ncTopbar.vue` | Swap Blog/Resources order; use config for rules URL |
| `components/ncLogoHeader.vue` | Remove CHALLENGE path, adjust viewBox |
| `components/ncLogoFooter.vue` | Remove CHALLENGE path, adjust viewBox |
| `composables/useAppConfig.ts` | **New** — shared config for rules URL |
| `pages/incubator/2026.vue` | Use config for rules URL |
| `pages/the-2025-challenge.vue` | Use config for rules URL |
| `pages/faq.vue` | Use config for rules URL |
| `public/OG.jpg` | Replace when asset arrives |
| `components/ncMsLogo.vue` | Replace when asset arrives |
| `components/ncUnescoLogo.vue` | Replace when asset arrives |
