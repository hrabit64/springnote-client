import { createPayload, createUrl, handleApiError } from '~/utils/api.utils'

import type { ErrorResponse } from '~/types/response'

import type { PagePostSimpleResponse, PostDetailResponse } from '~/types/post-response'
import type { PostUpdateRequest } from '~/types/post-request'

export const getPosts = async (
  page: number,
  size: number,
  sort: string,
  order: string
): Promise<PagePostSimpleResponse | null> => {
  const url =
    '/api/v1/post' + `?page=${page}&size=${size}&sort=${sort},${order}`

  const { data, error } = await useFetch<PagePostSimpleResponse>(
    createUrl(url),
    await createPayload(true, 'GET')
  )

  if (error.value) {

    return null
  } else {
    return data.value!!
  }
}

export const getSeriesPosts = async (
  series_id: number,
  page: number,
  size: number,
  sort: string,
  order: string
): Promise<PagePostSimpleResponse | null> => {
  const url =
    '/api/v1/post' +
    `?page=${page}&size=${size}&sort=${sort},${order}&series=${series_id}`

  const { data, error } = await useFetch<PagePostSimpleResponse>(
    createUrl(url),
    await createPayload(true, 'GET')
  )

  if (error.value) {
    return null
  } else {
    return data.value
  }
}

export const getRecentPosts = async (
  size: number
): Promise<PagePostSimpleResponse | null> => {
  const url = '/api/v1/post' + `?page=0&size=${size}&sort=createdDate,desc`

  const { data, error } = await useFetch<PagePostSimpleResponse>(
    createUrl(url),
    await createPayload(true, 'GET')
  )

  if (error.value) {

    return null
  } else {
    return data.value
  }
}
type SearchMode = 'TITLE' | 'CONTENT' | 'MIX'

export const getPostsWithKeyword = async (
  page: number,
  size: number,
  sort: string,
  keyword: string,
  searchMode: SearchMode,
  order: string
): Promise<PagePostSimpleResponse | ErrorResponse> => {
  const url =
    '/api/v1/post' +
    `?keyword=${keyword}&searchMode=${searchMode}&page=${page}&size=${size}&sort=${sort},${order}`

  const { data, error } = await useFetch<PagePostSimpleResponse>(
    createUrl(url),
    await createPayload(true, 'GET')
  )

  if (error.value) {
    return handleApiError(error.value)
  } else {
    return data.value!!
  }
}

export const getPost = async (
  id: number
): Promise<PostDetailResponse | null> => {
  const url = `/api/v1/post/${id}`

  const { data, error } = await useFetch<PostDetailResponse>(createUrl(url), {
    method: 'GET',
    lazy: false
  })
  if (error.value) {
    return null
  } else {
    return data.value
  }
}

export const deletePost = async (id: number): Promise<boolean> => {
  const url = `/api/v1/post/${id}`

  const user = await getCurrentUser()
  const token = await user.getIdToken()

  const { data, error } = await useFetch(createUrl(url), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (error.value) {
    return false
  } else {
    return true
  }
}

export const updatePost = async (
  id: number,
  req: PostUpdateRequest
): Promise<PostDetailResponse | null> => {
  const url = `/api/v1/post/${id}`

  const user = await getCurrentUser()
  const token = await user.getIdToken()

  const { data, error } = await useFetch<PostDetailResponse>(createUrl(url), {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req)
  })

  if (error.value) {
    return null
  } else {
    return data.value!!
  }
}
