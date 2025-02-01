import { z } from 'zod'

export const PostUpdateRequestSchema = z.object({
  content: z.string(),
  enabled: z.boolean(),
  series_id: z.number(),
  tags: z
    .array(
      z.object({
        id: z.number()
      })
    )
    .optional()
    .nullable(),
  thumbnail: z.string(),
  title: z.string()
})

export type PostUpdateRequest = z.infer<typeof PostUpdateRequestSchema>

export const isPostUpdateRequest = (obj: unknown): obj is PostUpdateRequest => {
  return PostUpdateRequestSchema.safeParse(obj).success
}
