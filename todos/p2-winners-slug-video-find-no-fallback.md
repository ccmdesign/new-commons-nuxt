# [P2] winners/[slug].vue video lookup has no fallback for missing slugs

## Finding
In `pages/winners/[slug].vue` line 90:
```js
const video = videos.find(video => video.slug === route.params?.slug)
```

If the slug does not match any entry in the `videos` array, `video` is `undefined`. The template then checks `video.src` on lines 72-73:
```html
<div v-if="video.src && video.src.startsWith('https://player.vimeo')" ...>
<video v-else-if="video.src" controls ...>
```

Accessing `video.src` when `video` is `undefined` will throw a runtime error: "Cannot read properties of undefined (reading 'src')". This will crash the winner detail page for any winner that does not have a video entry in `useVideos.js`.

This is a pre-existing bug, not introduced by this PR, but the video slug fixes in this PR make it more relevant to verify.

## Location
- `/Users/claudiomendonca/Documents/GitHub/new-commons-wt/CCM-105/pages/winners/[slug].vue` lines 72-76, 90

## Suggested Fix
Add a fallback:
```js
const video = videos.find(video => video.slug === route.params?.slug) || { src: '' }
```
Or use optional chaining in the template: `v-if="video?.src && ..."`

## Status
- [ ] Pending
