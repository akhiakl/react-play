import { all_plays } from '@/plays/contains';
import { getPlaysByFilter } from '@/services/plays';
import { toSanitized } from '@/services/string';
import { PlayInfo } from '@/shared/playlists/types';
import { QueryDBTranslator } from '@/shared/search/search-helper';
import { resolveImageData } from './utitls/image';

type QueryParams = { [key: string]: string | string[] | undefined };

export const getPlays = async (query: QueryParams, sortBy: string) => {
  // Translate the query for the database
  const translatedQuery = QueryDBTranslator(query as any);

  // Fetch plays matching the query
  const plays: PlayInfo[] = await getPlaysByFilter(translatedQuery, sortBy);

  if (!plays) return { plays: [], randomPlay: null };

  // Filter and sanitize plays, while collecting slugs for missing covers
  const slugsToFetch: string[] = [];
  const filteredPlays = plays
    .filter((play) => all_plays.includes(play.component || toSanitized(play.title_name)))
    .map((play) => {
      if (!play.cover && play.slug) {
        slugsToFetch.push(play.slug);
      }

      return play;
    });

  // Resolve missing covers
  const coverData = await Promise.all(slugsToFetch.map((slug) => resolveImageData(slug)));

  // Merge resolved covers into plays
  const coveredPlays = filteredPlays.map((play) => ({
    ...play,
    cover: coverData.find((cover) => cover.slug === play.slug)?.image || play.cover
  }));

  // Sort plays if needed
  if (sortBy === 'Random') {
    coveredPlays.sort(() => Math.random() - 0.5);
  }

  // Select a random play if no query filters are applied
  const randomPlay =
    !Object.keys(translatedQuery).length && coveredPlays.length
      ? coveredPlays[Math.floor(Math.random() * coveredPlays.length)]
      : null;

  return {
    plays: coveredPlays,
    randomPlay
  };
};
