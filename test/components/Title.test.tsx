import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Title from '../../src/components/Title'
import { TITLE_TYPE } from '../../src/constants'
import type { MediaTitle } from '../../src/types/anilist'

const title: MediaTitle = {
  english: 'English Title',
  native: 'Native Title',
  romaji: 'Romaji Title',
}

describe('Title', () => {
  it('renders the selected title', () => {
    render(<Title title={title} titleType={TITLE_TYPE.ENGLISH} url="" />)

    expect(screen.getByText('English Title')).toBeTruthy()
  })

  it('renders fallback title text when the selected title is missing', () => {
    render(
      <Title
        title={{ english: '', native: '', romaji: 'Romaji Title' }}
        titleType={TITLE_TYPE.ENGLISH}
        url=""
      />
    )

    expect(screen.getByText('Romaji Title')).toBeTruthy()
  })
})
