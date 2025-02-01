<template>
  <v-col cols="12">
    <v-card
      width="100%"
      class="elevation-0 py-4 text-sutbile-1 bold-font"
      color="secondary"
      variant="outlined"
    >
      <p class="text-left ml-5"><v-icon>mdi-format-quote-open</v-icon></p>
      <p class="text-center"><MDCSlot unwrap="blockquote" /></p>
      <p class="text-right mr-5"><v-icon>mdi-format-quote-close</v-icon></p>
    </v-card>
  </v-col>
</template>

<style scoped></style>
<script setup lang="ts"></script>
