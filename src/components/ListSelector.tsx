import {
  createListCollection,
  Portal,
  Select,
  type SelectRootProps,
} from '@chakra-ui/react'
import { STATUS_LABELS } from '../constants'

type ListSelectorProps = Omit<SelectRootProps, 'collection'>

const statusCollection = createListCollection({
  items: Object.entries(STATUS_LABELS).map(([value, label]) => ({
    label,
    value,
  })),
})

function ListSelector({ ...rest }: ListSelectorProps) {
  return (
    <Select.Root
      variant="subtle"
      size="xs"
      {...rest}
      collection={statusCollection}
      color="text.300"
      onClick={(e) => e.stopPropagation()}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger border="none" bgColor="darkblue.500">
          <Select.ValueText className="capitalize" placeholder="Select List" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content bgColor="darkblue.500" color="text.200">
            {statusCollection.items.map((status) => (
              <Select.Item item={status} key={status.value}>
                <span className="capitalize">{status.label.toLowerCase()}</span>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export default ListSelector
