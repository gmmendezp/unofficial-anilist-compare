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
      color="black"
      variant="subtle"
      size="xs"
      {...rest}
      collection={statusCollection}
      onClick={(e) => e.stopPropagation()}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText className="capitalize" placeholder="Select List" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
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
