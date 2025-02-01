import z from 'zod'

// export interface KeyVal {
//   key: string
//   value: string
// }
// export const isKeyVal = (arg: any): arg is KeyVal => {
//   return arg.key !== undefined && arg.value !== undefined
// }

export const KeyValSchema = z.object({
  key: z.string(),
  value: z.string()
})

export type KeyVal = z.infer<typeof KeyValSchema>

export const IsKeyVal = (arg: unknown): arg is KeyVal => {
  return KeyValSchema.safeParse(arg).success
}

export interface SeriesListItem {
  id: number
  name: string
  posts: KeyVal[]
  totalItem: number
}
export const isSeriesListItem = (arg: any): arg is SeriesListItem => {
  return (
    typeof arg.id === 'number' &&
    typeof arg.name === 'string' &&
    arg.posts !== undefined &&
    arg.totalItem !== undefined
  )
}
export interface PostCardItem {
  id: number
  title: string
  created_at: string
  thumbnail: string
  series: {
    id: number
    name: string
  } | null
  tags: Array<{
    id: number
    name: string
  }>
}
export const isPostCardItem = (arg: any): arg is PostCardItem => {
  return (
    typeof arg.id === 'number' &&
    typeof arg.title === 'string' &&
    typeof arg.created_at === 'string' &&
    typeof arg.thumbnail === 'string' &&
    arg.series !== undefined &&
    arg.tags !== undefined
  )
}

export enum AlertType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning'
}

export const AlertMessageSchema = z.object({
  message: z.string(),
  type: z.nativeEnum(AlertType)
})

export type AlertMessage = z.infer<typeof AlertMessageSchema>

export const IsAlertMessage = (arg: unknown): arg is AlertMessage => {
  return AlertMessageSchema.safeParse(arg).success
}
