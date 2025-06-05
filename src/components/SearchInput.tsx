import { Input } from 'antd'
const { Search } = Input

function SearchInput({ ...props }) {
  return (
    <Search
      size="large"
      enterButton
      onSearch={() => console.log(1)}
      {...props}
    />
  )
}

export default SearchInput
