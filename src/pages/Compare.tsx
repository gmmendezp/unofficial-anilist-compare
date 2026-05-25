import { useEffect, useState } from 'react'
import { Box, Stack } from '@chakra-ui/react'
import ComparisonTable from '../components/ComparisonTable'
import {
  MERGE_METHOD,
  TITLE_TYPE,
  type MergeMethodType,
  type TitleType,
} from '../constants'
import TitleLanguageSelector from '../components/TitleLanguageSelector'
import UserForm from '../components/UserForm'

const DEFAULT_MERGE_METHOD = MERGE_METHOD.AANDB
const DEFAULT_TITLE_TYPE = TITLE_TYPE.ENGLISH

const getSearchParam = (key: string) =>
  new URLSearchParams(window.location.search).get(key) || ''

const isMergeMethod = (value: string): value is MergeMethodType =>
  Object.values(MERGE_METHOD).includes(value as MergeMethodType)

const isTitleType = (value: string): value is TitleType =>
  Object.values(TITLE_TYPE).includes(value as TitleType)

const setParam = (
  params: URLSearchParams,
  key: string,
  value: string,
  defaultValue = ''
) => {
  if (value && value !== defaultValue) params.set(key, value)
}

function Compare() {
  const initialMergeMethod = getSearchParam('mode')
  const initialTitleType = getSearchParam('titleLang')
  const [usernameFrom, setUsernameFrom] = useState(getSearchParam('from'))
  const [usernameTo, setUsernameTo] = useState(getSearchParam('to'))
  const [titleType, setTitleType] = useState<TitleType>(
    isTitleType(initialTitleType) ? initialTitleType : DEFAULT_TITLE_TYPE
  )
  const [mergeMethod, setMergeMethod] = useState<MergeMethodType>(
    isMergeMethod(initialMergeMethod)
      ? initialMergeMethod
      : DEFAULT_MERGE_METHOD
  )

  useEffect(() => {
    const params = new URLSearchParams()

    setParam(params, 'from', usernameFrom)
    setParam(params, 'to', usernameTo)
    setParam(params, 'mode', mergeMethod, DEFAULT_MERGE_METHOD)
    setParam(params, 'titleLang', titleType, DEFAULT_TITLE_TYPE)

    const query = params.toString()
    window.history.replaceState(
      null,
      '',
      query ? `${window.location.pathname}?${query}` : window.location.pathname
    )
  }, [mergeMethod, titleType, usernameFrom, usernameTo])

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
          usernameFrom={usernameFrom}
          usernameTo={usernameTo}
          setUsernameFrom={setUsernameFrom}
          setUsernameTo={setUsernameTo}
          mergeMethod={mergeMethod}
          setMergeMethod={setMergeMethod}
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
        mergeMethod={mergeMethod}
      />
    </Stack>
  )
}

export default Compare
