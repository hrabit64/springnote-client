<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    multi-line
    color="primary"
    rounded="pill"
  >
    <p class="text-center bold-font text-subtitle-2">
      <v-icon v-if="type === 'success'" class="mx-2">mdi-check</v-icon>
      <v-icon v-else-if="type === 'error'" class="mx-2">mdi-alert</v-icon>
      <v-icon v-else-if="type === 'info'" class="mx-2">mdi-information</v-icon>
      {{ text }}
    </p>

    <template v-slot:actions>
      <v-btn variant="text" @click="snackbar = false" class="mx-2 text-white"
      >
        <v-icon>mdi-close-circle</v-icon>
      </v-btn
      >
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { AlertType } from '~/types/components.d'
import { useAlertStore } from '~/stores/alert'

const timeout = ref(5000)
const snackbar = ref(false)
const text = ref('')
const type = ref<AlertType>(AlertType.Info)
let lastId = null

const alertStore = useAlertStore()
const { id, message } = storeToRefs(alertStore)

watch(id, (newId, oldId) => {
  if (newId !== oldId) {
    lastId = newId
    text.value = message.value
      ? message.value.message
      : '알 수 없는 에러가 발생했습니다.'
    type.value = message.value ? message.value.type : AlertType.Info
    snackbar.value = true
  }
})
</script>

<style scoped>
.v-snackbar > * {
  margin-left: 0px !important;
}
</style>
