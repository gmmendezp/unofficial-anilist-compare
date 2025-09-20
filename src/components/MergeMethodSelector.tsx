import { createListCollection, Field, Portal, Select } from '@chakra-ui/react'
import { MERGE_METHOD, type MergeMethodType } from '../constants'

interface MergeMethodSelectorProps {
  mergeMethod: MergeMethodType
  setMergeMethod: (mergeMethod: MergeMethodType) => void
}

const mergeMethodCollection = createListCollection({
  items: Object.entries(MERGE_METHOD).map(([, label]) => ({
    label,
    value: label,
  })),
})

function MergeMethodSelector({
  mergeMethod,
  setMergeMethod,
}: MergeMethodSelectorProps) {
  return (
    <Field.Root md={{ maxW: '100%' }}>
      <Field.Label color="text.300">
        Merge Method
        <Field.RequiredIndicator />
      </Field.Label>
      <Select.Root
        variant="outline"
        size="lg"
        name="titleType"
        value={[mergeMethod]}
        defaultValue={[MERGE_METHOD.AANDB]}
        onValueChange={({ value }) =>
          setMergeMethod(value[0] as MergeMethodType)
        }
        collection={mergeMethodCollection}
        color="text.300"
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger border="none">
            <Select.ValueText placeholder="Select List" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator color="text.300" />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content bgColor="darkblue.500" color="text.200">
              {mergeMethodCollection.items.map((method) => (
                <Select.Item item={method} key={method.value}>
                  <span>{method.label}</span>
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </Field.Root>
  )
}

export default MergeMethodSelector
