'use client';
import { SORT_OPTIONS } from '@/constants';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

type Props = {
  defaultSortBy: string;
  totalResults?: number;
  onSortBy: (value: string) => void;
};

const PlayListSortBy = ({ defaultSortBy, totalResults, onSortBy }: Props) => {
  const [sortBy, setSortBy] = useState(defaultSortBy);
  const searchParams = useSearchParams();
  const text = searchParams.get('text');

  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { value } = e.target;
    setSortBy(value);
    onSortBy(value);
  };

  return (
    <>
      {text ? (
        <div className="search-summary">
          <b>{totalResults}</b>&nbsp;results for plays matching&nbsp;<b>{text}</b>
          &nbsp;sorted by&nbsp;<b>{sortBy}</b>
        </div>
      ) : (
        ''
      )}
      <div className="sort-by-plays-wrapper">
        Sort By :
        <select id="sort-by-plays" name="sort-by-plays" value={sortBy} onChange={onChange}>
          {SORT_OPTIONS.map((name, i) => (
            <option key={i} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default PlayListSortBy;
