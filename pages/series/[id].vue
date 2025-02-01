<template>
  <v-container class="d-flex justify-center align-center" width="100%">
    <v-row justify="center" align="center" class="mx-1">
      <v-col cols="12" class="pa-0 ma-0">
        <SeriesPostList :series="series" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
const route = useRoute()
const id = route.params.id
if (id === '' || Array.isArray(id)) {
  throw showError({
    statusCode: 404,
    fatal: true,
    message: '해당 시리즈가 없습니다.'
  })
}

import { getSeriesWithId } from '~/api/series.api'
import { isSeriesResponse } from '~/types/series-response.d'

const series = await getSeriesWithId(Number(id)).then(res => {
  if (isSeriesResponse(res)) {
    return res
  } else {
    throw showError({
      statusCode: 404,
      fatal: true,
      message: '해당 시리즈가 없습니다.'
    })
  }
})

import { usePageTitleStore } from '~/stores/page-title'
const pageTitleStore = usePageTitleStore()
pageTitleStore.setTitle(series.name)
</script>

<style scoped></style>
