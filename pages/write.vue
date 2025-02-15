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

      <v-dialog
        v-model="checkSavedPost"
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
          <h3 class="text-h5 bold-font">
            <v-icon class="mr-2">mdi-square-edit-outline</v-icon>
            게시글 작성
          </h3>
        </v-col>

        <v-col cols="12" class="text-center">
          <v-text-field
            clearable
            v-model="title"
            label="제목"
            prepend-icon="mdi-text-short"
            variant="outlined"
            hint="3 ~ 300자"
            count="300"
            :rules="[rules.required, rules.min, rules.max]"
            no-resize
          >
          </v-text-field>
        </v-col>

        <v-col cols="12" class="text-center">
          <v-combobox
            v-model="tags"
            label="태그"
            variant="outlined"
            hide-selected
            prepend-icon="mdi-tag-text"
            multiple
            readonly
          >
            <template v-slot:selection="{ item, index }">
              <v-chip
                :text="item.value"
                size="small"
                variant="flat"
                closable
                label
                @click:close="removeTag(index)"
              ></v-chip>
            </template>
          </v-combobox>
          <TagSelectDialog @select="selectTag" />
        </v-col>

        <v-col cols="12" class="text-center">
          <v-text-field
            v-model="series.value"
            label="시리즈"
            prepend-icon="mdi-folder-file"
            variant="outlined"
            no-resize
            readonly
          >
          </v-text-field>
          <SeriesSelectDialog v-model="series" />
        </v-col>

        <v-col cols="12">
          <v-col cols="12" class="mt-2 mb-0 text-center">
            <ImageUploadCard @upload="addThumbnail" v-if="!thumbnail" />
            <v-text-field
              v-model="thumbnail"
              v-if="thumbnail"
              label="썸네일"
              readonly
              prepend-icon="mdi-image"
              class="regular-font"
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
            >
              <v-icon>mdi-restore</v-icon>
            </v-btn
            >
          </v-col>
        </v-col>

        <v-col cols="12">
          <v-btn icon>
            <v-icon @click="fullScreen = true">mdi-fullscreen</v-icon>
          </v-btn>
          <MarkdownEditor v-model="content" />
        </v-col>
        <v-col cols="12">
          <v-icon>mdi-timer-outline</v-icon>
          : {{ lastSaved }}
          <v-icon>mdi-identifier</v-icon>
          :
          {{ tmpPostId }}
          <v-progress-circular
            v-if="isSaving"
            indeterminate
            :size="16"
          ></v-progress-circular>
        </v-col>
        <v-col cols="6">
          <v-btn color="error" block @click="openRemoveCheckDialog"
          >
            <v-icon>mdi-remove</v-icon>
            임시저장글 삭제
          </v-btn
          >
          <!-- check dialog -->
          <v-dialog
            v-model="removeCheckDialog"
            persistent
            max-width="290"
            v-if="removeCheckDialog"
            fullscreen
          >
            <WindowCard
              w="100%"
              @close="closeRemoveCheckDialog"
              @minus="closeRemoveCheckDialog"
              @split="closeRemoveCheckDialog"
            >
              <template v-slot:title>
                <v-icon>mdi-alert</v-icon>
                삭제 확인
              </template>
              <v-row class="mb-0 pa-0 ma-4" justify="center" align="center">
                <v-col cols="12" class="mt-2 mb-0">
                  <p class="text-h5 text-center bold-font text-primary">
                    정말 임시 저장된 글을 삭제하시겠습니까?
                  </p>
                </v-col>
                <v-col cols="6" class="text-center">
                  <v-btn
                    class="bold-font"
                    color="error"
                    @click="removeTmpPost"
                    block
                  >삭제
                  </v-btn
                  >
                </v-col>
                <v-col cols="6" class="text-center">
                  <v-btn class="bold-font" @click="closeRemoveCheckDialog" block
                  >취소
                  </v-btn
                  >
                </v-col>
              </v-row>
            </WindowCard>
          </v-dialog>
        </v-col>
        <v-col cols="6">
          <v-btn block @click.stop="openPublishDialog"
          >
            <v-icon>mdi-plus</v-icon>
            포스트 등록
          </v-btn
          >
          <v-dialog
            v-model="isPublishDialog"
            persistent
            max-width="290"
            fullscreen
          >
            <WindowCard
              w="100%"
              @close="closePublishDialog"
              @minus="closePublishDialog"
              @split="closePublishDialog"
            >
              <template v-slot:title>
                <v-icon>mdi-alert</v-icon>
                등록 확인
              </template>
              <v-row class="mb-0 pa-0 ma-4" justify="center" align="center">
                <v-col cols="12" class="mt-2 mb-0">
                  <p class="text-h5 text-center bold-font text-primary">
                    정말 해당 글을 등록하시겠습니까?
                  </p>
                </v-col>
                <v-col cols="6" class="text-center">
                  <v-btn
                    class="bold-font"
                    color="primary"
                    @click="publishPost"
                    block
                  >등록
                  </v-btn
                  >
                </v-col>
                <v-col cols="6" class="text-center">
                  <v-btn
                    class="bold-font"
                    color="error"
                    @click="closePublishDialog"
                    block
                  >취소
                  </v-btn
                  >
                </v-col>
              </v-row>
            </WindowCard>
          </v-dialog>
        </v-col>
      </v-row>
      <v-dialog
        v-model="fullScreen"
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
            <v-col cols="12">
              <MarkdownEditor v-model="content" />

            </v-col>
            <v-col cols="12">
              <v-icon>mdi-timer-outline</v-icon>
              : {{ lastSaved }}
              <v-icon>mdi-identifier</v-icon>
              :
              {{ tmpPostId }}
              <v-progress-circular
                v-if="isSaving"
                indeterminate
                :size="16"
              ></v-progress-circular>
              <v-btn icon>
                <v-icon @click="fullScreen = false">mdi-fullscreen-exit</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-container>
  </client-only>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'editor'
})

