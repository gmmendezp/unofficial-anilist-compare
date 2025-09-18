import { Table } from '@chakra-ui/react'
import useUserListComparisonData from '../hooks/useUserListComparisonData'
import { STATUS, type StatusType, type TitleType } from '../constants'
import Title from './Title'
import Status from './Status'
import { sortComparisonData } from '../util/sortComparisonData'
import { useState } from 'react'
import ComparisonTableHeader from './ComparisonTableHeader'
import ListSelector from './ListSelector'
import { filterComparisonData } from '../util/filterComparisonData'
import { Commet } from 'react-loading-indicators'

interface ComparisonTableProps {
  usernameFrom: string
  usernameTo: string
  titleType: TitleType
}

function ComparisonTable({
  usernameFrom,
  usernameTo,
  titleType,
}: ComparisonTableProps) {
  const [statusFrom, setStatusFrom] = useState<StatusType>(STATUS.ALL)
  const [statusTo, setStatusTo] = useState<StatusType>(STATUS.ALL)
  const [sortProp, setSortProp] = useState('title')
  const [isAsc, setIsAsc] = useState(true)
  const { comparisonData, isLoading } = useUserListComparisonData(
    usernameFrom,
    usernameTo
  )
  const updatedComparisonData = filterComparisonData(
    sortComparisonData(comparisonData, sortProp, isAsc, titleType),
    statusFrom,
    statusTo
  )

  const updateSortProp = (value: string) => {
    if (sortProp === value) setIsAsc(!isAsc)
    setSortProp(value)
  }

  return (
    <>
      <Table.Root size="sm" variant="line" stickyHeader interactive>
        <Table.ColumnGroup>
          <Table.Column />
          <Table.Column htmlWidth="150px" />
          <Table.Column htmlWidth="150px" />
        </Table.ColumnGroup>
        <Table.Header cursor="pointer">
          <Table.Row bg="bg.emphasized">
            <ComparisonTableHeader
              headerName="Anime"
              propertyName="title"
              updateSortProp={updateSortProp}
              isAsc={isAsc}
              isBeingSorted={!!(sortProp === 'title')}
            />
            <ComparisonTableHeader
              headerName={`${usernameFrom || 'User 1'}'s status`}
              propertyName="fromStatus"
              updateSortProp={updateSortProp}
              isAsc={isAsc}
              isBeingSorted={!!(sortProp === 'fromStatus')}
              textAlign="center"
            />
            <ComparisonTableHeader
              headerName={`${usernameTo || 'User 2'}'s status`}
              propertyName="toStatus"
              updateSortProp={updateSortProp}
              isAsc={isAsc}
              isBeingSorted={!!(sortProp === 'toStatus')}
              textAlign="center"
            />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row bg="white">
            <Table.Cell />
            <Table.Cell textAlign="center">
              <ListSelector
                variant="subtle"
                size="sm"
                defaultValue={[STATUS.ALL]}
                onValueChange={({ value }) =>
                  setStatusFrom(value[0] as StatusType)
                }
              ></ListSelector>
            </Table.Cell>
            <Table.Cell textAlign="center">
              <ListSelector
                variant="subtle"
                size="sm"
                defaultValue={[STATUS.ALL]}
                onValueChange={({ value }) =>
                  setStatusTo(value[0] as StatusType)
                }
              ></ListSelector>
            </Table.Cell>
          </Table.Row>
          {isLoading ? (
            <Table.Row bg="white">
              <Table.Cell colSpan={3} textAlign="center">
                <Commet color="#355262" size="large" text="" textColor="" />
              </Table.Cell>
            </Table.Row>
          ) : updatedComparisonData && updatedComparisonData.length > 0 ? (
            updatedComparisonData.map(
              ({ id, url, title, fromStatus, toStatus }) => (
                <Table.Row key={id}>
                  <Table.Cell>
                    <Title title={title} url={url} titleType={titleType} />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Status status={fromStatus} />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Status status={toStatus} />
                  </Table.Cell>
                </Table.Row>
              )
            )
          ) : (
            <Table.Row bg="white">
              <Table.Cell colSpan={3} textAlign="center">
                No Data
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </>
  )
}

export default ComparisonTable
