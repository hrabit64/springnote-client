import { defineNuxtPlugin } from '#app'
import { VueReCaptcha } from 'vue-recaptcha-v3'


export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()
  nuxtApp.vueApp.use(VueReCaptcha, {
    siteKey: '6Lf-lqkqAAAAAPn2cwVuJKG2JadOR4eOWENhsF9w',
    loaderOptions: {
      autoHideBadge: true
    }
  })
})
