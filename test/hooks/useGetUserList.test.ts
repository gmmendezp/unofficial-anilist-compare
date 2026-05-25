import { renderHook, waitFor } from '@testing-library/react'
import request from 'graphql-request'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { STATUS } from '../../src/constants'
import useGetUserList from '../../src/hooks/useGetUserList'
import type { MediaList } from '../../src/types/anilist'
import { createQueryWrapper } from '../helpers/createQueryWrapper'

vi.mock('graphql-request', () => ({
  default: vi.fn(),
}))

const mockedRequest = vi.mocked(request)

const mediaEntry = (id: number, status = STATUS.COMPLETED) =>
  ({
    status,
    media: {
      id,
      title: {
        english: `Title ${id}`,
        native: `Title ${id}`,
        romaji: `Title ${id}`,
      },
      genres: [],
    },
  }) as unknown as MediaList

describe('useGetUserList', () => {
  beforeEach(() => {
    mockedRequest.mockReset()
  })

  it('does not request when disabled', () => {
    const { result } = renderHook(() => useGetUserList('User A', false), {
      wrapper: createQueryWrapper(),
    })

    expect(result.current.data).toEqual([])
    expect(result.current.isLoading).toBe(false)
    expect(mockedRequest).not.toHaveBeenCalled()
  })

  it('requests the AniList collection for the username when enabled', async () => {
    mockedRequest.mockResolvedValueOnce({
      MediaListCollection: {
        lists: [],
      },
    })

    renderHook(() => useGetUserList('User A', true), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => {
      expect(mockedRequest).toHaveBeenCalled()
    })

    expect(mockedRequest).toHaveBeenCalledWith(
      'https://graphql.anilist.co',
      expect.anything(),
      { username: 'User A' }
    )
  })

  it('flattens valid status lists into one entry array', async () => {
    mockedRequest.mockResolvedValueOnce({
      MediaListCollection: {
        lists: [
          {
            status: STATUS.COMPLETED,
            entries: [mediaEntry(1), mediaEntry(2)],
          },
          {
            status: STATUS.CURRENT,
            entries: [mediaEntry(3)],
          },
        ],
      },
    })

    const { result } = renderHook(() => useGetUserList('User A', true), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => {
      expect(result.current.data.map((entry) => entry?.media?.id)).toEqual([
        1, 2, 3,
      ])
    })
  })

  it('ignores lists with invalid or missing statuses', async () => {
    mockedRequest.mockResolvedValueOnce({
      MediaListCollection: {
        lists: [
          {
            status: STATUS.COMPLETED,
            entries: [mediaEntry(1)],
          },
          {
            status: 'INVALID_STATUS',
            entries: [mediaEntry(2)],
          },
          {
            status: null,
            entries: [mediaEntry(3)],
          },
        ],
      },
    })

    const { result } = renderHook(() => useGetUserList('User A', true), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => {
      expect(result.current.data.map((entry) => entry?.media?.id)).toEqual([1])
    })
  })

  it('returns an empty array when collection lists are missing', async () => {
    mockedRequest.mockResolvedValueOnce({
      MediaListCollection: {
        lists: null,
      },
    })

    const { result } = renderHook(() => useGetUserList('User A', true), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toEqual([])
  })

  it('exposes request errors', async () => {
    const error = new Error('request failed')
    mockedRequest.mockRejectedValueOnce(error)

    const { result } = renderHook(() => useGetUserList('User A', true), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => {
      expect(result.current.error).toBe(error)
    })

    expect(result.current.data).toEqual([])
    expect(result.current.isLoading).toBe(false)
  })
})
