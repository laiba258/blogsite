export default defineNuxtConfig({
  
  modules:
   ['@nuxt/ui',
    'nuxt-auth-utils',
    '@nuxthub/core',
    '@nuxt/eslint'
  ],
  css: ['~/assets/css/main.css'],
  ui: {
  },
  
  hub: {
    db: 'sqlite',
    // blob: true, // For image uploads
    // kv: true    // For session/caching
  },
})