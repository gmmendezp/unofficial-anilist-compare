import { describe, expect, it } from 'vitest'
import { MERGE_METHOD, STATUS } from '../../src/constants'
import type { MediaList } from '../../src/types/anilist'
import { compareLists } from '../../src/util/compareLists'

const entry = (
  id: number,
  status?: string,
  score?: number,
  title = `Title ${id}`
) =>
  ({
    status,
    score,
    media: {
      id,
      title: { english: title, native: title, romaji: title },
      siteUrl: `https://anilist.co/anime/${id}`,
      coverImage: { large: '' },
      genres: [],
    },
  }) as unknown as MediaList

describe('compareLists', () => {
  it('groups shared and unique entries by merge method', () => {
    const result = compareLists(
      [
        entry(1, STATUS.COMPLETED, 8, 'Shared'),
        entry(2, STATUS.CURRENT, 7, 'Only A'),
      ],
      [
        entry(1, STATUS.PLANNING, 6, 'Shared'),
        entry(3, STATUS.COMPLETED, 9, 'Only B'),
      ]
    )

    expect(result[MERGE_METHOD.AANDB].map((data) => data.id)).toEqual([1])
    expect(result[MERGE_METHOD.AORB].map((data) => data.id)).toEqual([1, 2, 3])
    expect(result[MERGE_METHOD.ANOTB].map((data) => data.id)).toEqual([2])
    expect(result[MERGE_METHOD.BNOTA].map((data) => data.id)).toEqual([3])
  })

  it('keeps scores and statuses from both users for shared entries', () => {
    const result = compareLists(
      [entry(1, STATUS.COMPLETED, 8)],
      [entry(1, STATUS.PLANNING, 6)]
    )

    expect(result[MERGE_METHOD.AANDB][0]).toMatchObject({
      id: 1,
      fromStatus: STATUS.COMPLETED,
      fromScore: 8,
      toStatus: STATUS.PLANNING,
      toScore: 6,
    })
  })

  it('ignores entries without media ids', () => {
    const result = compareLists(
      [entry(1, STATUS.COMPLETED), { status: STATUS.CURRENT } as MediaList],
      []
    )

    expect(result[MERGE_METHOD.AORB].map((data) => data.id)).toEqual([1])
  })

  it('does not include entries without statuses', () => {
    const result = compareLists([entry(1)], [entry(2, STATUS.COMPLETED)])

    expect(result[MERGE_METHOD.AORB].map((data) => data.id)).toEqual([2])
  })
})
