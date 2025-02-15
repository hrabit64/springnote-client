<template>
  <v-dialog
    v-model="dragImgUpload"
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
            <v-col cols="12">
              <v-card-title class="text-center">
                <v-icon>mdi-image-area</v-icon>
                이미지 업로드 중...
              </v-card-title>
            </v-col>
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

  <!-- preview start -->
  <v-dialog
    v-model="isPreviewOpen"
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
    <WindowCard
      w="100%"
      @close="closePreview"
      @minus="closePreview"
      @split="closePreview"
      class="bg-success"
    >
      <template v-slot:title>
        <v-icon>mdi-eye</v-icon>
        Preview
      </template>
      <v-row justify="center">
        <v-col cols="12" md="10">
          <MarkdownRenderer :content="content" />
        </v-col>
      </v-row>
    </WindowCard>
  </v-dialog>

  <!-- preview end -->

  <v-card elevation="0" class="bg-transparent">
    <v-row>
      <v-col cols="12" md="6">
        <v-card
          elevation="0"
          class="pa-2 drop-zone"
          style="height: 80vh"
          @dragover.prevent
          @drop.prevent="handleDrop"
        >
          <v-card-title class="text-left">
            <v-btn small icon variant="text" @click.stop="addHedaer(1)">
              <v-icon>mdi-format-header-1</v-icon>
            </v-btn>

            <v-btn small icon variant="text" @click.stop="addHedaer(2)">
              <v-icon>mdi-format-header-2</v-icon>
            </v-btn>

            <v-btn small icon variant="text" @click.stop="addHedaer(3)">
              <v-icon>mdi-format-header-3</v-icon>
            </v-btn>

            <v-btn small icon variant="text" @click.stop="addHedaer(4)">
              <v-icon>mdi-format-header-4</v-icon>
            </v-btn>

            <v-btn small icon variant="text" @click.stop="addHedaer(5)">
              <v-icon>mdi-format-header-5</v-icon>
            </v-btn>

            <v-btn small icon variant="text" @click.stop="addHedaer(6)">
              <v-icon>mdi-format-header-6</v-icon>
            </v-btn>

            <v-menu
              :close-on-content-click="false"
              location="end"
              v-model="tableMenu"
            >
              <template v-slot:activator="{ props }">
                <v-btn small icon variant="text" v-bind="props">
                  <v-icon>mdi-table</v-icon>
                </v-btn>
              </template>

              <v-card class="pa-4">
                <v-text-field
                  label="row"
                  variant="outlined"
                  counter="2"
                  v-model="row"
                  required
                  :rules="[rules.required, rules.number, rules.min, rules.max]"
                ></v-text-field>

                <v-text-field
                  label="col"
                  variant="outlined"
                  v-model="col"
                  counter="2"
                  required
                  :rules="[rules.required, rules.number, rules.min, rules.max]"
                ></v-text-field>
                <v-btn
                  variant="text"
                  class="bold-font"
                  @click.stop="tableMenu = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="primary"
                  variant="text"
                  class="bold-font"
                  @click.stop="createTable"
                >
                  Create
                </v-btn>
              </v-card>
            </v-menu>

            <v-menu
              :close-on-content-click="false"
              location="end"
              v-model="linkMenu"
            >
              <template v-slot:activator="{ props }">
                <v-btn small icon variant="text" v-bind="props">
                  <v-icon>mdi-link-box</v-icon>
                </v-btn>
              </template>

              <v-card class="pa-4">
                <v-text-field
                  label="link"
                  variant="outlined"
                  v-model="urlLink"
                  required
                  :rules="[rules.required]"
                ></v-text-field>

                <v-text-field
                  label="name"
                  variant="outlined"
                  v-model="urlName"
                ></v-text-field>

                <v-text-field
                  label="description"
                  variant="outlined"
                  v-model="urlDescription"
                ></v-text-field>

                <v-btn
                  variant="text"
                  class="bold-font"
                  @click.stop="linkMenu = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="primary"
                  variant="text"
                  class="bold-font"
                  @click.stop="createLink"
                >
                  Create
                </v-btn>
              </v-card>
            </v-menu>
            <v-menu
              :close-on-content-click="false"
              location="end"
              v-model="imgMenu"
            >
              <template v-slot:activator="{ props }">
                <v-btn small icon variant="text" v-bind="props">
                  <v-icon>mdi-image-area</v-icon>
                </v-btn>
              </template>

              <v-card class="pa-4">
                <v-file-input
                  accept="image/png, image/jpeg, image/webp, image/gif"
                  label="이미지"
                  placeholder="업로드할 이미지를 선택"
                  prepend-icon="mdi-camera"
                  class="overflow-x-hidden"
                  v-model="image"
                  v-if="!isImgLoading"
                ></v-file-input>
                <v-btn
                  variant="text"
                  class="bold-font"
                  @click.stop="imgMenu = false"
                  v-if="!isImgLoading"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="primary"
                  variant="text"
                  class="bold-font"
                  @click.stop="uploadImage"
                  v-if="!isImgLoading"
                >
                  Upload
                </v-btn>
                <v-progress-circular
                  color="primary"
                  v-if="isImgLoading"
                  indeterminate
                ></v-progress-circular>
              </v-card>
            </v-menu>

            <v-btn small icon variant="text" @click.stop="addCode">
              <v-icon>mdi-code-not-equal-variant</v-icon>
            </v-btn>
            <v-btn small icon variant="text" @click.stop="addBold">
              <v-icon>mdi-format-bold</v-icon>
            </v-btn>
            <v-btn small icon variant="text" @click.stop="addItalic">
              <v-icon>mdi-format-italic</v-icon>
            </v-btn>
          </v-card-title>
          <v-textarea
            variant="outlined"
            no-resize
            rows="26"
            counter="65535"
            v-model="content"
          ></v-textarea>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card style="height: 80vh">
          <v-btn
            small
            icon
            variant="text"
            class="d-inline"
            @click="openPreview"
          >
            <v-icon>mdi-window-maximize</v-icon>
          </v-btn>


          <v-card
            elevation="0"
            color="success"
            class="overflow-y-auto"
            style="height: 70vh"
          >
            <v-card-title></v-card-title>
            <MarkdownRenderer :content="content" />
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts" setup>
import { useAlertStore } from '~/stores/alert'
import { AlertType } from '~/types/components.d'
import { postImage } from '~/api/image.api'
import type { ImageRequest } from '~/types/image-request'
import { isImageResponse } from '~/types/image-response.d'
import MarkdownRenderer from './MarkdownRenderer.vue'

