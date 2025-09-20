import { type Maybe, type MediaList } from '../gql/graphql'
import {
  FORMAT_NAME,
  MERGE_METHOD,
  type MergeMethodType,
  type TitleType,
} from '../constants'
import useGetUserList from './useGetUserList'

export type UserListData = {
  id: number
  fromStatus: string
  fromScore?: Maybe<number>
  toStatus: string
  toScore?: Maybe<number>
  title: { [key in TitleType]: string }
  url: string
  description: string
  image: string
  season: string
  year?: Maybe<number>
  format: string
  episodeCount?: Maybe<number>
  genres?: Array<string>
  averageScore?: Maybe<number>
}

export type UserListComparisonData = Array<UserListData>

type GetUserListComparisonDataType = (
  usernameFrom: string,
  usernameTo: string,
  mergeMethod?: MergeMethodType
) => { comparisonData: UserListComparisonData; isLoading: boolean }

const useUserListComparisonData: GetUserListComparisonDataType = (
  usernameFrom,
  usernameTo,
  mergeMethod = MERGE_METHOD.AANDB
) => {
  const { data: userFromList, isLoading: userFromIsLoading } = useGetUserList(
    usernameFrom,
    !!usernameFrom && !!usernameTo
  )
  const { data: userToList, isLoading: userToIsLoading } = useGetUserList(
    usernameTo,
    !!usernameFrom && !!usernameTo
  )

  const mergedData = compareLists(userFromList, userToList)

  return {
    comparisonData: mergedData[mergeMethod],
    isLoading: userFromIsLoading || userToIsLoading,
  }
}

const compareLists = (
  list1: Maybe<MediaList>[],
  list2: Array<Maybe<MediaList>>
): {
  [method: MergeMethodType]: UserListComparisonData
} => {
  const aandb: UserListComparisonData = []
  const aorb: UserListComparisonData = []
  const anotb: UserListComparisonData = []
  const bnota: UserListComparisonData = []
  if (list1 && list2) {
    list1.forEach((entry: Maybe<MediaList>) => {
      if (!entry?.media?.id) return
      const foundMedia = list2?.filter(
        (entry2) => entry2?.media?.id === entry?.media?.id
      )
      const newEntry = constructEntry(entry, foundMedia[0])
      if (entry.status) {
        aorb.push(newEntry)
        if (foundMedia?.length && foundMedia[0] && foundMedia[0].status) {
          aandb.push(newEntry)
        }
        if (!foundMedia?.length || !foundMedia[0]) {
          anotb.push(newEntry)
        }
      }
    })
    list2.forEach((entry: Maybe<MediaList>) => {
      if (!entry?.media?.id) return
      const foundMedia = list1?.filter(
        (entry2) => entry2?.media?.id === entry?.media?.id
      )
      const newEntry = constructEntry(foundMedia[0], entry)
      if (entry.status) {
        if (!foundMedia?.length || !foundMedia[0]) {
          bnota.push(newEntry)
          aorb.push(newEntry)
        }
      }
    })
  }
  return {
    [MERGE_METHOD.AANDB]: aandb,
    [MERGE_METHOD.AORB]: aorb,
    [MERGE_METHOD.ANOTB]: anotb,
    [MERGE_METHOD.BNOTA]: bnota,
  }
}

const constructEntry = (
  entry1: Maybe<MediaList>,
  entry2?: Maybe<MediaList>
): UserListData => ({
  id: (entry1 || entry2)?.media?.id || 0,
  fromStatus: entry1?.status || 'NONE',
  fromScore: entry1?.score,
  toStatus: entry2?.status || 'NONE',
  toScore: entry2?.score,
  title: {
    english: (entry1 || entry2)?.media?.title?.english || '',
    native: (entry1 || entry2)?.media?.title?.native || '',
    romaji: (entry1 || entry2)?.media?.title?.romaji || '',
  },
  url: (entry1 || entry2)?.media?.siteUrl || '',
  image: (entry1 || entry2)?.media?.coverImage?.large || '',
  description: (entry1 || entry2)?.media?.description || '',
  season: (entry1 || entry2)?.media?.season || '',
  year: (entry1 || entry2)?.media?.seasonYear,
  episodeCount: (entry1 || entry2)?.media?.episodes,
  format: (entry1 || entry2)?.media?.format
    ? FORMAT_NAME[(entry1 || entry2)?.media?.format as keyof typeof FORMAT_NAME]
    : '',
  genres:
    (entry1 || entry2)?.media?.genres
      ?.filter((genre) => !!genre)
      .map((genre) => `${genre}`) || [],
  averageScore: (entry1 || entry2)?.media?.averageScore,
})

export default useUserListComparisonData
