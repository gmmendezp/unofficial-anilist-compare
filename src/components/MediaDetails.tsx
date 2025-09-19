import {
  AspectRatio,
  Box,
  Circle,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Stack,
  Tag,
  VStack,
} from '@chakra-ui/react'
import { LuExternalLink } from 'react-icons/lu'
import type { UserListData } from '../hooks/useUserListComparisonData'

interface MediaDetailsProps {
  data: UserListData
}

function MediaDetails({ data }: MediaDetailsProps) {
  return (
    <Stack flexDirection="row" flexWrap="wrap" paddingLeft={6} paddingRight={6}>
      <Box flex="1 1 auto" maxH="300px">
        <AspectRatio maxW="200px" ratio={7 / 10}>
          <Image src={data.image} objectFit="cover" alt={`${data.id}`} />
        </AspectRatio>
      </Box>

      <Stack w="calc(100% - 220px)">
        <HStack justifyContent="space-between">
          <VStack alignItems="flex-start">
            <Heading size="md" textTransform="capitalize">
              {data.season.toLowerCase()} {data.year}
            </Heading>

            <Heading size="xs" textTransform="capitalize">
              {data.format}
              {data.episodeCount || data.episodeCount === 0
                ? ` - ${data.episodeCount} episode${+data.episodeCount > 1 ? 's' : ''}`
                : ''}
            </Heading>
          </VStack>
          {data.averageScore && (
            <Circle size="9" bg="purple" color="white">
              <Box fontSize={20} h="17px">
                {data.averageScore}
              </Box>
            </Circle>
          )}
        </HStack>

        <Box
          dangerouslySetInnerHTML={{ __html: data.description }}
          fontSize="smaller"
        />

        <HStack paddingTop={3}>
          {data.genres?.slice(0, 8).map((genre) => (
            <Tag.Root
              variant="subtle"
              colorPalette="purple"
              size="sm"
              key={genre}
            >
              <Tag.Label>{genre}</Tag.Label>
            </Tag.Root>
          ))}
        </HStack>

        <Link
          href={data.url}
          target="_blank"
          alignSelf="flex-end"
          marginTop="auto"
        >
          <Icon size="md" margin={3}>
            <LuExternalLink color="white" />
          </Icon>
        </Link>
      </Stack>
    </Stack>
  )
}

export default MediaDetails
