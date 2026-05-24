import { describe, expect, it } from 'vitest'
import { STATUS, TITLE_TYPE } from '../../src/constants'
import type { UserListComparisonData } from '../../src/util/compareLists'
import { sortComparisonData } from '../../src/util/sortComparisonData'

const comparisonData: UserListComparisonData = [
  {
    id: 1,
    fromStatus: STATUS.COMPLETED,
    fromScore: 7,
    toStatus: STATUS.PLANNING,
    toScore: 8,
    title: { english: 'Cowboy Bebop', native: '', romaji: 'Cowboy Bebop' },
    url: '',
    description: '',
    image: '',
    season: '',
    format: 'TV',
  },
  {
    id: 2,
    fromStatus: STATUS.CURRENT,
    fromScore: 9,
    toStatus: STATUS.COMPLETED,
    toScore: 8,
    title: {
      english: 'Fullmetal Alchemist',
      native: '',
      romaji: 'Hagane no Renkinjutsushi',
    },
    url: '',
    description: '',
    image: '',
    season: '',
    format: 'TV',
  },
  {
    id: 3,
    fromStatus: STATUS.DROPPED,
    fromScore: 9,
    toStatus: STATUS.CURRENT,
    toScore: 6,
    title: { english: 'Akira', native: '', romaji: 'Akira' },
    url: '',
    description: '',
    image: '',
    season: '',
    format: 'Movie',
  },
]

describe('sortComparisonData', () => {
  it('sorts titles ascending and descending', () => {
    expect(
      sortComparisonData(comparisonData, 'title', true, TITLE_TYPE.ENGLISH).map(
        (data) => data.id
      )
    ).toEqual([3, 1, 2])

    expect(
      sortComparisonData(
        comparisonData,
        'title',
        false,
        TITLE_TYPE.ENGLISH
      ).map((data) => data.id)
    ).toEqual([2, 1, 3])
  })

  it('sorts scores and falls back to title on ties', () => {
    expect(
      sortComparisonData(
        comparisonData,
        'fromScore',
        true,
        TITLE_TYPE.ENGLISH
      ).map((data) => data.id)
    ).toEqual([1, 3, 2])
  })

  it('sorts missing scores last when ascending', () => {
    const dataWithMissingScore: UserListComparisonData = [
      {
        ...comparisonData[0],
        id: 1,
        fromScore: undefined,
        title: { english: 'Blank Score', native: '', romaji: 'Blank Score' },
      },
      {
        ...comparisonData[1],
        id: 2,
        fromScore: 6,
        title: { english: 'Low Score', native: '', romaji: 'Low Score' },
      },
      {
        ...comparisonData[2],
        id: 3,
        fromScore: 9,
        title: { english: 'High Score', native: '', romaji: 'High Score' },
      },
    ]

    expect(
      sortComparisonData(
        dataWithMissingScore,
        'fromScore',
        true,
        TITLE_TYPE.ENGLISH
      ).map((data) => data.id)
    ).toEqual([2, 3, 1])
  })

  it('sorts missing scores last when descending', () => {
    const dataWithMissingScore: UserListComparisonData = [
      {
        ...comparisonData[0],
        id: 1,
        fromScore: undefined,
        title: { english: 'Blank Score', native: '', romaji: 'Blank Score' },
      },
      {
        ...comparisonData[1],
        id: 2,
        fromScore: 6,
        title: { english: 'Low Score', native: '', romaji: 'Low Score' },
      },
      {
        ...comparisonData[2],
        id: 3,
        fromScore: 9,
        title: { english: 'High Score', native: '', romaji: 'High Score' },
      },
    ]

    expect(
      sortComparisonData(
        dataWithMissingScore,
        'fromScore',
        false,
        TITLE_TYPE.ENGLISH
      ).map((data) => data.id)
    ).toEqual([3, 2, 1])
  })

  it('falls back to title when both scores are missing', () => {
    const dataWithMissingScores: UserListComparisonData = [
      {
        ...comparisonData[0],
        id: 1,
        fromScore: undefined,
        title: { english: 'Zeta', native: '', romaji: 'Zeta' },
      },
      {
        ...comparisonData[1],
        id: 2,
        fromScore: undefined,
        title: { english: 'Alpha', native: '', romaji: 'Alpha' },
      },
    ]

    expect(
      sortComparisonData(
        dataWithMissingScores,
        'fromScore',
        true,
        TITLE_TYPE.ENGLISH
      ).map((data) => data.id)
    ).toEqual([2, 1])
  })

  it('sorts string properties', () => {
    expect(
      sortComparisonData(
        comparisonData,
        'fromStatus',
        true,
        TITLE_TYPE.ENGLISH
      ).map((data) => data.id)
    ).toEqual([1, 2, 3])
  })

  it('does not mutate the original input array', () => {
    const originalOrder = comparisonData.map((data) => data.id)

    sortComparisonData(comparisonData, 'title', true, TITLE_TYPE.ENGLISH)

    expect(comparisonData.map((data) => data.id)).toEqual(originalOrder)
  })
})
