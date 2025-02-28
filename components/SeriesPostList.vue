<template>

  <windowCard
    w="100%"

    class="my-2"
    @close="goToSeriesList"
    @minus="goToSeriesList"
    @split="goToSeriesList"
  >
    <template v-slot:title>
      <v-icon>mdi-information</v-icon>
      Series Info
    </template>
    <v-row justify="center" align="center">
      <v-col cols="12" md="4" class="mt-5 text-center">
        <v-avatar
          :image="targetSeries.thumbnail + '?height=400&width=400' "
          size="300"
        >

        </v-avatar>

      </v-col>


      <v-col cols="12" md="8" class="px-4 text-left mt-5">
        <p class="text-primary text-h4 bold-font mx-4">
          {{ targetSeries.name }}
        </p>
        <p class="text-body-1 bold-font mx-4 mt-5">
          {{ targetSeries.description }}
        </p>
      </v-col>


      <v-col cols="12" v-if="isAdmin">
        <SeriesUpdateDialog

          :series="targetSeries"
          @update="update"
        />
      </v-col>
      <v-col cols="12">
        <v-divider></v-divider>
        <p class="text-body-1 text-primary text-center bold-font mx-4 my-4">
          <v-icon>mdi-file-document-multiple</v-icon>
          총 {{ total }} 개의 포스트
        </p>
        <v-divider></v-divider>
      </v-col>
      <v-infinite-scroll
        :items="postList"
        :style="scrollCard"
        :onLoad="load"
        width="100%"
        v-if="!isNoContent"
        height="400"
      >
        <v-table class="bg-transparent pa-1" width="100%" hover>
          <thead>
          <tr></tr>
          </thead>
          <tbody>
          <tr v-for="(post, index) in postList" :key="post.id">
            <td @click.on="goToPost(post.id)" style="cursor: pointer">
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
              v-show="!isLast"
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
        <v-card class="mx-auto" elevation="0" color="success">
          <v-card-text class="text-center bold-font text-subtitle-1"
          >
            <v-icon class="mr-2">mdi-alert-circle</v-icon>
            해당 시리즈에
            포스트가 없습니다.
          </v-card-text
          >
        </v-card>
        <v-divider class="my-2"></v-divider>
      </v-col>
    </v-row>

  </windowCard>

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

const goToSeriesList = () => {
  router.push('/series-list')
}

const { mobile } = useDisplay()

const scrollCard = reactive({
  height: mobile.value ? '25vh' : '75vh'
})

watch(mobile, () => {
  scrollCard.height = mobile.value ? '25vh' : '75vh'
})

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
