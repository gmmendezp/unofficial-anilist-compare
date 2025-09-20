import { useQuery } from '@tanstack/react-query'
import request, { type RequestDocument } from 'graphql-request'
import { type Maybe, type Page } from '../gql/graphql'
import useDebounce from './useDebounce'

export type UserData = {
  id?: number
  name: string
  avatar?: Maybe<string>
}

export type UserListData = Array<UserData>

const getUserFromStringQuery = `
  query PageQuery($id: Int, $page: Int!, $perPage: Int!, $search: String!) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        currentPage
        hasNextPage
        perPage
      }
      users(id: $id, search: $search) {
        id
        name
        avatar {
          medium
        }
      }
    }
  }
` as RequestDocument

type GetUserListDataType = (searchQuery?: string) => {
  data: UserListData
  isFetching: boolean
  status: string
}

const useGetUsersFromString: GetUserListDataType = (searchQuery?: string) => {
  const dbSearchQuery = useDebounce(searchQuery || '', 500)
  const {
    data: usersCollection,
    isFetching,
    status,
  } = useQuery<{
    Page: Page
  }>({
    queryKey: [dbSearchQuery, 'search'],
    queryFn: async () =>
      request('https://graphql.anilist.co', getUserFromStringQuery, {
        page: 1,
        perPage: 5,
        search: dbSearchQuery,
      }),
    enabled: !!dbSearchQuery && dbSearchQuery.length > 3,
    refetchOnWindowFocus: false,
  })

  return {
    data:
      usersCollection?.Page?.users
        ?.filter((user) => user && user.name)
        .map((user) => ({
          id: user?.id,
          name: user?.name || '',
          avatar: user?.avatar?.medium,
        })) || [],
    isFetching,
    status,
  }
}

export default useGetUsersFromString
