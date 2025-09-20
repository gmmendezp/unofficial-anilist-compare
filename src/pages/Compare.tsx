import { useState } from 'react'
import { Box, Stack } from '@chakra-ui/react'
import ComparisonTable from '../components/ComparisonTable'
import { TITLE_TYPE, type TitleType } from '../constants'
import TitleLanguageSelector from '../components/TitleLanguageSelector'
import UserForm from '../components/UserForm'

function Compare() {
  const [usernameFrom, setUsernameFrom] = useState('')
  const [usernameTo, setUsernameTo] = useState('')
  const [titleType, setTitleType] = useState<TitleType>(TITLE_TYPE.ENGLISH)

  return (
    <Stack
      gap="4"
      padding="3"
      maxW="1400px"
      marginLeft="auto"
      marginRight="auto"
      flexWrap={'wrap'}
      flexDirection={{ base: 'column', md: 'row' }}
      justifyContent="space-between"
    >
      <Box md={{ w: '70%' }} flex="none">
        <UserForm
          setUsernameFrom={setUsernameFrom}
          setUsernameTo={setUsernameTo}
        />
      </Box>

      <Box md={{ w: '25%', maxW: '150px' }} flex="none">
        <TitleLanguageSelector
          titleType={titleType}
          setTitleType={(value: TitleType) => setTitleType(value)}
        />
      </Box>

      <ComparisonTable
        usernameFrom={usernameFrom}
        usernameTo={usernameTo}
        titleType={titleType}
      />
    </Stack>
  )
}

export default Compare
