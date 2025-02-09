<template>
  <CommentCard :comment="parentComment" :no_reply="true" />
  <v-divider class="my-2" />
  <v-infinite-scroll
    :items="comments"
    :onLoad="load"
    width="100%"
    :style="commentList"
    v-if="!isNoContent"
    :key="id"
  >
    <v-item-group>
      <v-row class="mx-0">
        <v-col
          v-for="(comment, index) in comments"
          :key="comment.id"
          cols="12"
          class="my-0 py-1"
        >
          <ReplyCard :comment="comment" />
        </v-col>
      </v-row>
    </v-item-group>

    <template v-slot:loading>
      <v-col cols="12" class="mx-auto text-center">
        <v-card class="mx-auto my-2" color="success" elevation="0" width="100%">
          <v-skeleton-loader
            type="list-item-avatar"
            class="my-2"
            width="100%"
          ></v-skeleton-loader>
          <v-skeleton-loader
            type="list-item-avatar"
            class="my-2"
            width="100%"
          ></v-skeleton-loader>
          <v-skeleton-loader
            type="list-item-avatar"
            class="my-2"
            width="100%"
          ></v-skeleton-loader>
        </v-card>
      </v-col>
    </template>
    <template v-slot:empty></template>
  </v-infinite-scroll>
  <v-col cols="12" v-if="isNoContent">
    <v-card class="mx-auto" elevation="0">
      <v-card-text class="text-center bold-font text-subtitle-1"
      >
        <v-icon class="mr-2">mdi-alert-circle</v-icon>
        댓글이
        없습니다.
      </v-card-text
      >
    </v-card>
    <v-divider class="my-2"></v-divider>
  </v-col>
  <ReplyCreateForm class="mx-2" v-if="name !== ''" @create="refresh" />
  <LoginCard v-else />
</template>
<script setup lang="ts">
import type { ReplyResponse } from '~/types/comment-response'
import { IsPageRepliesResponse } from '~/types/comment-response.d'
import { getRepliesByCommentId } from '~/api/comment.api'
import { useCommentSidebarStore } from '~/stores/comment-sidebar'
import { useDisplay } from 'vuetify'
import { useUserStore } from '~/stores/user'
import { v4 } from 'uuid'

const comments = ref<ReplyResponse[]>([])
let page = 0
let isLast = false
const isNoContent = ref(false)

const commentSidebarStore = useCommentSidebarStore()
const { parentComment } = storeToRefs(commentSidebarStore)

const getComments = async () => {
  const result = await getRepliesByCommentId(parentComment.value.id, page, 10)
  console.log(result)
  if (IsPageRepliesResponse(result)) {
    result._embedded.replies.forEach(comment => {
      comments.value.push(comment)
    })

    if (result.page.totalPages === result.page.number + 1) {
      isLast = true
    }

    page = result.page.number + 1
  } else {
    console.error('Failed to get comments')
    isNoContent.value = true
  }
}

async function load({ done }) {
  if (isLast) {
    done('empty')
  } else {
    await getComments()
    done('ok')
  }
}

const { mobile } = useDisplay()
const userStore = useUserStore()
const { name } = storeToRefs(userStore)

const calHeight = () => {
  if (mobile.value) {
    return name.value === '' ? '50vh' : '33vh'
  }
  return name.value === '' ? '55vh' : '50vh'
}

const commentList = reactive({
  height: calHeight()
})

watch(name, () => {
  commentList.height = calHeight()
})

const id = ref(v4())

const refresh = () => {
  comments.value = []
  page = 0
  isLast = false
  id.value = v4()
  isNoContent.value = false
}
</script>
