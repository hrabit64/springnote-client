import { defineStore } from 'pinia'
import type { AlertMessage } from '~/types/components'
import { v4 as uuidv4 } from 'uuid'

export const useAlertStore = defineStore('alert', () => {
  const message = ref<AlertMessage | null>(null)
  const id = ref('')

  const setMessage = (msg: AlertMessage) => {
    id.value = String(uuidv4())
    message.value = msg
  }

  return {
    id,
    message,
    setMessage
  }
})

export type AlertStore = ReturnType<typeof useAlertStore>
