import z from 'zod'

export const CommentCreateRequestSchema = z.object({
  captcha_token: z.string(),
  content: z.string(),
  im_not_bot: z.boolean()
})

export type CommentCreateRequest = z.infer<typeof CommentCreateRequestSchema>

export const IsCommentCreateRequest = (
  arg: unknown
): arg is CommentCreateRequest => {
  return CommentCreateRequestSchema.safeParse(arg).success
}

export const CommentUpdateRequestSchema = z.object({
  captcha_token: z.string(),
  content: z.string(),
  im_not_bot: z.boolean()
})

export type CommentUpdateRequest = z.infer<typeof CommentUpdateRequestSchema>

export const IsCommentUpdateRequest = (
  arg: unknown
): arg is CommentUpdateRequest => {
  return CommentUpdateRequestSchema.safeParse(arg).success
}

export const ReplyCreateRequestSchema = z.object({
  captcha_token: z.string(),
  content: z.string(),
  im_not_bot: z.boolean()
})

export type ReplyCreateRequest = z.infer<typeof ReplyCreateRequestSchema>

export const IsReplyCreateRequest = (
  arg: unknown
): arg is ReplyCreateRequest => {
  return ReplyCreateRequestSchema.safeParse(arg).success
}
