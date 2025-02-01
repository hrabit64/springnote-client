<template>
  <v-app class="main-font bg-success">
    <MainAppBar />
    <v-main>
      <client-only>
        <LoginManager />
      </client-only>

      <slot></slot>
    </v-main>
  </v-app>
  <client-only>
    <AlertSnackBar />
  </client-only>
</template>
<script setup lang="ts">
import { useCommentSidebarStore } from '~/stores/comment-sidebar'
const commentSidebarStore = useCommentSidebarStore()
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
