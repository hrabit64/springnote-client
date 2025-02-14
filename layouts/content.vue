<template>
  <v-app class="main-font bg-success">
    <MainAppBar />
    <SideBar />

    <client-only>
      <ReplySidebar />
      <CommentSidebar />
    </client-only>

    <client-only>
      <LoginManager />
    </client-only>

    <v-main>

      <slot></slot>
      <MainFooter />
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
import MainFooter from '~/components/MainFooter.vue'

const commentSidebarStore = useCommentSidebarStore()
const { mobile } = useDisplay()
const goTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style>

.v-main {
  padding-top: 64px;
}

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


</style>
<style scoped></style>
