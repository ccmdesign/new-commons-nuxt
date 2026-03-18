# [P3] Empty CSS rule block in ncTimeline

## Finding

There is an empty `.timeline {}` rule block at line 70-71 of `ncTimeline.vue`. This is dead code left over from the refactor.

## Location

`components/ncTimeline.vue`, lines 70-71:
```css
.timeline {
}
```

## Suggested Fix

Remove the empty rule block.

## Status
- [ ] Pending
