<template>
  <NuxtLayout>
      <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useCurrentUser, useFirebaseAuth } from 'vuefire'
import { useUserStore } from '~/stores/user'

const user = useCurrentUser()
const userStore: UserStore = useUserStore()
const auth = useFirebaseAuth()!
import { signOut } from 'firebase/auth'
//로그 아웃 감지
onMounted(() => {
  userStore.loadUser()

  if (userStore.isLogin) {
    console.log('welcome!' + userStore.getName())
  }
  watch(user, (newUser, prevUser) => {
    if (prevUser && !newUser) {
      console.log('bye')
      userStore.clearUser()
    }
  })
})
</script>

<style>
.v-application__wrap {
  min-height: 0vh !important;
}
</style>
