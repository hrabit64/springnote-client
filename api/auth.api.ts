import { createUrl } from '~/utils/api.utils'

import type { UserResponse } from '~/types/user-response'

export const getSelf = async (): Promise<UserResponse | null> => {
  const url = '/api/v1/auth'
  const user = await getCurrentUser()
  const token = await user.getIdToken()
  const { data, error } = await useFetch<UserResponse>(createUrl(url), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    },
    lazy: false
  })

  if (error.value) {
    return null
  } else {
    return data.value
  }
}

export const register = async (captchaToken: string): Promise<Boolean> => {
  const url = '/api/v1/auth' + '?captchaToken=' + captchaToken

  const user = await getCurrentUser()
  const token = await user.getIdToken()
  const { data, error } = await useFetch(createUrl(url), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    lazy: false
  })

  if (error.value) {
    return false
  } else {
    return true
  }
}


export const deactivateUser = async (captchaToken: string): Promise<Boolean> => {
  const url = '/api/v1/auth' + '?captchaToken=' + captchaToken

  const user = await getCurrentUser()
  const token = await user.getIdToken()
  const { data, error } = await useFetch(createUrl(url), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    },
    lazy: false
  })

  if (error.value) {
    return false
  } else {
    return true
  }
}
