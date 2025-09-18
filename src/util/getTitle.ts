import { TITLE_TYPE } from '../constants'
import type { MediaTitle } from '../gql/graphql'

export const getTitle = (title?: MediaTitle | null, titleType?: string) => {
  if (!title) return ''
  if (titleType === TITLE_TYPE.ENGLISH && title.english) return title.english
  if (titleType === TITLE_TYPE.NATIVE && title.native) return title.native
  return title.romaji || title.english || ''
}
