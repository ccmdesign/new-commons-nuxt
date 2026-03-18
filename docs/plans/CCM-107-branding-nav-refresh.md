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
| Rules link | Hardcoded Google Doc URL in **3 places** (not 4): `ncTopbar.vue` (line 13), `pages/incubator/2026.vue` (line 51), `pages/the-2025-challenge.vue` (lines 99-100). **Not** in `pages/faq.vue` (the FAQ has a different Google Doc link for a text form download). |
| Partner logos | `components/ncMsLogo.vue` (Microsoft), `components/ncUnescoLogo.vue` (UNESCO), `components/ncDirectReliefLogo.vue`, `components/ncOdplLogo.vue`, `components/ncGovLabLogo.vue` — all inline SVGs |
| Footer structure | `components/ncFooter.vue` — three-column layout at 768px+. Col1: About ODPL (ODPL + Microsoft + GovLab logos). Col2: Follow Us (LinkedIn, Bluesky, Email). Col3: Partners (Direct Relief + i-data.png) + International Observer (UNESCO). |
| Minimal logo | `components/ncMinimalLogo.vue` — grid-only SVG (no text, no "CHALLENGE"). Used on `pages/index.vue` line 19 as a decorative background. **No changes needed.** |
| Favicons | `public/favicon.ico` and `public/favicon.png` exist. No `<link rel="icon">` in `nuxt.config.ts` head — Nuxt auto-serves `favicon.ico` from public. These are likely the grid icon only (no text). **Verify visually; no code change expected.** |
| Composables dir | Does **not** exist yet. Must be created for Task 4. Nuxt auto-imports from `composables/`. |
| `app.config.ts` | Does **not** exist. The project uses only `nuxt.config.ts`. |

---

## Implementation Plan

### Task 1: Fix Navigation Order

**Priority: Do now**
**File:** `components/ncTopbar.vue`

The current nav order is: The Incubator, The 2025 Challenge, **Blog, Resources**, FAQ, Rules.
The required order is: The Incubator, The 2025 Challenge, **Resources, Blog**, FAQ, Rules.

**Action:** Swap lines 10-11 so Resources comes before Blog.

**Before** (lines 8-13 of `ncTopbar.vue`):
```html
        <li><nc-button to="/incubator/2026" color="base" variant="link">The Incubator</nc-button></li>
        <li><nc-button to="/the-2025-challenge" color="base" variant="link">The 2025 Challenge</nc-button></li>
        <li><nc-button to="/blog"  color="base" variant="link">Blog</nc-button></li>
        <li><nc-button to="/resources" color="base" variant="link">Resources</nc-button></li>
        <li><nc-button to="/faq"   color="base" variant="link">FAQ</nc-button></li>
        <li><nc-button el="a"               color="base" variant="link" href="https://docs.google.com/document/d/1fYmUkwTqOngtpbVT8BezgmWs14IkvGEO6q5a53jqHhA/edit?tab=t.0" target="_blank">Rules <nc-arrow-link-up /></nc-button></li>
```

**After:**
```html
        <li><nc-button to="/incubator/2026" color="base" variant="link">The Incubator</nc-button></li>
        <li><nc-button to="/the-2025-challenge" color="base" variant="link">The 2025 Challenge</nc-button></li>
        <li><nc-button to="/resources" color="base" variant="link">Resources</nc-button></li>
        <li><nc-button to="/blog"  color="base" variant="link">Blog</nc-button></li>
        <li><nc-button to="/faq"   color="base" variant="link">FAQ</nc-button></li>
        <li><nc-button el="a"               color="base" variant="link" href="https://docs.google.com/document/d/1fYmUkwTqOngtpbVT8BezgmWs14IkvGEO6q5a53jqHhA/edit?tab=t.0" target="_blank">Rules <nc-arrow-link-up /></nc-button></li>
```

**CSS note:** The topbar styles apply `font-weight: 300` to `.topbar__nav li:not(:last-child) a` (line 35-37). This means all nav items except "Rules" get light weight. Since we are only reordering within the non-last items, this rule still applies correctly after the swap.

