export default defineNuxtConfig({
  compatibilityDate: '2026-03-10',

  modules: [
    '@nuxt/ui',
    'nuxt-auth-utils',
    '@nuxthub/core'
  ],

  css: ['~/assets/css/main.css'],

  ui: {
    global: true,
    primary: 'black',
    gray: 'zinc',
    card: {
      rounded: 'rounded-2xl'
    }
  },

  hub: {
    database: true,
    blob: true,
    kv: true
  },

  nitro: {
    preset: 'cloudflare-pages'
  },

  devtools: { 
    enabled: true 
  }
})