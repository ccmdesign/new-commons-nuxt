# [P3] index.vue still uses el="a" for anchor link which is correct but inconsistent

## Finding
In `pages/index.vue` line 61:
```html
<nc-button el="a" href="#video" color="wt" variant="primary2">Watch now!</nc-button>
```

This correctly uses `el="a"` because `#video` is an in-page anchor, not a route. However, since the `el` default was changed to `''`, the `defaultEl` computed would detect `href="#video"` and return `'a'` automatically. The explicit `el="a"` is redundant but harmless.

## Location
- `/Users/claudiomendonca/Documents/GitHub/new-commons-wt/CCM-105/pages/index.vue` line 61

## Suggested Fix
Optionally remove the redundant `el="a"` since `href` triggers `defaultEl` to return `'a'` automatically. Low priority, purely cosmetic.

## Status
- [ ] Pending
