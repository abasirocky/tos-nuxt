// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  plugins: [
    { src: '~/plugins/konvavue.ts', mode: 'client' }
  ],
  env: {
    BASE_URL: process.env.NUXT_BASE_URL || 'http://localhost:5145/api/v1',
  },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@invictus.codes/nuxt-vuetify'
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  devtools: { enabled: true },
})

