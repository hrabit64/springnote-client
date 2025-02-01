<template>
  <v-container class="d-flex ma-0 pa-0 justify-center align-center">
    <WindowCard
      w="100%"
      class="px-2 mt-5 bg-success"
      @close="goToHistory"
      @minus="goToHistory"
      @split="goToHistory"
    >
      <template v-slot:title>
        <v-icon>mdi-file-document-multiple</v-icon> Post Detail
      </template>
      <v-row class="ma-0 pa-0" align="center" justify="center">
        <v-col cols="12" class="mx-0 pt-0 mt-2 px-0">
          <client-only>
            <v-btn block @click.stop="goToEdit" v-if="isAdmin" 
              ><v-icon>mdi-cog</v-icon></v-btn
            >
          </client-only>
        </v-col>

        <v-col cols="12" class="mx-0 pt-0 mt-0 px-0">
          <v-img
            gradient="to top right, rgba(42,42, 42,.80), rgba(0,0,0,.80)"
            :src="post.thumbnail + '?height=600'"
            height="600"
            class="rounded-lg"
            cover
          >
            <v-row class="fill-height ma-0 d-flex align-center justify-center">
              <v-col class="text-center">
                <p
                  class="text-md-h5 text-subtitle-2 bold-font mt-4"
                  hover
                  @click.stop="goToSeries(post.series.id)"
                >
                  {{
                    post.series ? '시리즈 | ' + post.series.name : '시리즈 없음'
                  }}
                </p>
                <v-divider></v-divider>
                <p class="text-md-h2 text-h5 text-xs-h1 bold-font text-primary">
                  {{ post.title }}
                </p>
              </v-col>
            </v-row>
          </v-img>
        </v-col>

        <v-col cols="12" md="10" class="text-right mr-4">
          <p class="bold-font text-body-2">
            <v-icon class="mx-1">mdi-clock</v-icon> 작성일 :
            {{ post.created_at.replace('T', ' ').replace('Z', '') }}
          </p>
        </v-col>

        <v-col cols="12" md="10" class="text-right">
          <p class="d-inline mr-1 bold-font text-body-2">
            <v-icon class="mx-1">mdi-tag</v-icon> 태그 :
            {{ post.tags.length < 0 ? '없음' : '' }}
          </p>
          <template v-for="(tag, index) in tags" :key="index">
            <v-chip class="mx-1" color="primary" variant="flat">{{
              tag
            }}</v-chip>
          </template>
        </v-col>
        <client-only>
          <v-col cols="12" md="10">
            <PostSameSeriesList :series="post.series" :targetPostId="post.id" />
          </v-col>
        </client-only>
        <v-col cols="12" md="10" class="pa-4 ma-4">
          <MarkdownRenderer :content="post.content.editor_text" />
        </v-col>

        <client-only>
          <v-col
            cols="12"
            md="12"
            class="my-4 justify-center align-center text-center"
            @click.stop="goTop"
            v-if="!mobile"
          >
            <v-btn color="primary" class="text-center" icon
              ><v-icon>mdi-arrow-up</v-icon></v-btn
            >
          </v-col>
        </client-only>
      </v-row>
    </WindowCard>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'content'
})
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const { isAdmin } = storeToRefs(userStore)
import { isPostDetailResponse } from '~/types/post-response.d'

import type { PostDetailResponse } from '~/types/post-response'

import { getPost } from '~/api/post.api'
import debug from 'debug'
import { useCommentSidebarStore } from '~/stores/comment-sidebar'
const commentSidebarStore = useCommentSidebarStore()
debug.default = debug

const route = useRoute()
const postId = route.params.id
commentSidebarStore.setTargetPostId(Number(postId))

const pageTitleStore = usePageTitleStore()

const post: PostDetailResponse = await getPost(Number(postId)).then(res => {
  if (isPostDetailResponse(res)) {
    return res
  } else {
    throw showError({
      statusCode: 404,
      fatal: true,
      message: '해당 포스트가 없습니다.'
    })
  }
})

const tags = computed(() => {
  return post.tags.map(tag => tag.name)
})

const comments = ref(null)

const router = useRouter()
const goToSeries = (seriesId: number) => {
  router.push(`/series/${seriesId}`)
}

const goToHistory = () => {
  router.go(-1)
}

const goToEdit = () => {
  router.push(`/edit/${post.id}`)
}
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()
const goTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped></style>
