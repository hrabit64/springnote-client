<template>
  <v-navigation-drawer
    class="no-transition fill-height comment-side-bar bg-transparent"
    border="false"
    floating
    v-model="listOpen"
    width="1000"
    temporary
    location="right"
  >
    <WindowCard
      w="100%"
      v-if="listOpen"
      class="bg-success"
      @close="commentSidebarStore.listToggle()"
      @minus="commentSidebarStore.listToggle()"
      @split="commentSidebarStore.listToggle()"
    >
      <template v-slot:title>
        <v-icon>mdi-comment</v-icon>
        Comments
      </template>
      <v-row>
        <v-col cols="12">
          <CommentList :post_id="targetPostId" />
        </v-col>
      </v-row>
    </WindowCard>
  </v-navigation-drawer>

</template>

<script lang="ts" setup>
import { useCommentSidebarStore } from '~/stores/comment-sidebar'

const commentSidebarStore = useCommentSidebarStore()
const { listOpen, targetPostId } = storeToRefs(commentSidebarStore)
const { mobile } = useDisplay()
const route = useRoute()
</script>

<style scoped>
.comment-side-bar {
  z-index: -1;
}
</style>
