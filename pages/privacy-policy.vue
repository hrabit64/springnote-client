<template>
  <v-container class="justify-center align-center ma-0 pa-0" width="100%">
    <v-row justify="center" align="center" class="mx-1 my-1 d-flex">
      <v-col cols="12" md="10">
        <WindowCard w="100%">
          <template v-slot:title>
            <v-icon>mdi-book</v-icon>
            개인정보 처리방침
          </template>
          <v-card-item class="bg-success pt-5">
            <MarkdownRenderer :content="data" />
          </v-card-item>

        </WindowCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>
<script lang="ts" setup>
import { getSiteContent } from '~/api/site-content.api'
import { isSiteContentResponse } from '~/types/site-content-response.d'


const data: string = await getSiteContent('privacy-policy').then((response) => {
  if (isSiteContentResponse(response)) {
    return response.content
  }
  return '죄송합니다. 개인정보 처리방침을 불러오는데 실패했습니다.'
})
</script>
