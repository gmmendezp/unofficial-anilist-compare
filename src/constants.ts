export type valueof<T> = T[keyof T]

export const STATUS = {
  ALL: 'ALL',
  COMPLETED: 'COMPLETED',
  DROPPED: 'DROPPED',
  PAUSED: 'PAUSED',
  PLANNING: 'PLANNING',
  CURRENT: 'CURRENT',
} as const

export const STATUS_LABELS = {
  ALL: 'All',
  COMPLETED: 'Completed',
  DROPPED: 'Dropped',
  PAUSED: 'Paused',
  PLANNING: 'Planning',
  CURRENT: 'Watching',
} as const

export const TITLE_TYPE = {
  ROMAJI: 'romaji',
  ENGLISH: 'english',
  NATIVE: 'native',
} as const

export type StatusType = valueof<typeof STATUS>
export type TitleType = valueof<typeof TITLE_TYPE>
