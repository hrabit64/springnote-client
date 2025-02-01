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
          <h3 class="text-h5 bold-font">
            <v-icon class="mr-2">mdi-square-edit-outline</v-icon>게시글 수정
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
              class="d2coding jetbrains-mono-regular"
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
        </v-col>

        <v-col cols="12">
          <MarkdownEditor v-model="content" />
        </v-col>

        <v-col cols="6">
          <v-btn color="error" block @click="openRemoveCheckDialog"
            ><v-icon>mdi-remove</v-icon>삭제</v-btn
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
                <v-icon>mdi-alert</v-icon> 삭제 확인
              </template>
              <v-row class="mb-0 pa-0 ma-4" justify="center" align="center">
                <v-col cols="12" class="mt-2 mb-0">
                  <p class="text-h5 text-center bold-font text-primary">
                    정말 임시 저장된 글을 삭제하시겠습니까?
                  </p>
                </v-col>
                <v-col cols="6" class="text-center">
                  <v-btn class="bold-font" color="error" @click="remove" block
                    >삭제</v-btn
                  >
                </v-col>
                <v-col cols="6" class="text-center">
                  <v-btn class="bold-font" @click="closeRemoveCheckDialog" block
                    >취소</v-btn
                  >
                </v-col>
              </v-row>
            </WindowCard>
          </v-dialog>
        </v-col>
        <v-col cols="6">
          <v-btn block @click.stop="openPublishDialog"
            ><v-icon>mdi-plus</v-icon>포스트 등록</v-btn
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
                <v-icon>mdi-alert</v-icon> 등록 확인
              </template>
              <v-row class="mb-0 pa-0 ma-4" justify="center" align="center">
                <v-col cols="12" class="mt-2 mb-0">
                  <p class="text-h5 text-center bold-font text-primary">
                    정말 해당 글을 등록하시겠습니까?
                  </p>
                </v-col>
                <v-col cols="6" class="text-center">
                  <v-btn class="bold-font" color="primary" @click="update" block
                    >등록</v-btn
                  >
                </v-col>
                <v-col cols="6" class="text-center">
                  <v-btn
                    class="bold-font"
                    color="error"
                    @click="closePublishDialog"
                    block
                    >취소</v-btn
                  >
                </v-col>
              </v-row>
            </WindowCard>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </client-only>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'editor'
})
const route = useRoute()
const postId = route.params.id
import { isPostDetailResponse } from '~/types/post-response.d'

import type { PostDetailResponse } from '~/types/post-response'
const content = ref('본문을 입력해주세요')
const title = ref('')
const tags = ref<Keyval[]>([])
const thumbnail = ref('')
const series = ref<Keyval>({ key: '', value: '' })
import { getPost } from '~/api/post.api'

const post: PostDetailResponse = await getPost(Number(postId)).then(res => {
  if (isPostDetailResponse(res)) {
    return res
  } else {
    throw showError({
      statusCode: 404,
      fatal: true,
      message: '해당 포스트가 없습니다.'
    })
  }
})

// check permission
const permissionCheck = ref(true)

import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const { isAdmin } = storeToRefs(userStore)

onMounted(async () => {
  if (isAdmin.value) {
    permissionCheck.value = false
  } else {
    router.push('/')
  }

  title.value = post.title
  content.value = post.content.editor_text
  tags.value = post.tags.map(tag => {
    return { key: tag.id.toString(), value: tag.name }
  })
  thumbnail.value = post.thumbnail.split('/').pop()
  if (post.series) {
    series.value = {
      key: post.series.id.toString(),
      value: post.series.name
    }
  }
})

import { useAlertStore } from '~/stores/alert'

const alertStore = useAlertStore()

import { AlertType } from '~/types/components.d'

//

// markdown editor
import type { KeyVal } from '~/types/components'

const selectTag = (tag: Keyval) => {
  // check if tag already exists
  if (tags.value.find(t => t.key === tag.key)) {
    alertStore.setMessage({
      type: AlertType.Info,
      message: '이미 추가된 태그입니다.'
    })
    return
  }

  if (tags.value.length >= 5) {
    alertStore.setMessage({
      type: AlertType.Info,
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

const runtimeConfig = useRuntimeConfig()
const baseUrl = runtimeConfig.public.baseImgUrl

const addThumbnail = (uploadedThumbnail: ImageResponse) => {
  thumbnail.value = uploadedThumbnail.file_id + '.webp'
}

const rules = {
  required: (v: string) => !!v || '필수 입력 항목입니다.',
  min: (v: string) => v.length >= 3 || '최소 3자 이상 입력해주세요.',
  max: (v: string) => v.length <= 300 || '최대 300자 이하로 입력해주세요.'
}

const router = useRouter()

// remove
import { deletePost } from '~/api/post.api'

const removeCheckDialog = ref(false)
const openRemoveCheckDialog = () => {
  removeCheckDialog.value = true
}
const closeRemoveCheckDialog = () => {
  removeCheckDialog.value = false
}

const remove = async () => {
  const res = await deletePost(Number(postId))
  if (res) {
    alertStore.setMessage({
      type: AlertType.Info,
      message: '포스트가 성공적으로 삭제되었습니다.'
    })
    router.push('/')
  } else {
    alertStore.setMessage({
      type: AlertType.Error,
      message: '포스트 삭제에 실패했습니다.'
    })
  }
}

//publish

import { updatePost } from '~/api/post.api'
const isPublishDialog = ref(false)
const openPublishDialog = () => {
  isPublishDialog.value = true
}
const closePublishDialog = () => {
  isPublishDialog.value = false
}
const update = async () => {
  const res = await updatePost(Number(postId), {
    title: title.value,
    content: content.value,
    enabled: true,
    tags: tags.value.map(tag => Number(tag.key)),
    thumbnail: `${baseUrl}/${thumbnail.value}`,
    series_id: series.value.key ? Number(series.value.key) : null
  })
  if (isPostDetailResponse(res)) {
    alertStore.setMessage({
      type: AlertType.Info,
      message: '포스트가 성공적으로 등록되었습니다.'
    })
    router.push(`/post/${res.id}`)
  } else {
    alertStore.setMessage({
      type: AlertType.Error,
      message: '포스트 등록에 실패했습니다.'
    })
  }
}
</script>

<style></style>
