import type {
  CommentResponse,
  PageCommentsResponse,
  PageRepliesResponse,
  ReplyResponse
} from '~/types/comment-response'
import type {
  CommentCreateRequest,
  CommentUpdateRequest,
  ReplyCreateRequest
} from '~/types/comment-request'
import { createPayload } from '~/utils/api.utils'

export const getCommentsByPostId = async (
  postId: number,
  page: number,
  size: number
): Promise<PageCommentsResponse | null> => {
  const url = `/api/v1/post/${postId}/comment?page=${page}&size=${size}&sort=createdDate,asc`

  const { data, error } = await useFetch<PageCommentsResponse>(
    createUrl(url),
    await createPayload(true, 'GET')
  )

  if (error.value) {
    return null
  } else {
    return data.value!!
  }
}

export const getRepliesByCommentId = async (
  parentId: number,
  page: number,
  size: number
): Promise<PageRepliesResponse | null> => {
  const url = `/api/v1/comment/${parentId}/reply?page=${page}&size=${size}&sort=createdDate,asc`

  const { data, error } = await useFetch<PageRepliesResponse>(createUrl(url), {
    method: 'GET',
    lazy: true
  })

  if (error.value) {
    return null
  } else {
    return data.value!!
  }
}

export const createComment = async (
  postId: number,
  request: CommentCreateRequest
): Promise<CommentResponse | null> => {
  const url = `/api/v1/post/${postId}/comment`

  const user = await getCurrentUser()
  const token = await user.getIdToken()

  const { data, error } = await useFetch<CommentResponse>(createUrl(url), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(request)
  })

  if (error.value) {
    return null
  } else {
    return data.value!!
  }
}

export const createReply = async (
  postId: number,
  commentId: number,
  request: ReplyCreateRequest
): Promise<ReplyResponse | null> => {
  const url = `/api/v1/${postId}/comment/${commentId}/reply`

  const user = await getCurrentUser()
  const token = await user.getIdToken()

  const { data, error } = await useFetch<ReplyResponse>(createUrl(url), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(request)
  })

  if (error.value) {
    return null
  } else {
    return data.value!!
  }
}

export const deleteComment = async (id: number): Promise<boolean> => {
  const url = `/api/v1/comment/${id}/status`

  const user = await getCurrentUser()
  const token = await user.getIdToken()

  const { data, error } = await useFetch(createUrl(url), {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return !error.value
}

export const updateComment = async (
  id: number,
  request: CommentUpdateRequest
): Promise<CommentResponse | null> => {
  const url = `/api/v1/comment/${id}`

  const user = await getCurrentUser()
  const token = await user.getIdToken()

  const { data, error } = await useFetch<CommentResponse>(createUrl(url), {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(request)
  })

  if (error.value) {
    return null
  } else {
    return data.value!!
  }
}
