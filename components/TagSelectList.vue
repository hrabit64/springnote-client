<template>
  <v-dialog width="100%" height="100%" v-model="removeDialog">
    <template v-slot:default="{ isActive }">
      <WindowCard
        w="100%"
        @close="closeRemoveDialog"
        @minus="closeRemoveDialog"
        @split="closeRemoveDialog"
      >
        <template v-slot:title> <v-icon>mdi-check</v-icon> 삭제 확인 </template>

        <v-row class="mb-0 pa-0 ma-4" justify="center" align="center">
          <v-col cols="12" class="mt-2 mb-0">
            <p class="text-h5 text-center bold-font text-primary">
              정말 태그를 삭제하시겠습니까?
            </p>
          </v-col>
          <v-col cols="6" class="text-center">
            <v-btn color="error" class="bold-font" block @click.stop="remove"
              >삭제</v-btn
            >
          </v-col>
          <v-col cols="6" class="text-center">
            <v-btn
              color="secondary"
              @click.stop="closeRemoveDialog"
              class="bold-font"
              block
              >취소</v-btn
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
  <v-infinite-scroll
    :items="tagList"
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
        <tr v-for="tag in tagList" :key="tag.id">
          <td class="py-2">
            <v-row class="d2Coding jetbrains-mono-bold text-body-2">
              <v-col
                cols="10"
                v-if="editTagId !== tag.id"
                @click.stop="select(tag)"
              >
                {{ tag.name }}</v-col
              >
              <v-col cols="10" v-if="editTagId === tag.id">
                <v-text-field
                  clearable
                  variant="outlined"
                  class="d2coding jetbrains-mono-regular"
                  hint="최대 100자"
                  counter="100"
                  label="태그 수정"
                  v-model="editTag"
                  :rules="[rules.required, rules.min, rules.max]"
                >
                </v-text-field>
                <v-btn
                  color="primary"
                  small
                  icon
                  density="compact"
                  block
                  @click.stop="update"
                >
                  <v-icon>mdi-check</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="1">
                <v-btn
                  color="red"
                  small
                  icon
                  density="compact"
                  @click="openRemoveDialog(tag.id)"
                >
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="1" v-if="editTagId !== tag.id">
                <v-btn
                  color="primary"
                  small
                  icon
                  density="compact"
                  @click="openEdit(tag.id, tag.name)"
                >
                  <v-icon>mdi-cog</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="1" v-if="editTagId === tag.id">
                <v-btn
                  color="gray"
                  small
                  icon
                  density="compact"
                  @click="openEdit(tag.id, tag.name)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
              <v-col
                cols="12"
                class="mx-auto text-center"
                v-if="isLoading && editTagId === tag.id"
              >
                <v-progress-circular
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </v-col>
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

    <template v-slot:empty> </template>
  </v-infinite-scroll>
</template>
<script setup lang="ts">
import type { TagResponse } from '~/types/tag-response'
import { isPagedTagResponse } from '~/types/tag-response.d'
import { getTags } from '~/api/tag.api'

import { v4 } from 'uuid'
const key = ref(v4())

const tagList = ref<TagResponse[]>([])
let page = 0
let isLast = false

const refresh = () => {
  key.value = v4()
  tagList.value = []
  page = 0
  isLast = false
}

const fetchTags = async () => {
  const result = await getTags(page, 20, 'id', 'desc')

  if (isPagedTagResponse(result)) {
    result._embedded.tags.forEach(s1 => {
      tagList.value.push(s1)
    })

    if (result.page.totalPages === result.page.number) {
      isLast = true
    }

    page = result.page.number + 1
  } else {
    console.error('Failed to get tag')
    isLast = true
  }
}

async function load({ done }) {
  if (isLast) {
    done('empty')
  } else {
    await fetchTags()
    done('ok')
  }
}

const router = useRouter()

import type { KeyVal } from '~/types/components'

const emit = defineEmits(['select'])

const select = (tag: TagResponse) => {
  const item: KeyVal = { key: tag.id, value: tag.name }
  emit('select', item)
}

const isLoading = ref(false)
const rules = reactive({
  required: v => !!v || '내용을 입력해주세요.',
  min: v => (v && v.length >= 2) || '2자 이상 입력해주세요',
  max: v => (v && v.length <= 100) || '최대 100자 까지 가능합니다.'
})
import { useAlertStore } from '~/stores/alert'

const alertStore = useAlertStore()

import { AlertType } from '~/types/components.d'

const editTagId = ref(-1)
const editTag = ref('')
const openEdit = (tagId: number, tagName: string) => {
  if (editTagId.value === tagId) {
    editTagId.value = -1
    editTag.value = ''
  } else {
    editTagId.value = tagId
    editTag.value = tagName
  }
}
import { updateTag } from '~/api/tag.api'
import { isTagResponse } from '~/types/tag-response.d'
const update = async () => {
  isLoading.value = true
  const res = await updateTag(editTagId.value, { name: editTag.value })
  if (isTagResponse(res)) {
    alertStore.setMessage({
      message: '태그가 수정되었습니다.',
      type: AlertType.Success
    })
  } else {
    alertStore.setMessage({
      message: '태그 수정에 실패했습니다.',
      type: AlertType.Error
    })
  }
  isLoading.value = false
  editTagId.value = -1
  editTag.value = ''
  refresh()
}

// remove
const removeDialog = ref(false)
const removeTarget = ref(-1)

const openRemoveDialog = (target: number) => {
  console.log('openRemoveDialog', target)
  removeTarget.value = target
  removeDialog.value = true
}

const closeRemoveDialog = () => {
  removeDialog.value = false
  removeTarget.value = -1
}

import { deleteTag } from '~/api/tag.api'
const remove = async () => {
  isLoading.value = true
  const res = await deleteTag(removeTarget.value)
  closeRemoveDialog()
  if (res) {
    alertStore.setMessage({
      message: '태그가 삭제되었습니다.',
      type: AlertType.Success
    })
  } else {
    alertStore.setMessage({
      message: '태그 삭제에 실패했습니다.',
      type: AlertType.Error
    })
  }
  isLoading.value = false
  refresh()
}
</script>
<style scoped>
/* width */
::-webkit-scrollbar {
  width: 0px;
}

.dynamic-card {
  height: 75vh;
}
</style>
