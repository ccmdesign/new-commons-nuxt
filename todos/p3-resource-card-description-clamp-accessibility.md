# [P3] Resource card description uses -webkit-line-clamp without fallback

## Finding
The `.resource-card__description` in `ncResourceCard.vue` uses `-webkit-line-clamp` and `-webkit-box-orient` to truncate text to 3 lines. While this works in all modern browsers, the truncated text has no accessible indicator that content was clipped (e.g., no "..." is guaranteed in all contexts, and screen readers read the full text regardless). This is a minor concern but worth noting.

Also, the `h3` style rule on line 66 is unscoped -- it targets all `h3` elements. Although `scoped` is set on the style block, Vue scoped styles do apply to elements within the component, so this works. However, using the BEM class `.resource-card__title` for the style would be more explicit and consistent with the rest of the component.

## Location
`components/ncResourceCard.vue` lines 60-66

## Suggested Fix
Target the heading by class:
```scss
.resource-card__title { line-height: 1.35; }
```

## Status
- [ ] Pending
