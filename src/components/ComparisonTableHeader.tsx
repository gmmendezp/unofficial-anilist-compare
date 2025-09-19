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
  children,
  ...rest
}: ComparisonTableHeaderProps) {
  return (
    <Table.ColumnHeader
      onClick={() => updateSortProp(propertyName)}
      bgColor="darkblue.200"
      color="white"
      _hover={{ bgColor: 'darkblue.500' }}
      fontSize="small"
      {...rest}
    >
      {headerName}
      {isBeingSorted && (
        <Icon size="sm">{isAsc ? <FiChevronDown /> : <FiChevronUp />}</Icon>
      )}
      {children}
    </Table.ColumnHeader>
  )
}

export default ComparisonTableHeader
