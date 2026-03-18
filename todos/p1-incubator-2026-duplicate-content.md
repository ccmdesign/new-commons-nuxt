# [P1] incubator/2026.vue is a near-duplicate of prize.vue with stale "apply" content

## Finding
`pages/incubator/2026.vue` is almost identical to `pages/prize.vue` -- same structure, same styles, same judges/observers sections, same "Apply now" commented-out button, same "Who can apply?" and eligibility sections. The only meaningful differences are:
1. Title changed to "The Incubator -- 2026 Cohort"
2. Announcement links to `/the-2025-challenge`

The page still contains present-tense language about accepting applications ("will select two winning proposals", "Who can apply?", "View Rules") even though the 2025 challenge is complete and winners have been announced. If this is meant to be the 2026 Incubator page, the content should reflect the 2026 program, not be a copy of the 2025 prize page.

The `blogposts` query on line 112 fetches data but the blog section is commented out on line 108, making it dead code.

## Location
- `/Users/claudiomendonca/Documents/GitHub/new-commons-wt/CCM-105/pages/incubator/2026.vue` (entire file)

## Suggested Fix
Either:
1. Update the content to reflect the actual 2026 Incubator program (different copy, timeline, etc.), or
2. If the content is intentionally the same for now, add a comment explaining this is a placeholder that will be updated with 2026-specific content.

Remove the dead `blogposts` query (line 112) and commented-out blog section (line 108) if they are not needed.

## Status
- [ ] Pending
