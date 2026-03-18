# [P3] .fancy-bg class name and bg-prize.png asset reference are misleading

## Finding

The "What We Offer" section in `incubator/2026.vue` reuses the `.fancy-bg` CSS class which references `bg-prize.png` as its background image. The class name and asset name both reference the old "prize" concept which no longer applies to the Incubator page.

## Location

`pages/incubator/2026.vue`, lines 142-147:
```css
.fancy-bg {
  background-image: url('/assets/bg-prize.png');
  ...
}
```

## Suggested Fix

Rename the class to `.offer-bg` or `.section-bg` and consider renaming or replacing the background image asset if it carries prize-specific branding.

## Status
- [ ] Pending
