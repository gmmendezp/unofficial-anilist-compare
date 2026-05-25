export type valueof<T> = T[keyof T]

export const STATUS = {
  ALL: 'ALL',
  COMPLETED: 'COMPLETED',
  DROPPED: 'DROPPED',
  PAUSED: 'PAUSED',
  PLANNING: 'PLANNING',
  CURRENT: 'CURRENT',
  NONE: 'NONE',
} as const

export const STATUS_LABELS = {
  ALL: 'All',
  COMPLETED: 'Completed',
  DROPPED: 'Dropped',
  PAUSED: 'Paused',
  PLANNING: 'Planning',
  CURRENT: 'Watching',
  NONE: 'None',
} as const

export const TITLE_TYPE = {
  ROMAJI: 'romaji',
  ENGLISH: 'english',
  NATIVE: 'native',
} as const

export const FORMAT_NAME = {
  TV: 'TV',
  TV_SHORT: 'Short',
  MOVIE: 'Movie',
  SPECIAL: 'Special',
  OVA: 'OVA',
  ONA: 'ONA',
  MUSIC: 'Music',
}

export const MERGE_METHOD = {
  AANDB: 'AANDB',
  AORB: 'AORB',
  ANOTB: 'ANOTB',
  BNOTA: 'BNOTA',
} as const

export const MERGE_METHOD_LABELS = {
  [MERGE_METHOD.AANDB]: 'In both lists',
  [MERGE_METHOD.AORB]: 'In either list',
  [MERGE_METHOD.ANOTB]: "Only in first user's list",
  [MERGE_METHOD.BNOTA]: "Only in second user's list",
} as const

export type StatusType = valueof<typeof STATUS>
export type TitleType = valueof<typeof TITLE_TYPE>
export type MergeMethodType = valueof<typeof MERGE_METHOD>
