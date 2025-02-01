<template>
  <v-card :width="w" elevation="0" height="100%">
    <v-card-title class="text-right py-0 my-0">
      <v-row>
        <v-col cols="6">
          <p class="py-2 text-left bold-font text-body-2 text-primary">
            <slot name="title">{{ title }}</slot>
          </p>
        </v-col>
        <v-col cols="6">
          <v-btn
            class="mx-2"
            icon="mdi-minus"
            variant="text"
            density="compact"
            size="x-small"
            @click.stop="minus"
          ></v-btn>

          <v-btn
            class="mx-2"
            icon="mdi-checkbox-blank-outline"
            variant="text"
            density="compact"
            size="x-small"
            @click.stop="split"
          ></v-btn>

          <v-btn
            class="ml-2"
            icon="mdi-close"
            variant="text"
            density="compact"
            size="x-small"
            @click.stop="close"
          ></v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-divider></v-divider>
    <slot></slot>
  </v-card>
</template>

<script lang="ts" setup>
const props = defineProps<{
  w: string
}>()

const emit = defineEmits(['close', 'minus', 'split'])

const close = () => {
  emit('close')
}

const minus = () => {
  emit('minus')
}

const split = () => {
  emit('split')
}
</script>

<style></style>
