<template>
  <v-app class="main-font bg-success">
    <client-only>
      <MainAppBar />
      <SideBar />
      <ReplySidebar />
      <CommentSidebar />
    </client-only>
    <v-main>
      <client-only>
        <LoginManager />
      </client-only>

      <slot></slot>
    </v-main>
    <client-only>
      <v-fab
        color="primary"
        icon="mdi-comment"
        class="mr-2 mb-2 pa-4"
        location="bottom end"
        :size="mobile ? 48 : 64"
        slim
        layout
        app
        @click.stop="commentSidebarStore.listToggle"
      ></v-fab>
      <v-fab
        color="primary"
        icon="mdi-arrow-up"
        class="mr-2 mb-2 pa-4 rounded-xl"
        location="bottom end"
        :size="mobile ? 48 : 64"
        slim
        layout
        app
        v-if="mobile"
        @click.stop="goTop"
      ></v-fab>
    </client-only>
  </v-app>
  <client-only>
    <AlertSnackBar />
  </client-only>
</template>
<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { useCommentSidebarStore } from '~/stores/comment-sidebar'
const commentSidebarStore = useCommentSidebarStore()
const { mobile } = useDisplay()
const goTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style>
.main-font {
  font-family: 'JetBrains Mono', 'D2Coding', monospace !important;
}
/* width */
::-webkit-scrollbar {
  width: 3px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #222222;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(55, 55, 55);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.no-transition {
  transition: none !important;
}

.wrap-text {
  white-space: normal !important;
  word-wrap: break-word !important;
}
</style>
<style scoped></style>
