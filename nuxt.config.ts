// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01', 
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxthub/core',
    '@nuxt/image', 
    'nuxt-auth-utils',
  ],

  devtools: { enabled: true },
  
  css: ['~/assets/css/main.css'],

  ui: {
    content: true,
    global: true,
    primary: 'black',
    gray: 'zinc',
    card: { rounded: 'rounded-2xl' },
    experimental: { componentDetection: true }
  },

  experimental: {
    typedPages: true, 
    writeEarlyHints: true,
    defaults: { nuxtLink: { trailingSlash: 'remove' } },
    viteEnvironmentApi: true, 
    typescriptPlugin: true, 
    extractAsyncDataHandlers: true
  },

  nitro: {
    preset: 'cloudflare-pages', 
    cloudflare: { 
      deployConfig: true, 
      nodeCompat: true,
      pages: {
        attributes: {
          // Cloudflare D1 binding fix
          d1_databases: {
            DB: '578810bc-c1a7-4c87-833d-7e42557e418d' // 
        }
      }
    }
  },

  hub: { 
    database: true, 
    blob: false, 
    kv: false 
  },

  eslint: { 
    config: { stylistic: true } 
  },
})