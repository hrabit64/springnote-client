<template>
  <v-navigation-drawer
    class="border-t-thin text-center no-transition"
    permanent
    color="success"
    width="80"
    v-if="!mobile"
  >
    <v-list class="my-1" width="80">
      <v-list-item class="my-1">
        <v-btn
          icon="mdi-github"
          variant="text"
          color="fffff"
          @click.stop="goGithub"
        />
        <v-tooltip activator="parent" location="bottom"> Github </v-tooltip>
      </v-list-item>
      <v-list-item class="my-1">
        <v-btn icon="mdi-coffee" variant="text" color="lime-accent-1" />
        <v-tooltip activator="parent" location="bottom">
          Buy Me a Coffee
        </v-tooltip>
      </v-list-item>
      <v-list-item class="my-1">
        <v-btn icon="mdi-account-tie" variant="text" />
        <v-tooltip activator="parent" location="bottom"> About Me </v-tooltip>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const goGithub = () => {
  window.open('https://github.com/hrabit64', '_blank')
}

import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
</script>

<style scoped></style>
