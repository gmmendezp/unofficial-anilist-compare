import { STATUS, type TitleType } from '../constants'
import type { MediaTitle } from '../types/anilist'
import type { UserListComparisonData } from './compareLists'
import { getTitle } from './getTitle'

export const filterComparisonData = (
  comparisonData: UserListComparisonData,
  statusFrom: string,
  statusTo: string,
  nameQuery: string,
  titleType: TitleType
) =>
  comparisonData.slice().filter(
    (data) =>
      (statusFrom === STATUS.ALL || data.fromStatus === statusFrom) &&
      (statusTo === STATUS.ALL || data.toStatus === statusTo) &&
      getTitle(data.title as MediaTitle, titleType)
        .toLowerCase()
        .includes(nameQuery.toLowerCase())
  )
