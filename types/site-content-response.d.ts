import z from 'zod'

export const SiteContentResponseSchema = z.object({
  _links: z.object({
    self: z.object({
      href: z.string()
    })
  }),
  content: z.string(),
  key: z.string()
})

export type SiteContentResponse = z.infer<typeof SiteContentResponseSchema>

export const isSiteContentResponse = (arg: any): arg is SiteContentResponse => {
  return SiteContentResponseSchema.safeParse(arg).success
}
