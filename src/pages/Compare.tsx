import { useState } from 'react'
import {
  Button,
  createListCollection,
  Field,
  Group,
  Portal,
  Select,
  Stack,
} from '@chakra-ui/react'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import UsernameInput from '../components/UsernameInput'
import ComparisonTable from '../components/ComparisonTable'
import {
  STATUS_LABELS,
  STATUS,
  TITLE_TYPE,
  type StatusType,
  type TitleType,
} from '../constants'

const formSchema = z.object({
  usernameFrom: z.string().nonempty({ message: 'Username is required' }),
  usernameTo: z.string().nonempty({ message: 'Username is required' }),
  statusFrom: z.string().array().default([STATUS.ALL]),
  statusTo: z.string().array().default([STATUS.ALL]),
  titleType: z.string().array().default([TITLE_TYPE.ENGLISH]),
})

type FormValues = z.infer<typeof formSchema>

const statusCollection = createListCollection({
  items: Object.entries(STATUS_LABELS).map(([value, label]) => ({
    label,
    value,
  })),
})

const titleTypeCollection = createListCollection({
  items: Object.entries(TITLE_TYPE).map(([, value]) => ({
    label: value,
    value,
  })),
})

function Compare() {
  const [usernameFrom, setUsernameFrom] = useState('')
  const [usernameTo, setUsernameTo] = useState('')
  const [statusFrom, setStatusFrom] = useState<StatusType>(STATUS.ALL)
  const [statusTo, setStatusTo] = useState<StatusType>(STATUS.ALL)
  const [titleType, setTitleType] = useState<TitleType>(TITLE_TYPE.ENGLISH)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  })
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setUsernameFrom(data.usernameFrom)
    setUsernameTo(data.usernameTo)
    setStatusFrom(data.statusFrom[0] as StatusType)
    setStatusTo(data.statusTo[0] as StatusType)
    setTitleType(data.titleType[0] as TitleType)
  }
  return (
    <Stack gap="4" margin="3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="2" maxWidth="lg">
          <Field.Root invalid={!!errors.statusFrom} maxW="35%">
            <Controller
              control={control}
              name="titleType"
              render={({ field }) => (
                <Select.Root
                  name={field.name}
                  value={field.value}
                  defaultValue={[TITLE_TYPE.ENGLISH]}
                  onValueChange={({ value }) => field.onChange(value)}
                  onInteractOutside={() => field.onBlur()}
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
              )}
            />
            <Field.ErrorText>{errors.statusFrom?.message}</Field.ErrorText>
          </Field.Root>
          <Group grow>
            <Field.Root invalid={!!errors.usernameFrom}>
              <UsernameInput {...register('usernameFrom')} />
              <Field.ErrorText>{errors.usernameFrom?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.statusFrom} maxW="35%">
              <Controller
                control={control}
                name="statusFrom"
                render={({ field }) => (
                  <Select.Root
                    name={field.name}
                    value={field.value}
                    defaultValue={[STATUS.ALL]}
                    onValueChange={({ value }) => field.onChange(value)}
                    onInteractOutside={() => field.onBlur()}
                    collection={statusCollection}
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
                          {statusCollection.items.map((status) => (
                            <Select.Item item={status} key={status.value}>
                              <span className="capitalize">
                                {status.label.toLowerCase()}
                              </span>
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                )}
              />
              <Field.ErrorText>{errors.statusFrom?.message}</Field.ErrorText>
            </Field.Root>
          </Group>
          <Group grow>
            <Field.Root invalid={!!errors.usernameTo}>
              <UsernameInput {...register('usernameTo')} />
              <Field.ErrorText>{errors.usernameTo?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.statusTo} maxW="35%">
              <Controller
                control={control}
                name="statusTo"
                render={({ field }) => (
                  <Select.Root
                    name={field.name}
                    value={field.value}
                    defaultValue={[STATUS.ALL]}
                    onValueChange={({ value }) => field.onChange(value)}
                    onInteractOutside={() => field.onBlur()}
                    collection={statusCollection}
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
                          {statusCollection.items.map((status) => (
                            <Select.Item item={status} key={status.value}>
                              <span className="capitalize">
                                {status.label.toLowerCase()}
                              </span>
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                )}
              />
              <Field.ErrorText>{errors.statusTo?.message}</Field.ErrorText>
            </Field.Root>
          </Group>
          <Button type="submit" width="25%">
            Confirm
          </Button>
        </Stack>
      </form>

      <ComparisonTable
        usernameFrom={usernameFrom}
        usernameTo={usernameTo}
        statusFrom={statusFrom}
        statusTo={statusTo}
        titleType={titleType}
      />
    </Stack>
  )
}

export default Compare
