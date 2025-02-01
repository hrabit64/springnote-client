<template>
  <client-only>
    <v-container
      class="d-flex justify-center align-center fill-height"
      width="100%"
    >
      <!-- permission check -->
      <v-dialog
        v-model="permissionCheck"
        fullscreen
        scrim="success"
        persistent
        no-click-animation
        class="no-transition"
        transition="false"
        :open-delay="0"
        style="overflow-y: hidden"
        overlay-color="black"
      >
        <v-card color="success" style="overflow-y: hidden">
          <v-row align="center" justify="center">
            <v-col cols="8" class="text-center">
              <v-row>
                <v-spacer></v-spacer>

                <v-col cols="12">
                  <v-progress-circular
                    indeterminate
                    :size="128"
                  ></v-progress-circular>
                </v-col>
                <v-spacer></v-spacer>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
      <v-row justify="center" align="center" class="mx-5">
        <v-col cols="12" class="text-center">
          <h1 class="text-h3 bold-font">
            <v-icon>mdi-alert</v-icon>This Is Admin Page
          </h1>
          <h3 class="text-h5 bold-font">
            If you don't have any permission, this page not working.
          </h3>
          <h3 class="text-h5 text-primary bold-font my-2">
            <v-icon>mdi-cloud-upload</v-icon> 이미지 업로드
          </h3>
        </v-col>

        <v-col cols="12">
          <ImageUploadCard @upload="addHistory" />
        </v-col>

        <v-col cols="12" class="text-center my-4">
          <v-divider></v-divider>
        </v-col>

        <v-col cols="12" class="text-center">
          <p class="text-h4 text-primary bold-font">
            <v-icon>mdi-history</v-icon>히스토리
          </p>
          <p class="text-subtitle-1 bold-font">
            이미지를 클릭하면 링크를 복사합니다.
          </p>
        </v-col>

        <v-col cols="12" class="text-center">
          <v-item-group>
            <v-row>
              <v-col v-for="(item, i) in history" :key="i" cols="12" md="4">
                <v-item>
                  <v-img
                    :src="`${baseUrl}/${item}.webp`"
                    @click.stop="copyText(item)"
                    class="text-right pa-2"
                    height="300"
                    cover
                  >
                  </v-img>
                  <p>{{ item }}</p>
                </v-item>
              </v-col>
            </v-row>
          </v-item-group>
        </v-col>
      </v-row>
    </v-container>
  </client-only>
</template>

<script lang="ts" setup>
const permissionCheck = ref(true)

import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const { isAdmin } = storeToRefs(userStore)

const router = useRouter()
onMounted(() => {
  if (isAdmin.value) {
    permissionCheck.value = false
  } else {
    router.push('/')
  }
})
import type { ImageResponse } from '~/types/image-response'
const addHistory = (imageId: ImageResponse) => {
  history.value.push(imageId.file_id)
}

const history = ref<string[]>([])

const runtimeConfig = useRuntimeConfig()
const baseUrl = runtimeConfig.public.baseImgUrl

const { copy } = useClipboard()

const copyText = (imageId: string) => {
  copy(`${baseUrl}/${imageId}.webp` || '')
}
</script>

<style></style>
