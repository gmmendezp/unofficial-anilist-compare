import { Button, Field, Group, InputGroup, Stack } from '@chakra-ui/react'
import UsernameInput from './UsernameInput'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { LuUser } from 'react-icons/lu'

interface UserFormProps {
  setUsernameFrom: (value: string) => void
  setUsernameTo: (value: string) => void
}

const formSchema = z.object({
  usernameFrom: z.string().nonempty({ message: 'User 1 is required' }),
  usernameTo: z.string().nonempty({ message: 'User 2 is required' }),
})

type FormValues = z.infer<typeof formSchema>

function UserForm({ setUsernameFrom, setUsernameTo }: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  })
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setUsernameFrom(data.usernameFrom)
    setUsernameTo(data.usernameTo)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="2">
        <Group grow flexWrap="wrap" alignItems="flex-start">
          <Field.Root
            invalid={!!errors.usernameFrom}
            md={{ maxW: '45%' }}
            flex="none"
          >
            <Field.Label color="white">
              User 1 <Field.RequiredIndicator />
            </Field.Label>
            <InputGroup startElement={<LuUser />}>
              <UsernameInput
                variant="subtle"
                size="sm"
                {...register('usernameFrom')}
              />
            </InputGroup>
            <Field.ErrorText>{errors.usernameFrom?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root
            invalid={!!errors.usernameTo}
            md={{ maxW: '45%' }}
            flex="none"
          >
            <Field.Label color="white">
              User 2 <Field.RequiredIndicator />
            </Field.Label>
            <InputGroup startElement={<LuUser />}>
              <UsernameInput
                variant="subtle"
                size="sm"
                {...register('usernameTo')}
              />
            </InputGroup>
            <Field.ErrorText>{errors.usernameTo?.message}</Field.ErrorText>
          </Field.Root>
        </Group>
        <Button
          type="submit"
          md={{ maxW: '35%' }}
          size="sm"
          variant="subtle"
          colorPalette={'blue'}
        >
          Confirm
        </Button>
      </Stack>
    </form>
  )
}

export default UserForm
