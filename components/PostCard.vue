<template>
  <v-card
    color="success"
    elevation="0"
    link
    width="100%"
    height="100%"
    @click.stop="goToPost"
  >
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-img
          :src="post.thumbnail + '?width=600&height=400'"
          class="align-center"
          cover
          style="height: 40vh"
          gradient="to top right, rgba(42,42, 42,.80), rgba(0,0,0,.80)"
          rounded
        >
          <v-row class="text-center">
            <v-col cols="12">
              <v-card-subtitle
                class="my-3 mx-2 text-md-subtitle-1 text-primary text-sm-subtitle-2 wrap-text bold-font"
              >
                시리즈 |
                {{ post.series?.name || '시리즈 없음' }}
              </v-card-subtitle>
              <v-card-item class="text-h6 overflow-hidden wrap-text bold-font">
                {{ toShortTitle(post.title) }}
              </v-card-item>
              <v-card-title class="text-subtitle">
                <v-btn v-for="tag in post.tags" variant="text"
                  >#{{ tag.name }}</v-btn
                >
              </v-card-title>
              <v-card-subtitle class="my-3 mx-2">
                <v-icon>mdi-clock</v-icon> {{ post.created_at.split('T')[0] }}
              </v-card-subtitle>
            </v-col>
          </v-row>
        </v-img>
      </v-col>
    </v-row>
  </v-card>
</template>
<script setup lang="ts">
import type { PostCardItem } from '~/types/components'
import type { PostSimpleResponse } from '~/types/post-response'
const props = defineProps({
  post: {
    type: Object as PropType<PostSimpleResponse>,
    required: true
  }
})

const toShortTitle = (title: string) => {
  return title.length > 40 ? title.slice(0, 60) + '...' : title
}
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()

const getThumbnailSize = (thumbnail: string) => {
  if (mobile.value) {
    return thumbnail + '?width=200&height=200'
  }
  return thumbnail + '?width=600&height=400'
}

const router = useRouter()

const goToPost = () => {
  router.push(`/post/${props.post.id}`)
}
</script>
<style scoped>
.wrap-text {
  word-wrap: break-word;
  white-space: normal;
  word-break: break-all;
}
</style>
