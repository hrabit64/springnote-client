import type { TagRequest } from '~/types/tag-request'
import type { TagResponse, PagedTagResponse } from '~/types/tag-response'
import { createPayload, createUrl } from '~/utils/api.utils'

export const createTag = async (
  req: TagRequest
): Promise<TagResponse | null> => {
  const url = `/api/v1/tag`
  const user = await getCurrentUser()
  const token = await user.getIdToken()

  const { data, error } = await useFetch<TagResponse>(createUrl(url), {
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

export const deleteTag = async (id: number): Promise<boolean> => {
  const url = `/api/v1/tag/${id}`
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

  return data.value!!
}

export const updateTag = async (
  id: number,
  req: TagRequest
): Promise<TagResponse | null> => {
  const url = `/api/v1/tag/${id}`
  const user = await getCurrentUser()
  const token = await user.getIdToken()

  const { data, error } = await useFetch<TagResponse>(createUrl(url), {
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

export const getTags = async (
  page: number,
  size: number,
  sort: string,
  order: string
): Promise<PagedTagResponse | null> => {
  const url = `/api/v1/tag?page=${page}&size=${size}&sort=${sort},${order}`

  const { data, error } = await useFetch<PagedTagResponse>(
    createUrl(url),
    await createPayload(true, 'GET')
  )
  if (error.value) {
    return null
  } else {
    return data.value
  }
}
