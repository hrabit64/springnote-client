import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const name = ref('')
  const uid = ref('')
  const isAdmin = ref(false)
  const profileImg = ref('')
  const isLoginInprogress = ref(false)

  const setIsLoginInprogress = (value: boolean) => {
    isLoginInprogress.value = value
  }

  const loadUser = () => {
    name.value = localStorage.getItem('springnote-user-name') || ''
    uid.value = localStorage.getItem('springnote-user-uid') || ''
    isAdmin.value = localStorage.getItem('springnote-user-isAdmin') === 'true'
    profileImg.value = localStorage.getItem('springnote-user-profileImg') || ''
  }

  const saveUser = (
    name: string,
    uid: string,
    isAdmin: boolean,
    profileImg: string
  ) => {
    localStorage.setItem('springnote-user-name', name)
    localStorage.setItem('springnote-user-uid', uid)
    localStorage.setItem('springnote-user-isAdmin', String(isAdmin))
    localStorage.setItem('springnote-user-profileImg', profileImg)
    loadUser()
  }

  const getIsAdmin = (): boolean => {
    return isAdmin.value
  }

  const getUid = (): string => {
    return uid.value
  }

  const getName = (): string => {
    return name.value
  }

  const getProfileImg = (): string => {
    return profileImg.value
  }

  const getUser = () => {
    return { name: name.value, uid: uid.value, isAdmin: isAdmin.value }
  }

  const isLogin = computed(() => name.value !== '')

  const clearUser = () => {
    localStorage.removeItem('springnote-user-name')
    localStorage.removeItem('springnote-user-uid')
    localStorage.removeItem('springnote-user-isAdmin')
    loadUser()
  }

  return {
    name,
    isAdmin,
    loadUser,
    saveUser,
    clearUser,
    getName,
    getUid,
    getUser,
    getIsAdmin,
    isLogin,
    getProfileImg,
    profileImg,
    isLoginInprogress,
    setIsLoginInprogress
  }
})

export type UserStore = ReturnType<typeof useUserStore>
