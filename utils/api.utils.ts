import { FetchError } from 'ofetch'

import type { ErrorResponse } from '~/types/response'

export const isErrorResponse = (obj: any): obj is ErrorResponse => {
  return (
    obj &&
    typeof obj.timestamp === 'string' &&
    typeof obj.status === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.message === 'string' &&
    typeof obj.path === 'string'
  )
}

export const toErrorResponse = (obj: any): ErrorResponse => {
  if (!isErrorResponse(obj)) {
    throw new Error('Invalid ErrorResponse object')
  }
  return obj as ErrorResponse
}

export const createUrl = (url: string): string => {
  const runtimeConfig = useRuntimeConfig()
  const baseUrl = runtimeConfig.public.baseUrl
  return baseUrl + url
}

export const createImgUrl = (url: string): string => {
  const runtimeConfig = useRuntimeConfig()
  const baseUrl = runtimeConfig.public.baseImgUrl
  return baseUrl + url
}

export const createPayload = async (
  isLazy: Boolean,
  method: String
): Promise<object> => {
  if (isLazy) {
    return {
      method: method,
      lazy: isLazy
    }
  }
  const user = await getCurrentUser()

  let token = null
  if (user !== null && user !== undefined) {
    token = await user.getIdToken()
  }

  return {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`
    },
    lazy: isLazy
  }
}

export const createPayloadWithCaptcha = async (
  isLazy: Boolean,
  method: String
): Promise<object> => {
  const user = await getCurrentUser()

  let token = null
  if (user !== null && user !== undefined) {
    token = await user.getIdToken()
  }

  return {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`
    },
    lazy: isLazy
  }
}

export const handleApiError = (error: FetchError): ErrorResponse => {
  if (error.response && isErrorResponse(error.response.body as unknown)) {
    return toErrorResponse(error.response.body)
  }
  return {
    timestamp: new Date().toISOString(),
    status: '-1',
    title: 'Axios Error',
    message: error.message,
    path: ''
  }
}
