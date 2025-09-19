import { type TitleType } from '../constants'
import { getTitle } from '../util/getTitle'
import type { MediaTitle } from '../gql/graphql'

interface TitleProps {
  title: MediaTitle
  url: string
  titleType: TitleType
}

function Title({ title, titleType }: TitleProps) {
  return getTitle(title, titleType)
}

export default Title
