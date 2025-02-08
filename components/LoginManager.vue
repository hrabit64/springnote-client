<template>
  <v-dialog
    v-model="isLoading"
    fullscreen
    scrim="success"
    persistent
    no-click-animation
    class="no-transition"
    transition="false"
    :open-delay="0"
    style="overflow-y: hidden"
    overlay-color="black"
  >
    <v-card color="success" style="overflow-y: hidden">
      <v-row align="center" justify="center">
        <v-col cols="8" class="text-center">
          <v-row>
            <v-spacer></v-spacer>

            <v-col cols="12" class="text-primary">
              <h1>로그인 중입니다...</h1>
            </v-col>
            <v-col cols="12">
              <v-progress-circular
                indeterminate
                :size="128"
              ></v-progress-circular>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>

  <RecaptchaManager ref="recaptcha" />
</template>
<script setup lang="ts">
import { getSelf, register } from '~/api/auth.api'
import { Auth, getRedirectResult, signOut } from 'firebase/auth'
import { isUserResponse } from '~/types/user-response.d'
import { useUserStore } from '~/stores/user'


const isLoading = ref(localStorage.getItem('login-in-progress') === 'true')

const auth = useFirebaseAuth()!
const userStore = useUserStore()

const { isLoginInprogress } = storeToRefs(userStore)
watch(isLoginInprogress, value => {
  isLoading.value = value
})

const router = useRouter()


const disableDialog = () => {
  isLoading.value = false
  localStorage.setItem('login-in-progress', 'false')
}
import { useAlertStore } from '~/stores/alert'

const alertStore = useAlertStore()

import { AlertType } from '~/types/components.d'

const RecaptchaManager = defineAsyncComponent(() => import('@/components/RecaptchaManager.vue'))
const recaptcha = ref<InstanceType<typeof RecaptchaManager> | null>(null)

const addUser = async () => {
  const token = await recaptcha.value.recaptcha('register')

  if (!token) {
    await signOut(auth)
    console.error('Failed to get recaptcha token')
    alertStore.setMessage({
      message: '로그인에 실패했습니다. 다시 시도해주세요.',
      type: AlertType.Error
    })
    return
  }

  console.log('registering')

  if (token) {
    const registerResult = await register(token)
    console.log(registerResult)
    if (registerResult) {
      const newUser = await getSelf()
      console.log(newUser)
      if (isUserResponse(newUser)) {
        userStore.saveUser(
          newUser.display_name,
          newUser.uid,
          newUser.admin,
          newUser.profile_img
        )

        alertStore.setMessage({
          message: '새로 오신걸 환영합니다, ' + newUser.display_name + '님!',
          type: AlertType.Success
        })
      }
    } else {
      alertStore.setMessage({
        message: '회원 가입에 실패했습니다. 잠시후에 다시 시도해주세요.',
        type: AlertType.Error
      })
      await signOut(auth)
    }
  }
}

onMounted(async () => {
  try {
    const result = await getRedirectResult(<Auth>auth)
    if (result) {
      const user = await getSelf()
      if (isUserResponse(user)) {
        userStore.saveUser(
          user.display_name,
          user.uid,
          user.admin,
          user.profile_img
        )
        alertStore.setMessage({
          message: '환영합니다, ' + user.display_name + '님!',
          type: AlertType.Success
        })
      } else {
        await addUser()
      }
    }
  } catch (error) {
    console.error('Failed redirect result', error)
    alertStore.setMessage({
      message: '로그인에 실패했습니다. 다시 시도해주세요.',
      type: AlertType.Error
    })
  } finally {
    disableDialog()
  }
})
</script>

<style scoped></style>
