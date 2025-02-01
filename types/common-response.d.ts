import z from 'zod'

export const PageInfoSchema = z.object({
  number: z.number(),
  size: z.number(),
  totalElements: z.number(),
  totalPages: z.number()
})

export type PageInfo = z.infer<typeof PageInfoSchema>

export const isPageInfo = (obj: unknown): obj is PageInfo => {
  return PageInfoSchema.safeParse(obj).success
}