**Effort:** ~5 min

---

### Task 2: Remove "CHALLENGE" from Header Logo

**Priority: Do now**
**File:** `components/ncLogoHeader.vue`

#### Detailed SVG Structure (lines 6-9)

The SVG at line 6 has `width="324" height="28" viewBox="0 0 324 28"` and contains exactly **two** `<path>` elements:

1. **Line 7 — First `<path>` (`fill="black"`):** Contains two distinct visual groups combined into a single path data string:
   - The "New.Commons" text glyphs (Latin letter outlines). The text portion starts at approximately x=55 and the rightmost coordinate of "Commons" ends at approximately x=210.
   - The period/dot square glyph between "New" and "Commons" uses coordinates around x=102-106, y=15-19.

2. **Line 8 — Second `<path>` (`fill="#0091C2"`):** This is the **grid icon** (blue squares pattern). It occupies roughly x=0 to x=38, y=0 to y=28. This path contains multiple rounded-rectangle sub-paths arranged in a grid.

> **CORRECTION from original plan:** The first `<path>` is the text (black), the second `<path>` is the grid icon (blue). The "CHALLENGE" text is NOT a separate path element -- it is embedded within the **first** path's `d` attribute data as part of the same path string.

#### Identifying the "CHALLENGE" text within the first path

The first `<path>` `d` attribute at line 7 is one long string. The "CHALLENGE" letters begin at approximately the coordinate data starting with `M227.473` (the "C" of CHALLENGE). Everything from `M227.473` onward to the end of the `d` string (before the final `Z"`) constitutes the CHALLENGE text glyphs.

The "New.Commons" text + dot glyph ends with the sub-path `M105.844 15.5557H102.772V18.6664H105.844V15.5557Z` (the period/dot between "New" and "Commons"). After this, the CHALLENGE glyphs begin.

**Action:**

1. **Edit the first `<path>` `d` attribute (line 7):** Remove everything from `M227.473` to the end of the `d` value. The `d` attribute should end with `...M105.844 15.5557H102.772V18.6664H105.844V15.5557Z"`. Specifically:

   **Keep this portion** (ends the d attribute):
   ```
   ...V18.6664H105.844V15.5557Z"
   ```

   **Remove this portion** (the CHALLENGE glyphs, starting right after the Z above):
   ```
   M227.473 10.9961C226.739...315.02 18.6664Z
   ```

2. **Update SVG dimensions (line 6):** Change `width="324"` to `width="210"` and `viewBox="0 0 324 28"` to `viewBox="0 0 210 28"`.

3. **Verify visually** that the grid icon + "New.Commons" text renders correctly with no dead space on the right.

**Before (line 6-9, simplified):**
```html
<svg width="324" height="28" viewBox="0 0 324 28" fill="none" xmlns="http://www.w3.org/2000/svg" alt="New Commons" title="New Commons">
  <path d="M64.7914...105.844V15.5557Z M227.473...315.02 18.6664Z" fill="black"/>
  <path d="M15.0924...25.9831 0Z" fill="#0091C2"/>
</svg>
```

**After (line 6-9, simplified):**
```html
<svg width="210" height="28" viewBox="0 0 210 28" fill="none" xmlns="http://www.w3.org/2000/svg" alt="New Commons" title="New Commons">
  <path d="M64.7914...105.844V15.5557Z" fill="black"/>
  <path d="M15.0924...25.9831 0Z" fill="#0091C2"/>
</svg>
```

**Key detail:** The split point in the `d` attribute is after the substring `H105.844V15.5557Z`. Delete from the space after that `Z` to the closing quote. The exact cut:
- **Last character to keep:** the `Z` in `...H102.772V18.6664H105.844V15.5557Z`
- **First character to delete:** the space and `M` in ` M227.473 10.9961...` (but note there is no space separator in the actual file -- the path data runs continuously; look for `Z` immediately followed by `"` after trimming)

**Effort:** ~15 min

---

### Task 3: Remove "CHALLENGE" from Footer Logo

