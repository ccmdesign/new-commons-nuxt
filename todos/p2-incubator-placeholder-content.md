# [P2] Incubator 2026 page uses prize.vue content verbatim

## Finding
`pages/incubator/2026.vue` is meant to be the Incubator page but still contains Challenge-specific content:
- "What are we looking for?" section with prize-era focus areas
- Prizes section showing "$100,000 in funding each" (Challenge prizes, not Incubator)
- "Who can apply?" with Challenge eligibility language
- "Helpful Tips" referencing Challenge-specific resources

The title says "The Incubator — 2026 Cohort" but everything below is copy-pasted from `prize.vue`. This is a placeholder page, which is acceptable per the plan, but should be clearly marked.

## Location
`pages/incubator/2026.vue` — entire file

## Suggested Fix
Add a visible "placeholder" banner or HTML comment at the top of the template indicating content is placeholder and will be replaced by CCM-108 (Content Refresh). This prevents client confusion if the page is seen in preview.

## Status
- [ ] Pending
