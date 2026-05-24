import { MERGE_METHOD, type MergeMethodType } from '../constants'
import useGetUserList from './useGetUserList'
import { compareLists, type UserListComparisonData } from '../util/compareLists'

type GetUserListComparisonDataType = (
  usernameFrom: string,
  usernameTo: string,
  mergeMethod?: MergeMethodType
) => {
  comparisonData: UserListComparisonData
  isLoading: boolean
  error: Error | null
}

const useUserListComparisonData: GetUserListComparisonDataType = (
  usernameFrom,
  usernameTo,
  mergeMethod = MERGE_METHOD.AANDB
) => {
  const {
    data: userFromList,
    isLoading: userFromIsLoading,
    error: userFromError,
  } = useGetUserList(usernameFrom, !!usernameFrom && !!usernameTo)
  const {
    data: userToList,
    isLoading: userToIsLoading,
    error: userToError,
  } = useGetUserList(usernameTo, !!usernameFrom && !!usernameTo)

  const mergedData = compareLists(userFromList, userToList)

  return {
    comparisonData: mergedData[mergeMethod],
    isLoading: userFromIsLoading || userToIsLoading,
    error: userFromError || userToError,
  }
}

export default useUserListComparisonData
