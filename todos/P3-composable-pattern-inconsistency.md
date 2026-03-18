# [P3] Composable export style inconsistency

## Finding
The new `useSiteLinks.js` composable uses a named arrow-function export (`export const useSiteLinks = () => ...`), while the existing composables (`usePost.js`, `useResources.js`, `useVideos.js`) use `export default function useName()` syntax. Both work with Nuxt auto-imports, but the style is inconsistent within the codebase.

## Location
`composables/useSiteLinks.js` (lines 2-3)

## Suggested Fix
Use the established pattern for consistency:
```js
// TODO: Update rulesUrl when client provides new rules document
export default function useSiteLinks() {
  return {
    rulesUrl: 'https://docs.google.com/document/d/1fYmUkwTqOngtpbVT8BezgmWs14IkvGEO6q5a53jqHhA/edit?tab=t.0',
  }
}
```

## Status
- [ ] Pending
