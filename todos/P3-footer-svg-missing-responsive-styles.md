# [P3] Footer SVG missing responsive styles

## Finding
The header SVG component (`ncLogoHeader.vue`) includes a `<style scoped>` block with `max-width: 100%; height: auto;` to ensure responsive scaling. The footer SVG component (`ncLogoFooter.vue`) has no such styles. This is a pre-existing issue, but the viewBox/width change in this PR makes it more likely to matter since the intrinsic width changed and the footer SVG could now overflow its container differently on narrow viewports.

Note: this was also the case before the PR, so it is borderline pre-existing. Flagging because the width change could surface it.

## Location
`components/ncLogoFooter.vue` (missing `<style scoped>` block)

## Suggested Fix
Add the same responsive styles as the header:
```vue
<style scoped>
svg {
  max-width: 100%;
  height: auto;
}
</style>
```

## Status
- [ ] Pending
