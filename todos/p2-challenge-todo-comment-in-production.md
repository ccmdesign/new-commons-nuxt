# [P2] TODO comment with placeholder content visible in production HTML

## Finding
The new "About the Challenge" section added to `pages/the-2025-challenge.vue` contains an HTML comment `<!-- TODO: confirm with client -->` directly inside a `<p>` tag. While HTML comments are not visible to users, they ship in the page source and signal unconfirmed copy going to production.

## Location
`pages/the-2025-challenge.vue` line 92 (in the diff, line 4 of the added block)

## Suggested Fix
Either confirm the copy and remove the TODO, or move the reminder to a code comment (`// TODO: ...`) in the `<script>` block so it does not appear in shipped HTML.

## Status
- [x] Resolved
