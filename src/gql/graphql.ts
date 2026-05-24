/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
/** The format the media was released in */
export type MediaFormat =
  /** Professionally published manga with more than one chapter */
  | 'MANGA'
  /** Anime movies with a theatrical release */
  | 'MOVIE'
  /** Short anime released as a music video */
  | 'MUSIC'
  /** Written books released as a series of light novels */
  | 'NOVEL'
  /** (Original Net Animation) Anime that have been originally released online or are only available through streaming services. */
  | 'ONA'
  /** Manga with just one chapter */
  | 'ONE_SHOT'
  /** (Original Video Animation) Anime that have been released directly on DVD/Blu-ray without originally going through a theatrical release or television broadcast */
  | 'OVA'
  /** Special episodes that have been included in DVD/Blu-ray releases, picture dramas, pilots, etc */
  | 'SPECIAL'
  /** Anime broadcast on television */
  | 'TV'
  /** Anime which are under 15 minutes in length and broadcast on television */
  | 'TV_SHORT'

/** Media list watching/reading status enum. */
export type MediaListStatus =
  /** Finished watching/reading */
  | 'COMPLETED'
  /** Currently watching/reading */
  | 'CURRENT'
  /** Stopped watching/reading before completing */
  | 'DROPPED'
  /** Paused watching/reading */
  | 'PAUSED'
  /** Planning to watch/read */
  | 'PLANNING'
  /** Re-watching/reading */
  | 'REPEATING'

export type MediaSeason =
  /** Predominantly started airing between October and November */
  | 'FALL'
  /** Predominantly started airing between April and June */
  | 'SPRING'
  /** Predominantly started airing between July and September */
  | 'SUMMER'
  /** Predominantly started airing between January and March */
  | 'WINTER'

/** The current releasing status of the media */
export type MediaStatus =
  /** Ended before the work could be finished */
  | 'CANCELLED'
  /** Has completed and is no longer being released */
  | 'FINISHED'
  /** Version 2 only. Is currently paused from releasing and will resume at a later date */
  | 'HIATUS'
  /** To be released at a later date */
  | 'NOT_YET_RELEASED'
  /** Currently releasing */
  | 'RELEASING'

export type MediaQueryQueryVariables = Exact<{
  username: string
}>

export type MediaQueryQuery = {
  MediaListCollection: {
    lists: Array<{
      status: MediaListStatus | null
      entries: Array<{
        score: number | null
        progress: number | null
        repeat: number | null
        status: MediaListStatus | null
        notes: string | null
        media: {
          id: number
          format: MediaFormat | null
          season: MediaSeason | null
          seasonYear: number | null
          averageScore: number | null
          episodes: number | null
          status: MediaStatus | null
          description: string | null
          synonyms: Array<string | null> | null
          genres: Array<string | null> | null
          siteUrl: string | null
          title: {
            english: string | null
            romaji: string | null
            native: string | null
          } | null
          coverImage: { medium: string | null; large: string | null } | null
          tags: Array<{
            id: number
            name: string
            rank: number | null
            isGeneralSpoiler: boolean | null
            isMediaSpoiler: boolean | null
          } | null> | null
        } | null
        startedAt: {
          day: number | null
          month: number | null
          year: number | null
        } | null
        completedAt: {
          day: number | null
          month: number | null
          year: number | null
        } | null
      } | null> | null
    } | null> | null
  } | null
}

export const MediaQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MediaQuery' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'username' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'MediaListCollection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userName' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'username' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'type' },
                value: { kind: 'EnumValue', value: 'ANIME' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'lists' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'status' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'entries' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'media' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'title' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'english',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'romaji',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'native',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'format' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'season' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'seasonYear' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'averageScore',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'episodes' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'status' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'description',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'coverImage' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'medium',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'large',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'synonyms' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'genres' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'tags' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'id' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'rank' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'isGeneralSpoiler',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'isMediaSpoiler',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'siteUrl' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'score' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'progress' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'repeat' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'startedAt' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'day' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'month' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'year' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'completedAt' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'day' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'month' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'year' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'status' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'notes' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MediaQueryQuery, MediaQueryQueryVariables>
