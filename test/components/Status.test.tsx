import type { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Status from '../../src/components/Status'
import { STATUS } from '../../src/constants'

vi.mock('@chakra-ui/react', () => ({
  Tag: {
    Root: ({
      children,
      colorPalette,
    }: {
      children: ReactNode
      colorPalette?: string
    }) => <span data-color-palette={colorPalette}>{children}</span>,
    Label: ({ children }: { children: ReactNode }) => <span>{children}</span>,
  },
}))

describe('Status', () => {
  it('renders the status label', () => {
    render(<Status status={STATUS.CURRENT} />)

    expect(screen.getByText('Watching')).toBeTruthy()
  })

  it('renders the none label for unknown statuses', () => {
    render(<Status status={STATUS.NONE} />)

    expect(screen.getByText('None')).toBeTruthy()
  })

  it.each([
    { status: STATUS.COMPLETED, colorPalette: 'green' },
    { status: STATUS.PAUSED, colorPalette: 'orange' },
    { status: STATUS.PLANNING, colorPalette: 'blue' },
    { status: STATUS.CURRENT, colorPalette: 'purple' },
    { status: STATUS.DROPPED, colorPalette: 'red' },
    { status: STATUS.NONE, colorPalette: 'gray' },
  ])('uses $colorPalette for $status status', ({ status, colorPalette }) => {
    render(<Status status={status} />)

    expect(
      screen.getByText(/.+/).parentElement?.getAttribute('data-color-palette')
    ).toBe(colorPalette)
  })
})
