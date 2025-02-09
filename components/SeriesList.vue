<template>
  <WindowCard w="100%" @close="goToHome" class="main-card">
    <template v-slot:title>
      <v-icon>mdi-folder-multiple</v-icon>
      Series List
    </template>
    <v-infinite-scroll
      :items="seriesList"
      :onLoad="load"
      :key="key"
      width="100%"
      class="dynamic-card"
    >
      <v-table class="bg-transparent" width="100%" hover>
        <thead>
        <tr></tr>
        </thead>
        <tbody>
        <tr v-for="series in seriesList" :key="series.id">
          <td @click.stop="goToSeries(series.id)" class="py-2" style="cursor: pointer">
            <v-row class="bold-font text-body-2">
              <v-col cols="1" class="text-right">
                <v-icon>mdi-folder</v-icon>
              </v-col
              >
              <v-col cols="11"> {{ series.name }}</v-col>
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
    <client-only>
      <SeriesCreateDialog @create="refresh" v-if="isAdmin" />
    </client-only>
  </WindowCard>
</template>
<script setup lang="ts">
import type { SeriesResponse } from '~/types/series-response'
import { isPageSeriesResponse } from '~/types/series-response.d'
import { getSeries } from '~/api/series.api'

import { v4 } from 'uuid'
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'

const key = ref(v4())

const refresh = () => {
  key.value = v4()
  seriesList.value = []
  page = 0
  isLast = false
}

const seriesList = ref<SeriesResponse[]>([])
let page = 0
let isLast = false

const fetchSeries = async () => {
  const result = await getSeries(page, 20, 'id', 'desc')

  if (isPageSeriesResponse(result)) {
    result._embedded.series.forEach(s1 => {
      seriesList.value.push(s1)
    })

    if (result.page.totalPages === result.page.number) {
      isLast = true
    }

    page = result.page.number + 1
  } else {
    console.error('Failed to get series')
    isLast = true
  }
}

const loadSeries = async () => {
  await fetchSeries()
}

async function load({ done }) {
  if (isLast) {
    done('empty')
  } else {
    await loadSeries()
    done('ok')
  }
}

const router = useRouter()
const goToSeries = (seriesId: number) => {
  router.push(`/series/${seriesId}`)
}

const goToHome = () => {
  router.push('/')
}

const userStore = useUserStore()
const { isAdmin } = storeToRefs(userStore)
</script>
<style scoped>
/* width */
::-webkit-scrollbar {
  width: 0px;
}

.dynamic-card {
  height: 75vh;
}

.main-card {
  height: 85vh;
}
</style>
