import { defineNuxtPlugin } from '#app'
import { VueReCaptcha } from 'vue-recaptcha-v3'

// import dotenv from 'dotenv'

// // .env 파일 로드
// dotenv.config()

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()
  nuxtApp.vueApp.use(VueReCaptcha, {
    siteKey: '6Lf-lqkqAAAAAPn2cwVuJKG2JadOR4eOWENhsF9w',
    loaderOptions: {
      autoHideBadge: true
    }
  })
})
