<template>
  <v-app-bar :elevation="0" color="success" fixed style="width: 100%">
    <client-only>
      <v-btn small icon v-if="mobile" @click.stop="sidebarStore.toggle">
        <v-icon color="primary">mdi-dots-vertical</v-icon>
      </v-btn>
    </client-only>
    <v-app-bar-title class="mr-1">
      <v-icon>
        <v-img
          class="mr-1"
          src="/images/logo.webp"
          max-height="32"
          max-width="32"
          aspect-ratio="1/1"
          alt="logo"
        ></v-img>
      </v-icon>
      <span class="ml-1 text-primary font-weight-bold" v-show="!mobile"
        >springnote.blog</span
      >
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <PostSearchDialog />

    <client-only>
      <v-btn
        small
        icon
        class="ml-1 mr-2"
        v-if="isAdmin && isLogin"
        @click.stop="goAdminPage"
      >
        <v-icon color="primary">mdi-shield-crown</v-icon>
        <v-tooltip activator="parent" location="bottom"> AdminPage </v-tooltip>
      </v-btn>
      <v-btn small icon class="ml-1 mr-2" v-if="!isLogin" @click.stop="login">
        <v-icon color="primary">mdi-lock</v-icon>
        <v-tooltip activator="parent" location="bottom"> Login </v-tooltip>
      </v-btn>

      <v-btn small icon class="ml-1 mr-2" @click.stop="logout" v-if="isLogin">
        <v-icon color="primary">mdi-logout</v-icon>
        <v-tooltip activator="parent" location="bottom"> Logout </v-tooltip>
      </v-btn>
    </client-only>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
const userStore = useUserStore()
const { isLogin, profileImg, isAdmin } = storeToRefs(userStore)

import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()

const router = useRouter()
const goAdminPage = () => {
  router.push('/admin')
}

const auth = useFirebaseAuth()!
import { signOut } from 'firebase/auth'
import { useAlertStore } from '~/stores/alert'

const alertStore = useAlertStore()

import { AlertType } from '~/types/components.d'
const logout = async () => {
  console.log('logout')
  await signOut(auth)
    .then(() => {
      alertStore.setMessage({
        type: AlertType.SUCCESS,
        message: '로그아웃 되었습니다.'
      })
    })
    .catch(reason => {
      console.error('Failed to signout', reason)
      alertStore.setMessage({
        type: AlertType.ERROR,
        message: '로그아웃에 실패했습니다.'
      })
    })
}

const isLoading = ref(false)

onMounted(() => {
  isLoading.value = true
})

watch(isAdmin, () => {
  console.log('isAdmin', isAdmin.value)
})

import { useSidebarStore } from '~/stores/sidebar'
const sidebarStore = useSidebarStore()

import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'

const login = async () => {
  localStorage.setItem('login-in-progress', 'true')
  userStore.setIsLoginInprogress(true)
  const providerInstance = new GoogleAuthProvider()
  await signInWithRedirect(auth, providerInstance).catch(reason => {
    console.error('Failed signinRedirect', reason)
  })
}

useHead({
  link: [
    {
      rel: "preload",
      href: "/images/logo.webp",
      as: "image",
      type: "image/webp"
    }
  ]
});

</script>

<style scoped>
.v-app-bar {
  transition: none !important;
}

.v-fade-transition-enter-active,
.v-fade-transition-leave-active,
.v-fade-transition-enter-to,
.v-fade-transition-leave-to {
  transition: none !important;
}
</style>
