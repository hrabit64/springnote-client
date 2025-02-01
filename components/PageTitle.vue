<template>
  <v-system-bar window class="border-t-sm border-b-sm bg-success">
    <v-icon>mdi-bash</v-icon>
    <span class="ellipsis-text d2coding jetbrains-mono-bold"
      >&nbsp<v-html :content="title"></v-html>
    </span>

    <v-spacer></v-spacer>
  </v-system-bar>
</template>

<script setup lang="ts">
import { usePageTitleStore } from '~/stores/page-title'

const pageTitleStore = usePageTitleStore()

const { title } = storeToRefs(pageTitleStore)

const router = useRouter()
const goToHome = () => {
  router.push('/')
}
</script>

<style scoped>
.ellipsis-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
