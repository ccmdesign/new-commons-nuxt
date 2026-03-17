# [P3] Netlify _redirects file may need SPA fallback rule

## Finding
The `public/_redirects` file only contains 5 redirect rules. For a Nuxt SPA (`ssr: false`), Netlify typically needs a catch-all rule to serve `index.html` for all routes that don't match static files:

```
/*    /index.html   200
```

Without this, direct navigation to any route (e.g., `/the-2025-challenge`, `/blog/some-post`) will 404 on Netlify because there is no server-side rendering to generate the page.

This may already be handled by Netlify's Nuxt adapter or build plugin, but if it is not, all deep links will break in production.

## Location
- `/Users/claudiomendonca/Documents/GitHub/new-commons-wt/CCM-105/public/_redirects`

## Suggested Fix
Verify that the Netlify deployment handles SPA routing. If not, add the catch-all rule at the bottom of `_redirects`:
```
/*    /index.html   200
```

The specific redirect rules (301s) must come BEFORE the catch-all since Netlify processes rules top-to-bottom.

## Status
- [ ] Pending
