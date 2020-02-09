import 'dotenv/config'
import { Configuration } from '@nuxt/types'

const TITLE: string = '오늘의 적발'
const DESCRIPTION: string = '당일 적발된 기사를 알려주는 프로젝트입니다.'
const BASE_URL: string =
  process.env.NODE_ENV === 'production'
    ? 'https://todays-busted.kidow.now.sh'
    : 'http://localhost:3000'

const config: Configuration = {
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
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
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
  axios: {},
  build: {
    transpile: [/^element-ui/],
    extend(config, ctx) {}
  }
}

export default config
