<template>
  <v-container class="justify-center align-center ma-0 pa-0" width="100%">
    <client-only>
      <!-- permission check -->
      <v-dialog
        v-model="permissionCheck"
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
                  <h1> 계정 정보를 확인 중입니다...</h1>
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

      <v-dialog
        v-model="isDeactivated"
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
                  <h1> 처리 중입니다...</h1>
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
    </client-only>
    <v-row justify="center" align="center" class="mx-1 my-1 d-flex">
      <v-col cols="12">
        <WindowCard w="100%" class="ma-5">
          <template v-slot:title>
            <v-icon>mdi-exit-run</v-icon>
            회원 탈퇴
          </template>
          <v-card-item class="my-5 py-5">
            <p class="text-md-h3 text-h3 bold-font text-center text-primary">
              정말로 회원 탈퇴를 진행하시겠습니까?
            </p>
            <p class="text-md-body-1 text-body-2 regular-font pt-5 wrap-text text-center">
              <v-icon class="ml-1">mdi-alert</v-icon>
              계정을 삭제하시면 복구가 불가능합니다. 삭제 즉시 작성한 모든 댓글 및 대댓글이 삭제됩니다.
            </p>
            <p
              class="text-md-body-1 text-body-2 italic-font pt-5 wrap-text text-center"
            >
              * 단, 계정 정보 및 작성한 댓글 정보는 14일간 보관 후 삭제됩니다.
            </p>
          </v-card-item>
          <v-card-actions class="text-center justify-center align-center my-5">
            <v-btn color="red" variant="flat" class="px-5" @click.stop="deactivate">
              <v-icon class="mr-2">mdi-exit-run</v-icon>
              탈퇴하기
            </v-btn>
          </v-card-actions>
        </WindowCard>
      </v-col>
    </v-row>
    <RecaptchaManager ref="recaptcha" />
  </v-container>


</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import { useAlertStore } from '~/stores/alert'
import { AlertType } from '~/types/components.d'
import { deactivateUser } from '~/api/auth.api'

const userStore = useUserStore()

const alertStore = useAlertStore()
const permissionCheck = ref<boolean>(true)
const router = useRouter()

onMounted(() => {
  if (userStore.isLogin) {
    permissionCheck.value = false
  } else {
    permissionCheck.value = false
    alertStore.setMessage({
      message: '로그인이 필요한 페이지입니다.',
      type: AlertType.Error
    })
    router.push('/')
  }
})

const isDeactivated = ref(false)


const RecaptchaManager = defineAsyncComponent(() => import('@/components/RecaptchaManager.vue'))
const recaptcha = ref<InstanceType<typeof RecaptchaManager> | null>(null)


const deactivate = async () => {
  isDeactivated.value = true
  const token = await recaptcha.value.recaptcha('deactivate')
  if (!token) {
    console.error('Failed to get recaptcha token')
    alertStore.setMessage({
      message: '캡차 인증에 실패했습니다. 다시 시도해주세요.',
      type: AlertType.Error
    })
    return
  }
  const res = await deactivateUser(token)

  if (res) {
    alertStore.setMessage({
      message: '회원 탈퇴가 완료되었습니다.',
      type: AlertType.Success
    })
    userStore.clearUser()
    await router.push('/')
  } else {
    alertStore.setMessage({
      message: '회원 탈퇴에 실패했습니다. 다시 시도해주세요.',
      type: AlertType.Error
    })
  }
}
</script>

<style scoped>
.wrap-text {
  white-space: normal; /* 기본 값으로 자동 줄바꿈을 설정 */
  word-wrap: break-word;
}
</style>
