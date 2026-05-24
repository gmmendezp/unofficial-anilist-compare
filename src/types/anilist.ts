export type Maybe<T> = T | null

export type MediaTitle = {
  english?: Maybe<string>
  native?: Maybe<string>
  romaji?: Maybe<string>
}

export type MediaList = {
  status?: Maybe<string>
  score?: Maybe<number>
  media?: Maybe<{
    id?: Maybe<number>
    title?: Maybe<MediaTitle>
    format?: Maybe<string>
    season?: Maybe<string>
    seasonYear?: Maybe<number>
    averageScore?: Maybe<number>
    episodes?: Maybe<number>
    description?: Maybe<string>
    coverImage?: Maybe<{
      large?: Maybe<string>
    }>
    genres?: Maybe<Array<Maybe<string>>>
    siteUrl?: Maybe<string>
  }>
}

export type MediaListCollection = {
  lists?: Maybe<
    Array<
      Maybe<{
        status?: Maybe<string>
        entries?: Maybe<Array<Maybe<MediaList>>>
      }>
    >
  >
}

export type Page = {
  users?: Maybe<
    Array<
      Maybe<{
        id?: Maybe<number>
        name?: Maybe<string>
        avatar?: Maybe<{
          medium?: Maybe<string>
        }>
      }>
    >
  >
}
