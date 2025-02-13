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
  <v-dialog
    v-model="isRegister"
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
    <v-card color="success" style="overflow-y: hidden" v-if="!isRegisterInProgress">
      <v-row align="center" justify="center">
        <v-col cols="8" class="text-center">
          <v-row>
            <v-spacer></v-spacer>

            <v-col cols="12" class="text-primary text-h4 bold-font">
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
              <p class="d-inline">springnote.blog</p>

            </v-col>
            <v-col cols="12" class="text-body-2">
              <p>* 계속하려면, 개인정보처리방침 및 이용약관에 동의하셔야 합니다.</p>
            </v-col>


            <v-col cols="12" class="text-body-2 justify-center  align-center">

              <v-checkbox class="text-center d-inline-flex" v-model="isAgree">
                <template v-slot:label>
                  <p>본인은 <span class="text-primary" @click.stop="openPolicy">개인정보 처리방침</span> 및 <span
                    class="text-primary" @click.stop="openTerms">이용약관</span>을 확인하였으며, 이에 동의합니다.</p>
                </template>

              </v-checkbox>

            </v-col>

            <v-col cols="12" class="text-body-2 justify-center  align-center">

              <v-btn :disabled="!isAgree" @click.stop="addUser">가입하기</v-btn>

            </v-col>


            <v-spacer></v-spacer>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-card color="success" style="overflow-y: hidden" v-if="isRegisterInProgress">
      <v-row align="center" justify="center">
        <v-col cols="8" class="text-center">
          <v-row>
            <v-spacer></v-spacer>

            <v-col cols="12" class="text-primary">
              <h1>등록 중입니다...</h1>
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
    v-model="showPolicy"

    scrim="success"

    class="no-transition"
    transition="false"

    overlay-color="black"

  >
    <WindowCard w="100%" @minus="closePolicy()"
                @close="closePolicy()">
      <template v-slot:title>
        <v-icon>mdi-file-document</v-icon>
        개인정보 처리방침
      </template>
      <v-card-text>
        <MarkdownRenderer :content="policy" />
      </v-card-text>
    </WindowCard>
  </v-dialog>


  <v-dialog
    v-model="showTerms"
    scrim="success"

    class="no-transition"
    transition="false"

    overlay-color="black"
  >
    <WindowCard w="100%" @minus="closeTerms()" @close="closeTerms()">
      <template v-slot:title>
        <v-icon>mdi-file-document</v-icon>
        이용약관
      </template>
      <v-card-text>
        <MarkdownRenderer :content="terms" />
      </v-card-text>
    </WindowCard>
  </v-dialog>
  <RecaptchaManager ref="recaptcha" />
</template>
<script setup lang="ts">
import { getSelf, register } from '~/api/auth.api'
import { Auth, getRedirectResult, signOut } from 'firebase/auth'
import { isUserResponse } from '~/types/user-response.d'
import { useUserStore } from '~/stores/user'
import { useAlertStore } from '~/stores/alert'
import { AlertType } from '~/types/components.d'
import { getSiteContent } from '~/api/site-content.api'
import { isSiteContentResponse } from '~/types/site-content-response.d'


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

const alertStore = useAlertStore()

const RecaptchaManager = defineAsyncComponent(() => import('@/components/RecaptchaManager.vue'))
const recaptcha = ref<InstanceType<typeof RecaptchaManager> | null>(null)

const isRegister = ref(false)
const isRegisterInProgress = ref(false)
const addUser = async () => {
  if (isRegisterInProgress.value) {
    return
  }

  isRegisterInProgress.value = true
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

  isRegister.value = false
}

onMounted(async () => {
  try {
    const result = await getRedirectResult(<Auth>auth)
    if (result) {
      const user = await getSelf()
      if (isUserResponse(user) && user.enabled) {
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
      } else if (isUserResponse(user) && !user.enabled) {
        alertStore.setMessage({
          message: '해당 계정은 비활성화 되었습니다. 관리자에게 문의하세요.',
          type: AlertType.Error
        })
        await signOut(auth)

      } else {
        isRegister.value = true
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

// 약관
const isAgree = ref(false)
const showPolicy = ref(false)
const showTerms = ref(false)
const policy = ref('')
const terms = ref('')


const openPolicy = async () => {
  showPolicy.value = true
  await getSiteContent('privacy-policy').then((response) => {
    if (isSiteContentResponse(response)) {
      policy.value = response.content
    } else {
      policy.value = '죄송합니다. 개인정보 처리방침을 불러오는데 실패했습니다.'
    }

  })

}

const openTerms = async () => {
  showTerms.value = true
  await getSiteContent('term').then((response) => {
    if (isSiteContentResponse(response)) {
      terms.value = response.content
    } else {
      terms.value = '죄송합니다. 이용약관을 불러오는데 실패했습니다.'
    }
  })
}

const closePolicy = () => {
  showPolicy.value = false
}

const closeTerms = () => {
  showTerms.value = false
}
</script>

<style scoped></style>
