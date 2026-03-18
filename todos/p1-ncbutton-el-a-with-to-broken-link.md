# [P1] ncButton el="a" with to= attribute renders broken link

## Finding

In `index.vue` line 10, the hero CTA uses `<nc-button el="a" to="/incubator/2026">`. When `el="a"` is explicitly set, it overrides the auto-detection in `defaultEl` (which would choose `NuxtLink` for `to`). The result is a plain `<a>` element with a `to` attribute, which is not a valid HTML attribute for `<a>` tags. The link will not navigate anywhere.

The fix is either:
- Remove `el="a"` so auto-detection picks `NuxtLink` from the `to` attribute, OR
- Change `to=` to `href=` to match the explicit `el="a"`

## Location

`pages/index.vue`, line 10:
```html
<nc-button el="a" to="/incubator/2026" color="base" variant="primary">Apply to the Incubator</nc-button>
```

## Suggested Fix

```html
<nc-button to="/incubator/2026" color="base" variant="primary">Apply to the Incubator</nc-button>
```

## Status
- [x] Resolved
