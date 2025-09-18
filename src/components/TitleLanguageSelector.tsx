import { createListCollection, Field, Portal, Select } from '@chakra-ui/react'
import { TITLE_TYPE, type TitleType } from '../constants'

interface TitleLanguageSelectorProps {
  titleType: TitleType
  setTitleType: (titleType: TitleType) => void
}

const titleTypeCollection = createListCollection({
  items: Object.entries(TITLE_TYPE).map(([, value]) => ({
    label: value,
    value,
  })),
})

function TitleLanguageSelector({
  titleType,
  setTitleType,
}: TitleLanguageSelectorProps) {
  return (
    <Field.Root md={{ maxW: '100%' }}>
      <Field.Label color="white">
        Title Language
        <Field.RequiredIndicator />
      </Field.Label>
      <Select.Root
        variant="subtle"
        size="sm"
        name="titleType"
        value={[titleType]}
        defaultValue={[TITLE_TYPE.ENGLISH]}
        onValueChange={({ value }) => setTitleType(value[0] as TitleType)}
        collection={titleTypeCollection}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText
              className="capitalize"
              placeholder="Select List"
            />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {titleTypeCollection.items.map((status) => (
                <Select.Item item={status} key={status.value}>
                  <span className="capitalize">{status.label}</span>
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

export default TitleLanguageSelector
