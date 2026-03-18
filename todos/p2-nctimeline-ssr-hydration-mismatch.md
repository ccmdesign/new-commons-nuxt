# [P2] ncTimeline SSR hydration mismatch from new Date()

## Finding

In the refactored `ncTimeline.vue`, `const now = new Date()` is evaluated at the module scope during both SSR and client hydration. The server renders at one timestamp; the client hydrates at a different timestamp seconds later. If a timeline date falls between these two instants, the `isActive()` and `isFull()` functions produce different class bindings on server vs client, causing a Vue hydration mismatch warning and potential visual flicker.

This is a new issue introduced by this PR. The old code used static class bindings (`i <= 4`, `i <= 3`) that did not depend on the current time.

## Location

`components/ncTimeline.vue`, line 31:
```js
const now = new Date()
```

## Suggested Fix

Use a client-only reactive date, or wrap the date in `onMounted` / `useState` to ensure consistent SSR/client values:

```js
const now = ref(new Date())
onMounted(() => {
  now.value = new Date()
})
```

Or use Nuxt's `useState` to share the value between SSR and client:

```js
const now = useState('timeline-now', () => new Date())
```

## Status
- [x] Resolved
