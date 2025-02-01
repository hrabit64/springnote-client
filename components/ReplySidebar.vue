<template>
  <v-navigation-drawer
    class="no-transition fill-height bg-transparent reply-side-bar"
    border="false"
    floating
    v-model="replyOpen"
    width="1100"
    temporary
    location="right"
  >
    <WindowCard
      w="100%"
      v-if="replyOpen"
      @close="commentSidebarStore.replyToggle(-1)"
    >
      <template v-slot:title> <v-icon>mdi-reply</v-icon> Reply </template>
      <v-row>
        <v-col cols="12">
          <ReplyList />
        </v-col>
      </v-row>
    </WindowCard>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useCommentSidebarStore } from '~/stores/comment-sidebar'
const commentSidebarStore = useCommentSidebarStore()
const { replyOpen, replyTargetId } = storeToRefs(commentSidebarStore)

const route = useRoute()
</script>

<style scoped>
.reply-side-bar {
  z-index: 2;
}
</style>
