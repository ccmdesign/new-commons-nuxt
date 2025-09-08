// https://nuxt.com/docs/api/configuration/nuxt-config
const OG = '/OG.jpg'
const title = 'New Commons'
const description = 'How can AI reflect diverse knowledge, tackle global challenges, and remain ethical? Responsible data commons can unlock AI’s potential for the public good by enhancing data diversity, quality, and provenance.'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxtjs/sitemap', '@nuxtjs/robots'],
  runtimeConfig: {
    public: {
      contentfulSpace: process.env.CONTENTFUL_SPACE_ID || '',
      contentfulToken: process.env.CONTENTFUL_ACCESS_TOKEN || ''
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: title,
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: description },
        { property: 'og:site_name',  content: title},
        { property: 'og:title',  content: title},
        { property: 'og:description',  content: description},
        { property: 'og:image',  content: OG},
        { property: 'og:image:alt',  content: `Image for ${title}`},
        { property: 'og:type',  content: 'website'},
        { name: 'twitter:image',  content: OG},
        { name: 'twitter:image:alt',  content: `Image for ${title}`},
        { name: 'twitter:description', content: description },
        {"http-equiv":"Content-Language", content:"en"},
        { name: 'author', content: 'New Commons' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://newcommons.ai/' },
      ],
      link: [
        // google icons
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" },
      ],
      script: [],
    }
  },
  css: [
    'public/css/styles.css'
  ],
  build: {
    transpile: ['vue-carousel'],
  },
  vite: {
  },
  plugins: [
    { src: '~/plugins/clarity.client.js' }
  ],
  site: { 
    url: 'https://newcommons.ai/', 
    name: title 
  }, 
  ssr: false,
  experimental: {
    clientFallback: true
  },
  components: [
    { path: '~/components', pathPrefix: false }
  ],
  dir: {
    public: './public'
  }
})