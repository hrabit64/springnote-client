import type { TmpPostRequest } from '~/types/tmp-post-request'
import type {
  TmpPostResponse,
  PagedTmpPostResponse
} from '~/types/tmp-post-response'

import type { PostResponse } from '~/types/post-response'
import { createPayload, createUrl } from '~/utils/api.utils'

export const createTmpPost = async (
  req: TmpPostRequest
): Promise<TmpPostResponse | null> => {
  const url = `/api/v1/tmp-post`
  const user = await getCurrentUser()
  const token = await user.getIdToken()

  const { data, error } = await useFetch<TmpPostResponse>(createUrl(url), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(req)
  })

  if (error.value) {
    return null
  }

  return data.value!!
}

export const deleteTmpPost = async (id: string): Promise<boolean> => {
  const url = `/api/v1/tmp-post/${id}`
  const user = await getCurrentUser()
  const token = await user.getIdToken()

  const { data, error } = await useFetch<boolean>(createUrl(url), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (error.value) {
    return false
  }

  return true
}

export const getTmpPost = async (
  id: string
): Promise<TmpPostResponse | null> => {
  const url = `/api/v1/tmp-post/${id}`
  const user = await getCurrentUser()
  const token = await user.getIdToken()
  const { data, error } = await useFetch<TmpPostResponse>(createUrl(url), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (error.value) {
    return null
  } else {
    return data.value
  }
}

export const getRecentTmpPosts = async (
  size: number
): Promise<PagedTmpPostResponse | null> => {
  const url = `/api/v1/tmp-post?size=${size}&sort=createdDate,desc&page=0`

  const user = await getCurrentUser()
  const token = await user.getIdToken()
  const { data, error } = await useFetch<PagedTmpPostResponse>(createUrl(url), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (error.value) {
    return null
  } else {
    return data.value
  }
}

export const updateTmpPost = async (
  id: string,
  req: TmpPostRequest
): Promise<TmpPostResponse | null> => {
  const url = `/api/v1/tmp-post/${id}`
  const user = await getCurrentUser()
  const token = await user.getIdToken()

  const { data, error } = await useFetch<TmpPostResponse>(createUrl(url), {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(req)
  })

  if (error.value) {
    return null
  }

  return data.value!!
}

export const publishTmpPost = async (
  id: string
): Promise<PostResponse | null> => {
  const url = `/api/v1/tmp-post/${id}/publish`
  const user = await getCurrentUser()
  const token = await user.getIdToken()

  const { data, error } = await useFetch<PostResponse>(createUrl(url), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (error.value) {
    return null
  }

  return data.value!!
}
