import { useState } from 'react'
import { Input, Table } from '@chakra-ui/react'
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
  const [nameQuery, setNameQuery] = useState('')
  const [sortProp, setSortProp] = useState('title')
  const [isAsc, setIsAsc] = useState(true)
  const { comparisonData, isLoading } = useUserListComparisonData(
    usernameFrom,
    usernameTo
  )

  const updatedComparisonData = filterComparisonData(
    sortComparisonData(comparisonData, sortProp, isAsc, titleType),
    statusFrom,
    statusTo,
    nameQuery,
    titleType
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
        color="text.300"
      >
        <Table.ColumnGroup>
          <Table.Column />
          <Table.Column htmlWidth="150px" />
          <Table.Column htmlWidth="150px" />
          <Table.Column htmlWidth="100px" />
          <Table.Column htmlWidth="100px" />
        </Table.ColumnGroup>
        <Table.Header>
          <Table.Row cursor="pointer">
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
          <Table.Row bgColor="darkblue.200" color="text.300" fontSize="small">
            <Table.Cell>
              <Input
                placeholder="Type to filter"
                variant="subtle"
                size="xs"
                bgColor="darkblue.500"
                color="text.200"
                md={{ maxW: 400 }}
                onChange={(e) => setNameQuery(e.target.value)}
              />
            </Table.Cell>
            <Table.Cell>
              <ListSelector
                defaultValue={[STATUS.ALL]}
                onValueChange={({ value }) =>
                  setStatusFrom(value[0] as StatusType)
                }
              />
            </Table.Cell>
            <Table.Cell>
              <ListSelector
                defaultValue={[STATUS.ALL]}
                onValueChange={({ value }) =>
                  setStatusTo(value[0] as StatusType)
                }
              />
            </Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
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
              <ComparisonTableDataRow
                data={data}
                titleType={titleType}
                key={data.id}
              />
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
