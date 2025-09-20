import {
  Combobox,
  Field,
  HStack,
  Portal,
  Span,
  Spinner,
  useCombobox,
  useListCollection,
  Image,
  AspectRatio,
  Box,
  InputGroup,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import useGetUsersFromString, {
  type UserData,
} from '../hooks/useGetUsersFromString'
import { LuUser } from 'react-icons/lu'

interface UsernameInputProps {
  label: string
  onChange: (value: string) => void
}

function UsernameInput({ label, onChange }: UsernameInputProps) {
  const [selectedValue, setSelectedValue] = useState<UserData>()
  const [inputValue, setInputValue] = useState<string>()
  const { data, isFetching, status } = useGetUsersFromString(inputValue)

  const { collection, set } = useListCollection<UserData>({
    initialItems: data ?? [],
    itemToString: (item) => item.name,
    itemToValue: (item) => item.name,
  })

  const combobox = useCombobox({
    collection,
    defaultValue: [],
    inputValue,
    onInputValueChange: (e) => {
      setInputValue(e.inputValue)
    },
    openOnChange: (e) => e.inputValue.length > 2,
    onValueChange: (e) => {
      setSelectedValue(e?.items[0])
      onChange(e?.value[0] || '')
    },
  })

  useEffect(() => {
    set(data)
  }, [status, isFetching, set])

  const hydrated = useRef(false)
  if (combobox.value.length && collection.size && !hydrated.current) {
    combobox.syncSelectedItems()
    hydrated.current = true
  }

  return (
    <Field.Root md={{ maxW: '45%' }} flex="none">
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
                  {selectedValue?.avatar ? (
                    <Image
                      src={selectedValue?.avatar}
                      alt={selectedValue.name}
                    />
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
            />
          </InputGroup>
          <Combobox.IndicatorGroup>
            <Combobox.ClearTrigger />
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
