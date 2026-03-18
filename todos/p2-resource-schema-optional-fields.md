# [P2] Resource schema fields should be optional to match importer defaults

## Finding
In `content.config.ts`, the `resources` collection schema defines `url`, `file`, `cover_image`, and `category` as required `z.string()`. However, the importer in `directus/resources.js` sets these to empty strings (`''`) when missing from Directus. While empty strings technically satisfy `z.string()`, the schema should use `.optional()` or `.default('')` to accurately document that these fields may be absent, matching the pattern used by other collections (e.g., `winners` uses `.optional()` on several fields).

Additionally, `url` is semantically a URL but is not validated with `z.string().url()`, unlike the `winners` schema which uses `.url()` for similar fields. If `url` can be empty, then `.url().optional().or(z.literal(''))` or simply `.string()` is the right call -- but either way the intent should be explicit.

## Location
`content.config.ts` lines 64-76

## Suggested Fix
```ts
resources: defineCollection({
  source: 'resources/*.json',
  type: 'data',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    category: z.string().optional(),
    url: z.string().optional(),
    file: z.string().optional(),
    cover_image: z.string().optional(),
  })
}),
```

## Status
- [x] Resolved
