import { defineNuxtConfig } from '@nuxt/bridge'
import path from 'path'

const IS_DEV = process.env.NODE_ENV !== 'production';
const PARALLEL = process.env.PARALLEL || false;

if (IS_DEV) {
  const dotenv = require('dotenv')
  dotenv.config({ path: path.resolve('.env') })
}

export default defineNuxtConfig({
  // Temporarily disable bridge integration
  bridge: false,
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  layouts: [
    // '/layouts/default.vue'
  ],
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-driven-domaine-design',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'ant-design-vue/dist/antd.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd-ui',
    '@/plugins/form-create'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/i18n',
    '~/modules/collectionType',
    '~/modules/product',
    '~/modules/ui',
    '~/modules/users',
    '~/modules/schemas',
    '~/modules/extrafields'
  ],
  i18n: {
    locales: ['default','en', 'fr'],
    defaultLocale: 'default',
    vueI18n: {
     fallbackLocale: 'en',
      messages: {
        ['default']: require(path.resolve('static/locales', 'en.json')),
        ['en']: require(path.resolve('static/locales', 'en.json')),
        ['fr']: require(path.resolve('static/locales', 'fr.json')),
      }      
    },
    detectBrowserLanguage: {
      useCookie: false,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',  // recommended
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    analyze: false,
    extractCSS: {
      ignoreOrder: false,
    },
    loaders: {
      scss: {
        additionalData: "$public_path: '" + (process.env.PUBLIC_PATH || '') + "';",
      }
    },
  },
  publicRuntimeConfig: {
    API: process.env.API,
    COLLECTION: ['Product', 'Service'],
    DB:process.env.DB,
    APPS:process.env.APPS
  },
  privateRuntimeConfig: {
    //
  }
})
