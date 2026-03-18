# [P2] ncTimeline refactor breaks backward compatibility

## Finding

The `ncTimeline` component was refactored from a self-contained component with hardcoded data to a prop-driven component where `timeline` is `required: true`. The old usage pattern `<nc-timeline id="timeline" />` (still present commented-out on `index.vue` line 44) would now fail with a Vue warning if uncommented, since no `timeline` prop is passed.

While the commented-out usage is not actively broken, any other consumer of this component (or someone uncommenting the line) would get a runtime error. The component API changed without a default fallback.

## Location

`components/ncTimeline.vue`, lines 21-25:
```js
const props = defineProps({
  timeline: {
    type: Array,
    required: true,
    ...
```

`pages/index.vue`, line 44 (unchanged, but now incompatible):
```html
<!--<nc-timeline id="timeline" />-->
```

## Suggested Fix

Either:
1. Add a `default: () => []` to the timeline prop and handle empty state gracefully, OR
2. Update the commented-out usage in `index.vue` to pass the required prop, OR
3. Remove the commented-out line entirely since the old Challenge timeline is no longer relevant

Option 3 is recommended since the old data is gone anyway.

## Status
- [x] Resolved
