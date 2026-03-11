export default defineNuxtConfig({
  
  modules: [
    '@nuxt/ui',
    'nuxt-auth-utils',
    '@nuxt/eslint'
  ],
  
  css: ['~/assets/css/main.css'],
  
  ui: {
  },
  
  compatibilityDate: '2026-03-11'
})