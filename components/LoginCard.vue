<template>
  <v-card class="bg-transparent" width="100%" elevation="0" style="z-index: 2000">
    <v-card-text>
      <v-row justify="center" align="center">
        <v-col cols="12">
          <p class="text-center bold-font text-body-1">
            댓글을 작성하려면, 로그인이 필요합니다.
          </p></v-col
        >

        <v-col cols="12" class="text-center">
          <v-btn color="white" @click.stop="login"
          >
            <v-icon class="mr-2">mdi-google</v-icon>
            Google
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'

const userStore = useUserStore()

const { isLogin, profileImg } = storeToRefs(userStore)

const auth = useFirebaseAuth()!

const login = async () => {
  localStorage.setItem('login-in-progress', 'true')
  userStore.setIsLoginInprogress(true)
  const providerInstance = new GoogleAuthProvider()
  await signInWithRedirect(auth, providerInstance).catch(reason => {
    console.error('Failed signinRedirect', reason)
  })
}
</script>

<style></style>
