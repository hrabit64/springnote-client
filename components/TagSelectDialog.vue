<template>
  <v-dialog width="100%" height="100%" v-model="isOpen">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn block class="mx-1" @click="openDialog">
        <v-icon>mdi-plus</v-icon>
        <v-tooltip activator="parent" location="bottom"> Select Tag</v-tooltip>
      </v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <WindowCard
        w="100%"
        @close="closeDialog"
        @minus="closeDialog"
        @split="closeDialog"
      >
        <template v-slot:title>
          <v-icon>mdi-cog</v-icon>
          태그 선택
        </template>
        <v-row>
          <v-col cols="12">
            <TagSelectList @select="select" :key="key" />
          </v-col>
          <v-col cols="12">
            <TagCreateDialog @create="create" />
          </v-col>
        </v-row>
      </WindowCard>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import type { KeyVal } from '~/types/components'
import { useAlertStore } from '~/stores/alert'
import { AlertType } from '~/types/components.d'
import { v4 } from 'uuid'

const emit = defineEmits(['select'])

const isOpen = ref(false)

const openDialog = () => {
  isOpen.value = true
}

const closeDialog = () => {
  isOpen.value = false
}


const alertStore = useAlertStore()


const select = (tag: KeyVal) => {
  alertStore.setMessage({
    type: AlertType.INFO,
    message: `Selected tag: ${tag.value}`
  })
  emit('select', tag)
  closeDialog()
}

const key = ref(v4())

const create = () => {
  key.value = v4()

}

</script>

<style scoped></style>
