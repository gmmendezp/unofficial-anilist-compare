import { useQuery } from '@tanstack/react-query'
import request from 'graphql-request'
import { graphql } from '../gql/gql'

type ComparisonTableProps = {
  usernameFrom: string
  usernameTo: string
}

const getCollectionFromUser = graphql(`
  query ExampleQuery($username: String!) {
    MediaListCollection(userName: $username, type: ANIME) {
      lists {
        name
        entries {
          media {
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
`)

function ComparisonTable({ usernameFrom, usernameTo }: ComparisonTableProps) {
  const { data: userFromList } = useQuery({
    queryKey: [usernameFrom],
    queryFn: async () =>
      request('https://graphql.anilist.co', getCollectionFromUser, {
        username: usernameFrom,
      }),
    enabled: !!usernameFrom,
  })
  const { data: userToList } = useQuery({
    queryKey: [usernameTo],
    queryFn: async () =>
      request('https://graphql.anilist.co', getCollectionFromUser, {
        username: usernameTo,
      }),
    enabled: !!usernameTo,
  })
  return (
    <>
      <div>{usernameFrom}</div>
      <div>{JSON.stringify(userFromList, null, 2)}</div>
      <div>{usernameTo}</div>
      <div>{JSON.stringify(userToList, null, 2)}</div>
    </>
  )
}

export default ComparisonTable
