import { useState } from 'react'
import {
  ButtonGroup,
  IconButton,
  Input,
  Pagination,
  Table,
  VStack,
} from '@chakra-ui/react'
import { Commet } from 'react-loading-indicators'
import useUserListComparisonData from '../hooks/useUserListComparisonData'
import { sortComparisonData } from '../util/sortComparisonData'
import { filterComparisonData } from '../util/filterComparisonData'
import ComparisonTableHeader from './ComparisonTableHeader'
import ListSelector from './ListSelector'
import ComparisonTableDataRow from './ComparisonTableDataRow'
import { STATUS, type StatusType, type TitleType } from '../constants'
import ResultsBox from './ResultsBox'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'

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
  const [pageSize, setPageSize] = useState(200)
  const [currentPage, setCurrentPage] = useState(1)
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
    <VStack w="100%">
      <ResultsBox
        current={updatedComparisonData.length}
        total={comparisonData.length}
        pageSize={pageSize}
        setPageSize={(value) => {
          setPageSize(value)
          setCurrentPage(1)
        }}
      />
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
            updatedComparisonData
              .slice(
                pageSize * (currentPage - 1),
                pageSize * (currentPage - 1) + pageSize
              )
              .map((data) => (
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
      {!!updatedComparisonData.length && (
        <Pagination.Root
          count={updatedComparisonData.length}
          pageSize={pageSize}
          page={currentPage}
        >
          <ButtonGroup variant="ghost" size="sm" wrap="wrap">
            <Pagination.PrevTrigger asChild>
              <IconButton
                color="text.200"
                onClick={() =>
                  currentPage > 1 && setCurrentPage(currentPage - 1)
                }
              >
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
              render={(page) => (
                <IconButton
                  variant={{ base: 'ghost', _selected: 'outline' }}
                  color="text.200"
                  onClick={() => setCurrentPage(page.value)}
                >
                  {page.value}
                </IconButton>
              )}
              color="text.200"
            />

            <Pagination.NextTrigger asChild>
              <IconButton
                color="text.200"
                onClick={() =>
                  currentPage < pageSize && setCurrentPage(currentPage + 1)
                }
              >
                <LuChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      )}
    </VStack>
  )
}

export default ComparisonTable
