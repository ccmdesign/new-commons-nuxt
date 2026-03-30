# [P2] FAQ TODO comments rendered in page source via v-html

## Finding

All FAQ `content` strings contain `<!-- TODO(CCM-108): ... -->` HTML comments. These are rendered into the DOM via `v-html` in `ncCollapse.vue`. While not a security risk (the content is developer-controlled, not user-supplied), these TODO comments will be visible in the page source to anyone who inspects the HTML, which looks unprofessional in production.

This affects all 15 FAQ entries in `pages/faq.vue`.

## Location

`pages/faq.vue`, lines 38, 47, 60, 69, 80, 88, 97, 108, 117, 125, 136, 145, 156, 169, 180, 189 (every `content` field).

Example (line 38):
```js
content: `
  <!-- TODO(CCM-108): Replace with client copy — program description -->
  <p>[PLACEHOLDER] The New Commons Incubator is a 12-month programme...</p>
`
```

## Suggested Fix

Move the TODO comments outside the `content` strings, as JS comments above each object:

```js
// TODO(CCM-108): Replace with client copy — program description
{
  summary: 'What is the New Commons Incubator?',
  content: `<p>[PLACEHOLDER] The New Commons Incubator is a 12-month programme...</p>`
},
```

This keeps the TODO markers grep-able but keeps them out of the rendered HTML.

## Status
- [x] Resolved
