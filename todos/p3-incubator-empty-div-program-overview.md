# [P3] Empty div in program overview section

## Finding

The program overview section on `incubator/2026.vue` has a `.switcher` layout with two children: a `.stack` div with text content, and an empty `<div>` with only an HTML comment about an optional image. This empty div takes up space in the switcher layout, creating an awkward gap on desktop.

## Location

`pages/incubator/2026.vue`, lines 38-40:
```html
<div>
  <!-- Optional: image or illustration. Could reuse /assets/patterns/hero.jpg or a new asset -->
</div>
```

## Suggested Fix

Either:
1. Remove the empty div and the `.switcher` wrapper, using a single-column layout until an image is available
2. Add a placeholder image
3. At minimum, hide the empty div with `v-if="false"` or remove it

## Status
- [x] Resolved
