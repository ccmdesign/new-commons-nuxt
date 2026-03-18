# [P3] Inconsistent whitespace in topbar nav items

## Finding
The topbar nav items have inconsistent spacing in their attributes. The "Blog" line has a double-space before `color` (`color="base" variant="link"`), and the "Rules" line has excessive padding with spaces before `color`. These are cosmetic/formatting issues that were pre-existing but remain after the reorder.

## Location
`components/ncTopbar.vue` (lines 11, 13)

## Suggested Fix
Normalize attribute spacing for consistency:
```html
<li><nc-button to="/blog" color="base" variant="link">Blog</nc-button></li>
...
<li><nc-button el="a" color="base" variant="link" :href="rulesUrl" target="_blank">Rules <nc-arrow-link-up /></nc-button></li>
```

## Status
- [x] Resolved
