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
    db: 'sqlite',
    // blob: true, // For image uploads
    // kv: true    // For session/caching
  },
  // nitro: {
  //   preset: 'cloudflare-pages' 
  // }
  devtools: { enabled: true },
   hooks: {
    'hub:db:migrations:dirs': (dirs) => {
      dirs.push('my-module/db/migrations')
    },
    'hub:db:queries:paths': (queries, dialect) => {
      queries.push('my-module/db/queries')
    }
  }
})