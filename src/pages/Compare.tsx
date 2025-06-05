import { Button, Field, Stack } from '@chakra-ui/react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import UsernameInput from '../components/UsernameInput'
import ComparisonTable from '../components/ComparisonTable'
import { useState } from 'react'

interface Inputs {
  usernameFrom: string
  usernameTo: string
}

function Compare() {
  const [usernameFrom, setUsernameFrom] = useState('')
  const [usernameTo, setUsernameTo] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setUsernameFrom(data.usernameFrom)
    setUsernameTo(data.usernameTo)
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="4" align="flex-start" maxW="md">
          <Field.Root invalid={!!errors.usernameFrom}>
            <UsernameInput {...register('usernameFrom')} />
            <Field.ErrorText>{errors.usernameFrom?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors.usernameTo}>
            <UsernameInput {...register('usernameTo')} />
            <Field.ErrorText>{errors.usernameTo?.message}</Field.ErrorText>
          </Field.Root>
          <Button type="submit">Confirm</Button>
        </Stack>
      </form>
      {/* select type of list */}

      <ComparisonTable usernameFrom={usernameFrom} usernameTo={usernameTo} />
    </>
  )
}

export default Compare
