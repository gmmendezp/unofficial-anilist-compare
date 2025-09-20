import { Table } from '@chakra-ui/react'
import type { TableRowProps } from '@chakra-ui/react'
import type { UserListData } from '../hooks/useUserListComparisonData'
import Title from './Title'
import Status from './Status'
import type { TitleType } from '../constants'
import MediaDetails from './MediaDetails'
import { useState } from 'react'

interface ComparisonTableDataRowProps extends TableRowProps {
  data: UserListData
  titleType: TitleType
}

function ComparisonTableDataRow({
  data,
  titleType,
  ...rest
}: ComparisonTableDataRowProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { title, url, fromStatus, toStatus, fromScore, toScore } = data
  return (
    <>
      <Table.Row
        bgColor="inherit"
        _hover={{ bgColor: 'darkblue.700' }}
        borderStyle="hidden"
        onClick={() => setIsOpen(!isOpen)}
        {...rest}
      >
        <Table.Cell>
          <Title title={title} url={url} titleType={titleType} />
        </Table.Cell>
        <Table.Cell textAlign="center">
          <Status status={fromStatus} />
        </Table.Cell>
        <Table.Cell textAlign="center">
          <Status status={toStatus} />
        </Table.Cell>
        <Table.Cell textAlign="center">{fromScore}</Table.Cell>
        <Table.Cell textAlign="center">{toScore}</Table.Cell>
      </Table.Row>
      <Table.Row bgColor="darkblue.300" color="text.300" {...rest}>
        <Table.Cell colSpan={5} paddingLeft={0} paddingRight={0}>
          {isOpen && <MediaDetails data={data}></MediaDetails>}
        </Table.Cell>
      </Table.Row>
    </>
  )
}

export default ComparisonTableDataRow
