<template>
  <v-container class="d-flex ma-0 pa-0 justify-center align-center">
    <WindowCard w="100%">
      <template v-slot:title>
        <v-icon>mdi-file-document-multiple</v-icon>
        Post Detail
      </template>

      <v-row class="ma-0 pa-0 bg-success" align="center" justify="center">
        <v-col cols="12" class="mx-0 pt-0 mt-2 px-0">
          <client-only>
            <v-btn block @click.stop="goToEdit" v-if="isAdmin"
            >
              <v-icon>mdi-cog</v-icon>
            </v-btn
            >
          </client-only>
        </v-col>

        <v-col cols="12" md="10" class="mx-4 my-4 ">
          <p
            class="text-md-h5 text-subtitle-2 bold-font mt-4 text-white"
            style="cursor: pointer"
            @click.stop="goToSeries(post.series.id)"

          >
            {{
              post.series ? '시리즈 | ' + post.series.name : '시리즈 없음'
            }}
          </p>

          <p class="text-md-h2 text-h4 text-xs-h1 bold-font text-primary mt-2">
            {{ post.title }}
          </p>
        </v-col>
        <v-col cols="12" md="10" class="mx-4 my-4 ">
          <v-spacer />
        </v-col>

        <v-col cols="12" md="10" class="mx-4 ">
          <p class="bold-font text-body-2">
            <v-icon class="mx-1">mdi-clock</v-icon>
            작성일 :
            {{ post.created_at.replace('T', ' ').replace('Z', '') }}
          </p>
        </v-col>

        <v-col cols="12" md="10" class="mx-4 px-4" v-if="post.tags.length > 0">
          <p class="d-inline bold-font text-body-2">
            <v-icon class="mx-1">mdi-tag</v-icon>
            태그 :
          </p>
          <template v-for="(tag, index) in tags" :key="index">
            <v-chip class="mx-1" color="primary" variant="flat">{{
                tag
              }}
            </v-chip>
          </template>
        </v-col>

        <v-col cols="12" md="10" class="mx-4 my-4">
          <PostSameSeriesList :series="post.series" :targetPostId="post.id" />
        </v-col>

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
            >
              <v-icon>mdi-arrow-up</v-icon>
            </v-btn
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
import { isPostDetailResponse } from '~/types/post-response.d'

import type { PostDetailResponse } from '~/types/post-response'

import { getPost } from '~/api/post.api'
import debug from 'debug'
import { useCommentSidebarStore } from '~/stores/comment-sidebar'
import { useDisplay } from 'vuetify'

const userStore = useUserStore()
const { isAdmin } = storeToRefs(userStore)

const commentSidebarStore = useCommentSidebarStore()
debug.default = debug

const route = useRoute()
const postId = route.params.id
commentSidebarStore.setTargetPostId(Number(postId))


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

const { mobile } = useDisplay()
const goTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}


useHead({
  title: 'springnote.blog - ' + post.title,
  meta: [
    {
      name: post.title,
      content: post.content.plain_text,
      description: post.content.plain_text,
      'og:title': post.title,
      'og:description': post.content.plain_text,
      'og:image': post.thumbnail,
      'og:type': 'article',
      'og:site_name': 'springnote.blog',
      'og:locale': 'ko_KR'
    }
  ]
})
</script>

<style scoped></style>
