<template>
  <v-card class="bg-transparent" elevation="0">
    <v-row align="center" justify="center">
      <v-col cols="12" v-if="!isLoading">
        <v-file-input
          accept="image/png, image/jpeg, image/webp, image/gif"
          label="이미지"
          placeholder="업로드할 이미지를 선택"
          prepend-icon="mdi-camera"
          class="overflow-x-hidden"
          v-model="image"
        ></v-file-input>
      </v-col>

      <v-col cols="12" v-if="!isLoading">
        <p v-if="image">{{ imageName }}</p>
        <v-img v-if="image" :src="imageUrl" max-height="200" contain></v-img>
      </v-col>

      <v-col
        cols="12"
        md="6"
        class="text-center"
        v-if="image && !isLoading"
        @click.stop="uploadImage"
      >
        <v-btn color="primary" block>
          <v-icon>mdi-cloud-upload</v-icon> 업로드
        </v-btn>
      </v-col>

      <v-col cols="12" class="mx-auto text-center" v-if="isLoading">
        <v-progress-circular
          color="primary"
          indeterminate
        ></v-progress-circular> </v-col
    ></v-row>
  </v-card>
</template>

<script lang="ts" setup>
const image = ref<File | null>(null)
const imageUrl = ref<string>('')
const imageName = ref<string>('')
watch(image, newImage => {
  if (newImage) {
    imageUrl.value = URL.createObjectURL(newImage)
    imageName.value = newImage.name
  } else {
    imageUrl.value = ''
    imageName.value = ''
  }
})

import { postImage } from '~/api/image.api'
import type { ImageRequest } from '~/types/image-request'
import type { ImageResponse } from '~/types/image-response'
import { isImageResponse } from '~/types/image-response.d'

const isLoading = ref(false)

const emit = defineEmits(['upload'])
const uploadImage = async () => {
  if (image.value) {
    isLoading.value = true
    const reader = new FileReader()
    reader.onload = async () => {
      const base64String = reader.result as string
      // base64 문자열에서 'data:image/*;base64,' 부분 제거
      const pureBase64 = base64String.replace(
        /^data:image\/(png|jpeg|jpg|gif);base64,/,
        ''
      )

      const imageRequest: ImageRequest = {
        image: pureBase64,
        name: imageName.value
      }

      const response = await postImage(imageRequest)

      if (isImageResponse(response)) {
        emit('upload', response)
      }
      isLoading.value = false
      image.value = null
    }
    reader.readAsDataURL(image.value)
  }
}
</script>

<style></style>
