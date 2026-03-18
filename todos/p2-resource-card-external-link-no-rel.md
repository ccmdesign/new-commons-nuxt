# [P2] Resource card link falls back to '#' and always opens in new tab

## Finding
In `ncResourceCard.vue`, `getResourceLink()` returns `resource.url || resource.file || '#'`. When neither `url` nor `file` exists, the card renders as an anchor with `href="#"` and `target="_blank"`, which opens a blank tab -- a confusing user experience.

Additionally, every resource link opens in a new tab (`target="_blank"`), even for file downloads that may be on the same domain. The composable has an `isExternalLink()` helper that is never used -- it should drive whether `target="_blank"` is applied.

## Location
`components/ncResourceCard.vue` lines 2-7
`composables/useResources.js` lines 7-8

## Suggested Fix
Either hide cards with no valid link, or conditionally apply `target="_blank"` only for external links:
```vue
<a
  v-if="content && getResourceLink(content) !== '#'"
  class="resource-card | stack"
  :href="getResourceLink(content)"
  :target="isExternalLink(content) ? '_blank' : undefined"
  :rel="isExternalLink(content) ? 'noopener noreferrer' : undefined"
>
```
Expose `isExternalLink` from the composable call in the component.

## Status
- [ ] Pending
