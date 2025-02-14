<template>
  <v-row class="mx-auto" align="center" justify="center">
    <v-col cols="12" md="12" v-if="!isLoading">
      <v-textarea
        clearable
        v-model="content"
        class="text-caption text-md-body-2 regular-font"
        label="댓글을 남겨주세요."
        variant="outlined"
        hint="3 ~ 1000자"
        rows="3"
        :rules="[rules.required, rules.min, rules.max]"
        no-resize
      >
        <template v-slot:prepend v-if="!mobile">
          <v-avatar :image="profileImg" />
        </template>
        <template v-slot:append>
          <v-btn @click.stop="create" icon>
            <v-icon>mdi-upload</v-icon>
          </v-btn>
        </template>
      </v-textarea>
    </v-col>
    <!--    <v-col cols="12" md="2" v-if="!isLoading">-->
    <!--      <v-btn @click.stop="create" block> 등록하기</v-btn>-->
    <!--    </v-col>-->
    <v-col cols="12" style="display: none">
      <v-checkbox style="display: none" v-model="commentHoneyPot"
      >I'm Not Bot
      </v-checkbox
      >
    </v-col>
    <v-col cols="12" class="mx-auto text-center" v-if="isLoading">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </v-col>
  </v-row>

  <RecaptchaManager ref="recaptcha" />
</template>
<script setup lang="ts">
import { useCommentSidebarStore } from '~/stores/comment-sidebar'
import type { CommentCreateRequest } from '~/types/comment-request'
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
import { createComment } from '~/api/comment.api'
import { useAlertStore } from '~/stores/alert'
import { AlertType } from '~/types/components.d'
import { IsCommentResponse } from '~/types/comment-response.d'
import { useDisplay } from 'vuetify'

const commentSidebarStore = useCommentSidebarStore()

const emits = defineEmits(['create'])

const commentHoneyPot = ref(false)

const userStore = useUserStore()

const { profileImg } = storeToRefs(userStore)

const rules = reactive({
  required: v => !!v || '내용을 입력해주세요.',
  min: v => (v && v.length >= 3) || '3자 이상 입력해주세요',
  max: v => (v && v.length <= 1000) || '최대 1000자 까지 가능합니다.'
})

const content = ref('')

const RecaptchaManager = defineAsyncComponent(() => import('@/components/RecaptchaManager.vue'))
const recaptcha = ref<InstanceType<typeof RecaptchaManager> | null>(null)

let isLoading = ref(false)

const alertStore = useAlertStore()
const { mobile } = useDisplay()
const create = async () => {
  if (isLoading.value) {
    return
  }

  isLoading.value = true
  if (commentHoneyPot.value) {
    console.log('bot detected')
    alertStore.setMessage({
      message: '봇이 감지되었습니다.',
      type: AlertType.Error
    })
    isLoading.value = false
    return
  }

  if (!content.value) {
    console.log('empty content')
    alertStore.setMessage({
      message: '내용을 입력해주세요.',
      type: AlertType.Error
    })
    isLoading.value = false
    return
  }

  if (content.value.length < 3) {
    console.log('content too short')
    alertStore.setMessage({
      message: '3자 이상 입력해주세요.',
      type: AlertType.Error
    })
    isLoading.value = false
    return
  }

  if (content.value.length > 1000) {
    console.log('content too long')
    alertStore.setMessage({
      message: '최대 1000자 까지 가능합니다.',
      type: AlertType.Error
    })
    isLoading.value = false
    return
  }

  console.log('create comment')

  let token = ''

  if (recaptcha.value) {
    token = await recaptcha.value.recaptcha('comment_create')
  } else {
    console.log('recaptcha manager failed')
    alertStore.setMessage({
      message: 'reCAPTCHA 인증에 실패했습니다. 다시 시도해주세요.',
      type: AlertType.Error
    })
    isLoading.value = false
    return
  }


  if (!token) {
    console.log('recaptcha failed')
    alertStore.setMessage({
      message: 'reCAPTCHA 인증에 실패했습니다. 다시 시도해주세요.',
      type: AlertType.Error
    })
    isLoading.value = false
    return
  }

  const request: CommentCreateRequest = {
    content: content.value,
    im_not_bot: commentHoneyPot.value,
    captcha_token: token
  }

  console.log(request)

  const response = await createComment(
    commentSidebarStore.targetPostId,
    request
  )

  if (!IsCommentResponse(response)) {
    console.log('response is not comment response')
    alertStore.setMessage({
      message: '댓글 생성에 실패했습니다. 다시 시도해주세요.',
      type: AlertType.Error
    })
    isLoading.value = false
    return
  }

  content.value = ''

  isLoading.value = false

  emits('create')
}
</script>

<style scoped></style>
