import z from 'zod'

export const TagResponseSchema = z.object({
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
  id: z.number(),
  name: z.string()
})

export type TagResponse = z.infer<typeof TagResponseSchema>

export const isTagResponse = (obj: unknown): obj is TagResponse => {
  return TagResponseSchema.safeParse(obj).success
}

export const PagedTagResponseSchema = z.object({
  _embedded: z.object({
    tags: z.array(TagResponseSchema)
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

export type PagedTagResponse = z.infer<typeof PagedTagResponseSchema>

export const isPagedTagResponse = (obj: unknown): obj is PagedTagResponse => {
  return PagedTagResponseSchema.safeParse(obj).success
}
