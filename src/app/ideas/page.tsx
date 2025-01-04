import React from 'react';
import data from '@/shared/playideas/ideas.json';
import PlayIdeas from '@/shared/playideas/PlayIdeas';
import { PlayIdeaFilter, PlayIdeaInfo } from '@/shared/playideas/types';
import { Metadata } from 'next';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata: Metadata = {
  title: 'ReactPlay - Ideas'
};

async function fetchIdeas(level: string): Promise<PlayIdeaInfo[]> {
  // TODO: The idea list has to come from the DB
  // const response = await fetch('/api/ideas');
  // const json = await response.json();
  const json = data.ideas;

  return level ? json.filter((idea) => idea.level === level) : json;
}

const filters: PlayIdeaFilter[] = [
  {
    label: 'All',
    value: '',
    id: 'all-id'
  },
  {
    label: 'BEGINNER',
    value: 'Beginner',
    id: 'beginner-id'
  },
  {
    label: 'INTERMEDIATE',
    value: 'Intermediate',
    id: 'intermediate-id'
  },
  {
    label: 'ADVANCED',
    value: 'Advanced',
    id: 'advanced-id'
  }
];

const IdeasPage = async ({ searchParams }: Props) => {
  const { level = '' } = await searchParams;
  const ideas = await fetchIdeas(level as string);

  return <PlayIdeas filters={filters} ideas={ideas} />;
};

export default IdeasPage;
