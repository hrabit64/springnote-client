<template>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { load } from 'recaptcha-v3'  // recaptcha-v3 라이브러리 임포트

// Nuxt runtime config에서 siteKey 추출
const config = useRuntimeConfig()
const siteKey = config.public.siteKey

const isLoading = ref(false)
const token = ref('')


// ReCaptcha 실행 메서드
const recaptcha = async (action:string) => {
  if (isLoading.value) return
  isLoading.value = true

  try {
    // Nuxt config에 등록한 siteKey를 이용해 reCAPTCHA 스크립트를 로드
    const recaptcha = await load(siteKey, {
      // 옵션: 예를 들어, autoHideBadge 옵션을 활성화 할 수 있습니다.
      autoHideBadge: true,
      // useRecaptchaNet: true, // 필요 시 recaptcha.net 사용
    })

    // 지정된 액션('login')으로 reCAPTCHA 실행
    const result = await recaptcha.execute(action)
    console.log('ReCAPTCHA 토큰:', result)
    token.value = result
  } catch (error) {
    console.error('reCAPTCHA 로드/실행 중 오류 발생:', error)
  } finally {
    isLoading.value = false
  }

  return token.value
}

// expose()를 사용하여 부모에서 recaptcha() 호출 가능하게 설정
defineExpose({ recaptcha })
</script>

<style scoped>

</style>