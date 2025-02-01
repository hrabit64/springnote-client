import { createPayload, createUrl, handleApiError } from '~/utils/api.utils'

import type {
  PageSeriesResponse,
  SeriesResponse
} from '~/types/series-response'

import type { SeriesRequest } from '~/types/series-request'

export enum SeriesSortKey {
  id,
  name
}

export const getSeries = async (
  page: number,
  size: number,
  sort: string,
  order: string
): Promise<PageSeriesResponse | null> => {
  const url =
    '/api/v1/series' + `?page=${page}&size=${size}&sort=${sort},${order}`

  const { data, error } = await useFetch<PageSeriesResponse>(
    createUrl(url),
    await createPayload(true, 'GET')
  )
  if (error.value) {
    console.log(error.value)
    return null
  } else {
    return data.value
  }
}

export const getSeriesWithName = async (
  page: number,
  size: number,
  sort: string,
  order: string,
  name: string
): Promise<PageSeriesResponse | null> => {
  const url =
    '/api/v1/series' +
    `?page=${page}&size=${size}&sort=${sort},${order}&name=${name}`

  const { data, error } = await useFetch<PageSeriesResponse>(
    createUrl(url),
    await createPayload(true, 'GET')
  )
  if (error.value) {
    console.log(error.value)
    return null
  } else {
    return data.value
  }
}
export const getSeriesWithId = async (
  id: number
): Promise<SeriesResponse | null> => {
  const url = `/api/v1/series/${id}`

  const { data, error } = await useFetch<SeriesResponse>(createUrl(url), {
    method: 'GET',
    lazy: false
  })

  if (error.value) {
    console.log(error.value)
    return null
  } else {
    return data.value
  }
}

export const createSeries = async (
  req: SeriesRequest
): Promise<SeriesResponse | null> => {
  const url = '/api/v1/series'

  const user = await getCurrentUser()
  const token = await user.getIdToken()

  const { data, error } = await useFetch<SeriesResponse>(createUrl(url), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(req)
  })

  if (error.value) {
    handleApiError(error.value)
    return null
  } else {
    return data.value
  }
}

export const updateSeries = async (
  id: number,
  req: SeriesRequest
): Promise<SeriesResponse | null> => {
  const url = '/api/v1/series' + `/${id}`

  const user = await getCurrentUser()
  const token = await user.getIdToken()

  const { data, error } = await useFetch<SeriesResponse>(createUrl(url), {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(req)
  })

  if (error.value) {
    handleApiError(error.value)
    return null
  } else {
    return data.value
  }
}

export const deleteSeries = async (id: number): Promise<boolean> => {
  const url = '/api/v1/series' + `/${id}`

  const user = await getCurrentUser()
  const token = await user.getIdToken()

  const { error } = await useFetch(createUrl(url), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (error.value) {
    handleApiError(error.value)
    return false
  } else {
    return true
  }
}
