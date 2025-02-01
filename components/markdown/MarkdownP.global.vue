<template>
  <v-col cols="12">
    <p class="text-body-1 main-font wrap-text"><MDCSlot unwrap="p" /></p>
  </v-col>
</template>

<style scoped>
.main-font {
  font-family: 'JetBrains Mono', 'D2Coding', monospace !important;
}
.wrap-text {
  white-space: normal !important;
  word-wrap: break-word !important;
}
</style>
<script setup lang="ts"></script>
