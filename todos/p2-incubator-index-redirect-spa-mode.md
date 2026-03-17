# [P2] incubator/index.vue uses navigateTo which may flash content in SPA mode

## Finding
`pages/incubator/index.vue` uses `await navigateTo('/incubator/2026', { redirectCode: 301 })` at the top level of `<script setup>`. In SPA mode (`ssr: false`), the `redirectCode` option is ignored because there is no server to send HTTP status codes. The redirect will work as a client-side navigation, but:

1. The `redirectCode: 301` has no effect in SPA mode -- it is misleading
2. The Netlify `_redirects` file correctly handles the server-side 301 for `/incubator`
3. There is no `<template>` in this file, so if `navigateTo` is slow, the page will render nothing (blank flash)

Additionally, `routeRules` in `nuxt.config.ts` already has `'/incubator': { redirect: '/incubator/2026' }`, making this file potentially redundant. The routeRule may handle the redirect before the page component even loads.

## Location
- `/Users/claudiomendonca/Documents/GitHub/new-commons-wt/CCM-105/pages/incubator/index.vue` (entire file, 3 lines)

## Suggested Fix
Since `routeRules` and `_redirects` both handle the `/incubator` redirect, this file may be unnecessary. Test whether removing it causes issues. If kept, remove the misleading `redirectCode: 301` parameter since it has no effect in SPA mode:
```js
await navigateTo('/incubator/2026')
```

## Status
- [ ] Pending
