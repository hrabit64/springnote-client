//posts

import z from 'zod'

export const PostSimpleResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  thumbnail: z.string(),
  created_at: z.string(),
  last_updated_at: z.string(),
  enabled: z.boolean(),
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
  tags: z.array(
    z.object({
      id: z.number(),
      name: z.string()
    })
  )
})

export type PostSimpleResponse = z.infer<typeof PostSimpleResponseSchema>

export const isPostSimpleResponse = (
  obj: unknown
): obj is PostSimpleResponse => {
  return PostSimpleResponseSchema.safeParse(obj).success
}

export const PostResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  thumbnail: z.string(),
  content: z.object({
    editor_text: z.string(),
    plain_text: z.string()
  }),
  created_at: z.string(),
  last_updated_at: z.string(),
  enabled: z.boolean(),
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
  tags: z.array(
    z.object({
      id: z.number(),
      name: z.string()
    })
  )
})

export type PostResponse = z.infer<typeof PostResponseSchema>

export const isPostResponse = (obj: unknown): obj is PostResponse => {
  return PostResponseSchema.safeParse(obj).success
}

export const PagePostSimpleResponseSchema = z.object({
  _embedded: z.object({
    posts: z.array(PostSimpleResponseSchema)
  }),

  page: z.object({
    number: z.number(),
    size: z.number(),
    totalElements: z.number(),
    totalPages: z.number()
  })
})

export type PagePostSimpleResponse = z.infer<
  typeof PagePostSimpleResponseSchema
>

export const isPagePostSimpleResponse = (
  obj: unknown
): obj is PagePostSimpleResponse => {
  return PagePostSimpleResponseSchema.safeParse(obj).success
}

export const PagePostResponseSchema = z.object({
  _embedded: z.object({
    posts: z.array(PostResponseSchema)
  }),

  page: z.object({
    number: z.number(),
    size: z.number(),
    totalElements: z.number(),
    totalPages: z.number()
  })
})

export type PagePostResponse = z.infer<typeof PagePostResponseSchema>

export const isPagePostResponse = (obj: unknown): obj is PagePostResponse => {
  return PagePostResponseSchema.safeParse(obj).success
}

export const PostDetailResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  thumbnail: z.string(),
  content: z.object({
    editor_text: z.string(),
    plain_text: z.string()
  }),
  created_at: z.string(),
  last_updated_at: z.string(),
  enabled: z.boolean(),
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
  tags: z.array(
    z.object({
      id: z.number(),
      name: z.string()
    })
  )
})

export type PostDetailResponse = z.infer<typeof PostDetailResponseSchema>

export const isPostDetailResponse = (
  obj: unknown
): obj is PostDetailResponse => {
  return PostDetailResponseSchema.safeParse(obj).success
}
