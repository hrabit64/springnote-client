import z from 'zod'

import type { PageInfo } from './common-response'

export const SeriesResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  thumbnail: z.string(),
  description: z.string(),
  _links: z.object({
    self: z.object({
      href: z.string()
    }),
    delete: z.object({
      href: z.string()
    }),
    update: z.object({
      href: z.string()
    })
  })
})

export type SeriesResponse = z.infer<typeof SeriesResponseSchema>

export const isSeriesResponse = (obj: unknown): obj is SeriesResponse => {
  return SeriesResponseSchema.safeParse(obj).success
}

export const PageSeriesResponseSchema = z.object({
  _embedded: z.object({
    series: z.array(SeriesResponseSchema)
  }),

  _links: z.object({
    self: z.object({
      href: z.string()
    })
  }),
  page: z.object({
    number: z.number(),
    size: z.number(),
    totalElements: z.number(),
    totalPages: z.number()
  })
})

export type PageSeriesResponse = z.infer<typeof PageSeriesResponseSchema>

export const isPageSeriesResponse = (
  obj: unknown
): obj is PageSeriesResponse => {
  return PageSeriesResponseSchema.safeParse(obj).success
}
