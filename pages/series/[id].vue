<template>
  <v-container width="100%">
    <v-row justify="center" align="center">
      <v-col cols="12" md="10">
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


</script>

<style scoped></style>
