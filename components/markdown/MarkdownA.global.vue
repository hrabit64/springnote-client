<script setup lang="ts">
const props = defineProps({
  href: {
    type: String,
    default: ''
  },
  target: {
    type: String as PropType<
      | '_blank'
      | '_parent'
      | '_self'
      | '_top'
      | (string & object)
      | null
      | undefined
    >,
    default: undefined,
    required: false
  }
})
</script>

<template>
  <v-btn prepend-icon="mdi-link" variant="outlined" :href="props.href">
    <slot />
  </v-btn>
</template>

<style scoped></style>
