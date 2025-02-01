import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', () => {
  const open = ref(true)

  const toggle = () => {
    open.value = !open.value
  }

  return {
    open,
    toggle
  }
})

export type SidebarStore = ReturnType<typeof useSidebarStore>
