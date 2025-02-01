import z from 'zod'

export const ImageResponseSchema = z.object({
  file_id: z.string()
})

export type ImageResponse = z.infer<typeof ImageResponseSchema>

export const isImageResponse = (arg: any): arg is ImageResponse => {
  return ImageResponseSchema.safeParse(arg).success
}
