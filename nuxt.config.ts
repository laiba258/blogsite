export default defineNuxtConfig({
  
  modules:
   ['@nuxt/ui',
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
    blob: true, // For image uploads
    kv: true    // For session/caching
  },
  devtools: { enabled: true }
})