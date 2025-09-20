import { useQuery } from '@tanstack/react-query'
import request, { type RequestDocument } from 'graphql-request'
import { graphql } from '../gql/gql'
import {
  type MediaListCollection,
  type MediaList,
  type Maybe,
} from '../gql/graphql'
import { STATUS } from '../constants'

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

type GetUserListParams = (
  username: string,
  enabled: boolean
) => { data: Array<Maybe<MediaList>>; isLoading: boolean }

const useGetUserList: GetUserListParams = (username, enabled) => {
  const { data: userData, isFetching } = useQuery<{
    MediaListCollection: MediaListCollection
  }>({
    queryKey: [username, 'list'],
    queryFn: async () =>
      request('https://graphql.anilist.co', getCollectionFromUser, {
        username,
      }),
    enabled: enabled,
    refetchOnWindowFocus: false,
  })
  const userList = userData?.MediaListCollection?.lists
    ?.filter((media) => media?.status && media?.status in STATUS)
    .reduce<
      Array<Maybe<MediaList>>
    >((result, list) => (list?.entries ? [...result, ...list.entries] : result), [])
  return {
    data: userList || [],
    isLoading: isFetching,
  }
}

export default useGetUserList
