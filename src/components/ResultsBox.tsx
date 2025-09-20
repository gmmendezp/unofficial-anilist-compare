import { createListCollection, HStack, Portal, Select } from '@chakra-ui/react'

interface ResultsBoxProps {
  current: number
  total: number
  pageSize: number
  setPageSize: (value: number) => void
}

const pageSizeCollection = createListCollection({
  items: ['10', '25', '50', '100', '200', '500'],
})

function ResultsBox({
  current,
  total,
  pageSize,
  setPageSize,
}: ResultsBoxProps) {
  return (
    <HStack
      w="100%"
      color="text.300"
      justifyContent="space-between"
      marginBottom={-4}
      fontSize="xs"
    >
      <HStack>
        Results per page
        <Select.Root
          variant="outline"
          size="sm"
          name="titleType"
          value={[`${pageSize}`]}
          defaultValue={['200']}
          onValueChange={({ value }) => setPageSize(+value)}
          collection={pageSizeCollection}
          color="text.300"
          w="50px"
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger border="none" padding={0}>
              <Select.ValueText
                className="capitalize"
                placeholder="Select List"
              />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator color="text.300" w={3} />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content bgColor="darkblue.500" color="text.200">
                {pageSizeCollection.items.map((pageSize) => (
                  <Select.Item item={pageSize} key={pageSize}>
                    <span className="capitalize">{pageSize}</span>
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </HStack>
      Showing {current} out of {total} result(s)
    </HStack>
  )
}

export default ResultsBox
