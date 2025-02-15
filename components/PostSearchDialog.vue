<template>
  <v-dialog width="100%" height="100%" v-model="isOpen" class="bg-success">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn small icon class="mx-1" @click="openSearchDialog">
        <v-icon color="primary">mdi-magnify</v-icon>
        <v-tooltip activator="parent" location="bottom"> Search</v-tooltip>
      </v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <WindowCard
        w="100%"
        @close="closeSearchDialog"
        @minus="closeSearchDialog"
        @split="closeSearchDialog"
      >
        <template v-slot:title>
          <v-icon>mdi-magnify</v-icon>
          포스트 검색
        </template>
        <v-card-title class="bg-success">
          <v-row class="mb-0 pa-0">
            <v-col cols="12" class="mt-2 mb-0">
              <v-text-field
                clearable
                label="검색어"
                v-model="searchKeyword"
                :rules="[rules.required, rules.min, rules.max]"
                variant="outlined"
                class="regular-font"
                hint="2 ~ 20자"
              >
                <template v-slot:prepend>
                  <v-icon>mdi-magnify</v-icon>
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="12" class="text-center my-0 pa-0">
              <v-divider class="my-0" />
            </v-col>

            <v-col
              v-if="isLoading"
              cols="12"
              class="text-center bold-font"
            >
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
            <v-col
              cols="12"
              class="text-center bold-font mt-5"
              v-if="searchedPost.length === 0 && !isLoading"
            >
              <v-icon>mdi-duck</v-icon>
              <v-icon>mdi-duck</v-icon>
              <v-icon>mdi-duck</v-icon>
              <p>검색결과가 없습니다.</p>
            </v-col>
          </v-row>
        </v-card-title>


        <v-virtual-scroll
          :items="searchedPost"
          item-height="50"
          :id="searchUid"
          class="bg-success"
        >
          <template v-slot:default="{ item }">
            <v-list-item class="my-1 mx-2" hover @click="goToPost(item.id)">
              <span
                class="text-subtitle-2 regular-font text-primary"
              >
                시리즈 | {{ item.series?.name || '시리즈 없음' }}</span
              >
              <p class="text-body-2 regular-font">
                {{ item.title }}
              </p>
            </v-list-item>
          </template>
        </v-virtual-scroll>
        <v-pagination class="bg-success" :length="totalPage" v-model="selectPage"></v-pagination>
      </WindowCard>


    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import type { PostCardItem } from '~/types/components'
import { getPostsWithKeyword } from '~/api/post.api'
import { isPagePostSimpleResponse } from '~/types/response.d'
import { v4 } from 'uuid'

const isOpen = ref(false)

const openSearchDialog = () => {
  isOpen.value = true
}

const closeSearchDialog = () => {
  isOpen.value = false
}

const searchMode = ref('제목+본문')
const searchKeyword = ref('')

const rules = reactive({
  required: v => !!v || '검색할 내용을 입력해주세요',
  min: v => (v && v.length >= 2) || '2자 이상 입력해주세요',
  max: v => (v && v.length <= 20) || '최대 20자 까지 가능합니다.'
})

const searchedPost = ref<PostCardItem[]>([])

const selectPage = ref(1)
const totalPage = ref(0)
const isLoading = ref(false)

const loadPost = async (page: number) => {
  isLoading.value = true
  let type

  if (searchMode.value === '제목') {
    type = 'TITLE'
  } else if (searchMode.value === '본문') {
    type = 'CONTENT'
  } else {
    type = 'MIX'
  }
  searchedPost.value = []
  const posts = await getPostsWithKeyword(
    page,
    10,
    'createdDate',
    searchKeyword.value,
    type,
    'desc'
  )

  if (isPagePostSimpleResponse(posts)) {
    totalPage.value = posts.page.totalPages

    posts._embedded.posts.forEach(post => {
      searchedPost.value.push({
        id: post.id,
        title: post.title,
        created_at: post.created_at,
        series: post.series
          ? {
            id: post.series.id,
            name: post.series.name
          }
          : null,
        thumbnail: post.thumbnail,
        tags: post.tags.map(tag => {
          return {
            id: tag.id,
            name: tag.name
          }
        })
      })
    })
  }

  searchUid.value = v4()
  isLoading.value = false
}
let lastSearchKeyword = ''
let lastSearchMode = ''

const searchUid = ref('')

const searchPost = async () => {
  if (
    (searchKeyword.value.trim() !== lastSearchKeyword ||
      searchMode.value !== lastSearchMode) &&
    searchKeyword.value.length >= 2 &&
    searchKeyword.value.length <= 20
  ) {
    lastSearchKeyword = searchKeyword.value.trim()
    lastSearchMode = searchMode.value
    await loadPost(0)
  }
}

let updateInterval = null
// 검색창 열리면, 0.5초마다 검색
watch(isOpen, (newIsOpen, oldIsOpen) => {
  if (newIsOpen) {
    updateInterval = setInterval(searchPost, 850)
  }

  if (!newIsOpen) {
    clearInterval(updateInterval)
  }
})

// 20자 이상 입력 방지
watch(searchKeyword, async (newSearchKeyword, oldSearchKeyword) => {
  if (newSearchKeyword.length > 20) {
    searchKeyword.value = oldSearchKeyword
  }
})

// 검색 모드 변경 시 검색
watch(searchMode, async (newSearchMode, oldSearchMode) => {
  if (newSearchMode !== oldSearchMode) {
    await searchPost()
  }
})

watch(selectPage, async (newPage, oldPage) => {
  if (newPage !== oldPage) {
    await loadPost(newPage - 1)
  }
})

const router = useRouter()
const goToPost = (postId: number) => {
  router.push(`/post/${postId}`)
}
</script>

<style scoped></style>
