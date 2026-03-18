# [P2] "Apply Now" button uses href="#" placeholder

## Finding

In the incubator/2026.vue application CTA section (line 101), the "Apply Now" button uses `href="#"` as a placeholder. This is a clickable button that scrolls to the top of the page and adds `#` to the URL, which is confusing for users and bad for accessibility (screen readers announce it as a link).

## Location

`pages/incubator/2026.vue`, line 101:
```html
<nc-button href="#" color="primary" variant="primary">Apply Now</nc-button>
```

## Suggested Fix

Either:
1. Disable the button until a real URL is available: `<nc-button disabled color="primary" variant="primary">Apply Now (Coming Soon)</nc-button>`
2. Use a more explicit placeholder: `href="/incubator/2026#apply"` with an anchor, or link to a "coming soon" page
3. If this is expected to be replaced before production, add a visible "(Coming Soon)" label

## Status
- [ ] Pending
