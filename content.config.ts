import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blogposts: defineCollection({
      source: 'blogposts/*.json',
      type: 'data',
      // Define custom schema for docs collection
      schema: z.object({
        id: z.string(),
        date: z.string(),
        heading: z.string(),
        slug: z.string(),
        brow: z.string(),
        tagline: z.string(),
        excerpt: z.string(),
        main_content: z.string(),
        cover_image: z.string(),
      })
    }),
    winners: defineCollection({
      source: 'winners/*.json',
      type: 'data',
      // Define custom schema for docs collection
      schema: z.object({
        id: z.string(),
        brow: z.string(),
        title: z.string(),
        applicant: z.string(),
        country: z.string(),
        year: z.number(),
        prize: z.string(),
        project_url: z.string().url(),
        alt_url: z.string().url(),
        description: z.string(),
        image: z.string().url(),
        slug: z.string(),
      })
    }),
    judges: defineCollection({
      source: 'judges/*.json',
      type: 'data',
      // Define custom schema for docs collection
      schema: z.object({
        id: z.string(),
        slug: z.string(),
        description: z.string(),
        image: z.string().url(),
      })
    }),
  }
})
