export default defineNuxtConfig({
  
  modules: [
    '@nuxt/ui',
    'nuxt-auth-utils',
    '@nuxt/eslint'
  ],
  
  css: ['~/assets/css/main.css'],
  
  ui: {
  },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ],
      title: 'Vantage - Modern Blog Platform',
      meta: [
        { name: 'description', content: 'A professional blog platform for modern storytelling' }
      ]
    }
  },
  
  compatibilityDate: '2026-03-11'
})