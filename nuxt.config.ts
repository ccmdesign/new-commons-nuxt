// https://nuxt.com/docs/api/configuration/nuxt-config
const OG = '/OG.jpg'
const title = 'New Commons'
const description = 'How can AI reflect diverse knowledge, tackle global challenges, and remain ethical? Responsible data commons can unlock AI’s potential for the public good by enhancing data diversity, quality, and provenance.'
const claritySnippet = `!function(c,l,a,r,i,t,y){function sync(){(new Image).src="https://c.clarity.ms/c.gif"}"complete"==document.readyState?sync():window.addEventListener("load",sync);a[c]("metadata",(function(){a[c]("set","C_IS","0")}),!1,!0);if(a[c].v||a[c].t)return a[c]("event",c,"dup."+i.projectId);a[c].t=!0,(t=l.createElement(r)).async=!0,t.src="https://scripts.clarity.ms/0.8.41/clarity.js",(y=l.getElementsByTagName(r)[0]).parentNode.insertBefore(t,y),a[c]("start",i),a[c].q.unshift(a[c].q.pop()),a[c]("set","C_IS","0")}("clarity",document,window,"script",{"projectId":"t7oy6y6059","upload":"https://i.clarity.ms/collect","expire":365,"cookies":["_uetmsclkid","_uetvid"],"track":true,"content":true,"report":"https://report.clarity.ms/eus2-tag","keep":["msclkid"],"dob":2148});`

const isProduction = process.env.CONTEXT
  ? process.env.CONTEXT === 'production'
  : process.env.NODE_ENV === 'production'

const feedbackWidgetScript = isProduction
  ? []
  : [{
      src: 'https://ccm-feedback-582.netlify.app/w.js',
      'data-project': 'new-commons',
      'data-theme': 'auto',
      defer: true,
    }]

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxtjs/sitemap', '@nuxtjs/robots', 'nuxt-gtag', '@weareheavy/nuxt-cookie-consent', 'nuxt-icon'],
  gtag: {
    id: 'G-DDSZL43JDX'
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
      script: [
        { src: 'https://player.vimeo.com/api/player.js', async: true },
        ...feedbackWidgetScript,
      ],
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
  cookieConsent: {
    provider: 'cookieinformation',
    init: false,
    dev: true,
    scripts: {
      statistic: [
        {
          children: claritySnippet,
          type: 'text/javascript'
        }
      ]
    }
  },
  site: { 
    url: 'https://newcommons.ai/', 
    name: title 
  }, 
  ssr: false,
  routeRules: {
    '/prize': { redirect: '/incubator/2026' },
    '/the-prize': { redirect: '/incubator/2026' },
    '/the-incubator': { redirect: '/incubator/2026' },
    '/incubator': { redirect: '/incubator/2026' },
    '/winners': { redirect: '/challenge-2025' },
  },
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