export default {
  env: {
    lastFm: process.env.LASTFM_API_KEY,
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
  },
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  generate: {
    fallback: true,
    async routes() {
      // next comment to make VSCode ignore the "error"
      // @ts-ignore
      const { $content } = require('@nuxt/content')
      const pages = await $content().only(['path']).fetch()
      const posts = await $content('articles').only(['path']).fetch()

      const files = [...pages, ...posts]

      return files.map((file) => (file.path === '/index' ? '/' : file.path))
    },
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Dominick Jay | Front End Web Developer',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Dominick Jay - Creative Front End Developer',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Dominick Jay is an experienced creative Front-End Developer from Plymouth, UK, that specializes in fun, creative solutions.',
      },
      { hid: 'og:url', property: 'og:url', content: 'https://dominickjay.com' },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://dominickjay.com/images/card-image.png',
      },
      {
        hid: 'twitter:title',
        property: 'twitter:title',
        content: 'Dominick Jay - Creative Front End Developer',
      },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content:
          'Dominick Jay is an experienced creative Front-End Developer from Plymouth, UK, that specializes in fun, creative solutions.',
      },
      {
        hid: 'twitter:card',
        property: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:url',
        property: 'twitter:url',
        content: 'https://dominickjay.com',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        hid: 'thesemetrics',
        src: 'https://unpkg.com/thesemetrics@latest',
        async: true,
        type: 'text/javascript',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/reset.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtclub/supabase',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
