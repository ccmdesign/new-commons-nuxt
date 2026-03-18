# [P3] Resources page missing SEO meta tags

## Finding
The new `pages/resources/index.vue` does not call `useHead()` or `useSeoMeta()` to set a page title or description. Other pages in the codebase (e.g., blog, challenge) set page metadata. Without it, the browser tab will show the default app title and search engines will not have a meaningful description for the resources listing.

## Location
`pages/resources/index.vue` -- `<script setup>` block

## Suggested Fix
```js
useHead({
  title: 'Resources | New Commons',
})
useSeoMeta({
  description: 'Explore reports, toolkits, and resources from the New Commons initiative.',
})
```

## Status
- [x] Resolved
