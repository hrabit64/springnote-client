import type { SiteContentResponse } from '~/types/site-content-response'
import { createUrl } from '~/utils/api.utils'

export const getSiteContent = async (
  key: string
): Promise<SiteContentResponse | null> => {
  const url = `/api/v1/site-content/${key}`

  const { data, error } = await useFetch<SiteContentResponse>(createUrl(url), {
    method: 'GET',
    lazy: false
  })
  if (error.value) {
    return null
  } else {
    return data.value
  }
}
