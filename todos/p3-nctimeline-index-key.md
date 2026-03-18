# [P3] ncTimeline uses array index as v-for key

## Finding

The `v-for` loop in `ncTimeline.vue` uses `:key="i"` (the array index). If the timeline array is ever reordered or items inserted, Vue cannot efficiently reconcile the DOM. Using a unique property like the date string would be more robust.

## Location

`components/ncTimeline.vue`, line 7:
```html
<div class="card" ... v-for="(item, i) in timeline" :key="i">
```

## Suggested Fix

```html
<div class="card" ... v-for="(item, i) in timeline" :key="item.date">
```

## Status
- [x] Resolved
