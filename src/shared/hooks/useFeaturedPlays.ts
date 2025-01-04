import { useEffect, useState } from 'react';
import { submit } from '@/services/request';
import { FetchPlaysFilter } from '@/services/request/query/fetch-plays-filter';
import { PlayInfo } from '@/shared/playlists/types';

/**
 * run graphql query to retrive featured plays
 */

const useFeaturedPlays = () => {
  const { getAllFeaturedPlays } = FetchPlaysFilter;
  const [data, setData] = useState<PlayInfo[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await submit(getAllFeaturedPlays());
        setData(res);
      } catch (err) {
        setError(err?.[0]);
      } finally {
        setLoading(false);
      }
    })();
  }, [getAllFeaturedPlays]);

  return { loading, error, data };
};

export default useFeaturedPlays;