// check permission
const permissionCheck = ref(true)

import { useUserStore } from '~/stores/user'
import { useAlertStore } from '~/stores/alert'
import { AlertType } from '~/types/components.d'

// markdown editor
// remove
import { createTmpPost, deleteTmpPost, getRecentTmpPosts, publishTmpPost, updateTmpPost } from '~/api/tmp-post.api'
import type { TmpPostRequest } from '~/types/tmp-post-request'
import { isPagedTmpPostResponse, isTmpPostResponse } from '~/types/tmp-post-response.d'

import { isPostResponse } from '~/types/post-response.d'

const userStore = useUserStore()
const { isAdmin } = storeToRefs(userStore)

const router = useRouter()

const alertStore = useAlertStore()

const content = ref('본문을 입력해주세요')

const title = ref('')
const tags = ref<Keyval[]>([])

const selectTag = (tag: Keyval) => {
  // check if tag already exists
  if (tags.value.find(t => t.key === tag.key)) {
    alertStore.setMessage({
      type: AlertType.INFO,
      message: '이미 추가된 태그입니다.'
    })
    return
  }

  if (tags.value.length >= 5) {
    alertStore.setMessage({
      type: AlertType.INFO,
      message: '태그는 최대 5개까지 추가할 수 있습니다.'
    })
    return
  }
  tags.value.push(tag)
  console.log(tags.value)
}

const removeTag = (index: number) => {
  tags.value.splice(index, 1)
  console.log(tags.value)
}
//썸네일
const thumbnail = ref('')
const runtimeConfig = useRuntimeConfig()
const baseUrl = runtimeConfig.public.baseImgUrl

const addThumbnail = (uploadedThumbnail: ImageResponse) => {
  thumbnail.value = uploadedThumbnail.file_id + '.webp'
}

const series = ref<Keyval>({ key: '', value: '' })

const rules = {
  required: (v: string) => !!v || '필수 입력 항목입니다.',
  min: (v: string) => v.length >= 3 || '최소 3자 이상 입력해주세요.',
  max: (v: string) => v.length <= 300 || '최대 300자 이하로 입력해주세요.'
}

// tmp post system
const checkSavedPost = ref(true)
const tmpPostId = ref('')
const lastSaved = ref('')

const isSaving = ref(false)

const saveTmpPost = async () => {
  if (isSaving.value) {
    return
  }

  const req: TmpPostRequest = {
    title: title.value,
    tag_ids: tags.value.map(t => t.key),
    series_id: series.value.key,
    content: content.value,
    post_type_id: 1,
    thumbnail: thumbnail.value === '' ? null : `${baseUrl}/${thumbnail.value}`
  }

  isSaving.value = true

  if (tmpPostId.value === '') {
    createAutoTmpPost(req)
  } else {
    updateAutoTmpPost(req)
  }
}

const createAutoTmpPost = async (req: TmpPostRequest) => {
  createTmpPost(req).then(res => {
    if (isTmpPostResponse(res)) {
      tmpPostId.value = res.id
      lastSaved.value = res.last_updated_at
    } else {
      alertStore.setMessage({
        type: AlertType.Error,
        message:
          '임시 저장에 실패했습니다. 작성중인 데이터가 손실될 수 있습니다.'
      })
    }
    isSaving.value = false
  })
}

const updateAutoTmpPost = async (req: TmpPostRequest) => {
  updateTmpPost(tmpPostId.value, req).then(res => {
    if (isTmpPostResponse(res)) {
      lastSaved.value = res.last_updated_at
    } else {
      alertStore.setMessage({
        type: AlertType.Error,
        message:
          '임시 저장에 실패했습니다. 작성중인 데이터가 손실될 수 있습니다.'
      })
    }
    isSaving.value = false
  })
}

