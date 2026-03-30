# [P3] Empty style rule in incubator/2026.vue

## Finding
`pages/incubator/2026.vue` has an empty CSS rule block for `.hero__announcement-button` (around line 255). This is dead CSS.

## Location
`pages/incubator/2026.vue` — style section

## Suggested Fix
Remove the empty `.hero__announcement-button {}` rule.

## Status
- [ ] Pending
