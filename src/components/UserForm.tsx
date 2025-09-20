import { Group, Stack } from '@chakra-ui/react'
import UsernameInput from './UsernameInput'
import MergeMethodSelector from './MergeMethodSelector'
import type { MergeMethodType } from '../constants'

interface UserFormProps {
  setUsernameFrom: (value: string) => void
  setUsernameTo: (value: string) => void
  mergeMethod: MergeMethodType
  setMergeMethod: (value: MergeMethodType) => void
}

function UserForm({
  setUsernameFrom,
  setUsernameTo,
  mergeMethod,
  setMergeMethod,
}: UserFormProps) {
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
        <MergeMethodSelector
          mergeMethod={mergeMethod}
          setMergeMethod={(mergeMethod: MergeMethodType) =>
            setMergeMethod(mergeMethod)
          }
        />
      </Group>
    </Stack>
  )
}

export default UserForm
