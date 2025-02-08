<template>
  <v-dialog width="100%" height="100%" v-model="isOpen">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn block class="mx-1" @click="openDialog">
        <v-icon>mdi-cog</v-icon>
        <v-tooltip activator="parent" location="bottom">
          Edit Series
        </v-tooltip>
      </v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <WindowCard
        w="100%"
        @close="closeDialog"
        @minus="closeDialog"
        @split="closeDialog"
      >
        <template v-slot:title> <v-icon>mdi-cog</v-icon> 시리즈 수정 </template>

        <v-row class="mb-0 pa-0 ma-4" justify="center" align="center">
          <v-col cols="12" class="mt-2 mb-0">
            <v-text-field
              clearable
              label="시리즈 이름"
              v-model="seriesName"
              :rules="[rules.title_required, rules.title_min, rules.title_max]"
              variant="outlined"
              class="regular-font"
              hint="3 ~ 100자"
            >
              <template v-slot:prepend>
                <v-icon>mdi-text-short</v-icon>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" class="mt-2 mb-0">
            <v-textarea
              clearable
              label="시리즈 설명"
              lines="3"
              v-model="seriesDescription"
              :rules="[rules.description_max]"
              variant="outlined"
              class="regular-font"
              hint="최대 500자"
            >
              <template v-slot:prepend>
                <v-icon>mdi-text-long</v-icon>
              </template>
            </v-textarea>
          </v-col>
          <v-col cols="12" class="mt-2 mb-0 text-center">
            <ImageUploadCard @upload="addThumbnail" v-if="!thumbnail" />
            <v-text-field
              v-model="thumbnail"
              v-if="thumbnail"
              label="썸네일"
              readonly
              prepend-icon="mdi-image"
              class="regular-font "
            />
            <v-img
              v-if="thumbnail"
              :src="`${baseUrl}/${thumbnail}`"
              max-height="200"
              contain
            ></v-img>
            <v-btn
              v-if="thumbnail"
              @click="thumbnail = ''"
              color="error"
              class="mt-2"
              ><v-icon>mdi-restore</v-icon></v-btn
            >
          </v-col>
          <v-col cols="6" class="text-center">
            <v-btn
              color="primary"
              @click.stop="openEditConf"
              class="bold-font"
              block
              >수정</v-btn
            >
          </v-col>
          <v-col cols="6" class="text-center">
            <v-btn
              color="error"
              @click.stop="openDelConf"
              class="bold-font"
              block
              >삭제</v-btn
            >
          </v-col>

          <v-col cols="12" class="mx-auto text-center" v-if="isLoading">
            <v-progress-circular
              color="primary"
              indeterminate
            ></v-progress-circular>
          </v-col>
        </v-row>
      </WindowCard>
    </template>
  </v-dialog>
  <v-dialog width="100%" height="100%" v-model="isEditConfOpen">
    <WindowCard
      w="100%"
      @close="closeEditConf"
      @minus="closeEditConf"
      @split="closeEditConf"
    >
      <template v-slot:title> <v-icon>mdi-alert</v-icon> 수정 확인 </template>
      <v-row class="mb-0 pa-0 ma-4" justify="center" align="center">
        <v-col cols="12" class="mt-2 mb-0">
          <p class="text-h5 text-center bold-font text-primary">
            정말 시리즈를 수정하시겠습니까?
          </p>
        </v-col>
        <v-col cols="6" class="text-center">
          <v-btn class="bold-font" color="primary" @click="create" block
            >수정</v-btn
          >
        </v-col>
        <v-col cols="6" class="text-center">
          <v-btn class="bold-font" color="error" @click="closeEditConf" block
            >취소</v-btn
          >
        </v-col>
      </v-row>
    </WindowCard>
  </v-dialog>

  <v-dialog width="100%" height="100%" v-model="isDelConfOpen">
    <WindowCard
      w="100%"
      @close="closeDelConf"
      @minus="closeDelConf"
      @split="closeDelConf"
    >
      <template v-slot:title> <v-icon>mdi-alert</v-icon> 삭제 확인 </template>
      <v-row class="mb-0 pa-0 ma-4" justify="center" align="center">
        <v-col cols="12" class="mt-2 mb-0">
          <p class="text-h5 text-center bold-font text-primary">
            정말 시리즈를 삭제하시겠습니까?
          </p>
        </v-col>
        <v-col cols="6" class="text-center">
          <v-btn class="bold-font" color="primary" @click="remove" block
            >삭제</v-btn
          >
        </v-col>
        <v-col cols="6" class="text-center">
          <v-btn class="bold-font" color="error" @click="closeDelConf" block
            >취소</v-btn
          >
        </v-col>
      </v-row>
    </WindowCard>
  </v-dialog>
