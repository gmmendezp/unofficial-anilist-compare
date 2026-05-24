# Unofficial AniList Compare

A small web app for comparing two public AniList anime lists. Pick two users, choose how their lists should be merged, then filter and sort the results to find shared shows or entries that only appear on one list.

[Live demo](https://gmmendezp.github.io/unofficial-anilist-compare/)

## Features

- Search for AniList users with autocomplete.
- Compare lists using `A and B`, `A or B`, `A not B`, or `B not A`.
- Filter by each user's watch status.
- Search results by anime title.
- Switch between English, romaji, and native titles.
- Sort by title, status, or score.
- Open detailed media info with cover art, description, format, genres, score, and AniList link.

## Tech Stack

- React
- TypeScript
- Vite
- Chakra UI
- TanStack Query
- GraphQL Code Generator
- Vitest
- pnpm

## Getting Started

Install dependencies and start the dev server:

```sh
pnpm install
pnpm run dev
```

## Scripts

```sh
pnpm run dev
pnpm run build
pnpm run lint
pnpm run test
pnpm run test:watch
pnpm run codegen
pnpm run preview
```

## GraphQL Codegen

The app queries AniList's public GraphQL API and uses generated TypeScript types.

Run codegen after changing GraphQL queries:

```sh
pnpm run codegen
```

## Notes

- This project is not affiliated with AniList.
- It only uses public AniList data.
- Private lists or users that cannot be fetched from the public API cannot be compared.
