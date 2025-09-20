import { STATUS, type TitleType } from '../constants'
import type { UserListComparisonData } from '../hooks/useUserListComparisonData'

export const filterComparisonData = (
  comparisonData: UserListComparisonData,
  statusFrom: string,
  statusTo: string,
  nameQuery: string,
  titleType: TitleType
) =>
  comparisonData
    .slice()
    .filter(
      (data) =>
        (statusFrom === STATUS.ALL || data.fromStatus === statusFrom) &&
        (statusTo === STATUS.ALL || data.toStatus === statusTo) &&
        data.title[titleType]?.toLowerCase().includes(nameQuery.toLowerCase())
    )