**Priority: Do now**
**File:** `components/ncLogoFooter.vue`

#### Detailed SVG Structure (lines 6-14)

The footer SVG at line 6 has `width="279" height="24" viewBox="0 0 279 24"` and uses a mask:

```
<svg width="279" height="24" viewBox="0 0 279 24">
  <mask id="mask0_661_346" ...>
    <path d="M0 0H278.722V24H0V0Z" fill="white"/>   <!-- mask rect, line 8 -->
  </mask>
  <g mask="url(#mask0_661_346)">
    <path d="M55.7926..." fill="white"/>               <!-- line 11: New.Commons text -->
    <path d="M195.88..." fill="white"/>                 <!-- line 12: CHALLENGE text -->
    <path d="M12.9962..." fill="#0091C2"/>              <!-- line 12 cont: grid icon -->
  </g>
</svg>
```

**Wait -- actual structure correction:** Looking at the actual file, lines 11-12 inside the `<g mask>` contain:

- **Line 11 — First `<path>` (`fill="white"`):** "New.Commons" text glyphs + period dot. Same pattern as header. Ends with `M91.1437 13.3336H88.4981V15.9998H91.1437V13.3336Z` (the dot glyph).

- **Line 12 — Second `<path>` (`fill="white"` in first portion, then `fill="#0091C2"` in second):** Actually upon inspection, **line 12 contains TWO paths concatenated on the same line.** The first portion is the CHALLENGE text (fill="white"), starting at `M195.88`. The second portion is the grid icon (fill="#0091C2"), starting with the grid square coordinates.

Actually, looking more carefully at the raw file, lines 11 and 12 are two separate `<path>` elements:
- Line 11: `<path d="M55.7926...91.1437V13.3336Z" fill="white"/>` -- New.Commons text
- Line 12: `<path d="M195.88...22.3743 0Z" fill="#0091C2"/>` -- this is actually both CHALLENGE + grid icon in one path? No...

Let me re-examine. The file has fill="white" on line 11 and the line 12 path also specifies a fill. Looking at the actual content:

Line 12 starts with `M195.88 9.42525` (CHALLENGE text coordinates, small x values ~195-278) and ends with grid icon coordinates, all with `fill="#0091C2"`.

**CORRECTION:** The footer SVG actually contains **three** paths inside the mask group:
1. Line 8: mask rectangle (`fill="white"`)
2. Line 11: "New.Commons" text (`fill="white"`) -- ends at `...91.1437V13.3336Z`
3. Line 12: **CHALLENGE** text (`fill="white"`) starting at `M195.88` through approximately `...271.267 15.9998Z` followed by grid icon paths (`fill="#0091C2"`) starting at `M12.9962`

**IMPORTANT FINDING:** In the footer, the CHALLENGE text and the grid icon appear to be in the **same** `<path>` element on line 12. This means we cannot simply delete the entire line 12 path. Instead, we need to:

1. Split line 12 into two paths: remove the CHALLENGE glyph data (everything from the start `M195.88` to approximately `...271.267 15.9998Z` where CHALLENGE ends) while keeping the grid icon data (from `M12.9962` onward) as a separate `<path fill="#0091C2">`.

Actually, re-reading the raw file more carefully:

Line 12 has `fill="#0091C2"` -- but CHALLENGE text should be white, not blue. Let me reconsider. Looking at the actual data:

The line 12 path `d` starts at `M195.88 9.42525` which matches the x-range for CHALLENGE text (~195-279). But it has `fill="#0091C2"` (blue). Meanwhile the grid icon paths at the end of line 12 (`M12.9962 9.4545...`) also have blue fill. This suggests **line 12 is entirely the CHALLENGE text + grid icon, all in blue fill**... but that contradicts the visual (CHALLENGE should appear white in footer).

**Resolution:** Looking again at the raw file content, line 11 and line 12 are indeed two separate `<path>` elements:
- Line 11: `fill="white"` -- New.Commons text (white)
- Line 12: `fill="#0091C2"` -- starts with CHALLENGE coordinates but... wait, the CHALLENGE text in the footer would need to be white to show on the dark background.

