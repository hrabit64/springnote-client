<template>
  <!-- 시리즈소개 -->

  <WindowCard
    w="100%"
    class="my-2"
    :style="mainCard"
  >
    <template v-slot:title>

      <span class="overflow-x-hidden" @click.stop="goToSeries(series.id)" style="cursor: pointer">
        <v-icon class="ml-2">mdi-file-document-multiple</v-icon>
        {{ series.name }}
      </span>
    </template>
    <client-only>
      <v-infinite-scroll
        :items="postList"
        :style="scrollCard"
        :onLoad="load"
        height="200"
        width="100%"
        v-if="!isNoContent"
      >
        <v-table class="bg-transparent pa-1" width="100%" hover>
          <thead>
          <tr></tr>
          </thead>
          <tbody>
          <tr v-for="(post, index) in postList" :key="post.id">
            <td
              @click.on="goToPost(post.id)"
              :class="targetPostId === post.id ? 'bg-primary' : ''"
              style="cursor: pointer"
            >
              <p class="bold-font text-body-2">
                <v-icon class="mx-1">mdi-file-document</v-icon>
                {{ total - index - 1 }}. {{ post.title }}
              </p>
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
      <v-col cols="12" v-if="isNoContent">
        <v-card class="mx-auto" elevation="0">
          <v-card-text class="text-center bold-font text-subtitle-1"
          >
            <v-icon class="mr-2">mdi-alert-circle</v-icon>
            해당 시리즈에 포스트가
            없습니다.
          </v-card-text
          >
        </v-card>
        <v-divider class="my-2"></v-divider>
      </v-col>
    </client-only>
  </WindowCard>
</template>
<script setup lang="ts">
import type { SeriesResponse } from '~/types/series-response'
import type { PostSimpleResponse } from '~/types/post-response'

import { isPagePostSimpleResponse } from '~/types/post-response.d'

import { getSeriesPosts } from '~/api/post.api'
import { useDisplay } from 'vuetify'
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  series: SeriesResponse
  targetPostId: number
}>()

const targetSeries = reactive(props.series)

const postList = ref<PostSimpleResponse[]>([])
let page = 0
let isLast = false
const isNoContent = ref(false)
const total = ref(0)
const fetchSeries = async () => {
  const result = await getSeriesPosts(
    props.series.id,
    page,
    20,
    'createdDate',
    'desc'
  )
  // console.log(debugPagePostSimpleResponse(result).error)
  if (isPagePostSimpleResponse(result)) {
    postList.value.push(...result._embedded.posts)

    if (result.page.totalPages === result.page.number + 1) {
      isLast = true
    }

    page = result.page.number + 1

    total.value = result.page.totalElements
  } else {
    console.error('Failed to get series post')
    isNoContent.value = true
  }
}

async function load({ done }) {
  if (isLast) {
    done('empty')
  } else {
    await fetchSeries()
    done('ok')
  }
}

const router = useRouter()
const goToPost = (id: number) => {
  router.push(`/post/${id}`)
}

const goToSeries = (id: number) => {
  router.push(`/series/${id}`)
}

const goToSeriesList = () => {
  router.push('/series-list')
}

const { mobile } = useDisplay()

let isClose = false
let isMaximum = false

const calHeight = () => {
  if (isClose) {
    return '0vh'
  }

  if (isMaximum) {
    return mobile.value ? '60vh' : '50vh'
  }

  return mobile.value ? '30vh' : '25vh'
}

const calMainHeight = () => {
  if (isClose) {
    return '0vh'
  }

  if (isMaximum) {
    return mobile.value ? '70vh' : '60vh'
  }

  return mobile.value ? '40vh' : '30vh'
}

const scrollCard = reactive({
  height: calHeight()
})

const mainCard = reactive({
  height: calMainHeight()
})

watch(mobile, () => {
  scrollCard.height = calHeight()
  mainCard.height = calMainHeight()
})

const close = () => {
  isClose = true
  isMaximum = false
  scrollCard.height = calHeight()
}

const minus = () => {
  isClose = false
  isMaximum = false
  scrollCard.height = calHeight()
}

const maximum = () => {
  isClose = false
  isMaximum = true
  scrollCard.height = calHeight()
}

const userStore = useUserStore()
const { isAdmin } = storeToRefs(userStore)

const update = (newSeries: SeriesResponse) => {
  targetSeries.name = newSeries.name
  targetSeries.description = newSeries.description
  targetSeries.thumbnail = newSeries.thumbnail
}
</script>
<style scoped>
/* width */
::-webkit-scrollbar {
  width: 0px;
}
</style>
