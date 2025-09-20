import { Group, Stack } from '@chakra-ui/react'
import UsernameInput from './UsernameInput'

interface UserFormProps {
  setUsernameFrom: (value: string) => void
  setUsernameTo: (value: string) => void
}

function UserForm({ setUsernameFrom, setUsernameTo }: UserFormProps) {
  return (
    <Stack gap="2">
      <Group grow flexWrap="wrap" alignItems="flex-start">
        <UsernameInput
          label="User 1"
          onChange={(value: string) => setUsernameFrom(value)}
        />
        <UsernameInput
          label="User 2"
          onChange={(value: string) => setUsernameTo(value)}
        />
      </Group>
    </Stack>
  )
}

export default UserForm
