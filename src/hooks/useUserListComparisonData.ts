import { useQuery } from '@tanstack/react-query'
import request, { type RequestDocument } from 'graphql-request'
import { graphql } from '../gql/gql'
import {
  type MediaListCollection,
  type MediaList,
  type Maybe,
} from '../gql/graphql'
import { STATUS, type TitleType } from '../constants'

export type UserListData = {
  id: number
  fromStatus: string
  toStatus: string
  title: { [key in TitleType]: string }
  url: string
}

export type UserListComparisonData = Array<UserListData>

const getCollectionFromUser = graphql(`
  query MediaQuery($username: String!) {
    MediaListCollection(userName: $username, type: ANIME) {
      lists {
        status
        entries {
          media {
            id
            title {
              english
              romaji
              native
            }
            episodes
            status
            description
            coverImage {
              medium
            }
            synonyms
            tags {
              name
              rank
              isGeneralSpoiler
              isMediaSpoiler
            }
            siteUrl
          }
          score
          progress
          repeat
          startedAt {
            day
            month
            year
          }
          completedAt {
            day
            month
            year
          }
          status
          notes
        }
      }
    }
  }
`) as RequestDocument

const useUserListComparisonData: (
  usernameFrom: string,
  usernameTo: string
) => { comparisonData: UserListComparisonData; isLoading: boolean } = (
  usernameFrom,
  usernameTo
) => {
  let comparisonData: UserListComparisonData = []
  const { data: userFromData, isFetching: userFromIsFetching } = useQuery<{
    MediaListCollection: MediaListCollection
  }>({
    queryKey: [usernameFrom],
    queryFn: async () =>
      request('https://graphql.anilist.co', getCollectionFromUser, {
        username: usernameFrom,
      }),
    enabled: !!usernameFrom,
  })
  const userFromList = userFromData?.MediaListCollection?.lists
    ?.filter((media) => media?.status && media?.status in STATUS)
    .reduce<
      Maybe<MediaList>[]
    >((result, list) => (list?.entries ? [...result, ...list.entries] : result), [])

  const { data: userToData, isFetching: userToIsFetching } = useQuery<{
    MediaListCollection: MediaListCollection
  }>({
    queryKey: [usernameTo],
    queryFn: async () =>
      request('https://graphql.anilist.co', getCollectionFromUser, {
        username: usernameTo,
      }),
    enabled: !!usernameTo,
  })
  const userToList = userToData?.MediaListCollection?.lists
    ?.filter((media) => media?.status && media?.status in STATUS)
    .reduce(
      (result, list) => (list?.entries ? [...result, ...list.entries] : result),
      [] as Maybe<MediaList>[]
    )

  if (userFromList && userToList) {
    comparisonData = userFromList.reduce<UserListComparisonData>(
      (result, entryFrom) => {
        if (!entryFrom?.media?.id) return result
        const foundMedia = userToList?.filter(
          (entryTo) =>
            entryTo?.media && entryTo.media.id === entryFrom?.media?.id
        )
        if (
          foundMedia?.length &&
          foundMedia[0] &&
          entryFrom.status &&
          foundMedia[0].status
        )
          return [
            ...result,
            {
              id: entryFrom.media.id,
              fromStatus: entryFrom.status,
              toStatus: foundMedia[0].status,
              title: {
                english: entryFrom.media.title?.english || '',
                native: entryFrom.media.title?.native || '',
                romaji: entryFrom.media.title?.romaji || '',
              },
              url: entryFrom.media.siteUrl || '',
            },
          ]
        return result
      },
      []
    )
  }
  return {
    comparisonData,
    isLoading: userFromIsFetching || userToIsFetching,
  }
}

export default useUserListComparisonData
