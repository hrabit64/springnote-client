import { defineStore } from 'pinia'

export const usePageTitleStore = defineStore('page-title', () => {
  const title = ref('loading')

  const getTitle = (): string => {
    return title.value
  }

  const setTitle = (newTitle: string) => {
    title.value = newTitle
  }

  return { title, getTitle, setTitle }
})

export type PageTitleStore = ReturnType<typeof usePageTitleStore>
