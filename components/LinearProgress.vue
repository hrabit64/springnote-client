<template>
  <v-progress-linear color="primary" indeterminate rounded />
  <p>{{ text }}</p>
</template>
<script setup lang="ts">
const props = defineProps<{
  text: string
}>()
</script>
<style scoped></style>
