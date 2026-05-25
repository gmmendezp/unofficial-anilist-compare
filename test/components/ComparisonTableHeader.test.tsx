import type { ReactNode } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import ComparisonTableHeader from '../../src/components/ComparisonTableHeader'

vi.mock('@chakra-ui/react', () => ({
  Icon: ({ children }: { children: ReactNode }) => (
    <span data-testid="sort-icon">{children}</span>
  ),
  Table: {
    ColumnHeader: ({
      children,
      onClick,
    }: {
      children: ReactNode
      onClick?: () => void
    }) => <button onClick={onClick}>{children}</button>,
  },
}))

vi.mock('react-icons/fi', () => ({
  FiChevronDown: () => <span data-testid="sort-descending-icon" />,
  FiChevronUp: () => <span data-testid="sort-ascending-icon" />,
}))

describe('ComparisonTableHeader', () => {
  it('renders the header name', () => {
    render(
      <ComparisonTableHeader
        headerName="Title"
        propertyName="title"
        updateSortProp={vi.fn()}
        isBeingSorted={false}
        isAsc={true}
      />
    )

    expect(screen.getByText('Title')).toBeTruthy()
  })

  it('calls updateSortProp with the property name when clicked', () => {
    const updateSortProp = vi.fn()

    render(
      <ComparisonTableHeader
        headerName="Title"
        propertyName="title"
        updateSortProp={updateSortProp}
        isBeingSorted={false}
        isAsc={true}
      />
    )

    fireEvent.click(screen.getByText('Title'))

    expect(updateSortProp).toHaveBeenCalledWith('title')
  })

  it('does not render a sort icon when the column is not being sorted', () => {
    render(
      <ComparisonTableHeader
        headerName="Title"
        propertyName="title"
        updateSortProp={vi.fn()}
        isBeingSorted={false}
        isAsc={true}
      />
    )

    expect(screen.queryByTestId('sort-icon')).toBeNull()
  })

  it('renders the descending sort icon for ascending sort state', () => {
    render(
      <ComparisonTableHeader
        headerName="Title"
        propertyName="title"
        updateSortProp={vi.fn()}
        isBeingSorted={true}
        isAsc={true}
      />
    )

    expect(screen.getByTestId('sort-descending-icon')).toBeTruthy()
  })

  it('renders the ascending sort icon for descending sort state', () => {
    render(
      <ComparisonTableHeader
        headerName="Title"
        propertyName="title"
        updateSortProp={vi.fn()}
        isBeingSorted={true}
        isAsc={false}
      />
    )

    expect(screen.getByTestId('sort-ascending-icon')).toBeTruthy()
  })
})
