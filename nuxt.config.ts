export default defineNuxtConfig({
  
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  ui: {
    global: true,
    primary: 'black',
    gray: 'zinc',
    card: {
      rounded: 'rounded-2xl'
    }
  },
  devtools: { enabled: true }
})