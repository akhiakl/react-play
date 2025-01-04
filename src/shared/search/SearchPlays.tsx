import React from 'react';
import './search.css';
import debounce from 'lodash/debounce';
import useQueryParams from '@/shared/hooks/useQueryParams';

type Props = {
  ref?: React.MutableRefObject<HTMLInputElement>;
};

const SearchPlays = ({ ref }: Props) => {
  const queryParams = useQueryParams();

  // handleSearch function that passes the event handler into lodash's debounce function to add a delay of 500s after change in searchbar value and display search results.
  const handleSearch = debounce((value) => {
    queryParams.set('text', value, '/plays');
  }, 500);

  return (
    <input
      className="search-input-text"
      data-testid="plays-search-box-input-field"
      defaultValue={queryParams?.get('text')?.toString()}
      placeholder="Search for play(s)..."
      ref={ref}
      type="text"
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
    />
  );
};

export default SearchPlays;
