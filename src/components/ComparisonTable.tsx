import { useState } from 'react'
import { Table } from '@chakra-ui/react'
import { Commet } from 'react-loading-indicators'
import useUserListComparisonData from '../hooks/useUserListComparisonData'
import { sortComparisonData } from '../util/sortComparisonData'
import { filterComparisonData } from '../util/filterComparisonData'
import ComparisonTableHeader from './ComparisonTableHeader'
import ListSelector from './ListSelector'
import ComparisonTableDataRow from './ComparisonTableDataRow'
import { STATUS, type StatusType, type TitleType } from '../constants'

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
      <Table.Root
        size="sm"
        variant="line"
        stickyHeader
        bgColor="darkblue.300"
        color="white"
      >
        <Table.ColumnGroup>
          <Table.Column />
          <Table.Column htmlWidth="150px" />
          <Table.Column htmlWidth="150px" />
          <Table.Column htmlWidth="100px" />
          <Table.Column htmlWidth="100px" />
        </Table.ColumnGroup>
        <Table.Header cursor="pointer">
          <Table.Row>
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
            >
              <ListSelector
                defaultValue={[STATUS.ALL]}
                onValueChange={({ value }) =>
                  setStatusFrom(value[0] as StatusType)
                }
              />
            </ComparisonTableHeader>
            <ComparisonTableHeader
              headerName={`${usernameTo || 'User 2'}'s status`}
              propertyName="toStatus"
              updateSortProp={updateSortProp}
              isAsc={isAsc}
              isBeingSorted={!!(sortProp === 'toStatus')}
              textAlign="center"
            >
              <ListSelector
                defaultValue={[STATUS.ALL]}
                onValueChange={({ value }) =>
                  setStatusTo(value[0] as StatusType)
                }
              />
            </ComparisonTableHeader>
            <ComparisonTableHeader
              headerName={`${usernameFrom || 'User 1'}'s score`}
              propertyName="fromScore"
              updateSortProp={updateSortProp}
              isAsc={isAsc}
              isBeingSorted={!!(sortProp === 'fromScore')}
              textAlign="center"
            />
            <ComparisonTableHeader
              headerName={`${usernameTo || 'User 2'}'s score`}
              propertyName="toScore"
              updateSortProp={updateSortProp}
              isAsc={isAsc}
              isBeingSorted={!!(sortProp === 'toScore')}
              textAlign="center"
            />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading ? (
            <Table.Row bgColor="inherit">
              <Table.Cell colSpan={5} textAlign="center" borderStyle="hidden">
                <Commet
                  color="var(--chakra-colors-darkblue-700)"
                  size="large"
                />
              </Table.Cell>
            </Table.Row>
          ) : updatedComparisonData && updatedComparisonData.length > 0 ? (
            updatedComparisonData.map((data) => (
              <ComparisonTableDataRow data={data} titleType={titleType} />
            ))
          ) : (
            <Table.Row bgColor="inherit">
              <Table.Cell colSpan={5} textAlign="center" borderStyle="hidden">
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
