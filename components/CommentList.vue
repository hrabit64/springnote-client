<template>
  <v-row>
    <v-col cols="12">
      <v-infinite-scroll
        :items="comments"
        :onLoad="load"
        :key="id"
        width="100%"
        :style="commentList"
        v-if="!isNoContent"
      >
        <v-item-group>
          <v-row class="mx-0">
            <v-col
              v-for="(comment, index) in comments"
              :key="comment.id"
              cols="12"
              class="my-0 py-1"
            >
              <CommentCard :comment="comment" />
            </v-col>
          </v-row>
        </v-item-group>

        <template v-slot:loading>
          <v-col cols="12" class="mx-auto text-center">
            <v-card
              class="mx-auto my-2"
              color="success"
              elevation="0"
              width="100%"
            >
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
        <template v-slot:empty> </template>
      </v-infinite-scroll>
    </v-col>
    <v-col cols="12" v-if="isNoContent">
      <v-card class="mx-auto" elevation="0">
        <v-card-text class="text-center bold-font text-subtitle-1"
          ><v-icon class="mr-2">mdi-alert-circle</v-icon>댓글이
          없습니다.</v-card-text
        >
      </v-card>
      <v-divider class="my-2"></v-divider>
    </v-col>
    <v-col cols="12" v-if="name !== ''">
      <CommentCreateForm :post_id="props.post_id" @create="refresh" />
    </v-col>
    <v-col cols="12" v-if="name === ''">
      <LoginCard />
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
const props = defineProps({
  post_id: {
    type: Number,
    required: true
  }
})

import { v4 } from 'uuid'
const id = ref(v4())
import { type CommentResponse } from '~/types/comment-response'
import { IsPageCommentsResponse } from '~/types/comment-response.d'
import { getCommentsByPostId } from '~/api/comment.api'

const comments = ref<CommentResponse[]>([])
let page = 0
let isLast = false
const isNoContent = ref(false)
const getComments = async () => {
  const result = await getCommentsByPostId(props.post_id, page, 10)
  console.log(result)
  if (IsPageCommentsResponse(result)) {
    result._embedded.comments.forEach(comment => {
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

const refresh = () => {
  comments.value = []
  page = 0
  isLast = false
  isNoContent.value = false
  id.value = v4()
}

import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const { name } = storeToRefs(userStore)
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()

const calListHeight = () => {
  if (mobile.value) {
    return name.value === '' ? '65vh' : '50vh'
  }
  return name.value === '' ? '74vh' : '65vh'
}
const commentList = reactive({
  height: calListHeight()
})

watch(name, () => {
  commentList.height = calListHeight()
})
</script>

<style scoped></style>