const handleSave = event => {
  if ((event.ctrlKey || event.metaKey) && event.key === 's') {
    event.preventDefault()
    saveTmpPost()
  }
}

let autoSaveInterval

onMounted(async () => {
  if (isAdmin.value) {
    permissionCheck.value = false
  } else {
    router.push('/')
  }

  getRecentTmpPosts(1).then(res => {
    if (isPagedTmpPostResponse(res) && res.page.totalElements > 0) {
      tmpPostId.value = res._embedded.tmp_posts[0].id
      lastSaved.value = res._embedded.tmp_posts[0].created_at
      title.value = res._embedded.tmp_posts[0].title
      console.log(res._embedded.tmp_posts[0].thumbnail)
      thumbnail.value = res._embedded.tmp_posts[0].thumbnail
        ? res._embedded.tmp_posts[0].thumbnail?.split('/').pop()
        : ''

      if (res._embedded.tmp_posts[0].tags.length > 0) {
        res._embedded.tmp_posts[0].tags.forEach(t => {
          tags.value.push({ key: t.id, value: t.name })
        })
      }
      if (res._embedded.tmp_posts[0].series) {
        series.value = {
          key: res._embedded.tmp_posts[0].series.id,
          value: res._embedded.tmp_posts[0].series.name
        }
      }

      content.value = res._embedded.tmp_posts[0].content

      alertStore.setMessage({
        type: AlertType.INFO,
        message: `${lastSaved.value} 작성중인 글이 복구되었습니다.`
      })
    } else if (isPagedTmpPostResponse(res)) {
      console.log('no tmp post')
    }
    checkSavedPost.value = false
    window.addEventListener('keydown', handleSave)
    autoSaveInterval = setInterval(saveTmpPost, 10000)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleSave)
  clearInterval(autoSaveInterval)
})

const removeCheckDialog = ref(false)
const openRemoveCheckDialog = () => {
  removeCheckDialog.value = true
}
const closeRemoveCheckDialog = () => {
  removeCheckDialog.value = false
}
const removeTmpPost = async () => {
  isSaving.value = true
  deleteTmpPost(tmpPostId.value).then(res => {
    if (res) {
      tmpPostId.value = ''
      lastSaved.value = ''
      title.value = ''
      tags.value = []
      series.value = { key: '', value: '' }
      content.value = ''
      thumbnail.value = ''

      alertStore.setMessage({
        type: AlertType.Info,
        message: '임시 저장된 글이 삭제되었습니다.'
      })
    } else {
      alertStore.setMessage({
        type: AlertType.Error,
        message: '임시 저장된 글 삭제에 실패했습니다.'
      })
    }
    isSaving.value = false
    closeRemoveCheckDialog()
  })
}

//publish
const isPublishDialog = ref(false)
const openPublishDialog = () => {
  isPublishDialog.value = true
}
const closePublishDialog = () => {
  isPublishDialog.value = false
}

const publishPost = async () => {
  if (isSaving.value) {
    return
  }
  //check

  if (title.value === '') {
    alertStore.setMessage({
      type: AlertType.Error,
      message: '제목을 입력해주세요.'
    })
    closePublishDialog()
    return
  }
  if (title.value.length < 3) {
    alertStore.setMessage({
      type: AlertType.Error,
      message: '제목은 최소 3자 이상 입력해주세요.'
    })
    closePublishDialog()
    return
  }
  if (title.value.length > 300) {
    alertStore.setMessage({
      type: AlertType.Error,
      message: '제목은 최대 300자 이하로 입력해주세요.'
    })
    closePublishDialog()
    return
  }
  if (tags.value.length > 5) {
    alertStore.setMessage({
      type: AlertType.Error,
      message: '태그는 최대 5개까지 추가할 수 있습니다.'
    })
    closePublishDialog()
    return
  }
  if (series.value.key === '') {
    alertStore.setMessage({
      type: AlertType.Error,
      message: '시리즈를 선택해주세요.'
    })
    closePublishDialog()
    return
  }
  if (content.value === '') {
    alertStore.setMessage({
      type: AlertType.Error,
      message: '본문을 입력해주세요.'
    })
    closePublishDialog()
    return
  }
  if (thumbnail.value === '') {
    alertStore.setMessage({
      type: AlertType.Error,
      message: '썸네일을 업로드해주세요.'
    })
    closePublishDialog()
    return
  }

  isSaving.value = true
  await saveTmpPost()
  publishTmpPost(tmpPostId.value).then(res => {
    if (isPostResponse(res)) {
      alertStore.setMessage({
        type: AlertType.Success,
        message: '포스트가 성공적으로 등록되었습니다.'
      })
      router.push(`/post/${res.id}`)
    } else {
      alertStore.setMessage({
        type: AlertType.Error,
        message: '포스트 등록에 실패했습니다.'
      })
    }
    isSaving.value = false
  })
}


const fullScreen = ref(false)
</script>

<style></style>
