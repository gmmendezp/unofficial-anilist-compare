import { describe, expect, it } from 'vitest'
import { TITLE_TYPE } from '../../src/constants'
import type { MediaTitle } from '../../src/types/anilist'
import { getTitle } from '../../src/util/getTitle'

const title: MediaTitle = {
  english: 'English Title',
  native: 'Native Title',
  romaji: 'Romaji Title',
}

describe('getTitle', () => {
  it('returns an empty string when title is missing', () => {
    expect(getTitle(undefined, TITLE_TYPE.ENGLISH)).toBe('')
    expect(getTitle(null, TITLE_TYPE.ENGLISH)).toBe('')
  })

  it('returns the english title when english is selected and present', () => {
    expect(getTitle(title, TITLE_TYPE.ENGLISH)).toBe('English Title')
  })

  it('returns the native title when native is selected and present', () => {
    expect(getTitle(title, TITLE_TYPE.NATIVE)).toBe('Native Title')
  })

  it('returns the romaji title by default', () => {
    expect(getTitle(title)).toBe('Romaji Title')
    expect(getTitle(title, TITLE_TYPE.ROMAJI)).toBe('Romaji Title')
  })

  it('falls back to romaji when the selected title is missing', () => {
    expect(
      getTitle(
        { english: '', native: 'Native Title', romaji: 'Romaji Title' },
        TITLE_TYPE.ENGLISH
      )
    ).toBe('Romaji Title')

    expect(
      getTitle(
        { english: 'English Title', native: '', romaji: 'Romaji Title' },
        TITLE_TYPE.NATIVE
      )
    ).toBe('Romaji Title')
  })

  it('falls back to english when romaji is missing', () => {
    expect(
      getTitle(
        { english: 'English Title', native: '', romaji: '' },
        TITLE_TYPE.ROMAJI
      )
    ).toBe('English Title')
  })
})
