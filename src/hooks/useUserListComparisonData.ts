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
  const list1ByMediaId = createMediaListMap(list1)
  const list2ByMediaId = createMediaListMap(list2)

  if (list1 && list2) {
    list1.forEach((entry: Maybe<MediaList>) => {
      if (!entry?.media?.id) return
      const foundMedia = list2ByMediaId.get(entry.media.id)
      const newEntry = constructEntry(entry, foundMedia)
      if (entry.status) {
        aorb.push(newEntry)
        if (foundMedia?.status) {
          aandb.push(newEntry)
        }
        if (!foundMedia) {
          anotb.push(newEntry)
        }
      }
    })
    list2.forEach((entry: Maybe<MediaList>) => {
      if (!entry?.media?.id) return
      const foundMedia = list1ByMediaId.get(entry.media.id)
      const newEntry = constructEntry(foundMedia, entry)
      if (entry.status) {
        if (!foundMedia) {
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

const hasMediaId = (
  entry: Maybe<MediaList>
): entry is MediaList & { media: NonNullable<MediaList['media']> } =>
  !!entry?.media?.id

const createMediaListMap = (list: Array<Maybe<MediaList>>) =>
  new Map(list.filter(hasMediaId).map((entry) => [entry.media.id, entry]))

const constructEntry = (
  entry1?: Maybe<MediaList>,
  entry2?: Maybe<MediaList>
): UserListData => {
  const media = (entry1 || entry2)?.media

  return {
    id: media?.id || 0,
    fromStatus: entry1?.status || 'NONE',
    fromScore: entry1?.score,
    toStatus: entry2?.status || 'NONE',
    toScore: entry2?.score,
    title: {
      english: media?.title?.english || '',
      native: media?.title?.native || '',
      romaji: media?.title?.romaji || '',
    },
    url: media?.siteUrl || '',
    image: media?.coverImage?.large || '',
    description: media?.description || '',
    season: media?.season || '',
    year: media?.seasonYear,
    episodeCount: media?.episodes,
    format: media?.format
      ? FORMAT_NAME[media.format as keyof typeof FORMAT_NAME]
      : '',
    genres:
      media?.genres?.filter((genre) => !!genre).map((genre) => `${genre}`) ||
      [],
    averageScore: media?.averageScore,
  }
}

export default useUserListComparisonData
