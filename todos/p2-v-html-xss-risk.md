# [P2] v-html usage with CMS content creates XSS risk

## Finding
Multiple components use `v-html` to render content from the CMS (Directus):
- `pages/winners/[slug].vue` line 69: `v-html="winner.description"`
- `components/ncWinners.vue` line 25: `v-html="winner.description"`
- `components/ncBlogPost.vue` line 14: `v-html="blogpost.main_content"`
- `components/ncCollapse.vue` line 4: `v-html="data.content"`

This is a pre-existing issue (not introduced by this PR), but the PR introduces new pages that display this content. If a CMS admin or compromised Directus account injects malicious HTML/JS into the `description` field, it will execute in users' browsers.

## Location
- `pages/winners/[slug].vue` line 69
- `components/ncWinners.vue` line 25

## Suggested Fix
This is a pre-existing pattern, so it should not block this PR. However, consider sanitizing HTML content before rendering with a library like `DOMPurify` in a future ticket. At minimum, ensure Directus has proper input validation on rich text fields.

## Status
- [ ] Pending
