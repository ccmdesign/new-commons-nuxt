# [P2] Multiple pages use the same useAsyncData key 'blogposts' with different queries

## Finding
Several pages use `useAsyncData('blogposts', ...)` with different query parameters:
- `pages/index.vue` line 71: `.limit(3).all()`
- `pages/incubator/2026.vue` line 112: `.limit(3).all()`
- `pages/the-2025-challenge.vue` line 142: `.order('date', 'DESC').limit(3).all()`
- `pages/prize.vue` line 112: `.limit(3).all()`
- `pages/blog/index.vue` line 22: `.order('date', 'DESC').all()` (all posts)
- `pages/blog/index.vue` line 25: `.order('date', 'DESC').limit(4).all()` (SAME key 'blogposts'!)

In Nuxt, `useAsyncData` caches by key. If a user navigates from one page to another within the SPA, the second page may receive the cached result from the first page's query instead of running its own. This is especially problematic for `blog/index.vue` where lines 22 and 25 use the **same** key `'blogposts'` for two different queries -- the second will overwrite the first.

## Location
- `pages/blog/index.vue` lines 22-25 (most critical -- same key, different queries)
- All pages listed above share the `'blogposts'` key

## Suggested Fix
Use unique keys for each `useAsyncData` call:
- `pages/blog/index.vue` line 25: change key to `'blogposts-featured'`
- Consider using page-specific keys like `'index-blogposts'`, `'incubator-blogposts'`, etc.

## Status
- [ ] Pending
