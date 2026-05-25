import {
  Combobox,
  Field,
  HStack,
  Portal,
  Span,
  Spinner,
  useCombobox,
  Image,
  AspectRatio,
  Box,
  InputGroup,
  createListCollection,
} from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import useGetUsersFromString, {
  type UserData,
} from '../hooks/useGetUsersFromString'
import { LuUser } from 'react-icons/lu'

interface UsernameInputProps {
  label: string
  value: string
  onChange: (value: string) => void
}

function UsernameInput({ label, value, onChange }: UsernameInputProps) {
  const [inputValue, setInputValue] = useState(value)
  const { data, isFetching, error } = useGetUsersFromString(inputValue)

  const collection = useMemo(
    () =>
      createListCollection({
        items: data,
        itemToString: (item: UserData) => item.name,
        itemToValue: (item: UserData) => item.name,
      }),
    [data]
  )

  const isInputShowingSelectedValue =
    !!value && inputValue.toLowerCase() === value.toLowerCase()
  const selectedUser = isInputShowingSelectedValue
    ? data.find((user) => user.name.toLowerCase() === value.toLowerCase())
    : undefined

  const updateValue = (value: string) => {
    setInputValue(value)
    onChange(value)
  }

  const combobox = useCombobox({
    collection,
    value: value ? [value] : [],
    inputValue,
    onInputValueChange: (e) => {
      setInputValue(e.inputValue)
    },
    openOnChange: (e) => e.inputValue.length > 1,
    onValueChange: (e) => {
      const nextValue = e?.value[0]
      if (nextValue) updateValue(nextValue)
    },
  })

  return (
    <Field.Root md={{ maxW: '35%' }} flex="none">
      <Field.Label color="text.300">
        {label}
        <Field.RequiredIndicator />
      </Field.Label>
      <Combobox.RootProvider
        value={combobox}
        variant="flushed"
        size="lg"
        colorPalette="blue"
        color="text.300"
      >
        <Combobox.Control>
          <InputGroup
            startElement={
              <Box w={8} marginLeft="-3px">
                <AspectRatio ratio={1} maxH={10}>
                  {selectedUser?.avatar ? (
                    <Image src={selectedUser.avatar} alt={selectedUser.name} />
                  ) : (
                    <LuUser />
                  )}
                </AspectRatio>
              </Box>
            }
          >
            <Combobox.Input
              placeholder="Type to search"
              borderBottom="none"
              boxShadow="none"
              onBlur={() => {
                window.setTimeout(() => setInputValue(value), 0)
              }}
            />
          </InputGroup>
          <Combobox.IndicatorGroup>
            <Combobox.ClearTrigger onClick={() => updateValue('')} />
            <Combobox.Trigger />
          </Combobox.IndicatorGroup>
        </Combobox.Control>
        <Portal>
          <Combobox.Positioner>
            <Combobox.Content bgColor="darkblue.500" color="text.200">
              {isFetching ? (
                <HStack p="2">
                  <Spinner size="xs" />
                  <Span>Loading...</Span>
                </HStack>
              ) : error ? (
                <HStack p="2">
                  <Span>Could not search AniList users</Span>
                </HStack>
              ) : (
                <>
                  <Combobox.Empty>No users found</Combobox.Empty>
                  {collection.items.map((item) => (
                    <Combobox.Item item={item} key={item.name}>
                      <HStack>
                        <Box w="30px" flexDirection="row">
                          <AspectRatio maxW="30px" ratio={1}>
                            <Image
                              src={item.avatar || ''}
                              objectFit="cover"
                              alt={`${item.name}`}
                            />
                          </AspectRatio>
                        </Box>
                        {item.name}
                      </HStack>
                      <Combobox.ItemIndicator />
                    </Combobox.Item>
                  ))}
                </>
              )}
            </Combobox.Content>
          </Combobox.Positioner>
        </Portal>
      </Combobox.RootProvider>
    </Field.Root>
  )
}

export default UsernameInput
