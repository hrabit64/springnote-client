<template>
  <v-col cols="12">
    <p class="text-body-1 regular-font">
      <slot />
    </p>
  </v-col>
</template>

<style scoped>
.main-font {
  font-family: 'JetBrains Mono', 'D2Coding', monospace !important;
}
</style>
<script setup lang="ts"></script>
