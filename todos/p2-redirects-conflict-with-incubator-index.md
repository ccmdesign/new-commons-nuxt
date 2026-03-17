# [P2] Potential double-redirect for /incubator

## Finding
Both `routeRules` in `nuxt.config.ts` and `pages/incubator/index.vue` handle the `/incubator` → `/incubator/2026` redirect. In SPA mode:
- The `routeRules` redirect fires client-side
- The `pages/incubator/index.vue` `navigateTo()` also fires client-side

And the Netlify `_redirects` file handles server-side. This means the same redirect is defined in 3 places. While not a bug (the first to match wins), it's redundant and could cause confusion.

## Location
- `nuxt.config.ts` routeRules: `'/incubator': { redirect: '/incubator/2026' }`
- `pages/incubator/index.vue`: `navigateTo('/incubator/2026', { redirectCode: 301 })`
- `public/_redirects`: `/incubator /incubator/2026 301`

## Suggested Fix
Remove `pages/incubator/index.vue` since the redirect is already handled by `routeRules` (client-side) and `_redirects` (server-side). The `index.vue` file is only needed if `routeRules` doesn't work reliably in SPA mode, which would need testing.

Alternatively, keep all 3 as defense-in-depth but add a comment explaining why.

## Status
- [ ] Pending
