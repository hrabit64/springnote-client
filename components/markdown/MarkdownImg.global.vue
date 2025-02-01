<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
    default: undefined
  }
})
</script>

<template>
  <client-only>
    <v-col cols="12" class="justify-center text-center d-flex">
      <v-img :src="src + '?width=720'" :alt="alt" cover />
    </v-col>
  </client-only>
</template>

<style scoped></style>
