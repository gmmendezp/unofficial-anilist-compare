import { Button, Space } from 'antd'
import SearchInput from '../components/SearchInput'

function Compare() {
  return (
    <Space direction="vertical">
      {/* user1 input */}
      <SearchInput placeholder="User #1" />
      {/* user2 input */}
      <SearchInput placeholder="User #2" />
      <Button>Confirm</Button>
      {/* select list */}
      {/* list comparison */}
    </Space>
  )
}

export default Compare
