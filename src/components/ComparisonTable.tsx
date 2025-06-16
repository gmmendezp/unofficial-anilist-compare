import { Link, Table } from '@chakra-ui/react'
import useUserListComparisonData from '../hooks/useUserListComparisonData'
import type { TitleType } from '../constants'

interface ComparisonTableProps {
  usernameFrom: string
  usernameTo: string
  statusFrom: string
  statusTo: string
  titleType: TitleType
}

function ComparisonTable({
  usernameFrom,
  usernameTo,
  statusFrom,
  statusTo,
  titleType,
}: ComparisonTableProps) {
  const comparisonData = useUserListComparisonData(
    usernameFrom,
    usernameTo,
    statusFrom,
    statusTo
  )

  return (
    <>
      {comparisonData.length > 0 && (
        <Table.Root size="sm" variant="line" stickyHeader interactive>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Anime</Table.ColumnHeader>
              <Table.ColumnHeader>{usernameFrom}'s status</Table.ColumnHeader>
              <Table.ColumnHeader>{usernameTo}'s status</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {comparisonData?.map(({ id, url, title, fromStatus, toStatus }) => (
              <Table.Row key={id}>
                <Table.Cell>
                  <Link href={url || ''}>{title[titleType]}</Link>
                </Table.Cell>
                <Table.Cell>{fromStatus}</Table.Cell>
                <Table.Cell>{toStatus}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </>
  )
}

export default ComparisonTable
