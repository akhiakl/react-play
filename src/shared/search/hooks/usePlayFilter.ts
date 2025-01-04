// THIS HOOKS GRABS ALL THE FILTERABLE DATA FOR THE MODAL

import { fetchFilterData } from '@/services/request/query/fetch-filter-data';
import { submit_multi } from '@/services/request';
import { useEffect, useState } from 'react';
import { getAllTags as extractTags } from '@/shared/meta/play-meta-util';
import useCacheResponse from '@/shared/hooks/useCacheResponse';

/**
 * run graphql query to retrive filterable data like creators, tags, level
 * @returns [loading, error, data]
 */

const FILTER_DATA_RESPONSE = 'FILTER_DATA_RESPONSE';

const useFetchFilterData = () => {
  const { getAllTags, getAllLevels, getAllUsers } = fetchFilterData;
  const [getCacheResponse, setCacheResponse] = useCacheResponse();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  const dataConstructor = (data: [any, any, any]) => {
    const [tags, levels, creators] = data;
    const structuredTags = extractTags(tags);

    return { tags: structuredTags, levels, creators };
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const isCachedResponse = getCacheResponse(FILTER_DATA_RESPONSE);
        if (isCachedResponse) {
          return setData(dataConstructor(isCachedResponse));
        }
        const response = await submit_multi([getAllTags, getAllLevels, getAllUsers]);
        setCacheResponse(FILTER_DATA_RESPONSE, response);
        setData(dataConstructor(response));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [getAllTags, getAllLevels, getAllUsers]);

  return [loading, error, data];
};

export default useFetchFilterData;
