export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vuetify:ssr-client-hints', ({ vuetifyOptions, ssrClientHints, ssrClientHintsConfiguration }) => {
    // ssrClientHints를 사용하여 Vuetify의 옵션을 동적으로 설정할 수 있습니다
    if (ssrClientHints.prefersReducedMotion) {
      // 예: 모션을 줄여야 할 경우
      vuetifyOptions.theme = { ...vuetifyOptions.theme, disableTransitions: true }
    }
    // 추가적인 로직을 여기에 구현할 수 있습니다
  })
})