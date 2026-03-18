# [P3] Gallery lightbox in the-2025-challenge.vue has no background overlay

## Finding
The gallery lightbox (`.winners-gallery__hl`) in `the-2025-challenge.vue` uses `position: fixed` with a solid background color but no semi-transparent overlay covering the rest of the page. Users can still see and interact with content behind the lightbox. The close button is just an "X" text with no backdrop, making it hard to see against some images.

Also, there is no keyboard support (pressing Escape to close) and no focus trap, which are accessibility concerns.

This is pre-existing behavior moved from `winners/index.vue`, not introduced by this PR.

## Location
- `/Users/claudiomendonca/Documents/GitHub/new-commons-wt/CCM-105/pages/the-2025-challenge.vue` lines 83-86, 322-353

## Suggested Fix
Add a semi-transparent backdrop overlay, keyboard support (Escape to close), and a focus trap for accessibility. This is a follow-up improvement.

## Status
- [ ] Pending
