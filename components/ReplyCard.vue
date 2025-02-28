<template>
  <v-card class="py-2 comment-card" color="success" elevation="0">
    <!--    작성자 및 수정,삭제-->
    <v-card-title v-if="!isLoading" class="mb-2">
      <v-col cols="12" class="ma-0 pa-0">
        <v-avatar size="36" :image="comment.writer.profile_img" class="mr-2">
        </v-avatar>
        <span
          class="text-subtitle-2 bold-font text-grey-darken-2 d-inline mr-2"
        ># {{ comment.id }}</span
        >
        <span
          v-if="isMyComment"
          class="text-subtitle-2 bold-font text-grey-darken-2 d-inline"
        >(나)
        </span>
        <v-chip
          v-if="comment.writer.admin"
          class="bold-font mr-2"
          color="primary"
          variant="outlined"
        >관리자
        </v-chip
        >
        <p
          class="text-subtitle-1 bold-font text-primary  d-inline wrap-text"
        >

          {{ comment.writer.name }}
        </p>


      </v-col>


      <p
        class="text-caption bold-font
         text-grey-darken-1 my-2"
      >
        {{ comment.created_date.replace('T', ' ').replace('Z', '') }}
      </p>
    </v-card-title>


    <!--    본문-->
    <v-card-text v-if="!isLoading && comment.enabled">
      <p class="bold-font text-body-2 ">
        {{ comment.content }}
      </p>
    </v-card-text>
    <v-card-text v-if="!isLoading && !comment.enabled">
      <p class="italic-font">
        {{ comment.content }}
      </p>
    </v-card-text>

    <v-card-text v-if="isEdit">
      <v-textarea
        v-model="editText"
        no-resize
        variant="outlined"
        hint="3 ~ 1000자"
        :rules="[rules.required, rules.min, rules.max]"
      >
      </v-textarea>
      <v-btn variant="text" @click.stop="update">
        <v-icon>mdi-check</v-icon>
        <v-tooltip activator="parent" location="bottom">수정완료</v-tooltip>
      </v-btn>

      <v-btn color="red" variant="text" @click.stop="closeEdit">
        <v-icon>mdi-cancel</v-icon>
        <v-tooltip activator="parent" location="bottom"> 취소</v-tooltip>
      </v-btn>
    </v-card-text>

    <v-card-text class="mx-auto text-center" v-if="isLoading">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </v-card-text>
    <v-card-text v-if="!isLoading && isMyComment">
      <p
        v-if="isMyComment && !isEdit && !isDelete && comment.enabled"
        class="text-subtitle-1 d-inline mr-4"
        @click.stop="openEdit"
      >
        <v-icon>mdi-comment-edit</v-icon>
      </p>
      <p
        v-if="isMyComment && !isEdit && !isDelete && comment.enabled"
        class="text-subtitle-1 d-inline"
        @click.stop="openDelete"
        style="cursor: pointer"
      >
        <v-icon class="text-red">mdi-comment-remove</v-icon>
      </p>

      <p
        v-if="isEdit"
        class="text-subtitle-1 d-inline mx-4"
        @click.stop="openDelete"
        style="cursor: pointer"
      >
        <v-icon class="text-red">mdi-comment-remove</v-icon>
      </p>
    </v-card-text>
    <!--    삭제 전 확인-->
    <v-card-text v-if="isDelete">
      <v-alert
        class="bold-font"
        icon="mdi-alert"
        type="warning"
      >
        <v-alert-title>
          <p class="bold-font">정말로 삭제하시겠습니까?</p>
        </v-alert-title>
        <p class="bold-font">
          삭제된 댓글은 복구가 불가능합니다. 그래도 삭제하시겠습니까?
        </p>
        <v-btn variant="text" @click.stop="rm">
          <v-icon>mdi-check</v-icon>
          <v-tooltip activator="parent" location="bottom">확인</v-tooltip>
        </v-btn>

        <v-btn color="red" variant="text" @click.stop="closeDelete">
          <v-icon>mdi-cancel</v-icon>
          <v-tooltip activator="parent" location="bottom"> 취소</v-tooltip>
        </v-btn>
      </v-alert>
    </v-card-text>
    <v-checkbox v-model="honeyPot" style="display: none"
    >I'm Not Bot
    </v-checkbox
    >
  </v-card>

  <RecaptchaManager ref="recaptcha" />
</template>
<script setup lang="ts">
import type { ReplyResponse } from '~/types/comment-response'
import { useUserStore } from '~/stores/user'
import { deleteComment, updateComment } from '~/api/comment.api'

const props = defineProps({
  comment: {
    type: Object as PropType<ReplyResponse>,
    required: true
  }
})

const isLoading = ref(false)
const honeyPot = ref(false)

const userStore = useUserStore()

const isMyComment = computed(() => {
  return userStore.getUid() === props.comment.writer.id
})

const isEdit = ref(false)
const editText = ref('')
const openEdit = () => {
  isEdit.value = true
  editText.value = props.comment.content
}
const closeEdit = () => {
  isEdit.value = false
}
const rules = reactive({
  required: v => !!v || '내용을 입력해주세요.',
  min: v => (v && v.length >= 3) || '3자 이상 입력해주세요',
  max: v => (v && v.length <= 1000) || '최대 1000자 까지 가능합니다.'
})

const RecaptchaManager = defineAsyncComponent(() => import('@/components/RecaptchaManager.vue'))
const recaptcha = ref<InstanceType<typeof RecaptchaManager> | null>(null)

const update = async () => {
  closeEdit()
  isLoading.value = true
  const token = await recaptcha.value.recaptcha('reply_update')

  if (!token) {
    isLoading.value = false
    return
  }

  const result = await updateComment(props.comment.id, {
    content: editText.value,
    captcha_token: token,
    im_not_bot: honeyPot.value
  })

  if (result) {
    props.comment.content = editText.value
  }
  isLoading.value = false
}

const isDelete = ref(false)

const openDelete = () => {
  isDelete.value = true
}

const closeDelete = () => {
  isDelete.value = false
}


const rm = async () => {
  closeEdit()
  closeDelete()
  isLoading.value = true
  const result = await deleteComment(props.comment.id)
  if (result) {
    props.comment.enabled = false
    props.comment.content = '삭제된 댓글입니다.'
  }
  isLoading.value = false
}

// 대댓글
</script>

<style scoped>
.wrap-text {
  white-space: normal; /* 기본 값으로 자동 줄바꿈을 설정 */
  word-wrap: break-word;
}

.comment-card {

  border: 2px solid #1E1E1E !important;
}

</style>
