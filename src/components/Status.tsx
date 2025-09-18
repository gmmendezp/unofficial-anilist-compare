import { Tag } from '@chakra-ui/react'
import { STATUS, STATUS_LABELS, type StatusType } from '../constants'

interface StatusProps {
  status: string
}

const getColor = (status: string) => {
  if (status === STATUS.COMPLETED) return 'green'
  if (status === STATUS.PAUSED) return 'orange'
  if (status === STATUS.PLANNING) return 'blue'
  if (status === STATUS.CURRENT) return 'purple'
  if (status === STATUS.DROPPED) return 'red'
  return 'gray'
}

function Status({ status }: StatusProps) {
  return (
    <Tag.Root colorPalette={getColor(status)}>
      <Tag.Label>{STATUS_LABELS[status as StatusType]}</Tag.Label>
    </Tag.Root>
  )
}

export default Status
