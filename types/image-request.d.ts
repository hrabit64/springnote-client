import z from 'zod'

export const ImageRequestSchema = z.object({
  name: z.string(),
  image: z.string()
})

export type ImageRequest = z.infer<typeof ImageRequestSchema>

export const isImageRequest = (arg: any): arg is ImageRequest => {
  return ImageRequestSchema.safeParse(arg).success
}
