<template>
  <v-row justify="center" align="center" class="my-2">
    <v-col cols="12" md="12" v-if="!isLoading">
      <v-textarea
        clearable
        v-model="content"
        :label="inputBoxLabel"
        variant="outlined"
        hint="3 ~ 1000자"
        :rules="[rules.required, rules.min, rules.max]"
        rows="3"
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
    <!--    <v-col cols="12" md="2" class="py-0" v-if="!isLoading">-->
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
import { createReply } from '~/api/comment.api'
import { useAlertStore } from '~/stores/alert'
import { AlertType } from '~/types/components.d'
import { IsCommentResponse } from '~/types/comment-response.d'

const commentSidebarStore = useCommentSidebarStore()
const { parentComment, targetPostId } = storeToRefs(commentSidebarStore)

const { mobile } = useDisplay()
const emits = defineEmits(['create'])

const inputBoxLabel = ref('대댓글을 입력해주세요.')
const commentHoneyPot = ref(false)

const userStore = useUserStore()

const { profileImg } = storeToRefs(userStore)

const rules = reactive({
  required: v => !!v || '내용을 입력해주세요.',
  min: v => (v && v.length >= 3) || '3자 이상 입력해주세요',
  max: v => (v && v.length <= 1000) || '최대 1000자 까지 가능합니다.'
})

const content = ref('')


let isLoading = ref(false)

const alertStore = useAlertStore()

const RecaptchaManager = defineAsyncComponent(() => import('@/components/RecaptchaManager.vue'))
const recaptcha = ref<InstanceType<typeof RecaptchaManager> | null>(null)
const create = async () => {
  if (isLoading.value) {
    return
  }

  isLoading.value = true
  if (commentHoneyPot.value) {
    console.log('bot detected')
    isLoading.value = false
    alertStore.setMessage({
      message: '봇이 감지되었습니다.',
      type: AlertType.Error
    })
    return
  }

  if (!content.value) {
    console.log('empty content')
    isLoading.value = false
    alertStore.setMessage({
      message: '내용을 입력해주세요.',
      type: AlertType.Error
    })
    return
  }

  if (content.value.length < 3) {
    console.log('content too short')
    isLoading.value = false
    alertStore.setMessage({
      message: '3자 이상 입력해주세요.',
      type: AlertType.Error
    })
    return
  }

  if (content.value.length > 1000) {
    console.log('content too long')
    isLoading.value = false
    alertStore.setMessage({
      message: '최대 1000자 까지 가능합니다.',
      type: AlertType.Error
    })
    return
  }

  console.log('create comment')

  const token = await recaptcha.value.recaptcha('reply_create')


  if (!token) {
    console.log('recaptcha failed')
    return
  }

  const request: CommentCreateRequest = {
    content: content.value,
    im_not_bot: commentHoneyPot.value,
    captcha_token: token
  }

  const response = await createReply(
    targetPostId.value,
    parentComment.value.id,
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

  emits('create')
  isLoading.value = false
}
</script>

<style scoped></style>
