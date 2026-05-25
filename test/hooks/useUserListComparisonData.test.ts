import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MERGE_METHOD } from '../../src/constants'
import useGetUserList from '../../src/hooks/useGetUserList'
import useUserListComparisonData from '../../src/hooks/useUserListComparisonData'
import type { MediaList } from '../../src/types/anilist'
import { compareLists, type UserListData } from '../../src/util/compareLists'

vi.mock('../../src/hooks/useGetUserList', () => ({
  default: vi.fn(),
}))

vi.mock('../../src/util/compareLists', () => ({
  compareLists: vi.fn(),
}))

const mockedUseGetUserList = vi.mocked(useGetUserList)
const mockedCompareLists = vi.mocked(compareLists)

const emptyResult = { data: [], isLoading: false, error: null }
const fromList = [{ media: { id: 1 } }] as MediaList[]
const toList = [{ media: { id: 2 } }] as MediaList[]
const aandbData = [{ id: 1 }] as UserListData[]
const aorbData = [{ id: 1 }, { id: 2 }] as UserListData[]

const setUseGetUserListResults = (
  fromResult: ReturnType<typeof useGetUserList>,
  toResult: ReturnType<typeof useGetUserList>
) => {
  mockedUseGetUserList
    .mockReturnValueOnce(fromResult)
    .mockReturnValueOnce(toResult)
}

describe('useUserListComparisonData', () => {
  beforeEach(() => {
    mockedUseGetUserList.mockReset()
    mockedCompareLists.mockReset()
    mockedCompareLists.mockReturnValue({
      [MERGE_METHOD.AANDB]: aandbData,
      [MERGE_METHOD.AORB]: aorbData,
      [MERGE_METHOD.ANOTB]: [],
      [MERGE_METHOD.BNOTA]: [],
    })
  })

  it('calls useGetUserList for both users with enabled true when both usernames exist', () => {
    setUseGetUserListResults(emptyResult, emptyResult)

    renderHook(() => useUserListComparisonData('User A', 'User B'))

    expect(mockedUseGetUserList).toHaveBeenNthCalledWith(1, 'User A', true)
    expect(mockedUseGetUserList).toHaveBeenNthCalledWith(2, 'User B', true)
  })

  it('passes enabled false when either username is missing', () => {
    setUseGetUserListResults(emptyResult, emptyResult)

    renderHook(() => useUserListComparisonData('User A', ''))

    expect(mockedUseGetUserList).toHaveBeenNthCalledWith(1, 'User A', false)
    expect(mockedUseGetUserList).toHaveBeenNthCalledWith(2, '', false)
  })

  it('returns A and B data by default', () => {
    setUseGetUserListResults(
      { data: fromList, isLoading: false, error: null },
      { data: toList, isLoading: false, error: null }
    )

    const { result } = renderHook(() =>
      useUserListComparisonData('User A', 'User B')
    )

    expect(mockedCompareLists).toHaveBeenCalledWith(fromList, toList)
    expect(result.current.comparisonData).toBe(aandbData)
  })

  it('returns data for the selected merge method', () => {
    setUseGetUserListResults(
      { data: fromList, isLoading: false, error: null },
      { data: toList, isLoading: false, error: null }
    )

    const { result } = renderHook(() =>
      useUserListComparisonData('User A', 'User B', MERGE_METHOD.AORB)
    )

    expect(result.current.comparisonData).toBe(aorbData)
  })

  it.each([
    {
      scenario: 'first user is loading',
      fromLoading: true,
      toLoading: false,
      expected: true,
    },
    {
      scenario: 'second user is loading',
      fromLoading: false,
      toLoading: true,
      expected: true,
    },
    {
      scenario: 'both users are loading',
      fromLoading: true,
      toLoading: true,
      expected: true,
    },
    {
      scenario: 'neither user is loading',
      fromLoading: false,
      toLoading: false,
      expected: false,
    },
  ])(
    'combines loading states when $scenario',
    ({ fromLoading, toLoading, expected }) => {
      setUseGetUserListResults(
        { data: [], isLoading: fromLoading, error: null },
        { data: [], isLoading: toLoading, error: null }
      )

      const { result } = renderHook(() =>
        useUserListComparisonData('User A', 'User B')
      )

      expect(result.current.isLoading).toBe(expected)
    }
  )

  it('returns null when neither request has an error', () => {
    setUseGetUserListResults(
      { data: [], isLoading: false, error: null },
      emptyResult
    )

    const { result } = renderHook(() =>
      useUserListComparisonData('User A', 'User B')
    )

    expect(result.current.error).toBeNull()
  })

  it('returns the first available error', () => {
    const error = new Error('first failed')

    setUseGetUserListResults(
      { data: [], isLoading: false, error },
      { data: [], isLoading: false, error: new Error('second failed') }
    )

    const { result } = renderHook(() =>
      useUserListComparisonData('User A', 'User B')
    )

    expect(result.current.error).toBe(error)
  })

  it('returns the second error when only the second request has an error', () => {
    const error = new Error('second failed')

    setUseGetUserListResults(
      { data: [], isLoading: false, error: null },
      { data: [], isLoading: false, error }
    )

    const { result } = renderHook(() =>
      useUserListComparisonData('User A', 'User B')
    )

    expect(result.current.error).toBe(error)
  })
})
