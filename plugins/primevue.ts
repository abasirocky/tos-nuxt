import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import { VueQueryPlugin } from '@tanstack/vue-query'

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true })
    nuxtApp.vueApp.use(ToastService)
})