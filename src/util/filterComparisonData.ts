import { STATUS } from '../constants'
import type { UserListComparisonData } from '../hooks/useUserListComparisonData'

export const filterComparisonData = (
  comparisonData: UserListComparisonData,
  statusFrom: string,
  statusTo: string
) =>
  comparisonData
    .slice()
    .filter(
      (data) =>
        data.fromStatus in STATUS &&
        data.toStatus in STATUS &&
        (statusFrom === STATUS.ALL || data.fromStatus === statusFrom) &&
        (statusTo === STATUS.ALL || data.toStatus === statusTo)
    )
