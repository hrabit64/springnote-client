import z from 'zod'

export const TagRequestSchema = z.object({
  name: z.string()
})

export type TagRequest = z.infer<typeof TagRequestSchema>

export const isTagRequest = (obj: unknown): obj is TagRequest => {
  return TagRequestSchema.safeParse(obj).success
}
