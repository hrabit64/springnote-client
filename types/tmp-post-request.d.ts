import z from 'zod'

export const tmpPostRequestSchema = z.object({
  content: z.null(),
  post_type_id: z.number(),
  series_id: z.null(),
  tag_ids: z.null(),
  thumbnail: z.null(),
  title: z.null()
})

export type TmpPostRequest = z.infer<typeof tmpPostRequestSchema>

export const isTmpPostRequest = (obj: unknown): obj is TmpPostRequest => {
  return tmpPostRequestSchema.safeParse(obj).success
}
