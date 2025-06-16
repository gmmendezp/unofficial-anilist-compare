import { TITLE_TYPE } from '../constants'
import type { Media } from '../gql/graphql'

export const getTitle = (media?: Media | null, titleType?: string) => {
  if (!media) return ''
  if (titleType === TITLE_TYPE.ENGLISH && media.title?.english)
    return media.title?.english
  if (titleType === TITLE_TYPE.NATIVE && media.title?.native)
    return media.title?.native
  return media.title?.romaji || media.title?.english || ''
}
