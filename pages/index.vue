<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" md="10">
        <WindowCard w="100%">
          <template v-slot:title>
            <v-icon>mdi-human-greeting</v-icon>
            Hello, Springnote.blog!
          </template>
          <v-card-text>
            <v-row justify="center" align="center" class="my-4">
              <v-col cols="12" md="10" class="text-center">
                <client-only>
                  <v-img src="@/public/images/index-banner.webp" max-height="300">

                  </v-img>
                </client-only>

              </v-col>

              <v-col cols="12" md="10" class="text-center">
                <p class="bold-font text-body-1 text-md-h4"><span class="text-primary">springnote.blog</span> 에 오신 것을
                  환영합니다!
                </p>
                <p class="regular-font text-body-2 text-md-h5 mt-3 mb-5">
                  # spring # java # golang # backend etc...
                </p>
              </v-col>

              <v-col cols="12" md="10" class="text-center">
                <v-btn color="primary" @click="goTo('/series-list')" variant="outlined">
                  전체 시리즈 보러가기
                  <v-icon class="ml-2">mdi-arrow-right</v-icon>
                </v-btn>
              </v-col>
            </v-row>

          </v-card-text>

        </WindowCard>
      </v-col>


      <v-col cols="12" md="5" v-for="post in recentPosts" :key="post.id">
        <WindowCard w="100%" hover>
          <template v-slot:title>
            <v-icon>mdi-new-box</v-icon>
            {{ post.created_at.slice(0, 10) }}
          </template>
          <v-card-text @click.stop="goTo(`/post/${post.id}`)">
            <v-row justify="center" align="center" class="py-2">
              <v-col cols="4">
                <v-avatar :size="mobile ? 100:200" class="text-right text-right">
                  <v-img :src="post.thumbnail" alt="avatar"></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="8" class="text-left">
                <p class="text-primary regular-font text-body-2"> {{ post.series.name }}</p>
                <p class="bold-font text-h6 text-md-h5"> {{ post.title }}</p>

              </v-col>


            </v-row>
          </v-card-text>
        </WindowCard>
      </v-col>
      <v-col cols="12" md="10" class="text-center">
        <v-btn color="primary" @click="goTo('/post-list')" variant="outlined">
          전체 포스트 보러가기
          <v-icon class="ml-2">mdi-arrow-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>


  </v-container>
</template>

<script setup lang="ts">

const router = useRouter()
const goTo = (path: string) => {
  router.push(`${path}`)
}

import { useDisplay } from 'vuetify'
// get recent posts
import { getRecentPosts } from '~/api/post.api'
import { isPagePostSimpleResponse } from '~/types/post-response.d'
import { PostSimpleResponse } from '~/types/post-response'

const { mobile } = useDisplay()

const recentPosts = ref<PostSimpleResponse[]>([])

onMounted(async () => {
  const result = await getRecentPosts(6)
  if (isPagePostSimpleResponse(result)) {
    recentPosts.value = result._embedded.posts
  }
})

</script>

<style scoped>
.wrap-text {
  white-space: normal; /* 기본 값으로 자동 줄바꿈을 설정 */
  word-wrap: break-word;
}


</style>
