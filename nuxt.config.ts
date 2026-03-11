// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01', // Cloudflare ki stability ke liye isey 2024-11-01 rakhein

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxthub/core',
    '@nuxt/image', // Image module wapas add kar diya
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
    preset: 'cloudflare-pages', // Pages ke liye ye preset sab se stable hai
    cloudflare: { 
      deployConfig: true, 
      nodeCompat: true 
    }
  },

  hub: { 
    database: true, // Database 'true' rakhein kyunke humne dashboard par 'db' banaya hai
    blob: false, 
    kv: false 
  },

  eslint: { 
    config: { stylistic: true } 
  },
})