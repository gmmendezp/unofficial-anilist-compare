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
import DOMPurify from 'dompurify'
import { LuExternalLink } from 'react-icons/lu'
import type { UserListData } from '../util/compareLists'

interface MediaDetailsProps {
  data: UserListData
}

function MediaDetails({ data }: MediaDetailsProps) {
  const sanitizedDescription = DOMPurify.sanitize(data.description)

  return (
    <Stack flexDirection="row" flexWrap="wrap" padding={6}>
      <Box flex="1 1 auto" maxH="300px">
        <Link
          href={data.url}
          target="_blank"
          rel="noreferrer"
          aria-label="Open anime on AniList"
          display="block"
          maxW="200px"
          _hover={{ opacity: 0.85 }}
          transition="opacity 120ms ease"
        >
          <AspectRatio ratio={7 / 10}>
            <Image src={data.image} objectFit="cover" alt="" />
          </AspectRatio>
        </Link>
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
            <Circle
              size="9"
              bg="gray.700"
              color="text.200"
              fontSize={20}
              lineHeight="1"
            >
              {data.averageScore}
            </Circle>
          )}
        </HStack>

        <Box
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
          fontSize="smaller"
        />

        <HStack paddingTop={3}>
          {data.genres?.slice(0, 8).map((genre) => (
            <Tag.Root
              variant="subtle"
              colorPalette="gray"
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
          rel="noreferrer"
          alignSelf="flex-end"
          marginTop="auto"
        >
          <Icon size="md" margin={3} color="white" _hover={{ color: 'gray' }}>
            <LuExternalLink />
          </Icon>
        </Link>
      </Stack>
    </Stack>
  )
}

export default MediaDetails
