import z from 'zod'

export const UserResponseSchema = z.object({
  uid: z.string(),
  display_name: z.string(),
  admin: z.boolean(),
  profile_img: z.string()
})

export type UserResponse = z.infer<typeof UserResponseSchema>

export const isUserResponse = (arg: unknown): arg is UserResponse => {
  return UserResponseSchema.safeParse(arg).success
}
