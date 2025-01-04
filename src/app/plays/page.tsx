import React from 'react';
import { Metadata } from 'next';
import PlayList from '@/shared/playlists/PlayList';
import { cookies } from 'next/headers';
import { getPlays } from '@/actions/plays';

type QueryParams = { [key: string]: string | string[] | undefined };

type Props = {
  searchParams: Promise<QueryParams>;
};

export const metadata: Metadata = {
  title: 'ReactPlay - Plays'
};

async function PlayListPage({ searchParams }: Props) {
  const query = await searchParams;
  const cookieStore = await cookies();
  const sortBy = cookieStore.get('play_sort_by')?.value;
  const { plays, randomPlay } = await getPlays(query, sortBy ?? 'Newest');

  return (
    <main className="app-body">
      <PlayList plays={plays} randomPlay={randomPlay} sortBy={sortBy} />
    </main>
  );
}

export default PlayListPage;
