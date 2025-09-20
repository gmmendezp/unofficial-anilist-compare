import { useQuery } from '@tanstack/react-query'
import request, { type RequestDocument } from 'graphql-request'
import { graphql } from '../gql/gql'
import {
  type MediaListCollection,
  type MediaList,
  type Maybe,
} from '../gql/graphql'
import { FORMAT_NAME, STATUS, type TitleType } from '../constants'

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
            format
            season
            seasonYear
            averageScore
            episodes
            status
            description
            coverImage {
              medium
              large
            }
            synonyms
            genres
            tags {
              id
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

type GetUserListComparisonDataType = (
  usernameFrom: string,
  usernameTo: string
) => { comparisonData: UserListComparisonData; isLoading: boolean }

const useUserListComparisonData: GetUserListComparisonDataType = (
  usernameFrom,
  usernameTo
) => {
  let comparisonData: UserListComparisonData = []
  const { data: userFromData, isFetching: userFromIsFetching } = useQuery<{
    MediaListCollection: MediaListCollection
  }>({
    queryKey: [usernameFrom, 'list'],
    queryFn: async () =>
      request('https://graphql.anilist.co', getCollectionFromUser, {
        username: usernameFrom,
      }),
    enabled: !!usernameFrom && !!usernameTo,
    refetchOnWindowFocus: false,
  })
  const userFromList = userFromData?.MediaListCollection?.lists
    ?.filter((media) => media?.status && media?.status in STATUS)
    .reduce<
      Maybe<MediaList>[]
    >((result, list) => (list?.entries ? [...result, ...list.entries] : result), [])

  const { data: userToData, isFetching: userToIsFetching } = useQuery<{
    MediaListCollection: MediaListCollection
  }>({
    queryKey: [usernameTo, 'list'],
    queryFn: async () =>
      request('https://graphql.anilist.co', getCollectionFromUser, {
        username: usernameTo,
      }),
    enabled: !!usernameFrom && !!usernameTo,
    refetchOnWindowFocus: false,
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
        ) {
          return [
            ...result,
            {
              id: entryFrom.media.id,
              fromStatus: entryFrom.status,
              fromScore: entryFrom.score,
              toStatus: foundMedia[0].status,
              toScore: foundMedia[0].score,
              title: {
                english: entryFrom.media.title?.english || '',
                native: entryFrom.media.title?.native || '',
                romaji: entryFrom.media.title?.romaji || '',
              },
              url: entryFrom.media.siteUrl || '',
              image: entryFrom.media.coverImage?.large || '',
              description: entryFrom.media.description || '',
              season: entryFrom.media.season || '',
              year: entryFrom.media.seasonYear,
              episodeCount: entryFrom.media.episodes,
              format: entryFrom.media.format
                ? FORMAT_NAME[
                    entryFrom.media.format as keyof typeof FORMAT_NAME
                  ]
                : '',
              genres:
                entryFrom.media.genres
                  ?.filter((genre) => !!genre)
                  .map((genre) => `${genre}`) || [],
              averageScore: entryFrom.media.averageScore,
            },
          ]
        }
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
