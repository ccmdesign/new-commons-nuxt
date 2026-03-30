# [P2] Blog card images have empty alt text

## Finding
In `components/ncBlogCard.vue` line 9, the blog card image has `alt=""`:
```html
<img :src="getImage(content)" alt="" class="blog-card__image">
```

While the `getImage` fix in this PR correctly resolves `cover_image`, the alt attribute is always empty. For accessibility, the alt text should describe the image or at minimum use the post title.

## Location
- `/Users/claudiomendonca/Documents/GitHub/new-commons-wt/CCM-105/components/ncBlogCard.vue` line 9

## Suggested Fix
Use the post heading or title as alt text:
```html
<img :src="getImage(content)" :alt="content.heading || 'Blog post image'" class="blog-card__image">
```

## Status
- [ ] Pending
