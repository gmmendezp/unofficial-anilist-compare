/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  '\n  query MediaQuery($username: String!) {\n    MediaListCollection(userName: $username, type: ANIME) {\n      lists {\n        status\n        entries {\n          media {\n            id\n            title {\n              english\n              romaji\n              native\n            }\n            episodes\n            status\n            description\n            coverImage {\n              medium\n            }\n            synonyms\n            tags {\n              name\n              rank\n              isGeneralSpoiler\n              isMediaSpoiler\n            }\n            siteUrl\n          }\n          score\n          progress\n          repeat\n          startedAt {\n            day\n            month\n            year\n          }\n          completedAt {\n            day\n            month\n            year\n          }\n          status\n          notes\n        }\n      }\n    }\n  }\n': typeof types.MediaQueryDocument
}
const documents: Documents = {
  '\n  query MediaQuery($username: String!) {\n    MediaListCollection(userName: $username, type: ANIME) {\n      lists {\n        status\n        entries {\n          media {\n            id\n            title {\n              english\n              romaji\n              native\n            }\n            episodes\n            status\n            description\n            coverImage {\n              medium\n            }\n            synonyms\n            tags {\n              name\n              rank\n              isGeneralSpoiler\n              isMediaSpoiler\n            }\n            siteUrl\n          }\n          score\n          progress\n          repeat\n          startedAt {\n            day\n            month\n            year\n          }\n          completedAt {\n            day\n            month\n            year\n          }\n          status\n          notes\n        }\n      }\n    }\n  }\n':
    types.MediaQueryDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query MediaQuery($username: String!) {\n    MediaListCollection(userName: $username, type: ANIME) {\n      lists {\n        status\n        entries {\n          media {\n            id\n            title {\n              english\n              romaji\n              native\n            }\n            episodes\n            status\n            description\n            coverImage {\n              medium\n            }\n            synonyms\n            tags {\n              name\n              rank\n              isGeneralSpoiler\n              isMediaSpoiler\n            }\n            siteUrl\n          }\n          score\n          progress\n          repeat\n          startedAt {\n            day\n            month\n            year\n          }\n          completedAt {\n            day\n            month\n            year\n          }\n          status\n          notes\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query MediaQuery($username: String!) {\n    MediaListCollection(userName: $username, type: ANIME) {\n      lists {\n        status\n        entries {\n          media {\n            id\n            title {\n              english\n              romaji\n              native\n            }\n            episodes\n            status\n            description\n            coverImage {\n              medium\n            }\n            synonyms\n            tags {\n              name\n              rank\n              isGeneralSpoiler\n              isMediaSpoiler\n            }\n            siteUrl\n          }\n          score\n          progress\n          repeat\n          startedAt {\n            day\n            month\n            year\n          }\n          completedAt {\n            day\n            month\n            year\n          }\n          status\n          notes\n        }\n      }\n    }\n  }\n']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
