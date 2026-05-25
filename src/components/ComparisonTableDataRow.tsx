import { Box, Table } from '@chakra-ui/react'
import type { TableRowProps } from '@chakra-ui/react'
import type { UserListData } from '../util/compareLists'
import Title from './Title'
import Status from './Status'
import type { TitleType } from '../constants'
import MediaDetails from './MediaDetails'
import { useState } from 'react'

interface ComparisonTableDataRowProps extends TableRowProps {
  data: UserListData
  titleType: TitleType
  rowNumber: number
}

function ComparisonTableDataRow({
  data,
  titleType,
  rowNumber,
  ...rest
}: ComparisonTableDataRowProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { title, url, fromStatus, toStatus, fromScore, toScore } = data
  return (
    <>
      <Table.Row
        bgColor="inherit"
        _hover={{ bgColor: 'darkblue.600' }}
        borderStyle="hidden"
        onClick={() => setIsOpen(!isOpen)}
        {...rest}
      >
        <Table.Cell>
          <Box display="flex" alignItems="center" gap={2}>
            <Box as="span" color="whiteAlpha.500" minW="4ch" flex="none">
              #{rowNumber}
            </Box>
            <Title title={title} url={url} titleType={titleType} />
          </Box>
        </Table.Cell>
        <Table.Cell textAlign="center">
          <Status status={fromStatus} />
        </Table.Cell>
        <Table.Cell textAlign="center">
          <Status status={toStatus} />
        </Table.Cell>
        <Table.Cell
          textAlign="center"
          display={{ base: 'none', md: 'table-cell' }}
        >
          {fromScore}
        </Table.Cell>
        <Table.Cell
          textAlign="center"
          display={{ base: 'none', md: 'table-cell' }}
        >
          {toScore}
        </Table.Cell>
      </Table.Row>
      <Table.Row bgColor="darkblue.300" color="text.300" {...rest}>
        <Table.Cell colSpan={5} padding={0}>
          <Box
            display="grid"
            gridTemplateRows={isOpen ? '1fr' : '0fr'}
            transition="grid-template-rows 160ms ease"
            borderBottomWidth="1px"
            borderBottomStyle="solid"
            borderBottomColor="whiteAlpha.200"
          >
            <Box overflow="hidden">
              <MediaDetails data={data}></MediaDetails>
            </Box>
          </Box>
        </Table.Cell>
      </Table.Row>
    </>
  )
}

export default ComparisonTableDataRow
