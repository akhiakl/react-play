'use client';
import { useState, useRef } from 'react';
import FilterPlays from './FilterPlays';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import debounce from 'lodash/debounce';
import useQueryParams from '@/shared/hooks/useQueryParams';

export const SearchBox = () => {
  const [query, setQuery] = useState<Record<string, any>>({});
  const searchInput = useRef<HTMLInputElement>(null);

  const queryParams = useQueryParams();

  const onChange = (query: Record<string, any>) => {
    setQuery(query);
    // const query_str = new URLSearchParams(query).toString();
    // router.push(`/plays?${query_str}`);
  };

  const onClearFilter = () => {
    setQuery({});
    if (searchInput?.current?.value) searchInput.current.value = '';
    queryParams.removeAll('/plays');
  };

  const handleSearch = debounce((value) => {
    queryParams.set('text', value, '/plays');
  }, 500);

  return (
    <div className="filter">
      <div
        className="flex flex-1 search-input items-center filter-area pl-4 pr-2"
        data-testid="plays-search-box-container"
      >
        <BiSearch className="mr-2" data-testid="plays-search-box-icon" size="24px" />
        <input
          className="search-input-text"
          data-testid="plays-search-box-input-field"
          defaultValue={queryParams?.get('text')?.toString()}
          placeholder="Search for play(s)..."
          ref={searchInput}
          type="text"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        {query && Object.keys(query).length > 0 ? (
          <button
            className="btn-filter"
            title="Clear Filter"
            onClick={() => {
              onClearFilter();
            }}
          >
            <AiOutlineClose data-testid="plays-search-box-icon" size="24px" />
          </button>
        ) : null}
        <FilterPlays query={query} onChange={(q) => onChange(q)} />
      </div>
    </div>
  );
};
