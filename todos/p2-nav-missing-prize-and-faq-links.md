# [P2] Navigation removed "The Prize" and kept "FAQ" but dropped link to prize/incubator info

## Finding
The old navigation had: The Prize, Winners, Blog, FAQ, Rules.
The new navigation has: The Incubator, The 2025 Challenge, Blog, FAQ, Rules.

"The Incubator" now links to `/incubator/2026` which is essentially the old prize page content. This is correct per the plan. However, the FAQ link (`to="/faq"`) was kept -- need to verify that `/faq` page still exists and functions properly since no changes were made to it.

Also, the topbar no longer links to the original `/prize` page. Since `/prize` redirects to `/incubator/2026`, this is consistent. But `prize.vue` still exists (see separate P1 finding).

## Location
- `/Users/claudiomendonca/Documents/GitHub/new-commons-wt/CCM-105/components/ncTopbar.vue` lines 8-12

## Suggested Fix
Verify that `/faq` page exists and works. This is likely fine but should be tested. No code change needed if `/faq` works.

## Status
- [ ] Pending
