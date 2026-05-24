import { describe, expect, it } from 'vitest'
import { STATUS, TITLE_TYPE } from '../../src/constants'
import type { UserListComparisonData } from '../../src/util/compareLists'
import { filterComparisonData } from '../../src/util/filterComparisonData'

const comparisonData: UserListComparisonData = [
  {
    id: 1,
    fromStatus: STATUS.COMPLETED,
    toStatus: STATUS.PLANNING,
    title: {
      english: 'Cowboy Bebop',
      native: 'カウボーイビバップ',
      romaji: 'Cowboy Bebop',
    },
    url: '',
    description: '',
    image: '',
    season: '',
    format: '',
  },
  {
    id: 2,
    fromStatus: STATUS.CURRENT,
    toStatus: STATUS.COMPLETED,
    title: {
      english: 'Fullmetal Alchemist',
      native: '鋼の錬金術師',
      romaji: 'Hagane no Renkinjutsushi',
    },
    url: '',
    description: '',
    image: '',
    season: '',
    format: '',
  },
]

describe('filterComparisonData', () => {
  it('returns all rows when statuses are all and query is empty', () => {
    expect(
      filterComparisonData(
        comparisonData,
        STATUS.ALL,
        STATUS.ALL,
        '',
        TITLE_TYPE.ENGLISH
      )
    ).toHaveLength(2)
  })

  it('filters by from status', () => {
    expect(
      filterComparisonData(
        comparisonData,
        STATUS.CURRENT,
        STATUS.ALL,
        '',
        TITLE_TYPE.ENGLISH
      ).map((data) => data.id)
    ).toEqual([2])
  })

  it('filters by to status', () => {
    expect(
      filterComparisonData(
        comparisonData,
        STATUS.ALL,
        STATUS.PLANNING,
        '',
        TITLE_TYPE.ENGLISH
      ).map((data) => data.id)
    ).toEqual([1])
  })

  it('filters title query case-insensitively', () => {
    expect(
      filterComparisonData(
        comparisonData,
        STATUS.ALL,
        STATUS.ALL,
        'metal',
        TITLE_TYPE.ENGLISH
      ).map((data) => data.id)
    ).toEqual([2])
  })

  it('filters against the selected title language', () => {
    expect(
      filterComparisonData(
        comparisonData,
        STATUS.ALL,
        STATUS.ALL,
        'renkin',
        TITLE_TYPE.ROMAJI
      ).map((data) => data.id)
    ).toEqual([2])
  })

  it('falls back to another title when the selected title language is missing', () => {
    const dataWithMissingEnglish: UserListComparisonData = [
      {
        ...comparisonData[0],
        id: 1,
        title: {
          english: '',
          native: '',
          romaji: 'Fallback Title',
        },
      },
    ]

    expect(
      filterComparisonData(
        dataWithMissingEnglish,
        STATUS.ALL,
        STATUS.ALL,
        'fallback',
        TITLE_TYPE.ENGLISH
      ).map((data) => data.id)
    ).toEqual([1])
  })
})
