import { renderHook, waitFor } from '@testing-library/react'
import request from 'graphql-request'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import useDebounce from '../../src/hooks/useDebounce'
import useGetUsersFromString from '../../src/hooks/useGetUsersFromString'
import { createQueryWrapper } from '../helpers/createQueryWrapper'

vi.mock('graphql-request', () => ({
  default: vi.fn(),
}))

vi.mock('../../src/hooks/useDebounce', () => ({
  default: vi.fn((value: string) => value),
}))

const mockedRequest = vi.mocked(request)
const mockedUseDebounce = vi.mocked(useDebounce)

const user = (id: number, name: string, avatar = `${name}.jpg`) => ({
  id,
  name,
  avatar: {
    medium: avatar,
  },
})

describe('useGetUsersFromString', () => {
  beforeEach(() => {
    mockedRequest.mockReset()
    mockedUseDebounce.mockClear()
    mockedUseDebounce.mockImplementation((value: string) => value)
  })

  it('uses a 500ms debounce delay for the search query', () => {
    renderHook(() => useGetUsersFromString('User A'), {
      wrapper: createQueryWrapper(),
    })

    expect(mockedUseDebounce).toHaveBeenCalledWith('User A', 500)
  })

  it('does not request for empty or short search strings', () => {
    renderHook(() => useGetUsersFromString('ab'), {
      wrapper: createQueryWrapper(),
    })

    expect(mockedRequest).not.toHaveBeenCalled()
  })

  it('requests AniList users with the debounced search variables', async () => {
    mockedRequest.mockResolvedValueOnce({
      Page: {
        users: [],
      },
    })

    renderHook(() => useGetUsersFromString('User A'), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => {
      expect(mockedRequest).toHaveBeenCalled()
    })

    expect(mockedRequest).toHaveBeenCalledWith(
      'https://graphql.anilist.co',
      expect.anything(),
      {
        page: 1,
        perPage: 5,
        search: 'User A',
      }
    )
  })

  it('maps returned users to id, name, and avatar', async () => {
    mockedRequest.mockResolvedValueOnce({
      Page: {
        users: [
          user(1, 'User A', 'user-a.jpg'),
          user(2, 'User B', 'user-b.jpg'),
        ],
      },
    })

    const { result } = renderHook(() => useGetUsersFromString('User'), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => {
      expect(result.current.data).toEqual([
        {
          id: 1,
          name: 'User A',
          avatar: 'user-a.jpg',
        },
        {
          id: 2,
          name: 'User B',
          avatar: 'user-b.jpg',
        },
      ])
    })
  })

  it('filters null users and users without names', async () => {
    mockedRequest.mockResolvedValueOnce({
      Page: {
        users: [
          null,
          user(1, 'User A'),
          {
            id: 2,
            name: '',
            avatar: {
              medium: 'empty-name.jpg',
            },
          },
        ],
      },
    })

    const { result } = renderHook(() => useGetUsersFromString('User'), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => {
      expect(result.current.data).toEqual([
        {
          id: 1,
          name: 'User A',
          avatar: 'User A.jpg',
        },
      ])
    })
  })

  it('exposes request errors', async () => {
    const error = new Error('request failed')
    mockedRequest.mockRejectedValueOnce(error)

    const { result } = renderHook(() => useGetUsersFromString('User'), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => {
      expect(result.current.error).toBe(error)
    })

    expect(result.current.data).toEqual([])
    expect(result.current.isFetching).toBe(false)
  })
})
