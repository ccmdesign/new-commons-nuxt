# [P1] prize.vue still exists but /prize has a 301 redirect to /incubator/2026

## Finding
`pages/prize.vue` was not deleted, but `nuxt.config.ts` has a `routeRules` entry redirecting `/prize` to `/incubator/2026`, and `public/_redirects` has the same 301 redirect. The page file is now unreachable dead code. More critically, the behavior depends on whether Nuxt `routeRules` or the file-based route takes precedence in SPA mode. If the redirect wins (expected with Netlify `_redirects`), the page is just dead code. But if Nuxt resolves the file route first in the client-side SPA router, users could land on the old prize page instead of being redirected.

Additionally, `prize.vue` still contains stale content ("What is the prize?") while `incubator/2026.vue` has the updated "The Incubator -- 2026 Cohort" content. Having both creates confusion about which is the source of truth.

## Location
- `/Users/claudiomendonca/Documents/GitHub/new-commons-wt/CCM-105/pages/prize.vue` (entire file)
- `/Users/claudiomendonca/Documents/GitHub/new-commons-wt/CCM-105/nuxt.config.ts` lines 73-74

## Suggested Fix
Delete `pages/prize.vue`. The redirect in `routeRules` and `_redirects` handles the `/prize` URL. No nav links point to `/prize` anymore. Keeping the file risks the SPA router serving the old page content instead of redirecting.

## Status
- [ ] Pending
