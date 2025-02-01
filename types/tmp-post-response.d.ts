import z from 'zod'

export const tmpPostResponseSchema = z.object({
  _links: z.object({
    delete: z.object({
      href: z.string()
    }),
    self: z.object({
      href: z.string()
    }),
    update: z.object({
      href: z.string()
    })
  }),
  content: z.string(),
  created_at: z.string(),
  id: z.string(),
  last_updated_at: z.string(),
  post_type: z.object({
    id: z.number(),
    name: z.string()
  }),
  series: z
    .object({
      id: z.number(),
      name: z.string()
    })
    .nullable()
    .optional(),
  tags: z
    .array(
      z.object({
        id: z.number(),
        name: z.string()
      })
    )
    .nullable()
    .optional(),
  thumbnail: z.string().nullable().optional(),
  title: z.string()
})

export type TmpPostResponse = z.infer<typeof tmpPostResponseSchema>

export const isTmpPostResponse = (obj: unknown): obj is TmpPostResponse => {
  return tmpPostResponseSchema.safeParse(obj).success
}

export const PagedTmpPostResponseSchema = z.object({
  _embedded: z
    .object({
      tmp_posts: z.array(tmpPostResponseSchema)
    })
    .nullable()
    .optional(),
  _links: z.object({
    self: z.object({ href: z.string() })
  }),
  page: z.object({
    number: z.number(),
    size: z.number(),
    totalElements: z.number(),
    totalPages: z.number()
  })
})

export type PagedTmpPostResponse = z.infer<typeof PagedTmpPostResponseSchema>

export const isPagedTmpPostResponse = (
  obj: unknown
): obj is PagedTmpPostResponse => {
  return PagedTmpPostResponseSchema.safeParse(obj).success
}
