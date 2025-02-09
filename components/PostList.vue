<template>
  <WindowCard w="100%" @close="goToHome" class="main-card">
    <template v-slot:title>
      <v-icon>mdi-file-document-multiple</v-icon>
      Posts
    </template>
    <v-infinite-scroll
      :items="postsList"
      :onLoad="load"
      width="100%"
      class="dynamic-card"
    >
      <v-table class="bg-transparent" width="100%" hover>
        <thead>
        <tr></tr>
        </thead>
        <tbody>
        <tr v-for="post in postsList" :key="post.id">
          <td @click.stop="goToPost(post.id)" class="py-2" style="cursor: pointer">
            <v-row>
              <v-col cols="1" class="text-right text-subtitle-1">
                <v-icon>mdi-file-document-outline</v-icon>
              </v-col
              >
              <v-col cols="11">
                <p class="text-primary text-caption regular-font">
                  시리즈 |
                  {{ post.series ? post.series.name : '시리즈 없음' }}
                </p>
                <p class="text-body-2 bold-font">
                  {{ post.title }}
                </p>
              </v-col>
            </v-row>
          </td>
        </tr>
        </tbody>
      </v-table>

      <template v-slot:loading>
        <v-col cols="12" md="12" class="text-center">
          <v-card
            class="mx-auto my-2 bg-transparent"
            color="success"
            elevation="0"
            width="100%"
            v-for="n in 3"
          >
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
    <v-btn block class="mx-1" @click="goToWrite" v-if="isAdmin">
      <v-icon>mdi-plus</v-icon>
      <v-tooltip activator="parent" location="bottom"> Add Post</v-tooltip>
    </v-btn>
  </WindowCard>
</template>
<script setup lang="ts">
import type { PostSimpleResponse } from '~/types/post-response'
import { isPagePostSimpleResponse } from '~/types/post-response.d'
import { getPosts } from '~/api/post.api'

import { v4 } from 'uuid'
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'

const key = ref(v4())

const postsList = ref<PostSimpleResponse[]>([])
let page = 0
let isLast = false

const fetchPosts = async () => {
  const result = await getPosts(page, 20, 'createdDate', 'desc')

  if (isPagePostSimpleResponse(result)) {
    result._embedded.posts.forEach(s1 => {
      postsList.value.push(s1)
    })

    if (result.page.totalPages === result.page.number) {
      isLast = true
    }

    page = result.page.number + 1
  } else {
    console.error('Failed to get post')
    isLast = true
  }
}

async function load({ done }) {
  if (isLast) {
    done('empty')
  } else {
    await fetchPosts()
    done('ok')
  }
}

const router = useRouter()

const goToPost = (postId: number) => {
  router.push(`/post/${postId}`)
}

const goToHome = () => {
  router.push('/')
}

const goToWrite = () => {
  router.push('/write')
}

const userStore = useUserStore()
const { isAdmin } = storeToRefs(userStore)
</script>
<style scoped>
/* width */
::-webkit-scrollbar {
  width: 0px;
}

.main-card {
  height: 85vh;
}

.dynamic-card {
  height: 75vh;
}
</style>
