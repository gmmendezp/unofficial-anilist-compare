import { Icon, Table } from '@chakra-ui/react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import type { TableColumnHeaderProps } from '@chakra-ui/react'

interface ComparisonTableHeaderProps extends TableColumnHeaderProps {
  headerName: string
  propertyName: string
  updateSortProp: (value: string) => void
  isBeingSorted: boolean
  isAsc: boolean
}

function ComparisonTableHeader({
  headerName,
  propertyName,
  isBeingSorted,
  updateSortProp,
  isAsc,
  ...rest
}: ComparisonTableHeaderProps) {
  return (
    <Table.ColumnHeader
      onClick={() => updateSortProp(propertyName)}
      _hover={{ bg: 'gray.300' }}
      {...rest}
    >
      {headerName}
      {isBeingSorted && (
        <Icon size="sm">{isAsc ? <FiChevronDown /> : <FiChevronUp />}</Icon>
      )}
    </Table.ColumnHeader>
  )
}

export default ComparisonTableHeader
