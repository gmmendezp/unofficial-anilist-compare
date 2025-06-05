import { Input } from '@chakra-ui/react'
import type { InputProps } from '@chakra-ui/react'

function UsernameInput({ ...props }: InputProps) {
  return <Input {...props} />
}

export default UsernameInput