const alertStore = useAlertStore()

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const content = ref(props.modelValue)

watch(content, newValue => {
  emit('update:modelValue', newValue)
})

watch(
  () => props.modelValue,
  newValue => {
    content.value = newValue
  }
)

const addHedaer = (n: number) => {
  if (content.value !== '') {
    content.value += '\n'
  }
  content.value += `${'#'.repeat(n)} `
}

const addBold = () => {
  content.value += `**b**`
}

const addItalic = () => {
  content.value += `*i*`
}

const addCode = () => {
  if (content.value !== '') {
    content.value += '\n'
  }
  content.value += '```\n\n```'
}

//table
const tableMenu = ref(false)
const row = ref(2)
const col = ref(2)
const rules = reactive({
  required: v => !!v || '값을 입력해주세요.',
  min: v => (v && Number(v) && Number(v) > 0) || '0 이상 입력해주세요',
  max: v => (v && Number(v) && Number(v) < 100) || '최대 99 까지 가능합니다.',
  number: v => (v && Number(v)) || '올바른 숫자가 아닙니다.'
})
const createTable = () => {
  if (content.value !== '') {
    content.value += '\n'
  }
  content.value += `|${'head|'.repeat(col.value)}\n|${'---|'.repeat(col.value)}\n${'|'.repeat(
    col.value
  )}|`

  tableMenu.value = false
}

// image upload
const imgMenu = ref(false)

const isImgLoading = ref(false)
const image = ref<File | null>(null)

const runtimeConfig = useRuntimeConfig()
const baseUrl = runtimeConfig.public.baseImgUrl
const createImage = (imgId: string) => {
  if (content.value !== '') {
    content.value += '\n'
  }
  content.value += `![${imgId}](${baseUrl}/${imgId}.webp)`
}

// drag and drop
const dragImgUpload = ref(false)
let isDrag = false
const handleDrop = async (event: DragEvent) => {
  const files = event.dataTransfer?.files
  //can png. jpg, jpeg, gif webp
  if (files && files.length === 1 && files[0].type.match('image/*')) {
    image.value = files[0]
    isDrag = true
    await uploadImage()
  } else {
    alertStore.setMessage({
      message: '파일을 하나만 업로드해주세요.',
      type: AlertType.Error
    })
  }
}
const uploadImage = async () => {
  if (image.value) {
    isImgLoading.value = true
    if (isDrag) {
      dragImgUpload.value = true
    }
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
        name: image.value.name
      }

      const response = await postImage(imageRequest)

      if (isImageResponse(response)) {
        createImage(response.file_id)
        alertStore.setMessage({
          message: '이미지 업로드에 성공했습니다.',
          type: AlertType.SUCCESS
        })
      } else {
        alertStore.setMessage({
          message: '이미지 업로드에 실패했습니다.',
          type: AlertType.ERROR
        })
      }
      isImgLoading.value = false
      if (isDrag) {
        dragImgUpload.value = false
        isDrag = false
      }
      image.value = null
    }
    reader.readAsDataURL(image.value)
  }
}

//link
const linkMenu = ref(false)
const urlLink = ref('')
const urlName = ref('')
const urlDescription = ref('')
const createLink = () => {
  if (content.value !== '') {
    content.value += '\n'
  }
  content.value += `[${urlName.value}](${urlLink.value} "${urlDescription.value}")`
  linkMenu.value = false
}

//preview
const isPreviewOpen = ref(false)
const openPreview = () => {
  isPreviewOpen.value = true
}

const closePreview = () => {
  isPreviewOpen.value = false
}
</script>

<style scoped></style>
