import { Link } from '@chakra-ui/react'
import { type TitleType } from '../constants'
import { getTitle } from '../util/getTitle'
import type { MediaTitle } from '../gql/graphql'

interface TitleProps {
  title: MediaTitle
  url: string
  titleType: TitleType
}

function Title({ title, url, titleType }: TitleProps) {
  return url ? (
    <Link href={url || ''}>{getTitle(title, titleType)}</Link>
  ) : (
    getTitle(title, titleType)
  )
}

export default Title
