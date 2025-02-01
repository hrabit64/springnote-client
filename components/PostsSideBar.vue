<template>
  <v-navigation-drawer
    class="border-t-thin text-caption text-sidebar no-transition"
    permanent
    no-transition
    color="success"
    width="400"
  >
    <v-list density="compact" width="400">
      <v-list-item color="primary" value="1" @click="router.push('/')">
        <v-list-item-title class="i-text-body-2">
          <v-icon class="mr-2"> mdi-home </v-icon>
          <p class="d-inline">홈</p>
        </v-list-item-title>
      </v-list-item>
      <v-list-item color="primary" value="2" @click="router.push('/posts')">
        <v-list-item-title class="i-text-body-2">
          <v-icon class="mr-2"> mdi-note-multiple </v-icon>
          <p class="d-inline">전체 포스트</p>
        </v-list-item-title>
      </v-list-item>
    </v-list>
    <v-divider class="my-1" />
    <client-only>
      <SeriesFolder />
    </client-only>
    <v-spacer />
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const router = useRouter()
</script>

<style scoped></style>