**Actually, on re-reading the raw output carefully:**

Line 12 has the CHALLENGE text coordinates (x ~195-279) followed by the grid icon square coordinates (x ~0-33). The entire path has `fill="#0091C2"`. But the CHALLENGE text in the original logo must have been blue (matching the brand color), not white. The "New.Commons" portion is white (line 11).

This is an important nuance: **in the footer, "CHALLENGE" is rendered in blue (#0091C2), the same color as the grid icon**, while "New.Commons" is rendered in white.

**Action:**

1. **Edit line 12:** The `d` attribute contains both CHALLENGE glyphs and grid icon glyphs. We need to remove the CHALLENGE glyphs while preserving the grid icon data. The split point is where CHALLENGE text ends and grid icon begins.

   The CHALLENGE text data runs from `M195.88 9.42525` through approximately `...271.267 15.9998Z` (the "E" of CHALLENGE, last glyph around x=271-279).

   The grid icon data begins at `M12.9962 9.4545` (first grid square, x ~0-15).

   **Cut point:** Remove from the beginning of the `d` attribute (`M195.88...`) up to and including the last CHALLENGE glyph ending (look for the transition where x-coordinates drop from ~270 back to ~12). The grid icon sub-paths start at `M12.9962 9.4545H10.5715`.

   **Before (line 12, conceptual):**
   ```
   <path d="[CHALLENGE glyphs ~x195-279][GRID ICON glyphs ~x0-33]" fill="#0091C2"/>
   ```

   **After (line 12):**
   ```
   <path d="[GRID ICON glyphs ~x0-33]" fill="#0091C2"/>
   ```

   Specifically, the `d` attribute should start with `M12.9962 9.4545H10.5715...` (the first grid square).

2. **Update SVG dimensions (line 6):** Change `width="279"` to `width="181"` and `viewBox="0 0 279 24"` to `viewBox="0 0 181 24"`.

3. **Update mask rect (line 8):** Change `M0 0H278.722V24H0V0Z` to `M0 0H181V24H0V0Z`.

4. **Verify visually** on the dark footer background.

**Precise cut in the `d` attribute of line 12:**

The CHALLENGE text ends and the grid icon begins at this transition in the path data. Searching for the x-coordinate discontinuity: the last CHALLENGE glyph "E" ends around `...278.722V15.999L271.267 15.9998Z` and then the grid icon starts immediately with `M12.9962 9.4545H10.5715`.

So the new `d` attribute for line 12 should be:
```
d="M12.9962 9.4545H10.5715C9.91306 9.4545...22.3743 0Z"
```

**Effort:** ~15 min

---

### Task 4: Extract Rules URL into a Shared Constant

**Priority: Do now**
**Files:** `components/ncTopbar.vue`, `pages/incubator/2026.vue`, `pages/the-2025-challenge.vue`

> **CORRECTION:** The original plan listed `pages/faq.vue` as containing the rules URL. After grepping the codebase, `faq.vue` does **NOT** reference the rules Google Doc URL (`1fYmUkwTqOngtpbVT8BezgmWs14IkvGEO6q5a53jqHhA`). The FAQ page links to a **different** Google Doc (`1KedF0ozxqt-YzsK4QC87YxHTTQKw5gLtpP40liEiZVY`) which is a text version of the application form. Only **3 files** need updating.

The same Google Doc URL is hardcoded in 3 places:
```
https://docs.google.com/document/d/1fYmUkwTqOngtpbVT8BezgmWs14IkvGEO6q5a53jqHhA/edit?tab=t.0
```

**Exact locations:**
| File | Line | Context |
|------|------|---------|
| `components/ncTopbar.vue` | 13 | `<nc-button el="a" ... href="...">Rules</nc-button>` |
| `pages/incubator/2026.vue` | 51 | `<a href="..." class="button ...">View Rules</a>` (raw anchor, not nc-button) |
| `pages/the-2025-challenge.vue` | 99 | `<nc-button el="a" ... href="...">Read the Challenge Rules</nc-button>` |

**Action:**

1. Create directory `composables/` (does not exist yet) and file `composables/useSiteLinks.ts`:
   ```ts
   export const useSiteLinks = () => ({
     rulesUrl: 'https://docs.google.com/document/d/1fYmUkwTqOngtpbVT8BezgmWs14IkvGEO6q5a53jqHhA/edit?tab=t.0',
   })
   ```

   > **Note:** Using `useSiteLinks` instead of `useAppConfig` because Nuxt already has a built-in `useAppConfig()` composable (see Open Question #3). This avoids shadowing the Nuxt built-in. Nuxt auto-imports composables from the `composables/` directory, so no manual import is needed in components.

2. **Update `components/ncTopbar.vue`:**

   **Before (line 13):**
   ```html
   <li><nc-button el="a"               color="base" variant="link" href="https://docs.google.com/document/d/1fYmUkwTqOngtpbVT8BezgmWs14IkvGEO6q5a53jqHhA/edit?tab=t.0" target="_blank">Rules <nc-arrow-link-up /></nc-button></li>
   ```

   **After:**
   ```html
   <li><nc-button el="a"               color="base" variant="link" :href="useSiteLinks().rulesUrl" target="_blank">Rules <nc-arrow-link-up /></nc-button></li>
   ```

   Also add to `<script setup>`:
   ```ts
   const { rulesUrl } = useSiteLinks()
   ```
   Then use `:href="rulesUrl"` in the template.

3. **Update `pages/incubator/2026.vue` (line 51):**

   **Before:**
   ```html
   <a href="https://docs.google.com/document/d/1fYmUkwTqOngtpbVT8BezgmWs14IkvGEO6q5a53jqHhA/edit?tab=t.0" target="_blank" class="button | color:white-color" color="primary" variant="secondary">View Rules</a>
   ```

   **After:**
   ```html
   <a :href="rulesUrl" target="_blank" class="button | color:white-color" color="primary" variant="secondary">View Rules</a>
   ```

   Add `<script setup>` block (or extend existing one):
   ```ts
   const { rulesUrl } = useSiteLinks()
   ```

4. **Update `pages/the-2025-challenge.vue` (lines 98-101):**

   **Before:**
   ```html
   <nc-button
     el="a"
     color="primary"
     variant="ghost"
     href="https://docs.google.com/document/d/1fYmUkwTqOngtpbVT8BezgmWs14IkvGEO6q5a53jqHhA/edit?tab=t.0"
     target="_blank"
   >Read the Challenge Rules <nc-arrow-link-up /></nc-button>
   ```

   **After:**
   ```html
   <nc-button
     el="a"
     color="primary"
     variant="ghost"
     :href="rulesUrl"
     target="_blank"
   >Read the Challenge Rules <nc-arrow-link-up /></nc-button>
   ```

**Effort:** ~20 min

---

### Task 5: OG Image Update

**Priority: Blocked -- needs client asset**
**File:** `public/OG.jpg`, referenced in `nuxt.config.ts` line 2

**Nuxt config details (lines 2, 26, 29):**
```ts
const OG = '/OG.jpg'
// ...
{ property: 'og:image',  content: OG},       // line 26
{ name: 'twitter:image',  content: OG},       // line 29
```

The OG image is used for both OpenGraph and Twitter card meta tags. Both reference the same `/OG.jpg` path via the `OG` constant.

**Action (when asset arrives):**
1. Replace `public/OG.jpg` with the updated image (without "CHALLENGE")
2. No code changes needed -- the reference in `nuxt.config.ts` (`const OG = '/OG.jpg'`) will pick it up automatically

**Interim option:** If a quick placeholder is needed, generate a simple OG image using the updated SVG logo (without CHALLENGE) on the existing background color. The existing image is 1200x630 (standard OG size).

**Additional assets to verify:**
- `public/favicon.ico` and `public/favicon.png` -- these likely contain only the grid icon (no text), so no changes expected. Verify visually.
- No `<link rel="icon">` is configured in `nuxt.config.ts` head -- Nuxt auto-serves `public/favicon.ico`.

**Effort:** ~10 min when asset is ready

---

### Task 6: Partner Logos Update

**Priority: Blocked -- needs client assets**
**Files:** `components/ncMsLogo.vue`, `components/ncUnescoLogo.vue`, `components/ncFooter.vue`

**Current footer layout (`ncFooter.vue`):**

```
+-----------------------------------------------------------------------+
| [nc-logo-footer]                                                       |
+-----------------------------------------------------------------------+
| Col1 (content-start/col5)    | Col2 (col6/col8) | Col3 (col9/end)    |
| About ODPL                   | Follow Us         | Partners           |
| [paragraph]                  | [LinkedIn]        | [DirectRelief]     |
| [ODPL] [Microsoft] [GovLab] | [Bluesky]         | [i-data.png]       |
|                              | [Email]           |                    |
|                              |                   | Int'l Observer     |
|                              |                   | [UNESCO]           |
+-----------------------------------------------------------------------+
| [by-line]                                                              |
+-----------------------------------------------------------------------+
```

**All logo components in footer:**
| Component | Location in footer | Type |
|-----------|-------------------|------|
| `<nc-odpl-logo />` | Col1 `.logos` | Inline SVG |
| `<nc-ms-logo />` | Col1 `.logos` | Inline SVG |
| `<nc-gov-lab-logo />` | Col1 `.logos` | Inline SVG |
| `<nc-linkedin-logo />` | Col2 `.logos` | Inline SVG |
| `<nc-bluesky-logo />` | Col2 `.logos` | Inline SVG |
| `<nc-email-logo />` | Col2 `.logos` | Inline SVG |
| `<nc-direct-relief-logo />` | Col3 `.partners .logos` | Inline SVG |
| `<img src="/assets/i-data.png">` | Col3 `.partners .logos` | Static PNG (not a component) |
| `<nc-unesco-logo />` | Col3 `.international-observer .logos` | Inline SVG |

**CSS detail:** Partner logos in `.logos` use `display: flex; align-items: center; gap: var(--space-s-m)`. Images use `mix-blend-mode: lighten` for dark-background blending.

**Action (when assets arrive):**
1. Replace SVG content in `ncMsLogo.vue` with updated Microsoft logo
2. Replace SVG content in `ncUnescoLogo.vue` with updated UNESCO logo (if provided)
3. Add any new partner logo components following the same pattern (inline SVG component, `nc[Name]Logo.vue`)
4. Update `ncFooter.vue` to add/remove logo component references as needed
5. Note: `i-data.png` is a static image, not a component -- if it needs updating, replace the file at `public/assets/i-data.png`

**No changes needed now** -- the component architecture already supports easy swaps.

**Effort:** ~15 min per logo when assets are ready

---

### Task 7: Mobile Navigation Verification

**Priority: Do now (part of Task 1)**
**File:** `components/ncTopbar.vue`

**Current mobile CSS (lines 39-44):**
```css
@media (max-width: 768px) {
  .topbar h1,
  .topbar nav { margin-inline: auto; }
  .topbar ul { padding-inline: 0; }
}
```

**Behavior:** At 768px and below, the logo (`h1`) and nav (`nav`) are centered via `margin-inline: auto`, and the `ul` loses its inline padding. The topbar itself uses the `.cluster` utility class which likely provides `display: flex; flex-wrap: wrap; gap: ...`. Items simply wrap to multiple lines.

**Relevant additional styles (lines 33-37):**
```css
.topbar__nav a svg { position: absolute; }     /* arrow icon on "Rules" link */
.topbar__nav li:not(:last-child) a {
  font-weight: 300;
}
```

The `position: absolute` on the arrow SVG in the Rules link could cause overlap issues on mobile if the link text wraps. Worth checking during verification.

**Action:**
1. After fixing nav order in Task 1, verify on mobile viewport that items display correctly
2. Check these specific viewports:
   - 375px (iPhone SE) -- likely wraps to 2-3 lines
   - 390px (iPhone 14) -- similar wrapping
   - 768px (iPad) -- breakpoint boundary
3. Verify the "Rules" link arrow icon (`<nc-arrow-link-up />`) does not overlap adjacent items due to `position: absolute`
4. Consider whether a hamburger menu is needed for 6 nav items on small screens -- current behavior shows all items wrapping, which may be crowded

**Decision for implementer:** If the wrapping nav looks acceptable on 375px viewport, no further work is needed. If it feels too crowded with 6 items, a follow-up issue should be created for a mobile hamburger menu (out of scope for CCM-107).

**Effort:** ~10 min for verification

---

## Implementation Order

1. **Task 1** -- Fix nav order (Resources before Blog) -- quick win
2. **Task 2** -- Remove CHALLENGE from header logo
3. **Task 3** -- Remove CHALLENGE from footer logo
4. **Task 4** -- Extract rules URL to composable
5. **Task 7** -- Mobile nav verification (test Tasks 1-3)
6. **Task 5** -- OG image (when asset arrives)
7. **Task 6** -- Partner logos (when assets arrive)

Tasks 1-4 can be done in a single PR. Tasks 5-6 can be follow-up PRs when client provides assets.

---

## Open Questions / Decisions for Implementer

1. **Header/footer logo viewBox width:** The exact trim width needs to be determined visually after removing the CHALLENGE path. Suggested approach: remove the path, render in browser, then tighten the viewBox to remove dead space on the right. The estimated widths (210 for header, 181 for footer) are based on the rightmost "New.Commons" text coordinates but may need fine-tuning by a few pixels.

2. **Mobile nav treatment:** With 6 items, the wrapping nav may feel crowded on small screens. Decide whether the current CSS reflow is acceptable or if a hamburger menu should be scoped as a follow-up.

3. **Composable naming:** ~~The plan suggests `useAppConfig` but Nuxt already has a built-in `useAppConfig`.~~ **RESOLVED:** Use `useSiteLinks` to avoid shadowing Nuxt's built-in `useAppConfig()`. No `app.config.ts` exists in this project; the composable approach is simpler and avoids introducing a new config layer.

4. **OG image interim:** Decide whether to create a placeholder OG image now (without CHALLENGE text) or wait for client to provide the final.

5. **Footer logo path splitting (NEW):** In `ncLogoFooter.vue`, the CHALLENGE text and grid icon share the same `<path>` element (line 12). The implementer must carefully split the `d` attribute data, keeping only the grid icon sub-paths. A mistake here would break the grid icon. Consider rendering in browser after each edit to verify.

6. **Header logo path structure (NEW):** In `ncLogoHeader.vue`, the text content ("New.Commons" + "CHALLENGE") is all in the first `<path>` (line 7, fill="black"), while the grid icon is the second `<path>` (line 8, fill="#0091C2"). This is reversed from what the original plan stated. The CHALLENGE text is NOT a separate path element; it must be surgically removed from within the `d` attribute of line 7.

---

## Files Modified (summary)

| File | Change |
|------|--------|
| `components/ncTopbar.vue` | Swap Blog/Resources order (lines 10-11); use composable for rules URL (line 13); add script setup |
| `components/ncLogoHeader.vue` | Remove CHALLENGE glyphs from first `<path>` d attribute (line 7), adjust viewBox (line 6) |
| `components/ncLogoFooter.vue` | Remove CHALLENGE glyphs from second `<path>` d attribute (line 12), adjust viewBox (line 6), adjust mask rect (line 8) |
| `composables/useSiteLinks.ts` | **New** -- shared config for rules URL (directory also new) |
| `pages/incubator/2026.vue` | Use composable for rules URL (line 51) |
| `pages/the-2025-challenge.vue` | Use composable for rules URL (lines 98-101) |
| ~~`pages/faq.vue`~~ | ~~Use config for rules URL~~ **REMOVED** -- faq.vue does not use the rules URL |
| `public/OG.jpg` | Replace when asset arrives |
| `components/ncMsLogo.vue` | Replace when asset arrives |
| `components/ncUnescoLogo.vue` | Replace when asset arrives |
