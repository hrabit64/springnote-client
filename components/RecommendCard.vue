<template>
  <v-card class="text-center pa-2" color="success">
    <v-row>
      <v-col cols="12" md="6">
        <v-avatar size="128"> <v-img :src="`images/${src}`"></v-img> </v-avatar
      ></v-col>
      <v-col cols="12" md="6" class="pa-4">
        <h2 class="text-md-h4 text-h5 bold-font text-primary">
          {{ name }}
        </h2>
        <p class="text-md-body-2 text-body-2 bold-font my-1">
          {{ description }}
        </p>
      </v-col>
    </v-row>
    <template v-slot:prepend> </template>
    <template v-slot:title> </template>
    <template v-slot:subtitle> </template>
  </v-card>
</template>

<script lang="ts" setup>
const props = defineProps<{
  name: string
  src: string
  description: string
}>()
</script>

<style></style>