</template>

<script setup lang="ts">
import type { SeriesResponse } from '~/types/series-response'
const props = defineProps<{
  series: SeriesResponse
}>()
const isOpen = ref(false)

const openDialog = () => {
  isOpen.value = true
}

const closeDialog = () => {
  isOpen.value = false
}

const isEditConfOpen = ref(false)

const openEditConf = () => {
  isEditConfOpen.value = true
}

const closeEditConf = () => {
  isEditConfOpen.value = false
}

const isDelConfOpen = ref(false)

const openDelConf = () => {
  isDelConfOpen.value = true
}

const closeDelConf = () => {
  isDelConfOpen.value = false
}

const seriesName = ref(props.series.name)
const seriesDescription = ref(props.series.description)
const thumbnail = ref(props.series.thumbnail.split('/').pop())

const rules = reactive({
  title_required: v => !!v || '제목을 입력해주세요',
  title_min: v => (v && v.length >= 3) || '제목을 3자 이상 입력해주세요',
  title_max: v =>
    (v && v.length <= 100) || '제목은 최대 100자 까지 가능합니다.',
  description_max: v =>
    (v && v.length <= 500) || '설명은 500자 까지 가능합니다.'
})
import type { ImageResponse } from '~/types/image-response'
const addThumbnail = (uploadedThumbnail: ImageResponse) => {
  thumbnail.value = uploadedThumbnail.file_id + '.webp'
}
const runtimeConfig = useRuntimeConfig()
const baseUrl = runtimeConfig.public.baseImgUrl

import { useAlertStore } from '~/stores/alert'

const alertStore = useAlertStore()

import { AlertType } from '~/types/components.d'
import { updateSeries } from '~/api/series.api'
import { isSeriesResponse } from '~/types/series-response.d'

const emit = defineEmits(['update'])
const isLoading = ref(false)
const create = async () => {
  closeEditConf()
  if (!seriesName.value) {
    alertStore.setMessage({
      message: '시리즈 이름을 입력해주세요.',
      type: AlertType.Error
    })
    return
  }

  if (seriesName.value.length < 3) {
    alertStore.setMessage({
      message: '시리즈 이름은 3자 이상 입력해주세요.',
      type: AlertType.Error
    })
    return
  }

  if (seriesName.value.length > 100) {
    alertStore.setMessage({
      message: '시리즈 이름은 100자 이하로 입력해주세요.',
      type: AlertType.Error
    })
    return
  }

  if (seriesDescription.value.length > 500) {
    alertStore.setMessage({
      message: '시리즈 설명은 500자 이하로 입력해주세요.',
      type: AlertType.Error
    })
    return
  }

  if (!thumbnail.value) {
    alertStore.setMessage({
      message: '썸네일을 업로드해주세요.',
      type: AlertType.Error
    })
    return
  }

  const newSeries = {
    name: seriesName.value,
    description: seriesDescription.value,
    thumbnail: baseUrl + '/' + thumbnail.value
  }

  isLoading.value = true

  const res = await updateSeries(props.series.id, newSeries)

  if (isSeriesResponse(res)) {
    alertStore.setMessage({
      message: '시리즈가 수정되었습니다.',
      type: AlertType.Success
    })

    isLoading.value = false
    closeDialog()
    emit('update', res)
  } else {
    alertStore.setMessage({
      message: '시리즈 수정에 실패했습니다.',
      type: AlertType.Error
    })
    isLoading.value = false
  }
}

import { deleteSeries } from '~/api/series.api'

const router = useRouter()
const remove = async () => {
  closeDelConf()
  isLoading.value = true

  const res = await deleteSeries(props.series.id)

  if (res) {
    alertStore.setMessage({
      message: '시리즈가 삭제되었습니다.',
      type: AlertType.Success
    })

    isLoading.value = false
    closeDialog()
    router.push('/series-list')
  } else {
    alertStore.setMessage({
      message: '시리즈 삭제에 실패했습니다.',
      type: AlertType.Error
    })
    isLoading.value = false
  }
}
</script>

<style scoped></style>
