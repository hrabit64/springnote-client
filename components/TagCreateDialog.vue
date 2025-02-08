<template>
  <v-dialog width="100%" height="100%" v-model="isOpen">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn block class="mx-1" @click="openDialog">
        <v-icon>mdi-plus</v-icon>
        <v-tooltip activator="parent" location="bottom"> Add Tag </v-tooltip>
      </v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <WindowCard
        w="100%"
        @close="closeDialog"
        @minus="closeDialog"
        @split="closeDialog"
      >
        <template v-slot:title> <v-icon>mdi-plus</v-icon> 태그 추가 </template>

        <v-row class="mb-0 pa-0 ma-4" justify="center" align="center">
          <v-col cols="12" class="mt-2 mb-0" v-if="!isLoading">
            <v-text-field
              clearable
              label="태그 이름"
              v-model="tagName"
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

          <v-col cols="6" class="text-center" v-if="!isLoading">
            <v-btn color="primary" @click="create" block>생성</v-btn>
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
</template>

<script setup lang="ts">
const isOpen = ref(false)

const openDialog = () => {
  isOpen.value = true
}

const closeDialog = () => {
  isOpen.value = false
}

const tagName = ref('')

const rules = reactive({
  title_required: v => !!v || '제목을 입력해주세요',
  title_min: v => (v && v.length >= 2) || '제목을 2자 이상 입력해주세요',
  title_max: v => (v && v.length <= 100) || '제목은 최대 100자 까지 가능합니다.'
})

import { useAlertStore } from '~/stores/alert'

const alertStore = useAlertStore()

import { AlertType } from '~/types/components.d'

import { createTag } from '~/api/tag.api'
import { isTagResponse } from '~/types/tag-response.d'
const emit = defineEmits(['create'])
const isLoading = ref(false)
const create = async () => {
  if (!tagName.value) {
    alertStore.setMessage({
      message: '태그 이름을 입력해주세요.',
      type: AlertType.Error
    })
    return
  }

  if (tagName.value.length < 2) {
    alertStore.setMessage({
      message: '태그 이름은 3자 이상 입력해주세요.',
      type: AlertType.Error
    })
    return
  }

  if (tagName.value.length > 100) {
    alertStore.setMessage({
      message: '태그 이름은 100자 이하로 입력해주세요.',
      type: AlertType.Error
    })
    return
  }

  const tagReq = {
    name: tagName.value
  }

  isLoading.value = true

  const res = await createTag(tagReq)

  if (isTagResponse(res)) {
    alertStore.setMessage({
      message: '태그가 생성되었습니다.',
      type: AlertType.Success
    })
    tagName.value = ''
    closeDialog()
    isLoading.value = false

    emit('create')
  } else {
    alertStore.setMessage({
      message: '시리즈 생성에 실패했습니다.',
      type: AlertType.Error
    })
    isLoading.value = false
  }
}
</script>

<style scoped></style>
