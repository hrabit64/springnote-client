import z from 'zod'


export const SeriesRequestSchema = z.object({
  name: z.string(),
  thumbnail: z.string(),
  description: z.string()
})


export type SeriesRequest = z.infer<typeof SeriesRequestSchema>

export const isSeriesRequest = (obj: unknown): obj is SeriesRequest => {
  return SeriesRequestSchema.safeParse(obj).success
}

