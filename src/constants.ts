export type valueof<T> = T[keyof T]

export const STATUS = {
  ALL: 'ALL',
  COMPLETED: 'COMPLETED',
  PAUSED: 'PAUSED',
  PLANNING: 'PLANNING',
  WATCHING: 'WATCHING',
} as const

export const STATUS_LABELS = {
  ALL: 'All',
  COMPLETED: 'Completed',
  PAUSED: 'Paused',
  PLANNING: 'Planning',
  WATCHING: 'Watching',
} as const

export const TITLE_TYPE = {
  ROMAJI: 'romaji',
  ENGLISH: 'english',
  NATIVE: 'native',
} as const

export type StatusType = valueof<typeof STATUS>
export type TitleType = valueof<typeof TITLE_TYPE>
