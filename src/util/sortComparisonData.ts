import { TITLE_TYPE, type TitleType } from '../constants'
import type { MediaTitle } from '../gql/graphql'
import type { UserListComparisonData } from '../hooks/useUserListComparisonData'
import { getTitle } from './getTitle'

const compareTitle = (asc: boolean, titleType: TitleType) => (a, b) => {
  return getTitle(a.title as MediaTitle, titleType).toLowerCase() <
    getTitle(b.title as MediaTitle, titleType).toLowerCase()
    ? asc
      ? -1
      : 1
    : asc
      ? 1
      : -1
}

export const sortComparisonData = (
  comparisonData: UserListComparisonData,
  property: string,
  asc: boolean,
  titleType: TitleType = TITLE_TYPE.ENGLISH
) => {
  if (property === 'title')
    return comparisonData.slice().sort(compareTitle(asc, titleType))
  else
    return comparisonData.slice().sort((a, b) => {
      const valueA = (a[property as keyof typeof a] as string).toLowerCase()
      const valueB = (b[property as keyof typeof b] as string).toLowerCase()
      if (valueA === valueB) return compareTitle(asc, titleType)(a, b)
      return valueA < valueB ? (asc ? -1 : 1) : asc ? 1 : -1
    })
}
