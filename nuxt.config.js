require('dotenv').config()
const TITLE = '오늘의 적발'
const DESCRIPTION = '당일 적발된 기사를 알려주는 프로젝트입니다.'
const PUBLIC_LINK = 'https://todays-busted.firebaseapp.com'
const BASE_URL =
  process.env.NODE_ENV === 'production' ? PUBLIC_LINK : 'http://localhost:3000'

module.exports = {
  mode: 'universal',
  head: {
    title: TITLE,
    meta: [
      { charset: 'utf-8' },
      { name: 'robots', content: 'index, follow' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0'
      },
      {
        hid: 'description',
        name: 'description',
        content: DESCRIPTION
      },
      // Open Graph
      { hid: 'og-site_name', property: 'og:site_name', content: TITLE },
      { hid: 'og-title', property: 'og:title', content: TITLE },
      {
        hid: 'og-description',
        property: 'og:description',
        content: DESCRIPTION
      },
      { hid: 'og-image', property: 'og:image', content: '' },
      { hid: 'og-type', property: 'og:type', content: 'article' },
      { hid: 'og-locale', property: 'og:locale', content: 'en_US' },
      { hid: 'og-image-width', property: 'og:image:width', content: '1200' },
      { hid: 'og-image-height', property: 'og:image:height', content: '630' },
      {
        hid: 'og-image-alt',
        property: 'og:image:alt',
        content: "###Today's Busted###"
      },
      { hid: 'og-url', property: 'og:url', content: PUBLIC_LINK },

      // Twiiter
      {
        hid: 'twitter-site',
        property: 'twitter:site',
        content: '@todaysbusted'
      },
      { hid: 'twitter-card', property: 'twitter:card', content: 'summary' },
      { hid: 'twitter-title', property: 'twitter:title', content: TITLE },
      {
        hid: 'twitter-description',
        property: 'twitter:description',
        content: DESCRIPTION
      },
      { hid: 'twitter-image', property: 'twitter:image', content: '' },
      {
        hid: 'twitter-domain',
        property: 'twitter:domain',
        content: PUBLIC_LINK
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://use.fontawesome.com/releases/v5.11.2/js/all.js'
      }
    ]
  },
  loading: { color: '#fff' },
  css: ['element-ui/lib/theme-chalk/index.css', '@/assets/styles/index.scss'],
  plugins: [
    '@/plugins/element-ui.ts',
    '@/plugins/axios.ts',
    '@/plugins/moment.ts'
  ],
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/moment'],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv'
  ],
  moment: {
    locales: ['ko']
  },
  env: {
    CLIENT_ID: process.env.CLIENT_ID || '',
    CLIENT_SECRET: process.env.CLIENT_SECRET || '',
    BASE_URL
  },
  styleResources: {
    scss: ['~assets/styles/index.scss']
  },
  axios: {},
  build: {
    transpile: [/^element-ui/],
    extend(config, ctx) {}
  }
}
