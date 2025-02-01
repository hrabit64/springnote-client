import z from 'zod'

export const CommentResponseSchema = z.object({
  _links: z
    .object({
      disable: z.object({ href: z.string() }),
      self: z.object({ href: z.string() }),
      update: z.object({ href: z.string() })
    })
    .optional(),
  content: z.string(),
  created_date: z.string(),
  enabled: z.boolean(),
  id: z.number(),
  last_modified_date: z.string(),
  post_id: z.number(),
  reply_count: z.number().optional().nullable(),
  writer: z.object({
    admin: z.boolean(),
    email: z.string(),
    enabled: z.boolean(),
    id: z.string(),
    name: z.string(),
    profile_img: z.string()
  })
})

export type CommentResponse = z.infer<typeof CommentResponseSchema>

export const IsCommentResponse = (arg: unknown): arg is CommentResponse => {
  return CommentResponseSchema.safeParse(arg).success
}

export const getEmptyComment = (): CommentResponse => ({}) as CommentResponse

export const PageCommentsResponseSchema = z.object({
  _embedded: z.object({
    comments: z.array(CommentResponseSchema)
  }),
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

export type PageCommentsResponse = z.infer<typeof PageCommentsResponseSchema>

export const IsPageCommentsResponse = (
  arg: unknown
): arg is PageCommentsResponse => {
  return PageCommentsResponseSchema.safeParse(arg).success
}

export const ReplyResponseSchema = z.object({
  _links: z.object({
    disable: z.object({
      href: z.string()
    }),
    parent: z.object({
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
  created_date: z.string(),
  enabled: z.boolean(),
  id: z.number(),
  last_modified_date: z.string(),
  parent_id: z.number(),
  post_id: z.number(),
  writer: z.object({
    admin: z.boolean(),
    email: z.string(),
    enabled: z.boolean(),
    id: z.string(),
    name: z.string(),
    profile_img: z.string()
  })
})

export type ReplyResponse = z.infer<typeof ReplyResponseSchema>

export const IsReplyResponse = (arg: unknown): arg is ReplyResponse => {
  return ReplyResponseSchema.safeParse(arg).success
}

export const PageRepliesResponseSchema = z.object({
  _embedded: z.object({
    replies: z.array(ReplyResponseSchema)
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

export type PageRepliesResponse = z.infer<typeof PageRepliesResponseSchema>

export const IsPageRepliesResponse = (
  arg: unknown
): arg is PageRepliesResponse => {
  return PageRepliesResponseSchema.safeParse(arg).success
}
