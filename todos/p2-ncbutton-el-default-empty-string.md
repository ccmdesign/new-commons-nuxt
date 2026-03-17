# [P2] ncButton el prop default changed to empty string -- renders invalid HTML element

## Finding
The `el` prop default was changed from `'button'` to `''` (empty string) in `ncButton.vue` line 72. The `componentEl` computed property (line 87) is `el.value || defaultEl.value`. When `el` is `''` (falsy), it falls through to `defaultEl`, which correctly returns `'button'`, `'a'`, `'NuxtLink'`, or `'span'` based on attrs.

This works correctly for the NuxtLink auto-detection use case. However, there is a subtle issue: if a consumer passes `el=""` explicitly (empty string as a truthy-looking prop), the behavior is the same as not passing it. This is acceptable and consistent.

The real concern is that `defaultEl` only checks for `href`, `disabled`, and `to` attrs. If none of these are present AND `el` is empty, `defaultEl` returns `'button'` as the default (line 84). This preserves backward compatibility.

After reviewing all `nc-button` usages in the codebase, this change is safe. But it should be documented with a comment explaining why the default is empty string rather than 'button'.

## Location
- `/Users/claudiomendonca/Documents/GitHub/new-commons-wt/CCM-105/components/ncButton.vue` line 72

## Suggested Fix
Add a brief comment above the `el` prop explaining the design decision:
```js
el: {
  type: String,
  // Default is '' (empty) so defaultEl computed can auto-detect
  // NuxtLink (from `to`), anchor (from `href`), or fallback to 'button'
  default: ''
},
```

## Status
- [ ] Pending
