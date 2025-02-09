<template>
  <v-app-bar :elevation="0" color="success" fixed height="64" sticky app>
    <client-only>
      <v-btn small icon v-show="mobile" @click.stop="sidebarStore.toggle">
        <v-icon color="primary">mdi-dots-vertical</v-icon>
      </v-btn>
    </client-only>
    <v-app-bar-title class="mr-1" @click.stop="goHome" style="cursor: pointer">
      <v-icon>
        <v-img
          class="mr-1"
          src="/images/logo.webp"
          max-height="32"
          max-width="32"
          aspect-ratio="1/1"
          alt="logo"
          :transition="false"
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
        v-show="isAdmin && isLogin"
        @click.stop="goAdminPage"
      >
        <v-icon color="primary">mdi-account-tie</v-icon>
        <v-tooltip activator="parent" location="bottom">AdminPage</v-tooltip>
      </v-btn>
      <v-btn small icon class="ml-1 mr-2" v-show="!isLogin" @click.stop="login">
        <v-icon color="primary">mdi-lock</v-icon>
        <v-tooltip activator="parent" location="bottom">Login</v-tooltip>
      </v-btn>

      <v-btn small icon class="ml-1 mr-2" @click.stop="logout" v-show="isLogin">
        <v-icon color="primary">mdi-logout</v-icon>
        <v-tooltip activator="parent" location="bottom">Logout</v-tooltip>
      </v-btn>
    </client-only>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
import { useDisplay } from 'vuetify'
import { GoogleAuthProvider, signInWithRedirect, signOut } from 'firebase/auth'
import { useAlertStore } from '~/stores/alert'
import { AlertType } from '~/types/components.d'
import { useSidebarStore } from '~/stores/sidebar'
import { useFirebaseAuth } from 'vuefire'

const userStore = useUserStore()
const { isLogin, profileImg, isAdmin } = storeToRefs(userStore)

const { mobile } = useDisplay()

const router = useRouter()
const goAdminPage = () => {
  router.push('/admin')
}

const goHome = () => {
  router.push('/')
}

const auth = useFirebaseAuth()!

const alertStore = useAlertStore()

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

const sidebarStore = useSidebarStore()

const login = async () => {
  localStorage.setItem('login-in-progress', 'true')
  userStore.setIsLoginInprogress(true)
  const providerInstance = new GoogleAuthProvider()
  await signInWithRedirect(auth, providerInstance).catch(reason => {
    console.error('Failed signinRedirect', reason)
  })
}

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
