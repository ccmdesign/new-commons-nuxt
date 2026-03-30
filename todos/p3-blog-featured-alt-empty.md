# [P3] ncBlogFeatured sidebar images have empty alt text

## Finding
In `components/ncBlogFeatured.vue` line 10, sidebar blog images use `alt=""`. While this is technically valid (decorative image), these images are content-bearing (blog post thumbnails) and would benefit from descriptive alt text using the post heading.

## Location
`components/ncBlogFeatured.vue:10`

## Suggested Fix
Change `alt=""` to `:alt="post.heading"` to provide meaningful alt text.

## Status
- [ ] Pending
