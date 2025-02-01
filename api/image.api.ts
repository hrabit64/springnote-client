import type { ImageRequest } from '~/types/image-request'
import type { ImageResponse } from '~/types/image-response'
import { createPayload, createImgUrl, handleApiError } from '~/utils/api.utils'

export const postImage = async (
  req: ImageRequest
): Promise<ImageResponse | null> => {
  const url = '/api/v1/image'
  const user = await getCurrentUser()
  const token = await user.getIdToken()
  const { data, error } = await useFetch<ImageResponse>(createImgUrl(url), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(req)
  })

  if (error.value) {
    console.log(error.value)
    return null
  } else {
    return data.value!!
  }
}
